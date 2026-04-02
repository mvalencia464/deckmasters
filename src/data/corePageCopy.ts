/**
 * Core30 Prompt 5 — core service hub pages (six URLs under /services/[slug]).
 * Hero benefits stay keyword-forward for SEO; PAS and VOC live in body sections.
 */

import type { CoreServiceSlug } from './siteArchitecture';

export interface CorePageBundle {
  browserTitle: string;
  metaDescription: string;
  heroImage: string;
  h1Benefit: string;
  /** Subhead; use {phone} */
  heroSubhead: string;
  /** CTV label for secondary hero button */
  heroSecondaryCta: string;
  trustPills: string[];
  opening: string[];
  signs: string[];
  /** PAS — after “signs” (problem), before options (solution path) */
  agitationTitle: string;
  agitation: string[];
  /** Paragraphs before the auto-generated “every child service” link block */
  optionsIntro: string[];
  /** Paragraphs after the link block */
  optionsClosing: string[];
  city: string[];
  whatToExpect: string[];
  whyChoose: string[];
  finalCta: string;
  /** One line per child slug for the related-services grid */
  gridBlurbs: Record<string, string>;
}

export const corePageCopy: Record<CoreServiceSlug, CorePageBundle> = {
  'custom-decks-design': {
    browserTitle: 'Custom Decks & Design Anchorage AK | Plans, Layouts & New Builds',
    metaDescription:
      'Custom deck design and new construction in Anchorage, AK. Layouts built for snow, wind, and your lot. Free estimates. Call Deck Masters AK.',
    heroImage: '/projects/derek-clark-deck-overview.jpg',
    h1Benefit: 'Layouts That Match Your Lot and How You Live Outside',
    heroSubhead:
      'Waiting until “later” usually means a rushed season and fewer material choices. Call {phone} — we will pencil a real timeline and a clear design path before you commit.',
    heroSecondaryCta: 'Start My Design Conversation',
    trustPills: ['Design-led planning', 'Cold-climate detailing', 'Written scope'],
    opening: [
      'A custom deck should fit door locations, sun, wind, and how you clear snow. It should also fit your budget without hiding costs in change orders later.',
      'This hub covers design through the kinds of new builds we scope in Anchorage: from first sketches to engineered connections at the house.',
      'If you already know you want a full replacement instead of a new footprint, jump to our deck replacement hub — or stay here if you are still deciding what is possible on your property.',
    ],
    signs: [
      'You keep sketching ideas but are not sure what Anchorage setbacks, height limits, or guardrail rules mean for your lot. That is a design problem, not a shopping problem.',
      'Your old deck footprint wastes space: dead corners, stairs in the wrong place, or a span that bounces because the beam layout was never thought through.',
      'You are comparing composite versus wood but have not matched either to exposure, cleaning, and how much maintenance you will actually do after a long winter.',
      'Waiting rarely makes the job cheaper. Lumber and composite lead times shift, and good crews book early. If you want options on paper before the next thaw, start now.',
    ],
    agitationTitle: '“Later” is not a plan — it is how budgets blow up',
    agitation: [
      'You sketch the same deck every spring while rot and bounce get worse. When you finally panic, you pick from leftover slots and rush decisions.',
      'Design mistakes cost more to fix in the field than on paper — and Anchorage code does not bend for “we thought it would work.”',
    ],
    optionsIntro: [
      'You get line items that match your estimate — each link below is a dedicated page with photos and scope notes.',
      'Design-first work means load paths, attachment, and drainage are answered before long-lead materials are ordered.',
    ],
    optionsClosing: [
      'Choose custom deck design when you need drawings and decisions before lumber hits the truck.',
      'Choose new deck construction when the plan is set and you are ready to build.',
      'Choose multi-level decks when grade changes, views, or separate zones matter for your family.',
    ],
    city: [
      'Anchorage lots range from flat Midtown rectangles to Hillside slopes with wind exposure. Snow stays longer in shade; south-facing rails see more UV. We bake those facts into rail height, stair placement, and how we detail the ledger.',
      'Service areas we mention often include Sand Lake, Turnagain, Mountain View, and South Addition — different soils, different access, same need for a deck that drains and rails that stay stiff in ice.',
    ],
    whatToExpect: [
      'When you call, we ask what is on the ground today, what you want to use the deck for, and whether you already have sketches or engineer notes.',
      'We schedule a site visit when it makes sense, photograph measurements, and talk through materials with real lead times — not catalog fantasy dates.',
      'You get a written scope for the path you choose: design-only, design-build, or a phased plan if permits or HOA approval takes longer.',
    ],
    whyChoose: [
      'Reviews mention clarity and follow-through — that matters when design touches structure, permits, and your calendar.',
      'We build in Alaska full time, so our details match freeze-thaw and snow load instead of copying mild-climate details from the internet.',
    ],
    finalCta:
      'Pick a service link below or call now — design work should start before you are under pressure when the season opens.',
    gridBlurbs: {
      'custom-deck-design': 'Layout, code-aware planning, and material direction before you buy a board.',
      'new-deck-construction': 'New footprint and frame when you are ready to build from a clear plan.',
      'multi-level-decks': 'Steps between levels, separate zones, and cleaner flow on sloped lots.',
    },
  },

  'deck-replacement-decking': {
    browserTitle: 'Deck Replacement & Decking Anchorage AK | Composite, Wood & Resurface',
    metaDescription:
      'Deck replacement and new decking in Anchorage: composite, wood, and full tear-off when the frame is done. Honest scopes. Deck Masters AK — call for a free estimate.',
    heroImage: '/projects/olivia-grill-deck-angle.jpg',
    h1Benefit: 'Replace What Failed — Surface, Frame, or Both',
    heroSubhead:
      'Spongy boards and rusty hardware do not fix themselves. Call {phone} — we will tell you if you need new decking only, sistered joists, or a full reset.',
    heroSecondaryCta: 'Get My Replacement Quote',
    trustPills: ['Frame inspection first', 'Clear tear-off scope', 'Anchorage-savvy installs'],
    opening: [
      'Replacement starts with honesty about what is still solid. Sometimes the frame and ledger are fine and you need new decking and railing. Sometimes the rot runs deeper.',
      'This hub covers full deck replacement and new decking installs — composite systems, wood installs, and the decisions that keep water moving off the structure.',
      'If you are not sure yet, we still come out, probe what matters, and write it down so you are not guessing from the kitchen window.',
    ],
    signs: [
      'Boards cup, crack, or hold water in the grooves long after rain. That is more than a stain issue — it is often sun, drainage, or wrong fasteners for the material you have.',
      'You see rust streaks at hangers, split joist ends, or movement at the ledger. Those are structural warnings, not cosmetic.',
      'Composite or wood: if the deck feels soft or bouncy, the problem may be span, not just the walking surface. Walking it with us beats guessing from photos.',
      'Waiting turns small ledger issues into wall damage inside. If you are on the fence, get a real inspection before the next heavy snow season.',
    ],
    agitationTitle: 'New boards on bad structure waste money twice',
    agitation: [
      'You pay for a pretty surface, then pay again when the frame fails inspection — or when water stains show up inside the rim joist.',
      'Composite and wood both need good drainage and correct spans. Skipping that to “save” now is how you get cupping, bounce, and callbacks.',
    ],
    optionsIntro: [
      'Every link below matches how we write estimates — no renamed mystery scopes.',
      'Replacement usually means demolition, inspection, repair or replace framing, then new decking and rail per code.',
    ],
    optionsClosing: [
      'Full deck replacement is the right move when the frame, posts, or ledger are at end of life.',
      'Composite decking installation wins when you want lower maintenance and predictable color.',
      'Wood decking installation still fits when you want a natural look and accept sealing cycles.',
    ],
    city: [
      'Anchorage freeze-thaw cycles punish bad fasteners and trapped moisture. We specify clips, gaps, and flashing that match your exposure — not a one-size brochure from Outside.',
      'Wind-driven rain hits south and west faces harder. We look at splash lines, roof drip, and whether your grill area needs extra protection.',
    ],
    whatToExpect: [
      'We walk the deck, bounce test spans where safe, and open a few boards if needed to see hangers and ledgers.',
      'You get options: replace decking only, replace selected joists, or full tear-off with new footings if required.',
      'Timeline depends on material stock and weather-safe open time — we spell that out up front.',
    ],
    whyChoose: [
      'We would rather lose a job than cover rot with new boards. That is why homeowners trust the scope.',
      'Our crew knows how to stage tear-offs so your house is not exposed longer than needed in unpredictable weather.',
    ],
    finalCta:
      'Send photos or call today — if the frame is failing, summer booking will not wait for last-minute shoppers.',
    gridBlurbs: {
      'deck-replacement': 'Full tear-off and rebuild when framing, posts, or ledgers are done.',
      'composite-decking-installation': 'Low-maintenance surfaces with manufacturer-aware fastening.',
      'wood-decking-installation': 'Natural wood installs with spacing and coating plans that fit Alaska.',
    },
  },

  'deck-framing-foundations': {
    browserTitle: 'Deck Framing & Footings Anchorage AK | Structure Below the Boards',
    metaDescription:
      'Deck framing, footings, and foundations in Anchorage, AK — depth, drainage, and hardware for snow load. Engineering-minded carpentry. Deck Masters AK.',
    heroImage: '/projects/matt-blakeslee-framing-deck.jpeg',
    h1Benefit: 'Footings and Framing That Hold Up to Snow and Frost',
    heroSubhead:
      'If posts shift or the frame bounces, pretty boards will not save you. Call {phone} — we assess what is carrying load and what needs correction.',
    heroSecondaryCta: 'Get My Free Estimate',
    trustPills: ['Frost-depth awareness', 'Hanger and bolt schedules', 'Clean load paths'],
    opening: [
      'Everything you walk on hangs off beams, posts, and footings. In Anchorage, frost and poor drainage move posts over time if the hole and hardware were wrong from day one.',
      'This hub is about structure below the finish: new framing paths, sistering where it makes sense, and footings sized for your height and soil.',
      'If you only need new boards, you may not need this page — but if anything feels soft below, start here.',
    ],
    signs: [
      'Posts lean, lift, or show frost heave after winters. That is not normal settling — it is a footing or depth issue until proven otherwise.',
      'You see cracked concrete, buried posts rotting at grade, or beams that are undersized for the span you are asking for.',
      'Bounce in the middle of a span often means joists are overspanned, hangers are loose, or a beam is failing — not just “old wood.”',
      'Waiting lets hangers rust completely through and ledgers work nails loose. That repair bill grows faster than most people expect.',
    ],
    agitationTitle: 'Motion below the boards does not fix itself',
    agitation: [
      'You can replace decking twice while posts drift and beams sag — then you still pay for a full structural reset.',
      'Frost heave and buried rot at grade do not pause for your budget. The longer you wait, the more of the house we have to open to fix bearing.',
    ],
    optionsIntro: [
      'These two services split design intent: framing addresses lumber, beams, joists, and connections; footings and foundations address what sits in or on the ground.',
      'On many jobs both show up in the same scope — names stay separate so permits and inspections stay clear.',
    ],
    optionsClosing: [
      'Deck framing covers new layout, beam upgrades, joist sistering, and hardware corrections.',
      'Deck footings and foundations cover piers, post bases, and bearing down to stable soil for your site.',
    ],
    city: [
      'Soils and slope change block to block. Hillside lots often need taller posts, bracing, and careful staging; flat lots still need correct frost depth and drainage at the pier.',
      'Snow load and rail height drive extra lateral loads. We tie that back to posts and footings so the guard system has something solid to pull on.',
    ],
    whatToExpect: [
      'We probe posts, inspect hangers, and may expose a short section of ledger to see attachment quality.',
      'If engineering is required, we say so early and coordinate drawings with what the city expects.',
      'You see a written plan for footings versus framing so you know where your money goes.',
    ],
    whyChoose: [
      'We build decks weekly — not once a year — so our crews recognize failure patterns fast.',
      'You get photos and plain-language notes, not a shrug and a bigger bill later.',
    ],
    finalCta:
      'Structural issues are not a wait-and-see item — call before the next season of heavy snow tests a bad post.',
    gridBlurbs: {
      'deck-framing': 'Beams, joists, posts, and connections sized and installed for real loads.',
      'deck-footings-foundations': 'Piers, bases, and depth work so posts stay put through frost.',
    },
  },

  'railings-staircases': {
    browserTitle: 'Railings & Stairs Anchorage AK | Code-Safe, Ice-Aware Builds',
    metaDescription:
      'Custom railings, stairs, and cable or aluminum installs in Anchorage. Grippable rails, stiff posts, cold-climate hardware. Free estimates — Deck Masters AK.',
    heroImage: '/projects/derek-clark-timbertech-cable.jpeg',
    h1Benefit: 'Rails and Stairs That Stay Stiff in Wind and Ice',
    heroSubhead:
      'Loose guards and bouncy stairs are a fall risk — especially with snow boots. Call {phone} for a straight answer on repair versus rebuild.',
    heroSecondaryCta: 'Fix My Railing Today',
    trustPills: ['Code-height guards', 'Stiff post bases', 'Ice-aware details'],
    opening: [
      'Railings and stairs are where people test your deck every day: hands on the top rail, feet on icy treads. If posts flex or pickets loosen, nobody feels safe.',
      'This hub covers custom rail systems, material-specific installs, and stair builds that tie back to solid framing.',
      'If you only need a quick guard fix, you may still land on one of the pages below — the names match how we estimate.',
    ],
    signs: [
      'Top rails move when you lean. Posts rock at the base. Pickets rattle. Those are guard problems, not “maintenance.”',
      'Stair stringers crack, treads cup, or rise and run stop feeling even — tripping hazards get worse with ice.',
      'Cable rails stretch; wood checks; aluminum loosens at brackets. Each material has a different fix — copying a neighbor’s detail without engineering is risky.',
      'Waiting turns a loose post into a failed inspection at sale — or worse, an injury.',
    ],
    agitationTitle: 'Guards and stairs fail when someone needs them — not when it is convenient',
    agitation: [
      'Ice hides bad rise-and-run; guests grab a rail that moves. You are one incident away from regret you cannot price away.',
      'Selling with a shaky guard or odd stair geometry is a negotiation gift to the buyer — or a deal-killer.',
    ],
    optionsIntro: [
      'We publish six related services with exact names for estimates and permits.',
      'Pick the page that matches your material and layout — we still verify posts and attachment in person.',
    ],
    optionsClosing: [
      'Custom railing design fits unique views and odd angles. Aluminum, cable, wood, and composite railing installs each have different hardware schedules. Staircase design and build covers full runs where stringers, landings, and guards must work together.',
    ],
    city: [
      'Wind on exposed lots tests posts and pickets. Ice hides uneven treads. We design for Anchorage use, not a catalog photo from a warm state.',
      'Neighborhoods from Government Hill to the Hillside see different exposure — we adjust bracing and anchor points accordingly.',
    ],
    whatToExpect: [
      'We measure existing runs, check post bases, and confirm height and opening limits for current code expectations.',
      'You see options per material with real lead times and installed cost ranges before you lock a style.',
    ],
    whyChoose: [
      'We tie rails to structure, not just face-screw pickets to thin trim.',
      'Reviews praise communication — important when guards touch siding, roofs, or multi-level exits.',
    ],
    finalCta:
      'Do not gamble on guard movement — call now and we will tell you if you need a full system or targeted hardware upgrades.',
    gridBlurbs: {
      'custom-railing-design': 'Angles, views, and posts placed where architecture demands it.',
      'aluminum-railing-installation': 'Low-maintenance systems with secure brackets and clean lines.',
      'cable-railing-installation': 'Tension and post spacing done so cables stay true over time.',
      'wood-railing-installation': 'Traditional builds with details that shed water in our climate.',
      'composite-railing-installation': 'Matched colors and long spans with manufacturer-aware posts.',
      'staircase-design-build': 'Safe rise-and-run, landings, and guards on new or rebuilt runs.',
    },
  },

  'exterior-renovations-roofing': {
    browserTitle: 'Exterior Renovations & Roofing Anchorage AK | Siding, Roof Lines & Garages',
    metaDescription:
      'Exterior renovations in Anchorage: siding, roofing edges, fascia, soffit, and garage rebuilds. Water-tight layers. Deck Masters AK — free estimates.',
    heroImage: '/projects/doug-mcneil-trex-pergola.jpg',
    h1Benefit: 'Stop Water Before It Reaches the Wall Cavity',
    heroSubhead:
      'Stains, peeling paint, and garage leaks do not fix themselves after thaw. Call {phone} — we trace the stain to the failure and sequence repairs correctly.',
    heroSecondaryCta: 'Get My Free Estimate',
    trustPills: ['Layered weatherproofing', 'Permit help when needed', 'Exterior-focused crew'],
    opening: [
      'Exterior failures show up as drips, stains, or soft sheathing — often at roof-to-wall lines, fascia, or garage roof transitions.',
      'This hub groups the envelope work we do most: big-picture exterior renovations plus targeted siding, fascia, roofing on smaller structures, and garage rebuilds.',
      'If your issue is only inside, we still help you learn whether the roof line or wall is the source before you spend on drywall twice.',
    ],
    signs: [
      'Paint fails in bands under roof edges or near penetrations — that is water management, not “bad paint.”',
      'Siding cups, cracks, or pulls away; you may feel soft OSB behind a small area.',
      'Garage walls rack or roof lines sag; doors bind after snow load.',
      'Waiting lets rot spread along plates and into framing members that should have stayed dry.',
    ],
    agitationTitle: 'Paint hides water — it does not stop it',
    agitation: [
      'You repaint twice while sheathing softens behind laps. Insurance and sale timelines do not wait for “maybe next summer.”',
      'Garage leaks and wall racking get expensive when they touch structure and doors — not just trim.',
    ],
    optionsIntro: [
      'Each link matches how we write scopes — click through for where that line item applies.',
      'Big renovations often combine several lines; smaller jobs may be only fascia or only a garage roof.',
    ],
    optionsClosing: [
      'Exterior home renovations bundle multiple trades into one plan.',
      'Siding replacement and fascia and soffit installation target the skin and edge details.',
      'Roofing services cover protective roof work on smaller structures when that is the leak source.',
      'Garage wall and roof reconstruction address failed garage shells start to finish.',
    ],
    city: [
      'Anchorage wind drives rain into laps and corners. Sun hits south and west faces harder. We plan starter strips, flashings, and ice-and-water lines for what your lot actually sees.',
      'From Downtown tight lots to Sand Lake spreads, access and staging change — we plan so your yard is not torn up longer than needed.',
    ],
    whatToExpect: [
      'We inspect from the ground, ladder, and attic when useful to trace stains.',
      'You get a repair map: tear-off extent, layers replaced, and who pulls permits.',
      'Weather windows matter — we do not promise impossible open-wall dates in shoulder season without a plan B.',
    ],
    whyChoose: [
      'We see decks daily — that means we often see ledger and wall tie-ins others miss on “siding only” bids.',
      'Clear scopes reduce change orders when we open wet sheathing nobody knew was there.',
    ],
    finalCta:
      'If you see new stains after melt, call before the next storm cycle hides the trail behind paint.',
    gridBlurbs: {
      'exterior-home-renovations': 'Whole-wall or multi-face plans when several systems fail together.',
      'siding-replacement': 'Remove and replace cladding with correct flashings and penetrations.',
      'fascia-soffit-installation': 'Edge details that help gutters and vents work together.',
      'roofing-services': 'Roof repairs and replacements sized to the structure we are protecting.',
      'garage-wall-reconstruction': 'Rebuild failing garage walls with straight openings and solid shear.',
      'garage-roof-reconstruction': 'Structural and cover fixes for garage roofs that leak or sag.',
    },
  },

  'contracting-project-services': {
    browserTitle: 'Contracting & Project Services Anchorage AK | GC, Permits & Carpentry',
    metaDescription:
      'Residential GC, permits, demolition, carpentry, and code compliance in Anchorage. One crew, clear paperwork. Deck Masters AK — estimates and scheduling.',
    heroImage: '/projects/matt-blakeslee-multi-level.jpg',
    h1Benefit: 'Planning, Permits, and Build Discipline in One Scope',
    heroSubhead:
      'Big repairs stall when nobody owns the whole chain. Call {phone} — we line up demo, structure, materials, and inspections so you are not chasing three crews.',
    heroSecondaryCta: 'Tell Me What It Would Cost',
    trustPills: ['Written milestones', 'Permit assistance', 'Site-safe workflow'],
    opening: [
      'Project services cover everything that is not a single trade swap: planning, permits, demolition, rough and finish carpentry, and the cleanup when we are done.',
      'If you only need one narrow line, the child page still helps — the names match how we bill.',
      'Water damage and structural repairs often appear here because they touch multiple rooms and codes.',
    ],
    signs: [
      'You have a list of tasks that depend on each other: demo before reframe, reframe before drywall, and inspections between.',
      'Insurance or sale timelines pressure you — you need a schedule with a single point of contact.',
      'You already tried a handyman stopgap and the problem came back bigger.',
      'Waiting on multi-step repairs often means mold risk, frozen pipes, or failed inspections — not just inconvenience.',
    ],
    agitationTitle: 'Complex jobs need one brain — not three voicemails',
    agitation: [
      'You coordinate demo, framing, and dry-out while mold clocks and insurance adjusters keep running — or you stop and live with damage longer.',
      'Stopgap handyman work that fails twice erodes trust at home and costs more than sequencing it right once.',
    ],
    optionsIntro: [
      'Fourteen related services — each page explains when a line item stands alone versus pairs with others.',
      'Residential general contracting is the umbrella; the other pages split the work for clarity and permits.',
    ],
    optionsClosing: [
      'Water damage restoration and structural repairs pair often.',
      'Project management and permit acquisition assistance help when the city wants drawings and sequential inspections.',
      'Site preparation, material sourcing, rough and finish carpentry, framing, demolition, consultation, code compliance, and construction clean-up cover the hands-on and paperwork sides end to end.',
    ],
    city: [
      'Anchorage’s short season means sequencing matters — we do not leave roofs open or walls wet longer than the weather allows.',
      'Material lead times swing; we build that into the plan instead of surprising you mid-job.',
    ],
    whatToExpect: [
      'We start with a walkthrough and photo set, then a written sequence: what happens first, what inspections apply, and what you will see on billing.',
      'You meet the people responsible — not a rotating cast with no memory of last week.',
    ],
    whyChoose: [
      'Reviews highlight communication — on multi-trade jobs, that is the whole game.',
      'We are local, full time, and used to cold-climate exteriors tying back to structure.',
    ],
    finalCta:
      'If your job needs more than one trade, call now — we will map dependencies before you sign anything.',
    gridBlurbs: {
      'residential-general-contracting': 'Single-contract path for jobs that need coordination across trades.',
      'water-damage-restoration': 'Dry-out, removal, and rebuild planning after leaks.',
      'structural-repairs': 'Sistering, headers, and posts when loads or rot demand it.',
      'project-management': 'Scheduling, subs, and checkpoints so nothing gets forgotten.',
      'permit-acquisition-assistance': 'Paperwork help aligned with how Anchorage offices expect packages.',
      'site-preparation': 'Protection, access, and demo staging before work starts.',
      'material-sourcing': 'Ordering lines that match spec and lead-time reality.',
      'rough-carpentry': 'Framing and structure before finishes close in.',
      'finish-carpentry': 'Trim and details that show after paint.',
      'framing-services': 'Walls, floors, and roof framing tied to plans.',
      'demolition-services': 'Selective or full demo with haul-off planning.',
      'consultation-planning': 'Early advice when you are not sure which trade to call first.',
      'building-code-compliance': 'Upgrades when inspections flag missing pieces.',
      'construction-clean-up': 'Job-end cleanup so you are not living in dust.',
    },
  },
};
