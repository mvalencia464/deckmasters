/**
 * zaraz-tracking.ts
 * =================
 * Typed helpers for every conversion event on deckmastersak.com.
 * All events route through Cloudflare Zaraz, which forwards to
 * GA4, Google Ads, and Meta Pixel.
 *
 * Zaraz is injected automatically by Cloudflare — no <script> tag needed.
 *
 * USAGE:
 *   import { trackFormLead, trackPhoneClick, trackSale } from "@/lib/zaraz-tracking";
 */

declare global {
  interface Window {
    zaraz?: {
      track: (event: string, properties?: Record<string, unknown>) => void;
      set: (key: string, value: unknown) => void;
      ecommerce: (event: string, properties?: Record<string, unknown>) => void;
    };
  }
}

/**
 * SHA-256 hash an email address for enhanced conversions.
 * Runs client-side — email never leaves the browser in plain text.
 */
async function hashEmail(email: string): Promise<string> {
  const normalized = email.trim().toLowerCase();
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Set the hashed email so all subsequent Zaraz events carry it.
 * Call this as early as possible after you know the user's email.
 */
export async function setUserEmail(email: string) {
  if (typeof window === "undefined" || !window.zaraz) return;
  const hashed = await hashEmail(email);
  window.zaraz.set("hashed_email", hashed);
}

/**
 * Track a phone number click (tel: link).
 * Wired automatically to all tel: links via autoTrackPhoneLinks().
 */
export function trackPhoneClick(email?: string) {
  if (typeof window === "undefined" || !window.zaraz) return;
  const fire = () =>
    window.zaraz!.track("phone_click", {
      event_category: "contact",
      event_label: "phone_link",
    });

  if (email) {
    setUserEmail(email).then(fire);
  } else {
    fire();
  }
}

/**
 * Track a contact/quote form submission as a lead.
 * Call this inside the form's submit handler AFTER you have the email,
 * before (or alongside) the fetch to /api/submit-quote.
 */
export async function trackFormLead(email: string, name?: string) {
  if (typeof window === "undefined" || !window.zaraz) return;
  await setUserEmail(email);
  window.zaraz.track("form_submit", {
    event_category: "lead",
    event_label: "quote_form",
    lead_name: name ?? "",
  });
}

/**
 * Track a completed sale.
 * Called from the /sale-confirmed page or a CRM webhook response.
 *
 * @param email    Customer email (will be hashed)
 * @param value    Sale value in USD (e.g. 4500)
 * @param orderId  Internal job/order ID for deduplication
 */
export async function trackSale(
  email: string,
  value: number,
  orderId: string
) {
  if (typeof window === "undefined" || !window.zaraz) return;
  await setUserEmail(email);
  window.zaraz.track("sale_complete", {
    sale_value: value,
    currency: "USD",
    order_id: orderId,
    event_category: "ecommerce",
  });
}

/**
 * Attach phone-click tracking to every tel: link on the page.
 * Called once from Layout.astro on DOMContentLoaded.
 */
export function autoTrackPhoneLinks() {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]').forEach((link) => {
    link.addEventListener("click", () => trackPhoneClick());
  });
}
