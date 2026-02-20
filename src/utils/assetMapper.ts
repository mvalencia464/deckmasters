/**
 * Asset Mapper - Maps local asset paths to external CDN URLs
 * For Google compliance, images are served from img.stokeleads.com
 */

const CDN_BASE = 'https://img.stokeleads.com';

/**
 * Maps local asset URLs to external CDN URLs
 * @param url - The asset URL (local or absolute)
 * @returns The CDN URL or original if already external
 */
export function mapAssetUrl(url: string): string {
  if (!url) return '';
  
  // If already an external URL, return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Convert local paths to CDN URLs
  // /assets/testimonials/images/filename.webp -> https://img.stokeleads.com/assets/testimonials/images/filename.webp
  if (url.startsWith('/assets/')) {
    return `${CDN_BASE}${url}`;
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
