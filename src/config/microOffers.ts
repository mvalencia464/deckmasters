/**
 * Micro Offers Configuration
 * Small, valuable offers that reduce friction in the sales funnel
 */

export interface MicroOffer {
  id: string;
  label: string;
  trigger: string;
  icon?: string;
}

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
