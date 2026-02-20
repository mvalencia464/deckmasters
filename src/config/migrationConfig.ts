/**
 * Migration Configuration - GSC Data & SEO Preservation
 * Based on Google Search Console Analytics (2026)
 * Implements Andromeda Matrix angles for conversion optimization
 */

export interface SEOUrl {
  path: string;
  priority: 'critical' | 'high' | 'medium';
  gscClicks?: number;
  gscImpressions?: number;
  gscPosition?: number;
  targetKeywords: string[];
  andromedaAngle: string;
  intent?: string;
}

export interface MicroOffer {
  id: string;
  label: string;
  trigger: string;
  icon?: string;
}

export const SEO_PRIORITY_URLS: SEOUrl[] = [
  {
    path: '/',
    priority: 'critical',
    gscClicks: 1103,
    targetKeywords: ['deck builders anchorage', 'anchorage deck builders', 'deck construction alaska'],
    andromedaAngle: 'Angle 1: Premium Outdoor Luxury',
    intent: 'brand awareness + service discovery'
  },
  {
    path: '/is-trex-decking-right-for-you/',
    priority: 'high',
    gscImpressions: 48433,
    targetKeywords: ['trex decking anchorage', 'composite deck materials alaska', 'deck material comparison'],
    andromedaAngle: 'Angle 4: Smart Investment',
    intent: 'education + comparison'
  },
  {
    path: '/deck-repair/',
    priority: 'high',
    gscPosition: 1.72,
    targetKeywords: ['deck repair anchorage', 'deck restoration alaska', 'emergency deck fix'],
    andromedaAngle: 'Angle 3: Trust/Fixed-Price',
    intent: 'emergency/repair'
  },
  {
    path: '/dock-building/',
    priority: 'high',
    targetKeywords: ['dock building anchorage', 'boat dock construction alaska'],
    andromedaAngle: 'Angle 2: Waterfront Lifestyle',
    intent: 'service discovery'
  },
  {
    path: '/custom-deck-design/',
    priority: 'high',
    targetKeywords: ['custom deck design anchorage', 'deck designer alaska'],
    andromedaAngle: 'Angle 1: Premium Outdoor Luxury',
    intent: 'design consultation'
  }
];

export const MICRO_OFFERS: MicroOffer[] = [
  {
    id: 'safety_insp',
    label: 'Free Structural Safety Inspection',
    trigger: 'Trust Angle',
    icon: 'Shield'
  },
  {
    id: 'frost_heave',
    label: 'Free Frost-Heave Assessment',
    trigger: 'Value Angle',
    icon: 'Thermometer'
  },
  {
    id: '3d_render',
    label: 'Free 3D Design Preview',
    trigger: 'Luxury Angle',
    icon: 'Eye'
  }
];

export const STICKY_CTA = {
  mobileOnly: true,
  label: 'Get My Quote',
  goal: 'Improve 1.77% Mobile CTR',
  trackingEvent: 'sticky_cta_click'
};

export const META_ADS_CONFIG = {
  trackingRequirements: 'Ensure route-change listeners trigger Lead events',
  campaigns: [
    {
      name: 'Andromeda Matrix',
      type: 'ABO Testing',
      angles: 5,
      conversionEvent: 'Lead'
    }
  ]
};

export const MIGRATION_SAFETY_CHECKS = {
  redirects301: 'Strict 1:1 mapping required for all Signal Pages',
  pruning: 'Delete /tag/ and /author/ pages with 0 clicks',
  benchmarking: 'Pre-migration export of GSC rankings for 1.02-2.33 position terms'
};

// URL Pattern Mapping for SSR/SSG preservation
export const URL_PATTERNS = {
  layerTwo: [
    '/new-deck-construction',
    '/custom-deck-design',
    '/deck-repair-maintenance',
    '/deck-materials-components'
  ],
  layerThree: [
    '/new-deck-construction/deck-installation',
    '/new-deck-construction/wood-deck-construction',
    '/custom-deck-design/pergola-installation',
    '/deck-repair-maintenance/deck-repair',
    '/deck-materials-components/trex-deck-installation'
  ],
  oldPatterns: [
    '/tag/',
    '/author/',
    '/category/'
  ]
};
