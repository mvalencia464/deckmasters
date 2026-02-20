/**
 * Asset Mapper - Maps local asset paths
 * Testimonials images are served locally from /public/assets/
 * Avatar URLs come from external CDN (images.stokeleads.com)
 */

/**
 * Maps local asset URLs - keeps testimonial images local
 * @param url - The asset URL (local or absolute)
 * @param highRes - Optional flag for high-res variant (not currently used)
 * @returns The URL (local or CDN as-is)
 */
export function mapAssetUrl(url: string, highRes?: boolean): string {
  if (!url) return '';
  
  // If already an external URL, return as-is (avatars, etc.)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Keep local asset paths as-is - they're served from public/assets/
  // The testimonial images exist in public/assets/testimonials/images/
  if (url.startsWith('/assets/')) {
    return url;
  }
  
  return url;
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
