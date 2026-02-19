/**
 * Asset Mapper - Simple pass-through for local testimonial assets
 * Images are stored locally at /assets/testimonials/images/ in WebP format
 * with standardized naming: reviewer-name-sequential.webp
 */

/**
 * Pass through for local asset URLs
 * @param url - The asset URL (already local)
 * @returns The same URL
 */
export function mapAssetUrl(url: string): string {
  return url || '';
}

/**
 * Check if URL is a remote CDN URL
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

export default {
  mapAssetUrl,
  isExternalUrl,
};
