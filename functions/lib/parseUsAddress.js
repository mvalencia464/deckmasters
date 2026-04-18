/**
 * Shared US address parsing for quote form + submit-quote Pages Function.
 * Format: "Street…, City, ST 12345" (optional trailing ", USA").
 */

export function parseUsAddressFromFreeform(text) {
  if (!text || typeof text !== 'string') return null;
  const trimmed = text
    .trim()
    .replace(/,\s*(USA|United States)\s*$/i, '')
    .trim();
  const m = trimmed.match(/^(.*),\s*([^,]+),\s*([A-Za-z]{2})\s+(\d{5})(?:-\d{4})?\s*$/);
  if (!m) return null;
  const line1 = m[1].trim();
  const city = m[2].trim();
  const state = m[3].toUpperCase();
  const zip = m[4];
  if (!city || !line1 || !/^[A-Z]{2}$/.test(state) || !/^\d{5}$/.test(zip)) return null;
  return { line1, city, state, zip };
}

/**
 * True if Places filled hidden city/state/zip, or project line parses as a full US address.
 */
export function isQuoteAddressComplete({ addressCity, addressState, addressZip, projectAddress }) {
  const c = String(addressCity || '').trim();
  const s = String(addressState || '').trim();
  const z = String(addressZip || '').trim();
  if (c && s && z) return true;
  return parseUsAddressFromFreeform(String(projectAddress || '').trim()) !== null;
}
