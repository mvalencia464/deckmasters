/**
 * POST /api/mgr-webhook
 * More Good Reviews → triggers a Cloudflare Pages production deploy (refresh reviews at build).
 *
 * Env (Cloudflare Pages → Settings → Environment variables):
 *   MGR_WEBHOOK_SECRET — shared secret; send same value in header X-Webhook-Secret
 *   CLOUDFLARE_PAGES_DEPLOY_HOOK_URL — full POST URL from Pages → Deploy hooks
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
        }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ success: true, redeploy: 'triggered' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: String(err) }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
