/**
 * POST /api/sale-webhook
 * ======================
 * Receives a sale notification from your CRM (or a manual trigger) and
 * returns an HTML snippet that fires the Zaraz sale_complete event.
 *
 * Expected JSON body:
 *   { "email": "customer@email.com", "value": 4500, "orderId": "JOB-123" }
 *
 * SECURITY: Requests must include the header:
 *   X-Webhook-Token: <value of SALE_WEBHOOK_TOKEN env var>
 *
 * Set SALE_WEBHOOK_TOKEN in Cloudflare Pages environment variables.
 *
 * Alternative: use the /sale-confirmed page for manual (non-CRM) sale recording.
 */

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const expectedToken = import.meta.env.SALE_WEBHOOK_TOKEN ?? "";
  const incomingToken = request.headers.get("x-webhook-token") ?? "";

  if (!expectedToken || incomingToken !== expectedToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await request.json().catch(() => null);

  if (!body?.email || body?.value == null || !body?.orderId) {
    return new Response(
      JSON.stringify({ error: "Missing required fields: email, value, orderId" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { email, value, orderId } = body as {
    email: string;
    value: number;
    orderId: string;
  };

  // Return an HTML page that fires the Zaraz sale event client-side.
  // Load this URL in a hidden iframe from your CRM, or redirect to it after payment.
  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Sale Confirmed</title></head>
<body>
<script type="module">
  import { trackSale } from "/src/lib/zaraz-tracking.ts";
  await trackSale(${JSON.stringify(email)}, ${Number(value)}, ${JSON.stringify(orderId)});
<\/script>
<p style="font-family:sans-serif;padding:2rem;">Sale recorded. You can close this window.</p>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
};
