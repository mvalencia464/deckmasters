/**
 * Service name → card image URL (homepage + /services hub grids).
 * Leaf services use the same image as their /services/[slug] hero for visual consistency.
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

  return out;
}

export const serviceImages: Record<string, string> = buildServiceImages();
