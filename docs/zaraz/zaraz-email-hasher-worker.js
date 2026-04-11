/**
 * Cloudflare Worker for Zaraz Worker Variable: hashed_email
 * ----------------------------------------------------------
 * Zaraz does NOT let you paste Worker code in the Variables screen. You must:
 *   1. Deploy this script as a Worker (Workers & Pages → Create → paste → Deploy).
 *   2. Zaraz → Tag setup → Variables → Create variable → Type: Worker → pick that Worker.
 *
 * Zaraz calls this Worker with POST + JSON body `{ system, client }` (Zaraz Context).
 * The response body becomes the variable value for `{{ client.hashed_email }}` in tools.
 *
 * Site code (`src/lib/zaraz-tracking.ts`) sets `zaraz.set("hashed_email", sha256hex)` after
 * hashing in the browser. This Worker returns that value when present; otherwise hashes
 * `client.email` if you send a plain email on an event.
 *
 * @see https://developers.cloudflare.com/zaraz/variables/worker-variables/
 */

async function hashEmail(email) {
  const normalized = String(email).trim().toLowerCase();
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function looksLikeSha256Hex(s) {
  return typeof s === "string" && /^[a-f0-9]{64}$/i.test(s);
}

export default {
  async fetch(request) {
    try {
      const body = await request.json();
      const client = body?.client ?? {};

      // Already set by the site via zaraz.set("hashed_email", …)
      if (client.hashed_email && looksLikeSha256Hex(client.hashed_email)) {
        return new Response(client.hashed_email, { status: 200 });
      }

      if (client.hashed_email && typeof client.hashed_email === "string") {
        return new Response(client.hashed_email.trim(), { status: 200 });
      }

      if (client.email && typeof client.email === "string") {
        const hashed = await hashEmail(client.email);
        return new Response(hashed, { status: 200 });
      }

      return new Response("", { status: 200 });
    } catch {
      return new Response("", { status: 200 });
    }
  },
};
