/**
 * @astrojs/sitemap `serialize` — Core30 Prompt 8 priorities (keep in sync with `siteArchitecture` slugs).
 */
const CATEGORIES = new Set(['deck-building', 'deck-repair', 'general-contracting', 'outdoor-living']);
const CORE = new Set([
  'custom-decks-design',
  'deck-replacement-decking',
  'deck-framing-foundations',
  'railings-staircases',
  'exterior-renovations-roofing',
  'contracting-project-services',
]);

/** @param {{ url: string; lastmod?: string; changefreq?: string; priority?: number; links?: unknown }} item */
export function sitemapSerialize(item) {
  const u = new URL(item.url);
  let pathname = u.pathname;
  if (pathname.length > 1 && pathname.endsWith('/')) pathname = pathname.slice(0, -1);
  const out = { ...item };
  out.changefreq = 'monthly';

  if (pathname === '/' || pathname === '') {
    out.priority = 1.0;
    out.changefreq = 'weekly';
    return out;
  }
  if (pathname === '/services') {
    out.priority = 0.7;
    return out;
  }
  if (pathname.startsWith('/services/')) {
    const slug = pathname.slice('/services/'.length);
    if (CATEGORIES.has(slug) || CORE.has(slug)) out.priority = 0.8;
    else out.priority = 0.6;
    return out;
  }
  if (pathname === '/about' || pathname === '/contact') {
    out.priority = 0.5;
    return out;
  }
  out.priority = 0.5;
  return out;
}
