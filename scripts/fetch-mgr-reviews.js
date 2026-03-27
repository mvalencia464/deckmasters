/**
 * Fetches all reviews from More Good Reviews (Beacon API) and writes src/data/reviews.json.
 * Run automatically before astro build when MGR_API_KEY is set (e.g. Cloudflare Pages build).
 * Locally: node --env-file=.env scripts/fetch-mgr-reviews.js
 *
 * Media:
 * - Avatar: from MGR `reviewer.photo.link`.
 * - Project photos (`images[]` with local filenames under src/assets/review-images): MGR does not sync
 *   Google customer photo attachments. We re-attach them from:
 *   (1) `src/data/manual-matches.json` (explicit mgrReviewId -> optional `avatarUrl` local filename
 *       under src/assets/avatars, and/or `images` list), then
 *   (2) `src/data/google-reviews.json` fuzzy match (normalized author + rating + full review text).
 *
 * Preserves curated entries that include videoUrl / videoThumbnailUrl (site-hosted testimonials).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT_PATH = path.join(ROOT, 'src/data/reviews.json');
const LEGACY_GOOGLE_REVIEWS_PATH = path.join(ROOT, 'src/data/google-reviews.json');
const MANUAL_MATCHES_PATH = path.join(ROOT, 'src/data/manual-matches.json');
const API_BASE = 'https://api.moregoodreviews.com/beacon/reviews/';

function formatDate(unixSec) {
  if (unixSec == null || unixSec === '') return '';
  const n = Number(unixSec);
  if (!Number.isFinite(n)) return '';
  const d = new Date(n * 1000);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().replace('T', ' ').slice(0, 19);
}

/** Stable join key: legacy google-reviews.json has no MGR id — match on identity fields. */
function normalizeMatchPart(s) {
  return String(s ?? '')
    .toLowerCase()
    .replace(/\r\n/g, '\n')
    .replace(/[\s\u00a0]+/g, ' ')
    .replace(/[\u2018\u2019\u201c\u201d]/g, "'")
    .trim();
}

function legacyReviewMatchKey({ author, text, rating }) {
  return `${normalizeMatchPart(author)}|${Number(rating)}|${normalizeMatchPart(text)}`;
}

/**
 * Maps normalized text -> images[] from DataForSEO export. First row wins on duplicate keys; logs once.
 */
function loadLegacyImagesByMatchKey() {
  /** @type {Map<string, string[]>} */
  const map = new Map();
  let duplicateKeys = 0;
  try {
    if (!fs.existsSync(LEGACY_GOOGLE_REVIEWS_PATH)) return { map, duplicateKeys };
    const raw = fs.readFileSync(LEGACY_GOOGLE_REVIEWS_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    const list = Array.isArray(parsed.rawReviews) ? parsed.rawReviews : [];
    for (const r of list) {
      if (!r || !Array.isArray(r.images) || r.images.length === 0) continue;
      const key = legacyReviewMatchKey({
        author: r.author,
        text: r.text,
        rating: r.rating,
      });
      if (map.has(key)) {
        duplicateKeys++;
        continue;
      }
      map.set(key, r.images.filter((x) => typeof x === 'string' && x.trim()));
    }
  } catch (e) {
    console.warn('fetch-mgr-reviews: could not load legacy google-reviews.json for images:', e.message);
  }
  return { map, duplicateKeys };
}

function loadManualMatchesByMgrId() {
  /** @type {Map<string, { images: string[]; avatarUrl?: string }>} */
  const map = new Map();
  try {
    if (!fs.existsSync(MANUAL_MATCHES_PATH)) return map;
    const raw = fs.readFileSync(MANUAL_MATCHES_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    const list = Array.isArray(parsed.matches) ? parsed.matches : [];
    for (const item of list) {
      const mgrReviewId = String(item?.mgrReviewId ?? '').trim();
      const images = Array.isArray(item?.images)
        ? item.images.filter((x) => typeof x === 'string' && x.trim())
        : [];
      const avatarRaw = item?.avatarUrl;
      const avatarUrl =
        typeof avatarRaw === 'string' && avatarRaw.trim() ? avatarRaw.trim() : undefined;
      if (!mgrReviewId || (images.length === 0 && !avatarUrl)) continue;
      map.set(mgrReviewId, { images, ...(avatarUrl ? { avatarUrl } : {}) });
    }
  } catch (e) {
    console.warn('fetch-mgr-reviews: could not load manual-matches.json overrides:', e.message);
  }
  return map;
}

function mapRow(row, manualMatchesByMgrId, legacyImagesByKey) {
  if (!row || row.is_hidden || row.is_duplicate) return null;
  const rating = Number(row.score ?? row.rating?.score ?? 0);
  const author = row.reviewer?.name?.trim() || 'Anonymous';
  const text = String(row.review ?? '').trim();
  const mgrReviewId = String(row.id ?? '').trim();
  const base = {
    mgrReviewId,
    date: formatDate(row.created_at),
    text,
    author,
    rating: Number.isFinite(rating) ? rating : 0,
    source: row.source?.name?.trim() || 'Google',
    avatarUrl: row.reviewer?.photo?.link?.trim() || '',
  };
  const manual = manualMatchesByMgrId.get(mgrReviewId);
  let out = { ...base };
  if (manual?.avatarUrl) {
    out = { ...out, avatarUrl: manual.avatarUrl };
  }
  if (manual?.images?.length) {
    out = { ...out, images: manual.images };
  } else {
    const key = legacyReviewMatchKey(base);
    const legacyImages = legacyImagesByKey.get(key);
    if (legacyImages?.length) {
      out = { ...out, images: legacyImages };
    }
  }
  return out;
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
  const manualMatchesByMgrId = loadManualMatchesByMgrId();
  const { map: legacyImagesByKey, duplicateKeys } = loadLegacyImagesByMatchKey();
  if (duplicateKeys > 0) {
    console.warn(
      `fetch-mgr-reviews: ${duplicateKeys} duplicate legacy match keys in google-reviews.json (skipped extras)`
    );
  }
  const rows = await fetchAllReviews(key);
  const mapped = rows.map((r) => mapRow(r, manualMatchesByMgrId, legacyImagesByKey)).filter(Boolean);
  let withImages = 0;
  let withManualImages = 0;
  for (const r of mapped) {
    if (Array.isArray(r.images) && r.images.length > 0) {
      withImages++;
      const m = manualMatchesByMgrId.get(String(r.mgrReviewId ?? ''));
      if (m?.images?.length) withManualImages++;
    }
  }
  const out = { rawReviews: [...mapped, ...curated] };

  fs.writeFileSync(OUT_PATH, `${JSON.stringify(out, null, 2)}\n`, 'utf8');
  console.log(
    `fetch-mgr-reviews: wrote ${mapped.length} from MGR (${withImages} with project images, ${withManualImages} from manual override map) + ${curated.length} curated video row(s) → src/data/reviews.json`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
