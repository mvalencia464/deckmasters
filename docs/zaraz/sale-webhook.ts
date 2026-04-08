/**
 * src/pages/api/sale-webhook.ts
 * ==============================
 * Astro API endpoint that receives a sale notification from your CRM
 * (or manual trigger when a job is won) and renders a tracking pixel
 * response that fires the Zaraz sale_complete event.
 *
 * Your CRM sends:  POST /api/sale-webhook  { email, value, orderId }
 *
 * SECURITY: Add a shared secret header check before deploying.
 *
 * Alternative approach: If your CRM can't hit a webhook, create a
 * "Sale Confirmed" page in your Astro site and redirect the customer
 * there after payment — then fire trackSale() client-side on that page.
 */

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null);

  if (!body?.email || !body?.value || !body?.orderId) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
    });
  }

  // Return an HTML snippet that fires the Zaraz sale event client-side.
  // Embed this in a redirect page or load it in an invisible iframe from your CRM.
  const html = `
<!DOCTYPE html>
<html>
<head><title>Sale Confirmed</title></head>
<body>
<script type="module">
  import { trackSale } from "/zaraz-tracking.js";
  await trackSale(
    ${JSON.stringify(body.email)},
    ${Number(body.value)},
    ${JSON.stringify(body.orderId)}
  );
  // Optional: redirect to thank-you page
  // window.location.href = "/thank-you";
<\/script>
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
