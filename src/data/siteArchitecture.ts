/**
 * Prompt 0 site architecture — all /services/* routes (see docs/site-architecture-prompt-0.md).
 */

export type ServicePageKind = 'category' | 'core' | 'child';

export type ServiceCategoryId =
  | 'deck-building'
  | 'deck-repair'
  | 'general-contracting'
  | 'outdoor-living';

export interface ServicePageEntry {
  slug: string;
  kind: ServicePageKind;
  /** Display title (matches GBP / architecture names) */
  title: string;
  /** Immediate parent slug, or null for top-level category pages */
  parentSlug: string | null;
  /** Top-level bucket for hub layout */
  categoryId: ServiceCategoryId;
}

const cat = (slug: ServiceCategoryId, title: string): ServicePageEntry => ({
  slug,
  kind: 'category',
  title,
  parentSlug: null,
  categoryId: slug,
});

const core = (
  slug: string,
  title: string,
  categoryId: ServiceCategoryId,
  parentSlug: string
): ServicePageEntry => ({
  slug,
  kind: 'core',
  title,
  parentSlug,
  categoryId,
});

const child = (
  slug: string,
  title: string,
  categoryId: ServiceCategoryId,
  parentSlug: string
): ServicePageEntry => ({
  slug,
  kind: 'child',
  title,
  parentSlug,
  categoryId,
});

/** All service routes under /services/[slug] — order preserved for hub sections */
export const servicePages: ServicePageEntry[] = [
  cat('deck-building', 'Deck Builder'),
  cat('deck-repair', 'Deck Repair & Maintenance'),
  cat('general-contracting', 'General Contracting'),
  cat('outdoor-living', 'Outdoor Living'),

  core('custom-decks-design', 'Custom Decks & Design', 'deck-building', 'deck-building'),
  core('deck-replacement-decking', 'Deck Replacement & Decking', 'deck-building', 'deck-building'),
  core('deck-framing-foundations', 'Deck Framing & Foundations', 'deck-building', 'deck-building'),
  core('railings-staircases', 'Railings & Staircases', 'deck-building', 'deck-building'),

  core('exterior-renovations-roofing', 'Exterior Renovations & Roofing', 'general-contracting', 'general-contracting'),
  core(
    'contracting-project-services',
    'Contracting & Project Services',
    'general-contracting',
    'general-contracting'
  ),

  child('custom-deck-design', 'Custom Deck Design', 'deck-building', 'custom-decks-design'),
  child('new-deck-construction', 'New Deck Construction', 'deck-building', 'custom-decks-design'),
  child('multi-level-decks', 'Multi-level Decks', 'deck-building', 'custom-decks-design'),

  child('deck-replacement', 'Deck Replacement', 'deck-building', 'deck-replacement-decking'),
  child('composite-decking-installation', 'Composite Decking Installation', 'deck-building', 'deck-replacement-decking'),
  child('wood-decking-installation', 'Wood Decking Installation', 'deck-building', 'deck-replacement-decking'),

  child('deck-framing', 'Deck Framing', 'deck-building', 'deck-framing-foundations'),
  child('deck-footings-foundations', 'Deck Footings and Foundations', 'deck-building', 'deck-framing-foundations'),

  child('custom-railing-design', 'Custom Railing Design', 'deck-building', 'railings-staircases'),
  child('aluminum-railing-installation', 'Aluminum Railing Installation', 'deck-building', 'railings-staircases'),
  child('cable-railing-installation', 'Cable Railing Installation', 'deck-building', 'railings-staircases'),
  child('wood-railing-installation', 'Wood Railing Installation', 'deck-building', 'railings-staircases'),
  child('composite-railing-installation', 'Composite Railing Installation', 'deck-building', 'railings-staircases'),
  child('staircase-design-build', 'Staircase Design and Build', 'deck-building', 'railings-staircases'),

  child('deck-board-replacement', 'Deck Board Replacement', 'deck-repair', 'deck-repair'),
  child('structural-deck-repair', 'Structural Deck Repair', 'deck-repair', 'deck-repair'),
  child('railing-repair', 'Railing Repair', 'deck-repair', 'deck-repair'),
  child('stair-repair', 'Stair Repair', 'deck-repair', 'deck-repair'),
  child('water-damage-repair-decks', 'Water Damage Repair', 'deck-repair', 'deck-repair'),
  child('mold-remediation-decks', 'Mold Remediation (Deck related)', 'deck-repair', 'deck-repair'),
  child('storm-damage-repair-decks', 'Storm Damage Repair', 'deck-repair', 'deck-repair'),

  child('exterior-home-renovations', 'Exterior Home Renovations', 'general-contracting', 'exterior-renovations-roofing'),
  child('siding-replacement', 'Siding Replacement', 'general-contracting', 'exterior-renovations-roofing'),
  child('fascia-soffit-installation', 'Fascia & Soffit Installation', 'general-contracting', 'exterior-renovations-roofing'),
  child('roofing-services', 'Roofing Services', 'general-contracting', 'exterior-renovations-roofing'),
  child('garage-wall-reconstruction', 'Garage Wall Reconstruction', 'general-contracting', 'exterior-renovations-roofing'),
  child('garage-roof-reconstruction', 'Garage Roof Reconstruction', 'general-contracting', 'exterior-renovations-roofing'),

  child('residential-general-contracting', 'Residential General Contracting', 'general-contracting', 'contracting-project-services'),
  child('water-damage-restoration', 'Water Damage Restoration', 'general-contracting', 'contracting-project-services'),
  child('structural-repairs', 'Structural Repairs', 'general-contracting', 'contracting-project-services'),
  child('project-management', 'Project Management', 'general-contracting', 'contracting-project-services'),
  child('permit-acquisition-assistance', 'Permit Acquisition Assistance', 'general-contracting', 'contracting-project-services'),
  child('site-preparation', 'Site Preparation', 'general-contracting', 'contracting-project-services'),
  child('material-sourcing', 'Material Sourcing', 'general-contracting', 'contracting-project-services'),
  child('rough-carpentry', 'Rough Carpentry', 'general-contracting', 'contracting-project-services'),
  child('finish-carpentry', 'Finish Carpentry', 'general-contracting', 'contracting-project-services'),
  child('framing-services', 'Framing Services', 'general-contracting', 'contracting-project-services'),
  child('demolition-services', 'Demolition Services', 'general-contracting', 'contracting-project-services'),
  child('consultation-planning', 'Consultation and Planning', 'general-contracting', 'contracting-project-services'),
  child('building-code-compliance', 'Building Code Compliance', 'general-contracting', 'contracting-project-services'),
  child('construction-clean-up', 'Construction Clean-up', 'general-contracting', 'contracting-project-services'),

  child('custom-staircases-landings', 'Custom Staircases and Landings', 'outdoor-living', 'outdoor-living'),
  child('elevated-deck-systems', 'Elevated Deck Systems', 'outdoor-living', 'outdoor-living'),
];

const bySlug = new Map(servicePages.map((p) => [p.slug, p]));

export function getServicePage(slug: string): ServicePageEntry | undefined {
  return bySlug.get(slug);
}

export function getChildren(parentSlug: string): ServicePageEntry[] {
  return servicePages.filter((p) => p.parentSlug === parentSlug);
}

export function getCategoryPage(categoryId: ServiceCategoryId): ServicePageEntry | undefined {
  return servicePages.find((p) => p.kind === 'category' && p.slug === categoryId);
}

/**
 * Group leaves under their immediate parent core, or one group when children attach directly to the category.
 */
export function getServiceGroupsForCategory(
  categorySlug: ServiceCategoryId
): { core: ServicePageEntry | null; leaves: ServicePageEntry[] }[] {
  const top = getChildren(categorySlug);
  if (top.length === 0) return [];
  if (top.every((n) => n.kind === 'child')) {
    return [{ core: null, leaves: top }];
  }
  return top.map((core) => ({
    core,
    leaves: getChildren(core.slug),
  }));
}

/** Every leaf (`kind === 'child'`) under a category, for hub index links — sorted by title, de-duplicated by slug. */
export function getAllChildLeavesInCategory(categorySlug: ServiceCategoryId): ServicePageEntry[] {
  const groups = getServiceGroupsForCategory(categorySlug);
  const seen = new Set<string>();
  const out: ServicePageEntry[] = [];
  for (const g of groups) {
    for (const leaf of g.leaves) {
      if (leaf.kind === 'child' && !seen.has(leaf.slug)) {
        seen.add(leaf.slug);
        out.push(leaf);
      }
    }
  }
  out.sort((a, b) => a.title.localeCompare(b.title));
  return out;
}

/** Hub: categories in display order */
export const serviceCategoryOrder: ServiceCategoryId[] = [
  'deck-building',
  'deck-repair',
  'general-contracting',
  'outdoor-living',
];

/** Core service hub slugs (Prompt 5) — matches `kind === 'core'` entries */
export const CORE_SERVICE_SLUGS = [
  'custom-decks-design',
  'deck-replacement-decking',
  'deck-framing-foundations',
  'railings-staircases',
  'exterior-renovations-roofing',
  'contracting-project-services',
] as const;

export type CoreServiceSlug = (typeof CORE_SERVICE_SLUGS)[number];

export function isCoreServiceSlug(slug: string): slug is CoreServiceSlug {
  return (CORE_SERVICE_SLUGS as readonly string[]).includes(slug);
}

/** Child service leaf slugs (Prompt 6) — matches `kind === 'child'` entries */
export const CHILD_SERVICE_SLUGS = [
  'custom-deck-design',
  'new-deck-construction',
  'multi-level-decks',
  'deck-replacement',
  'composite-decking-installation',
  'wood-decking-installation',
  'deck-framing',
  'deck-footings-foundations',
  'custom-railing-design',
  'aluminum-railing-installation',
  'cable-railing-installation',
  'wood-railing-installation',
  'composite-railing-installation',
  'staircase-design-build',
  'deck-board-replacement',
  'structural-deck-repair',
  'railing-repair',
  'stair-repair',
  'water-damage-repair-decks',
  'mold-remediation-decks',
  'storm-damage-repair-decks',
  'exterior-home-renovations',
  'siding-replacement',
  'fascia-soffit-installation',
  'roofing-services',
  'garage-wall-reconstruction',
  'garage-roof-reconstruction',
  'residential-general-contracting',
  'water-damage-restoration',
  'structural-repairs',
  'project-management',
  'permit-acquisition-assistance',
  'site-preparation',
  'material-sourcing',
  'rough-carpentry',
  'finish-carpentry',
  'framing-services',
  'demolition-services',
  'consultation-planning',
  'building-code-compliance',
  'construction-clean-up',
  'custom-staircases-landings',
  'elevated-deck-systems',
] as const;

export type ChildServiceSlug = (typeof CHILD_SERVICE_SLUGS)[number];

export function isChildServiceSlug(slug: string): slug is ChildServiceSlug {
  return (CHILD_SERVICE_SLUGS as readonly string[]).includes(slug);
}
