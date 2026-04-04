#!/usr/bin/env node
import 'dotenv/config';

/**
 * Sync media/raw to Cloudflare R2 with flat keys: [<siteSlug>/]<clientSlug>/<kebab-file.ext>
 *
 * Local layouts (under --root, default media/raw):
 *   • <clientSlug>/<file> or nested dirs — everything under client flattens to one key per file
 *   • projects/<clientSlug>/... — legacy; same flattening (no projects/ or images/ or videos/ in keys)
 *
 * Requires .env: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME
 */
import { statSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { PutObjectCommand, S3Client, HeadObjectCommand } from '@aws-sdk/client-s3';
import { toKebabFilename } from './lib/r2-naming.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

function contentType(file) {
  const ext = path.extname(file).toLowerCase();
  const map = {
    '.avif': 'image/avif',
    '.webp': 'image/webp',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.mov': 'video/quicktime',
  };
  return map[ext] || 'application/octet-stream';
}

function parseArgs(argv) {
  const out = {
    root: path.join(ROOT, 'media', 'raw'),
    dryRun: false,
    force: false,
    onlyClient: '',
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--root') out.root = path.resolve(argv[++i]);
    else if (a === '--dry-run') out.dryRun = true;
    else if (a === '--force') out.force = true;
    else if (a === '--only') out.onlyClient = String(argv[++i] ?? '').trim().replace(/^\/+|\/+$/g, '');
    else if (a === '-h' || a === '--help') out.help = true;
  }
  return out;
}

function printHelp() {
  console.log(`
Usage: node scripts/media-upload-r2.mjs [options]

  Upload files under --root using flat R2 keys: [<siteSlug>/]<clientSlug>/<kebab-name.ext>

Options:
  --root       Local directory (default: media/raw)
  --dry-run    List changes without uploading
  --force      Overwrite existing files regardless of size/date
  --only       Only sync this client slug (folder name under raw or under raw/projects/)
  -h, --help   Show this help

Environment:
  R2_ACCOUNT_ID
  R2_ACCESS_KEY_ID
  R2_SECRET_ACCESS_KEY
  R2_BUCKET_NAME
  R2_SITE_SLUG   Optional; prefix all keys with <slug>/
`);
}

function toPosix(p) {
  return p.split(path.sep).join('/');
}

/**
 * From a path relative to upload root, derive client slug and flattened kebab filename.
 * Strips legacy "projects" segment; basename only in the key (subfolders like images/ are not in R2 path).
 */
function resolveClientAndKeyName(relPosix) {
  let parts = relPosix.split('/').filter(Boolean);
  if (parts.length < 2) return null;

  if (parts[0] === 'projects') {
    if (parts.length < 3) return null;
    parts = parts.slice(1);
  }

  const clientSlug = parts[0];
  const originalName = parts[parts.length - 1];
  const kebabName = toKebabFilename(originalName);
  return { clientSlug, kebabName };
}

async function walkFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walkFiles(full)));
    else if (e.isFile()) files.push(full);
  }
  return files;
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

  if (!opts.dryRun && (!accountId || !accessKeyId || !secretAccessKey || !bucket)) {
    console.error('Missing R2 env variables.');
    process.exit(1);
  }

  let localFiles;
  try {
    localFiles = await walkFiles(opts.root);
  } catch {
    console.error(`Cannot read --root: ${opts.root}`);
    process.exit(1);
  }

  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });

  /** @type {Map<string, string>} key -> first source path (collision detection) */
  const keySources = new Map();

  const planned = [];
  for (const abs of localFiles.sort()) {
    const rel = path.relative(opts.root, abs);
    const relPosix = toPosix(rel);
    const resolved = resolveClientAndKeyName(relPosix);
    if (!resolved) {
      console.warn(`Skip (need at least client/file): ${relPosix}`);
      continue;
    }
    let { clientSlug, kebabName } = resolved;
    if (opts.onlyClient && clientSlug !== opts.onlyClient) continue;

    let key = `${clientSlug}/${kebabName}`;
    if (siteSlug) key = `${siteSlug}/${key}`;

    if (keySources.has(key) && keySources.get(key) !== abs) {
      console.error(
        `Duplicate R2 key "${key}" from:\n  ${keySources.get(key)}\n  ${abs}\nRename one locally or use different basenames.`,
      );
      process.exit(1);
    }
    keySources.set(key, abs);
    planned.push({ abs, key, relPosix });
  }

  let uploaded = 0;
  let skipped = 0;

  for (const { abs, key, relPosix } of planned) {
    const ct = contentType(abs);
    const localStat = statSync(abs);

    if (!opts.force) {
      try {
        const remote = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
        if (remote.ContentLength === localStat.size) {
          skipped++;
          continue;
        }
      } catch {
        // Not found, proceed with upload
      }
    }

    if (opts.dryRun) {
      console.log(`[dry-run] ${relPosix} → ${key} (${formatBytes(localStat.size)})`);
      uploaded++;
      continue;
    }

    const body = await fs.readFile(abs);
    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: ct,
        CacheControl: 'public, max-age=31536000, immutable',
      }),
    );

    console.log(`↑ ${relPosix} → ${key} (${formatBytes(localStat.size)})`);
    uploaded++;
  }

  console.log(`\nDone. Synced: ${uploaded}, skipped (up-to-date): ${skipped}`);
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

main().catch(console.error);
