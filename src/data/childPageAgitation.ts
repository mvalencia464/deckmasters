/**
 * PAS — Agitation blocks for leaf service pages, keyed by immediate parent (core or category).
 * Placed after “when you need” scenarios; sharpens cost of waiting before process/solution.
 */

export interface AgitationBlock {
  title: string;
  paragraphs: string[];
}

/** Parent slug = `page.parentSlug` from siteArchitecture */
export const childAgitationByParentSlug: Record<string, AgitationBlock> = {
  'custom-decks-design': {
    title: 'What you risk if you keep “thinking about it”',
    paragraphs: [
      'You lose another short Alaska season while lumber and composite lead times jump. The old deck keeps staining siding, failing inspection, or scaring guests when rails move.',
      'Waiting rarely makes the job cheaper — it often means emergency repairs or a rushed crew when you finally panic in June.',
    ],
  },
  'deck-replacement-decking': {
    title: 'Why “just one more summer” on bad boards hurts',
    paragraphs: [
      'Rot and rusty hardware do not pause for your calendar. Water at the ledger or hangers can quietly damage the wall you see from the kitchen.',
      'You pay twice when a cosmetic resurface hides structure that fails the next winter — or when you sell and the buyer’s inspector writes up the deck.',
    ],
  },
  'deck-framing-foundations': {
    title: 'If posts bounce or piers heave, pretty decking will not fix it',
    paragraphs: [
      'You can spend thousands on new boards while the frame keeps moving — then you tear it all off anyway.',
      'Frost and poor drainage punish wrong depths and shortcuts. The bill climbs when you wait for a full collapse instead of fixing bearing early.',
    ],
  },
  'railings-staircases': {
    title: 'Loose guards and bad stairs do not age gracefully',
    paragraphs: [
      'Ice hides uneven treads; guests grab a rail that flexes. You are one slip away from injury or a failed inspection when you list the house.',
      'Patching pickets while posts rock at the base buys weeks, not years — and it signals neglect to anyone testing your deck.',
    ],
  },
  'deck-repair': {
    title: 'Small deck problems become big house problems',
    paragraphs: [
      'Moisture at the ledger stains drywall inside. A railing that was “a little loose” fails when someone leans hard after a freeze.',
      'You are not saving money by waiting — you are gambling that the next storm or snow load is not the one that turns a repair into a rebuild.',
    ],
  },
  'exterior-renovations-roofing': {
    title: 'Water does not stay outside once the envelope fails',
    paragraphs: [
      'Stains creep along plates and into insulation. Paint peels again while rot spreads behind what you can see from the ladder.',
      'You may pay for drywall twice if someone roofs over bad sheathing or sides over wet OSB — sequencing matters as much as materials.',
    ],
  },
  'contracting-project-services': {
    title: 'Multi-step jobs stall when nobody owns the chain',
    paragraphs: [
      'You chase three crews — demo, structure, finish — while mold risk, insurance clocks, or sale deadlines keep running.',
      'Handyman patches that come back worse cost more than one scoped repair with inspections in the right order.',
    ],
  },
  'outdoor-living': {
    title: 'Height and ice punish weak stairs and elevated frames',
    paragraphs: [
      'You feel flex before you see cracks — by then bracing and posts may already be overloaded for the span you are asking for.',
      'Waiting turns a landing tweak into a full guard rebuild when someone gets hurt or the city flags it at permit.',
    ],
  },
};
