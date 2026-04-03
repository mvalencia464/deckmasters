/**
 * Category hub card thumbnails (homepage + /services top grid).
 * Local assets → Astro Image + saturated Sharp service; distinct from leaf `serviceImages` URLs.
 */
import type { ImageMetadata } from 'astro/dist/assets/types.js';
import deckBuilder from '../assets/service-categories/deck-builder.avif';
import deckRepair from '../assets/service-categories/deck-repair.jpeg';
import generalContracting from '../assets/service-categories/general-contracting.avif';

export const serviceCategoryCardAssets: Record<string, ImageMetadata> = {
  'Deck Builder': deckBuilder,
  'Deck Repair & Maintenance': deckRepair,
  'General Contracting': generalContracting,
};
