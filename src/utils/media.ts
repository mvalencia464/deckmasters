import { R2_PUBLIC_BASE_URL, R2_SITE_SLUG, R2_LEGACY_PREPEND_PROJECTS } from 'astro:env/server';

/**
 * R2 object key or absolute URL → absolute URL for images and video sources.
 *
 * Keys are flat: `<clientSlug>/<filename.ext>` (optional `R2_SITE_SLUG` prefixes the bucket path).
 * A leading `projects/` in the input is normalized away, then reapplied when
 * `R2_LEGACY_PREPEND_PROJECTS` is true (unmigrated buckets).
 */
export function mediaPublicUrl(keyOrUrl: string): string {
  const raw = keyOrUrl.trim();
  if (/^https?:\/\//i.test(raw)) return raw;

  const base = R2_PUBLIC_BASE_URL.replace(/\/+$/, '');
  let key = raw.replace(/^\/+/, '');

  if (key.startsWith('projects/')) {
    key = key.slice('projects/'.length);
  }

  const legacyProjects = R2_LEGACY_PREPEND_PROJECTS === true;
  const objectPath = legacyProjects && key ? `projects/${key}` : key;

  const siteSlug = (R2_SITE_SLUG ?? '').trim().replace(/^\/+|\/+$/g, '');
  if (!siteSlug) return `${base}/${objectPath}`;

  if (objectPath.startsWith(`${siteSlug}/`)) return `${base}/${objectPath}`;
  return `${base}/${siteSlug}/${objectPath}`;
}
