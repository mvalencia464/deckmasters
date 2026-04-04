/**
 * Shared R2 object naming: kebab-case basenames for flat client-slug/ keys.
 */
import path from 'node:path';

/** Lowercase basename stem; replace runs of non-alphanumeric with single hyphen. */
export function sanitizeBaseName(stem) {
  return stem
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

/** Apply sanitize to full filename (preserves extension). */
export function toKebabFilename(filename) {
  const ext = path.extname(filename);
  const stem = path.basename(filename, ext);
  const safe = sanitizeBaseName(stem);
  return `${safe || 'file'}${ext.toLowerCase()}`;
}
