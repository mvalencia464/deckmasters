import type { ServicePageEntry } from './siteArchitecture';
import type { FascinationBundle } from './copywritingLibrary';
import { fascinationBundles } from './copywritingLibrary';

const RAILING_CHILD_SLUGS = new Set([
  'custom-railing-design',
  'aluminum-railing-installation',
  'cable-railing-installation',
  'wood-railing-installation',
  'composite-railing-installation',
  'staircase-design-build',
]);

/**
 * VOC fascination bullets for service routes — null when no tailored set exists.
 */
export function getFascinationForPage(page: ServicePageEntry): FascinationBundle | null {
  const { slug, kind, categoryId, parentSlug } = page;

  if (slug === 'composite-decking-installation') return fascinationBundles.composite;

  if (categoryId === 'deck-repair') return fascinationBundles.deckRepair;

  if (kind === 'core' && slug === 'railings-staircases') return fascinationBundles.railings;
  if (kind === 'child' && parentSlug === 'railings-staircases' && RAILING_CHILD_SLUGS.has(slug)) {
    return fascinationBundles.railings;
  }

  if (kind === 'category') {
    if (slug === 'deck-building') return fascinationBundles.deckBuilding;
    if (slug === 'deck-repair') return fascinationBundles.deckRepair;
    if (slug === 'general-contracting') return fascinationBundles.generalContracting;
    if (slug === 'outdoor-living') return fascinationBundles.outdoorLiving;
    return null;
  }

  if (kind === 'core') {
    if (['custom-decks-design', 'deck-replacement-decking', 'deck-framing-foundations'].includes(slug)) {
      return fascinationBundles.deckBuilding;
    }
    if (slug === 'exterior-renovations-roofing') return fascinationBundles.exteriorRenovations;
    if (slug === 'contracting-project-services') return fascinationBundles.generalContracting;
    return null;
  }

  if (kind === 'child' && categoryId === 'deck-building') return fascinationBundles.deckBuilding;
  if (kind === 'child' && categoryId === 'outdoor-living') return fascinationBundles.outdoorLiving;

  return null;
}
