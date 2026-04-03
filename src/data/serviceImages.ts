/**
 * Service name → card image URL (homepage + /services category cards).
 * Leaf services use the same image as their /services/[slug] hero for visual consistency.
 * Category titles (`Deck Builder`, etc.) map to representative imagery for hub cards only.
 */
import { childPageCopy } from './childPageCopy';
import { servicePages, type ChildServiceSlug } from './siteArchitecture';

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
