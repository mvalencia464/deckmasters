#!/usr/bin/env node
import 'dotenv/config';

/**
 * One-time migration: rewrite R2 keys from legacy layouts (projects/, images/, videos/)
 * to flat <clientSlug>/<file> (with optional site prefix).
 *
 * R2 has no rename: CopyObject → verify destination → DeleteObject.
 *
 * Usage:
 *   node scripts/r2-migrate-flat.mjs --dry-run
 *   node scripts/r2-migrate-flat.mjs --single "deckmasters/videos/keller.mp4" --execute
 *   node scripts/r2-migrate-flat.mjs --execute
 *
 * Override computed destination:
 *   node scripts/r2-migrate-flat.mjs --map "deckmasters/videos/IMG_6982.mp4=deckmasters/matt-blakeslee/img-6982.mp4"
 */
import path from 'node:path';
import process from 'node:process';
import {
  S3Client,
  ListObjectsV2Command,
  CopyObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { sanitizeBaseName } from './lib/r2-naming.mjs';

/** S3/R2 “folder” keys and empty markers — skip (not real objects with bodies). */
function looksLikeFileObjectKey(key) {
  const last = key.split('/').filter(Boolean).pop() ?? '';
  return last.includes('.') && !last.endsWith('/');
}

function parseArgs(argv) {
  const out = {
    dryRun: true,
    single: '',
    maps: [],
    prefix: '',
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--execute') out.dryRun = false;
    else if (a === '--dry-run') out.dryRun = true;
    else if (a === '--single') out.single = argv[++i] ?? '';
    else if (a === '--map') out.maps.push(argv[++i] ?? '');
    else if (a === '--prefix') out.prefix = argv[++i] ?? '';
    else if (a === '-h' || a === '--help') out.help = true;
  }
  return out;
}

function printHelp() {
  console.log(`
Usage: node scripts/r2-migrate-flat.mjs [options]

  Migrates legacy keys toward flat client/file layout. Default is --dry-run (no writes).

Options:
  --dry-run     List planned copy+delete (default)
  --execute     Perform Copy → verify → Delete
  --single KEY  Only migrate this one object (test this first)
  --map A=B     Force destination key B for source key A (repeatable)
  --prefix P    ListObjects prefix (default: R2_SITE_SLUG/ or entire bucket — prefer explicit)

Environment: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_SITE_SLUG
`);
}

/** Apply manual maps first; then automatic rules. */
function computeTargetKey(sourceKey, manual) {
  if (manual.has(sourceKey)) return manual.get(sourceKey);

  let parts = sourceKey.split('/').filter(Boolean);
  parts = parts.filter((s) => s !== 'projects' && s !== 'images');

  const vi = parts.indexOf('videos');
  if (vi !== -1) {
    const withoutVideos = parts.filter((_, i) => i !== vi);
    const filename = withoutVideos[withoutVideos.length - 1];
    const ext = path.extname(filename);
    const stem = path.basename(filename, ext);
    const clientFolder = sanitizeBaseName(stem) || 'video';
    const prefix = withoutVideos.slice(0, -1);
    return [...prefix, clientFolder, filename].join('/');
  }

  return parts.join('/');
}

async function listAllKeys(client, bucket, prefix) {
  const out = [];
  let ContinuationToken;
  do {
    const data = await client.send(
      new ListObjectsV2Command({ Bucket: bucket, Prefix: prefix, ContinuationToken }),
    );
    if (data.Contents?.length) out.push(...data.Contents.map((o) => o.Key).filter(Boolean));
    ContinuationToken = data.IsTruncated ? data.NextContinuationToken : undefined;
  } while (ContinuationToken);
  return out;
}

async function main() {
  const opts = parseArgs(process.argv);
  if (opts.help) {
    printHelp();
    process.exit(0);
  }

  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.R2_BUCKET_NAME;
  const siteSlug = (process.env.R2_SITE_SLUG ?? '').trim().replace(/^\/+|\/+$/g, '');

  if (!accountId || !accessKeyId || !secretAccessKey || !bucket) {
    console.error('Missing R2 env variables.');
    process.exit(1);
  }

  const manual = new Map();
  for (const m of opts.maps) {
    const eq = m.indexOf('=');
    if (eq < 1) continue;
    manual.set(m.slice(0, eq), m.slice(eq + 1));
  }

  let listPrefix = opts.prefix || (siteSlug ? `${siteSlug}/` : '');
  if (!opts.single && !listPrefix) {
    console.error(`Refusing to list entire bucket without a prefix.
  • Add R2_SITE_SLUG to your local .env (e.g. deckmasters) if keys look like deckmasters/projects/...
  • Or pass an explicit list scope:
      npm run media:migrate-flat -- --prefix deckmasters/
      npm run media:migrate-flat -- --prefix projects/
  Cloudflare Pages env vars are not loaded here—only .env and your shell.`);
    process.exit(1);
  }

  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });

  let keys = [];
  if (opts.single) {
    keys = [opts.single];
  } else {
    keys = await listAllKeys(client, bucket, listPrefix);
  }

  const migrations = [];
  const destCounts = new Map();
  let fileObjectCount = 0;
  for (const key of keys) {
    if (!looksLikeFileObjectKey(key)) continue;
    fileObjectCount++;
    const dest = computeTargetKey(key, manual);
    if (dest !== key) {
      destCounts.set(dest, (destCounts.get(dest) ?? 0) + 1);
      if (destCounts.get(dest) > 1) {
        console.error(`Collision: multiple sources map to "${dest}". Use --map to disambiguate.`);
        process.exit(1);
      }
      migrations.push({ key, dest });
    }
  }

  if (migrations.length === 0) {
    console.log(
      fileObjectCount === 0
        ? `No file objects found under prefix "${listPrefix || '(none)'}" (${keys.length} keys total incl. folder placeholders). Try --prefix projects/ if assets live at bucket root without ${siteSlug ? `"${siteSlug}/"` : 'a site prefix'}.`
        : `No migrations needed: ${fileObjectCount} file object(s) under "${listPrefix}" already match the flat layout (source key === target key).`,
    );
    return;
  }

  console.log(opts.dryRun ? '[dry-run] Planned migrations:' : 'Executing migrations:');
  for (const { key, dest } of migrations) {
    console.log(`  ${key}\n    → ${dest}`);
  }

  if (opts.dryRun) {
    console.log('\nRe-run with --execute after verifying. Test one file first: --single <key> --execute');
    return;
  }

  for (const { key, dest } of migrations) {
    const headSrc = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    const size = headSrc.ContentLength;

    const copySource = `${bucket}/${key.split('/').map(encodeURIComponent).join('/')}`;
    await client.send(
      new CopyObjectCommand({
        Bucket: bucket,
        CopySource: copySource,
        Key: dest,
        MetadataDirective: 'COPY',
      }),
    );

    const headDest = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: dest }));
    if (headDest.ContentLength !== size) {
      throw new Error(`Verify failed: copied size ${headDest.ContentLength} !== source ${size} for ${dest}`);
    }

    await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
    console.log(`OK: ${key} → ${dest} (${size} bytes)`);
  }

  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
