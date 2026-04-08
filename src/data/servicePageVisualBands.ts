/**
 * Secondary image + paired copy for service page engagement bands.
 * Images are chosen from a project pool (never the page hero) for visual variety.
 */
import type { ChildPageBundle } from './childPageCopy';
import type { CorePageBundle } from './corePageCopy';
import type { CategoryPageBundle } from './categoryPageCopy';
import type { ChildServiceSlug, CoreServiceSlug, ServiceCategoryId } from './siteArchitecture';
import type { VocSnippet } from './vocQuotes';

export interface ServiceVisualBand {
  image: string;
  reverse: boolean;
  eyebrow: string;
  headline: string;
  paragraphs: string[];
  proof: VocSnippet | null;
}

/** Project shots for in-content bands (hero for each URL is excluded per page). */
export const PROJECT_IMAGE_POOL = [
  '/projects/009-masterpiece-main.avif',
  '/projects/017-contemporary-design.avif',
  '/projects/002-aerial-view-new.avif',
  '/projects/045-wraparound-angle.avif',
  '/projects/050-bonus-1.avif',
  '/projects/composite-decking-texture.avif',
  '/projects/021-custom-entrance.avif',
  '/projects/001-aerial-wraparound.avif',
  '/projects/020-contemporary-full.avif',
  '/projects/008-aerial-elevated.avif',
  '/projects/006-aerial-composite.avif',
  '/projects/005-aerial-wide.avif',
  /** Client project folders (see src/assets/projects/{derek-clark,doug-mcneil,matt-blakeslee,olivia-grill}) */
  '/projects/derek-clark-timbertech-cable.jpeg',
  '/projects/derek-clark-deck-overview.avif',
  '/projects/doug-mcneil-trex-pergola.avif',
  '/projects/doug-mcneil-deck-rail-detail.jpeg',
  '/projects/matt-blakeslee-multi-level.avif',
  '/projects/matt-blakeslee-framing-deck.jpeg',
  '/projects/olivia-grill-trex-cable.avif',
  '/projects/olivia-grill-deck-angle.avif',
] as const;

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function secondaryProjectImage(heroImage: string, slug: string): string {
  const candidates = PROJECT_IMAGE_POOL.filter((u) => u !== heroImage);
  const pool = candidates.length > 0 ? candidates : [...PROJECT_IMAGE_POOL];
  return pool[hashString(slug) % pool.length];
}

const CHILD_HEADLINES = [
  'What this looks like on your property',
  'How we approach your job',
  'Built for Alaska weather',
  'Clear scope before we swing hammers',
] as const;

const CORE_HEADLINES = [
  'Where this fits your home',
  'How we scope the work',
  'Anchorage-ready execution',
  'Options that match your budget',
] as const;

const CATEGORY_HEADLINES = [
  'Why homeowners call us first',
  'How we handle this line of work',
  'Built for Alaska homes',
  'Straight talk before we build',
] as const;

export function getChildVisualBand(slug: ChildServiceSlug, copy: ChildPageBundle, proof: VocSnippet | null): ServiceVisualBand {
  const img = secondaryProjectImage(copy.heroImage, slug);
  /** With two opening paras, the band carries the second + a why-us line; single-opening pages use process + why */
  const paragraphs =
    copy.opening.length > 1
      ? [copy.opening[1], copy.whyChoose[0]]
      : [copy.whyChoose[0], copy.process[0]].filter(Boolean);
  return {
    image: img,
    reverse: hashString(slug) % 2 === 1,
    eyebrow: hashString(slug) % 2 === 0 ? 'On-site' : 'Field notes',
    headline: CHILD_HEADLINES[hashString(slug) % CHILD_HEADLINES.length],
    paragraphs,
    proof,
  };
}

export function getCoreVisualBand(slug: CoreServiceSlug, copy: CorePageBundle, proof: VocSnippet | null): ServiceVisualBand {
  const img = secondaryProjectImage(copy.heroImage, slug);
  /** Second opening beat + first why-us line; intro is split like child/category pages */
  const paragraphs =
    copy.opening.length > 1
      ? [copy.opening[1], copy.whyChoose[0]]
      : [copy.whyChoose[0], copy.whatToExpect[0]].filter(Boolean);
  return {
    image: img,
    reverse: hashString(slug) % 2 === 0,
    eyebrow: 'From the field',
    headline: CORE_HEADLINES[hashString(slug) % CORE_HEADLINES.length],
    paragraphs,
    proof,
  };
}

export function getCategoryVisualBand(slug: ServiceCategoryId, copy: CategoryPageBundle, proof: VocSnippet | null): ServiceVisualBand {
  const img = secondaryProjectImage(copy.heroImage, slug);
  /** Mirrors child pages: second opening + local angle when the intro is split above/below the band */
  const paragraphs =
    copy.opening.length > 1
      ? [copy.opening[1], copy.city[0]]
      : [copy.city[0], copy.problems[0]].filter(Boolean);
  return {
    image: img,
    reverse: hashString(slug) % 2 === 1,
    eyebrow: 'Local context',
    headline: CATEGORY_HEADLINES[hashString(slug) % CATEGORY_HEADLINES.length],
    paragraphs,
    proof,
  };
}
