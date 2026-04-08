/**
 * Zaraz Worker Variable: Email Hasher
 * ------------------------------------
 * Paste this into:
 *   Zaraz > Tools Configuration > Variables > Create Variable
 *   Type: Worker
 *
 * This hashes the user's email (collected from the form) using SHA-256
 * so it can be sent to Google Enhanced Conversions and Meta CAPI
 * without transmitting plain-text PII.
 *
 * Usage in Zaraz fields: {{ client.hashed_email }}
 * (set via zaraz.set("hashed_email", hashedValue) from your site)
 */

async function hashEmail(email) {
  const normalized = email.trim().toLowerCase();
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// This worker reads the raw email from the zaraz.track() event properties
// and returns the SHA-256 hash. Attach as a Worker Variable named "hashed_email".
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const email = url.searchParams.get("email") || "";
    if (!email) return new Response("", { status: 200 });
    const hashed = await hashEmail(email);
    return new Response(hashed, { status: 200 });
  },
};
