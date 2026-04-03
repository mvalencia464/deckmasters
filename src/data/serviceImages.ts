/**
 * Service name → card image URL (homepage, /services, and “Explore services” grids).
 * Leaf services use the same image as their /services/[slug] hero.
 * Core hub rows use the first leaf under that hub’s hero so category explore cards match real service pages.
 * Top-level category titles on /services use `serviceCategoryCardAssets` where noted.
 */
import { childPageCopy } from './childPageCopy';
import { getChildren, servicePages, type ChildServiceSlug } from './siteArchitecture';

function buildServiceImages(): Record<string, string> {
  const out: Record<string, string> = {
    /** Standalone marketing route; not a /services/[slug] leaf */
    'Dock Building': '/projects/005-aerial-wide.avif',
  };

  for (const p of servicePages) {
    if (p.kind !== 'child') continue;
    const bundle = childPageCopy[p.slug as ChildServiceSlug];
    if (bundle?.heroImage) {
      out[p.title] = bundle.heroImage;
    }
  }

  /** Core hub cards (Explore services on category pages): use the first leaf’s hero for visual alignment with that line. */
  for (const p of servicePages) {
    if (p.kind !== 'core') continue;
    const leaves = getChildren(p.slug).filter((c) => c.kind === 'child');
    const first = leaves[0];
    if (!first) continue;
    const bundle = childPageCopy[first.slug as ChildServiceSlug];
    if (bundle?.heroImage) {
      out[p.title] = bundle.heroImage;
    }
  }

  const pick = (...titles: string[]) => {
    for (const t of titles) {
      const url = out[t];
      if (url) return url;
    }
    return '/projects/009-masterpiece-main.avif';
  };

  /** Category hub cards: Deck Builder, Deck Repair, General Contracting use `serviceCategoryCardImages` + Astro Image. */
  out['Outdoor Living'] = pick('Custom Staircases and Landings', 'Elevated Deck Systems');

  return out;
}

export const serviceImages: Record<string, string> = buildServiceImages();
