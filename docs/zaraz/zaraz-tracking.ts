/**
 * zaraz-tracking.ts
 * =================
 * Drop this file into your Astro project at: src/lib/zaraz-tracking.ts
 *
 * This module provides typed helpers for every conversion event on
 * deckmastersak.com. All events route through Cloudflare Zaraz, which
 * then forwards to GA4, Google Ads, and Meta Pixel.
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
  if (!window.zaraz) return;
  const hashed = await hashEmail(email);
  window.zaraz.set("hashed_email", hashed);
}

/**
 * Track a phone number click (tel: link).
 * Wire to an onclick on your phone anchor tags.
 *
 * Example:
 *   <a href="tel:+19075550100" onclick="window.trackPhoneClick?.()">
 */
export function trackPhoneClick(email?: string) {
  if (!window.zaraz) return;
  const fire = () =>
    window.zaraz!.track("phone_click", {
      event_category: "contact",
      event_label: "header_phone",
    });

  if (email) {
    setUserEmail(email).then(fire);
  } else {
    fire();
  }
}

/**
 * Track a contact form submission as a lead.
 * Call this inside your form's submit handler AFTER you have the email.
 *
 * Example:
 *   const handleSubmit = async (e) => {
 *     e.preventDefault();
 *     await trackFormLead(formData.email, formData.name);
 *     // then submit to your backend
 *   };
 */
export async function trackFormLead(email: string, name?: string) {
  if (!window.zaraz) return;
  await setUserEmail(email);
  window.zaraz.track("form_submit", {
    event_category: "lead",
    event_label: "contact_form",
    lead_name: name || "",
  });
}

/**
 * Track a completed sale.
 * Call this from your CRM webhook handler or a thank-you page
 * that receives sale confirmation data.
 *
 * @param email    Customer email (will be hashed)
 * @param value    Sale value in USD (e.g. 4500)
 * @param orderId  Your internal job/order ID for deduplication
 */
export async function trackSale(
  email: string,
  value: number,
  orderId: string
) {
  if (!window.zaraz) return;
  await setUserEmail(email);
  window.zaraz.track("sale_complete", {
    sale_value: value,
    currency: "USD",
    order_id: orderId,
    event_category: "ecommerce",
  });
}

/**
 * Convenience: attach phone click tracking to all tel: links on the page.
 * Call once in a client-side Astro component or layout.
 *
 * Example in an Astro layout:
 *   <script>
 *     import { autoTrackPhoneLinks } from "@/lib/zaraz-tracking";
 *     document.addEventListener("DOMContentLoaded", autoTrackPhoneLinks);
 *   </script>
 */
export function autoTrackPhoneLinks() {
  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.addEventListener("click", () => trackPhoneClick());
  });
}
