/**
 * Dump one More Good Reviews review object from GET /beacon/reviews/
 * and scan for media-related keys / image-like URLs (excluding author avatar & rating face assets).
 *
 * Expectation: MGR syncs reviewer avatar URLs only, not Google customer-uploaded review photos.
 * This script (and the webhook scan) are for debugging / future API changes or webhook-only fields.
 *
 * Usage:
 *   node --env-file=.env scripts/test-mgr-review-payload.js           # first review on page 1
 *   node --env-file=.env scripts/test-mgr-review-payload.js 372807  # by numeric id (scans pages)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const API_LIST = 'https://api.moregoodreviews.com/beacon/reviews/';

/** Plural / collection keys only — avoid `reviewer.photo` (avatar). */
const MEDIA_KEY_RE =
  /^(images|media|photos|attachments|files|gallery|gallery_images|review_images|review_photos)$/i;

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

function isAvatarOrRatingFaceUrl(u, authorAvatarUrl) {
  const s = String(u).trim();
  if (!s) return false;
  if (authorAvatarUrl && s === String(authorAvatarUrl).trim()) return true;
  if (/customers\.stokeleads\.com\/img\/face-/i.test(s)) return true;
  return false;
}

function isImageLikeString(s) {
  return /\.(jpe?g|png|webp|avif|gif)(\?|#|$)/i.test(String(s).trim());
}

/**
 * @param {unknown} obj
 * @param {string} [authorAvatarUrl]
 */
function scanPayload(obj, authorAvatarUrl = '') {
  /** @type {{ path: string, key?: string, hint: string }[]} */
  const mediaKeyHits = [];
  /** @type {{ path: string, value: string }[]} */
  const imageLikeStrings = [];

  function visit(value, pathStr) {
    if (value == null) return;
    if (typeof value === 'string') {
      const t = value.trim();
      if (isImageLikeString(t) && !isAvatarOrRatingFaceUrl(t, authorAvatarUrl)) {
        imageLikeStrings.push({ path: pathStr, value: t.slice(0, 800) });
      }
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item, i) => visit(item, `${pathStr}[${i}]`));
      return;
    }
    if (typeof value === 'object') {
      for (const [k, v] of Object.entries(value)) {
        const next = pathStr ? `${pathStr}.${k}` : k;
        if (MEDIA_KEY_RE.test(k)) {
          const hint =
            v == null
              ? 'null'
              : Array.isArray(v)
                ? `array(len=${v.length})`
                : typeof v === 'object'
                  ? `object(keys=${Object.keys(v).slice(0, 8).join(',')}${Object.keys(v).length > 8 ? '…' : ''})`
                  : String(v).slice(0, 120);
          mediaKeyHits.push({ path: next, key: k, hint });
        }
        visit(v, next);
      }
    }
  }

  visit(obj, 'root');
  return { mediaKeyHits, imageLikeStrings };
}

function pickAuthorAvatarUrl(review) {
  const link = review?.reviewer?.photo?.link;
  return typeof link === 'string' ? link.trim() : '';
}

async function fetchAllPages(apiKey) {
  const headers = { Authorization: `Bearer ${apiKey}`, Accept: 'application/json' };
  let url = `${API_LIST}?per_page=100`;
  const rows = [];
  while (url) {
    const res = await fetch(url, { headers });
    const text = await res.text();
    if (!res.ok) throw new Error(`MGR ${res.status}: ${text.slice(0, 400)}`);
    const body = JSON.parse(text);
    if (!body.success) throw new Error(text.slice(0, 400));
    rows.push(...(Array.isArray(body.data) ? body.data : []));
    url = body.pagination?.next_page_url || null;
  }
  return rows;
}

async function main() {
  loadLocalEnvFile();
  const apiKey = process.env.MGR_API_KEY?.trim();
  if (!apiKey) {
    console.error('Set MGR_API_KEY (e.g. in .env) or export it.');
    process.exit(1);
  }

  const idArg = process.argv[2]?.trim();
  const wantId = idArg && /^\d+$/.test(idArg) ? Number(idArg) : null;

  let review = null;
  if (wantId) {
    const rows = await fetchAllPages(apiKey);
    review = rows.find((r) => r.id === wantId) || null;
    if (!review) {
      console.error(`No review with id=${wantId} found across ${rows.length} rows.`);
      process.exit(2);
    }
  } else {
    const res = await fetch(`${API_LIST}?per_page=1`, {
      headers: { Authorization: `Bearer ${apiKey}`, Accept: 'application/json' },
    });
    const text = await res.text();
    if (!res.ok) throw new Error(`MGR ${res.status}: ${text.slice(0, 400)}`);
    const body = JSON.parse(text);
    review = body.data?.[0] || null;
    if (!review) {
      console.error('Empty data from MGR.');
      process.exit(2);
    }
  }

  const avatarUrl = pickAuthorAvatarUrl(review);
  const scan = scanPayload(review, avatarUrl);

  console.log('=== Full review JSON (single object) ===\n');
  console.log(JSON.stringify(review, null, 2));
  console.log('\n=== Media / image scan ===\n');
  console.log(
    JSON.stringify(
      {
        reviewId: review.id,
        authorAvatarUrl: avatarUrl || '(none)',
        mediaKeyHits: scan.mediaKeyHits,
        imageLikeStringsExcludingAvatarAndRatingFaces: scan.imageLikeStrings,
      },
      null,
      2
    )
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
