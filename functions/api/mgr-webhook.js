/**
 * POST /api/mgr-webhook
 * More Good Reviews → optional JSON body scan → Cloudflare Pages deploy hook.
 *
 * MGR typically exposes reviewer avatars in API data, not Google customer review-photo attachments.
 * `mgrWebhookMediaScan` is still logged for debugging / if payloads gain extra media keys later.
 *
 * Env:
 *   MGR_WEBHOOK_SECRET — header X-Webhook-Secret or Authorization: Bearer …
 *   CLOUDFLARE_PAGES_DEPLOY_HOOK_URL
 */
function secureCompare(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || !a || !b) return false;
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

function getProvidedSecret(request) {
  const header = request.headers.get('X-Webhook-Secret')?.trim();
  if (header) return header;
  const auth = request.headers.get('Authorization')?.trim();
  if (auth?.startsWith('Bearer ')) return auth.slice(7).trim();
  return '';
}

const MEDIA_KEY_RE =
  /^(images|media|photos|attachments|files|gallery|gallery_images|review_images|review_photos)$/i;

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

/** Best-effort: find reviewer avatar URL anywhere in webhook JSON. */
function findReviewerAvatarUrl(obj) {
  let found = '';
  (function walk(v) {
    if (found || v == null) return;
    if (typeof v === 'object' && !Array.isArray(v)) {
      const link = v.reviewer?.photo?.link;
      if (typeof link === 'string' && /^https?:\/\//i.test(link)) {
        found = link.trim();
        return;
      }
      for (const x of Object.values(v)) walk(x);
    } else if (Array.isArray(v)) {
      for (const x of v) walk(x);
    }
  })(obj);
  return found;
}

/**
 * Same rules as scripts/test-mgr-review-payload.js — media keys and image-like URLs
 * (excluding author avatar & MGR rating “face” assets).
 */
function scanMgrPayloadForMedia(obj, authorAvatarUrl) {
  const mediaKeyPaths = [];
  const imageLikeSamples = [];
  const maxSamples = 24;

  function visit(value, pathStr) {
    if (value == null) return;
    if (typeof value === 'string') {
      const t = value.trim();
      if (
        isImageLikeString(t) &&
        !isAvatarOrRatingFaceUrl(t, authorAvatarUrl) &&
        imageLikeSamples.length < maxSamples
      ) {
        imageLikeSamples.push(`${pathStr}=${t.slice(0, 240)}`);
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
        if (MEDIA_KEY_RE.test(k) && mediaKeyPaths.length < 40) mediaKeyPaths.push(next);
        visit(v, next);
      }
    }
  }

  visit(obj, 'body');
  return { mediaKeyPaths, imageLikeSamples };
}

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'GET') {
    return new Response('MGR reviews webhook', {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const expected = env.MGR_WEBHOOK_SECRET?.trim();
  if (!expected) {
    return new Response(JSON.stringify({ success: false, error: 'MGR_WEBHOOK_SECRET not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const provided = getProvidedSecret(request);
  if (!provided || !secureCompare(provided, expected)) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const hookUrl = env.CLOUDFLARE_PAGES_DEPLOY_HOOK_URL?.trim();
  if (!hookUrl) {
    return new Response(JSON.stringify({ success: false, error: 'CLOUDFLARE_PAGES_DEPLOY_HOOK_URL not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let webhookSummary = null;
  try {
    const raw = await request.text();
    const ct = request.headers.get('content-type') || '';
    const looksJson =
      ct.includes('application/json') ||
      ct.includes('application/vnd.api+json') ||
      (raw.trim().startsWith('{') && raw.trim().endsWith('}')) ||
      (raw.trim().startsWith('[') && raw.trim().endsWith(']'));

    if (looksJson && raw.trim()) {
      try {
        const body = JSON.parse(raw);
        const avatar = findReviewerAvatarUrl(body);
        const scan = scanMgrPayloadForMedia(body, avatar);
        const topKeys = body && typeof body === 'object' && !Array.isArray(body) ? Object.keys(body) : [];
        webhookSummary = {
          topLevelKeys: topKeys.slice(0, 40),
          reviewerAvatarDetected: avatar || null,
          mediaKeyPaths: scan.mediaKeyPaths,
          imageLikeStringsSample: scan.imageLikeSamples,
        };
        console.log(JSON.stringify({ mgrWebhookMediaScan: webhookSummary }));
      } catch {
        console.log(
          JSON.stringify({
            mgrWebhookMediaScan: { parseError: 'JSON parse failed', rawLength: raw.length },
          })
        );
      }
    } else {
      console.log(
        JSON.stringify({
          mgrWebhookMediaScan: {
            skipped: true,
            reason: 'Not treated as JSON body or empty',
            contentType: ct || '(missing)',
            rawLength: raw.length,
          },
        })
      );
    }
  } catch (e) {
    console.log(JSON.stringify({ mgrWebhookMediaScan: { readError: String(e) } }));
  }

  try {
    const hookRes = await fetch(hookUrl, { method: 'POST' });
    if (!hookRes.ok) {
      const snippet = (await hookRes.text()).slice(0, 200);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Deploy hook request failed',
          status: hookRes.status,
          detail: snippet,
          mgrWebhookMediaScan: webhookSummary,
        }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, redeploy: 'triggered', mgrWebhookMediaScan: webhookSummary }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: String(err), mgrWebhookMediaScan: webhookSummary }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
