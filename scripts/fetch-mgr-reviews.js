/**
 * Fetches all reviews from More Good Reviews (Beacon API) and writes src/data/reviews.json.
 * Run automatically before astro build when MGR_API_KEY is set (e.g. Cloudflare Pages build).
 * Locally: node --env-file=.env scripts/fetch-mgr-reviews.js
 *
 * Preserves curated entries that include videoUrl / videoThumbnailUrl (site-hosted testimonials).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT_PATH = path.join(ROOT, 'src/data/reviews.json');
const API_BASE = 'https://api.moregoodreviews.com/beacon/reviews/';

function formatDate(unixSec) {
  if (unixSec == null || unixSec === '') return '';
  const n = Number(unixSec);
  if (!Number.isFinite(n)) return '';
  const d = new Date(n * 1000);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().replace('T', ' ').slice(0, 19);
}

const MAX_REVIEW_IMAGES = 6;

/** Skip non-photo URLs sometimes embedded in API payloads (rating emoji assets, etc.). */
function isLikelyPhotoUrl(u) {
  if (!u || typeof u !== 'string') return false;
  if (!/^https?:\/\//i.test(u.trim())) return false;
  const s = u.toLowerCase();
  if (s.includes('/img/face-') && s.includes('customers.stokeleads.com')) return false;
  return true;
}

function pushUniquePhotoUrl(out, url) {
  const u = typeof url === 'string' ? url.trim() : '';
  if (!isLikelyPhotoUrl(u) || out.includes(u)) return;
  out.push(u);
  if (out.length >= MAX_REVIEW_IMAGES) return true;
  return false;
}

function collectPhotoUrlsFromValue(val, out) {
  if (out.length >= MAX_REVIEW_IMAGES) return;
  if (val == null) return;
  if (typeof val === 'string') {
    pushUniquePhotoUrl(out, val);
    return;
  }
  if (Array.isArray(val)) {
    for (const item of val) {
      collectPhotoUrlsFromValue(item, out);
      if (out.length >= MAX_REVIEW_IMAGES) return;
    }
    return;
  }
  if (typeof val === 'object') {
    for (const k of ['link', 'url', 'src', 'href', 'file_url', 'photo_url', 'path']) {
      if (typeof val[k] === 'string') pushUniquePhotoUrl(out, val[k]);
      if (out.length >= MAX_REVIEW_IMAGES) return;
    }
    for (const k of Object.keys(val)) {
      if (['link', 'url', 'src', 'href'].includes(k)) continue;
      collectPhotoUrlsFromValue(val[k], out);
      if (out.length >= MAX_REVIEW_IMAGES) return;
    }
  }
}

/**
 * Review-level photos (separate from reviewer avatar). Shape varies by MGR version / field config.
 */
function extractReviewImages(row) {
  const out = [];
  if (Array.isArray(row?.photos)) collectPhotoUrlsFromValue(row.photos, out);
  if (Array.isArray(row?.images)) collectPhotoUrlsFromValue(row.images, out);
  if (Array.isArray(row?.attachments)) collectPhotoUrlsFromValue(row.attachments, out);
  if (Array.isArray(row?.media)) collectPhotoUrlsFromValue(row.media, out);
  if (Array.isArray(row?.fields)) {
    for (const f of row.fields) {
      if (out.length >= MAX_REVIEW_IMAGES) break;
      collectPhotoUrlsFromValue(f?.value, out);
      collectPhotoUrlsFromValue(f?.values, out);
      collectPhotoUrlsFromValue(f?.files, out);
      collectPhotoUrlsFromValue(f?.attachments, out);
      collectPhotoUrlsFromValue(f?.photos, out);
    }
  }
  return out;
}

function mapRow(row) {
  if (!row || row.is_hidden || row.is_duplicate) return null;
  const rating = Number(row.score ?? row.rating?.score ?? 0);
  const images = extractReviewImages(row);
  return {
    date: formatDate(row.created_at),
    text: String(row.review ?? '').trim(),
    author: row.reviewer?.name?.trim() || 'Anonymous',
    rating: Number.isFinite(rating) ? rating : 0,
    source: row.source?.name?.trim() || 'Google',
    avatarUrl: row.reviewer?.photo?.link?.trim() || '',
    ...(images.length > 0 ? { images } : {}),
  };
}

async function fetchAllReviews(apiKey) {
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    Accept: 'application/json',
  };
  let url = `${API_BASE}?per_page=100`;
  const all = [];

  while (url) {
    const res = await fetch(url, { headers });
    const text = await res.text();
    if (!res.ok) {
      throw new Error(`MGR API ${res.status}: ${text.slice(0, 500)}`);
    }
    let body;
    try {
      body = JSON.parse(text);
    } catch {
      throw new Error('MGR API returned non-JSON');
    }
    if (!body.success) {
      throw new Error(`MGR API error: ${text.slice(0, 500)}`);
    }
    const chunk = Array.isArray(body.data) ? body.data : [];
    all.push(...chunk);
    url = body.pagination?.next_page_url || null;
  }

  return all;
}

function readCuratedVideos() {
  try {
    const raw = fs.readFileSync(OUT_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    const list = Array.isArray(parsed.rawReviews) ? parsed.rawReviews : [];
    return list.filter((r) => r && (r.videoUrl || r.videoThumbnailUrl));
  } catch {
    return [];
  }
}

/** Load project `.env` when vars are not already set (Cloudflare sets MGR_API_KEY in the dashboard). */
function loadLocalEnvFile() {
  try {
    const p = path.join(ROOT, '.env');
    if (!fs.existsSync(p)) return;
    const text = fs.readFileSync(p, 'utf8');
    for (const line of text.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const k = trimmed.slice(0, eq).trim();
      let v = trimmed.slice(eq + 1).trim();
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      ) {
        v = v.slice(1, -1);
      }
      if (process.env[k] === undefined) process.env[k] = v;
    }
  } catch {
    /* ignore */
  }
}

async function main() {
  loadLocalEnvFile();
  const key = process.env.MGR_API_KEY?.trim();
  if (!key) {
    console.warn('fetch-mgr-reviews: MGR_API_KEY not set; skipping (keeping existing reviews.json)');
    return;
  }

  const curated = readCuratedVideos();
  const rows = await fetchAllReviews(key);
  const mapped = rows.map(mapRow).filter(Boolean);
  const out = { rawReviews: [...mapped, ...curated] };

  fs.writeFileSync(OUT_PATH, `${JSON.stringify(out, null, 2)}\n`, 'utf8');
  console.log(
    `fetch-mgr-reviews: wrote ${mapped.length} from MGR + ${curated.length} curated video row(s) → src/data/reviews.json`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
