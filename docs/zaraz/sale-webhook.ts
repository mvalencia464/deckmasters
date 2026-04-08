/**
 * src/pages/api/sale-webhook.ts
 * ==============================
 * Astro API endpoint that receives a sale notification from your CRM
 * (or manual trigger when a job is won) and renders a tracking pixel
 * response that fires the Zaraz sale_complete event.
 *
 * Your CRM sends:  POST /api/sale-webhook  { email, value, orderId }
 *
 * SECURITY: Requests must include:
 *   X-Webhook-Token: <value of SALE_WEBHOOK_TOKEN env var>
 *
 * Alternative approach: If your CRM can't hit a webhook, create a
 * "Sale Confirmed" page in your Astro site and redirect the customer
 * there after payment — then fire trackSale() client-side on that page.
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

  // Return an HTML snippet that fires the Zaraz sale event client-side.
  // Embed this in a redirect page or load it in an invisible iframe from your CRM.
  const html = `
<!DOCTYPE html>
<html>
<head><title>Sale Confirmed</title></head>
<body>
<script type="module">
  import { trackSale } from "/src/lib/zaraz-tracking.ts";
  await trackSale(
    ${JSON.stringify(body.email)},
    ${Number(body.value)},
    ${JSON.stringify(body.orderId)}
  );
<\/script>
<p style="font-family:sans-serif;padding:2rem;">Sale recorded. You can close this window.</p>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
};

/**
 * SIMPLER ALTERNATIVE: Thank-You Page Approach
 * --------------------------------------------
 * If you close sales manually (phone/in-person), create a protected
 * /sale-confirmed?email=X&value=Y&order=Z page and navigate to it
 * after marking the job won in your CRM. The page fires trackSale()
 * and shows a confirmation message.
 *
 * See SaleConfirmed.astro for that pattern.
 */
