#!/usr/bin/env node
import 'dotenv/config';

/**
 * Copy objects from legacy bucket-root layout `projects/<client>/...`
 * to `<R2_SITE_SLUG>/<client>/...` so public URLs match Astro (e.g. deckmasters/keller/photo.webp).
 *
 * Use when media lived under `projects/...` without a site prefix and Pages uses R2_SITE_SLUG.
 *
 *   npm run media:backfill-site-prefix -- --dry-run
 *   npm run media:backfill-site-prefix -- --execute
 *
 * Optional: --delete-source after a verified copy (destructive).
 */
import process from 'node:process';
import {
  S3Client,
  ListObjectsV2Command,
  CopyObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

function looksLikeFileObjectKey(key) {
  const last = key.split('/').filter(Boolean).pop() ?? '';
  return last.includes('.') && !last.endsWith('/');
}

function parseArgs(argv) {
  const out = {
    dryRun: true,
    deleteSource: false,
    sourcePrefix: 'projects/',
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--execute') out.dryRun = false;
    if (a === '--dry-run') out.dryRun = true;
    if (a === '--delete-source') out.deleteSource = true;
    if (a === '--source-prefix') out.sourcePrefix = argv[++i] ?? 'projects/';
    if (a === '-h' || a === '--help') out.help = true;
  }
  return out;
}

function printHelp() {
  console.log(`
Usage: node scripts/r2-backfill-site-prefix.mjs [options]

  Copies projects/<client>/file → <R2_SITE_SLUG>/<client>/file (no path rewrite except prefix).

Options:
  --dry-run          List planned copies (default)
  --execute          Perform CopyObject + verify
  --delete-source    After successful copy, DeleteObject source (optional; destructive)
  --source-prefix P  Default: projects/

Environment: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME
             R2_SITE_SLUG (required, e.g. deckmasters)
`);
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
  if (!siteSlug) {
    console.error('R2_SITE_SLUG is required (e.g. deckmasters).');
    process.exit(1);
  }

  let sourcePrefix = opts.sourcePrefix;
  if (!sourcePrefix.endsWith('/')) sourcePrefix += '/';

  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });

  const keys = await listAllKeys(client, bucket, sourcePrefix);
  const jobs = [];

  for (const key of keys) {
    if (!looksLikeFileObjectKey(key)) continue;
    if (!key.startsWith(sourcePrefix)) continue;
    const remainder = key.slice(sourcePrefix.length);
    if (!remainder) continue;
    const dest = `${siteSlug}/${remainder}`;
    if (dest === key) continue;
    jobs.push({ key, dest });
  }

  if (jobs.length === 0) {
    console.log(`No file objects found under "${sourcePrefix}" (or nothing to copy).`);
    return;
  }

  console.log(opts.dryRun ? '[dry-run] Planned copies:' : 'Copying...');
  for (const { key, dest } of jobs) {
    console.log(`  ${key}\n    → ${dest}`);
  }

  if (opts.dryRun) {
    console.log(`\n${jobs.length} object(s). Re-run with --execute to copy.`);
    return;
  }

  for (const { key, dest } of jobs) {
    const headSrc = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    const size = headSrc.ContentLength ?? 0;

    let skipCopy = false;
    try {
      const headExisting = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: dest }));
      if (headExisting.ContentLength === size) {
        console.log(`Skip (already exists, same size): ${dest}`);
        skipCopy = true;
      }
    } catch {
      // destination missing
    }

    if (!skipCopy) {
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
        throw new Error(`Verify failed for ${dest}: size ${headDest.ContentLength} !== ${size}`);
      }
      console.log(`OK copy: ${key} → ${dest}`);
    }

    if (opts.deleteSource) {
      await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
      console.log(`Deleted source: ${key}`);
    }
  }

  console.log('\nDone. If you did not pass --delete-source, old keys under projects/ still exist (safe).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
