import type { ChildServiceSlug } from './siteArchitecture';

/** Prompt 6 — long-form copy for leaf /services/[slug] pages */
export interface ChildPageBundle {
  browserTitle: string;
  metaDescription: string;
  heroImage: string;
  /** Short benefit phrase appended after title in H1 */
  h1Benefit: string;
  /** Use {phone} placeholder */
  heroSubhead: string;
  trustPills: [string, string, string];
  opening: string[];
  whenYouNeed: string[];
  process: string[];
  cost: string[];
  whyChoose: string[];
  finalCta: string;
}

export const childPageCopy: Record<ChildServiceSlug, ChildPageBundle> = {
  'custom-deck-design': {
    browserTitle: 'Custom Deck Design Anchorage AK | Layouts & Code-Aware Plans',
    metaDescription:
      'Custom deck design in Anchorage: layouts, egress, loads, and material options that fit your lot. Deck Masters AK — clear plans before you build.',
    heroImage: '/projects/017-contemporary-design.avif',
    h1Benefit: 'Plans That Fit Your Lot and Code',
    heroSubhead:
      'Unsure where stairs, landings, or guardrails should go? Call {phone} — we measure your space and sketch real options you can build against.',
    trustPills: ['Code-aware layouts', 'Alaska snow & wind loads', 'Written scope'],
    opening: [
      'A strong deck starts with a plan that matches how you use the space, how people move through it, and what Anchorage building requirements expect for height, guards, and connections.',
      'We translate goals into a practical layout: traffic flow, furniture zones, views, and transitions to the yard or garage. You get clarity before lumber is ordered or footings are placed.',
    ],
    whenYouNeed: [
      'You are replacing an older deck and want a better footprint, not a copy-paste of the old mistakes.',
      'You have a tricky lot — slope, tight setbacks, second-story exits, or shared property lines — and you want a design that still feels open.',
    ],
    process: [
      'We walk the site, confirm measurements, and talk through how you want to use the deck through the seasons.',
      'We outline framing intent, stair and guard locations, and decking direction so estimates compare apples to apples. When you are ready, that plan feeds construction or permit conversations.',
    ],
    cost: [
      'Design is a fraction of total project cost but prevents expensive rework. Fees depend on complexity: single-level rectangles cost less to plan than multi-level systems with integrated stairs.',
      'We quote after a short conversation about size, height, and goals. Expect a clear written scope for what the design package includes.',
    ],
    whyChoose: [
      'We build decks in Anchorage, so our layouts account for snow load, durable connections, and details that survive freeze–thaw.',
      'You work with people who speak carpenter and inspector — fewer surprises when it is time to build.',
    ],
    finalCta:
      'Tell us how you want to live on your deck. We will help you lock a layout you are proud of before the first footing goes in.',
  },

  'new-deck-construction': {
    browserTitle: 'New Deck Construction Anchorage AK | Ground-Up Builds',
    metaDescription:
      'New deck construction in Anchorage: footings, framing, decking, and railings built for Alaska weather. Free estimates from Deck Masters AK.',
    heroImage: '/projects/002-aerial-view-new.avif',
    h1Benefit: 'Ground-Up Builds Done Right',
    heroSubhead:
      'Starting from dirt or a blank ledger? Call {phone} — we sequence footings, framing, and finishes so your new deck is solid from day one.',
    trustPills: ['New construction sequence', 'Anchorage-ready details', 'Clean job sites'],
    opening: [
      'A new deck is a chance to get structure, drainage, and connections right the first time. We focus on load path, hardware, and details that hold up to snow, wind, and daily use.',
      'Whether you are stepping out from a single door or tying into multiple levels, we build a frame you can trust and a deck surface you will actually use.',
    ],
    whenYouNeed: [
      'You are finishing a remodel or new siding and want a deck that matches the home’s trim and traffic patterns.',
      'You have an empty yard or a failed old deck removed — you need a full build from footings up.',
    ],
    process: [
      'We confirm design intent, mark layout, and install footings or piles to plan. Framing follows with verified square and level runs.',
      'We set decking, guards, and stairs to match code and your finish goals, then walk you through care and what to watch seasonally.',
    ],
    cost: [
      'New builds are priced by size, height, access, materials, and how much structure sits below walking surface. Composite and glass rails cost more than treated lumber systems.',
      'We provide a written estimate tied to your layout — not a generic square-foot guess that changes mid-project.',
    ],
    whyChoose: [
      'We specialize in exterior carpentry in Anchorage, so details like ledger flashing and lateral bracing are part of the standard conversation.',
      'You get a crew that respects your property and communicates when weather or inspections adjust the schedule.',
    ],
    finalCta:
      'Ready to break ground on a new deck? Share your timeline and we will map the next steps.',
  },

  'multi-level-decks': {
    browserTitle: 'Multi-Level Decks Anchorage AK | Stairs, Landings & Flow',
    metaDescription:
      'Multi-level decks in Anchorage: landings, stair runs, transitions, and code-compliant guards. Design and build with Deck Masters AK.',
    heroImage: '/projects/050-bonus-1.avif',
    h1Benefit: 'Levels That Flow Together',
    heroSubhead:
      'Split levels can eat budget fast without a plan. Call {phone} — we tie landings, stairs, and views into one coherent system.',
    trustPills: ['Stair & landing logic', 'Guard continuity', 'Efficient framing'],
    opening: [
      'Multi-level decks solve elevation changes and create separate zones for cooking, lounging, and circulation. They also multiply connection points and load paths — details matter.',
      'We design transitions so you are not fighting awkward steps or rail gaps. Each level should feel intentional, not like an afterthought stacked on framing.',
    ],
    whenYouNeed: [
      'Your yard drops away from the house or you want a dedicated hot-tub or dining platform separate from the main walkout.',
      'You are tying a second-story exit to a mid-level landing before the yard — guard heights and stair geometry must line up.',
    ],
    process: [
      'We model how people move: where stairs land, how guards meet at corners, and how water runs off each surface.',
      'Framing is staged level by level with temporary bracing as needed. Finishes follow once structure and inspections align.',
    ],
    cost: [
      'Expect higher framing and railing costs than a single platform — more posts, more hardware, and often more stair parts.',
      'We estimate from your target sizes and materials; changes mid-build are minimized with upfront landing and stair decisions.',
    ],
    whyChoose: [
      'We have built elevated and tiered systems in Alaska and know where snow and ice collect on intermediate landings.',
      'Our crews think in 3D — not just square footage — so the finished deck feels cohesive.',
    ],
    finalCta:
      'Want levels that work with your slope and lifestyle? Let’s sketch the flow before we cut a post.',
  },

  'deck-replacement': {
    browserTitle: 'Deck Replacement Anchorage AK | Full Tear-Off & Rebuild',
    metaDescription:
      'Deck replacement in Anchorage: safe tear-off, ledger inspection, and rebuilds sized for today’s codes. Deck Masters AK — free estimates.',
    heroImage: '/projects/046-ground-level-1.avif',
    h1Benefit: 'Replace What Failed — Build What Lasts',
    heroSubhead:
      'Rotten rim or tired framing? Call {phone} — we strip to structure, fix what hid underneath, and rebuild for decades of use.',
    trustPills: ['Ledger & flashing review', 'Code-current rebuilds', 'Clean tear-off'],
    opening: [
      'Replacement is often the right move when repairs stack up, guards are outdated, or the footprint no longer fits how you live. We treat tear-off as discovery — not just decking swap.',
      'We inspect the ledger, posts, and connections that older decks hide. What we find drives the rebuild plan so you are not covering failing structure with new boards.',
    ],
    whenYouNeed: [
      'Bounce, cupping boards, or persistent water at the house wall are warning signs that surface boards are not the whole problem.',
      'You want a larger or re-shaped deck but the old frame cannot support the new layout.',
    ],
    process: [
      'We protect the work area, remove decking and rails, and expose framing for evaluation. Repairs or full reframe follow the plan you approve.',
      'New decking, guards, and stairs install to match materials you chose, with final walkthrough on care and fasteners.',
    ],
    cost: [
      'Cost splits between demolition, unforeseen framing repair, and your finish package. Unknowns decrease when we see the ledger early.',
      'We quote ranges when needed and update in writing if we uncover mandatory structural fixes.',
    ],
    whyChoose: [
      'We specialize in decks, so tear-off crews know how to work around siding and foundations carefully.',
      'You get straight talk on what must be fixed versus what can wait — no fear-based upsells.',
    ],
    finalCta:
      'Curious whether to repair or replace? We will tell you honestly after a look at what is under the surface.',
  },

  'composite-decking-installation': {
    browserTitle: 'Composite Decking Installation Anchorage AK | Low-Maintenance Decks',
    metaDescription:
      'Composite decking installation in Anchorage: proper gapping, fascia, and hidden fasteners for warranty-backed performance. Deck Masters AK.',
    heroImage: '/projects/composite-decking-texture.avif',
    h1Benefit: 'Installed to Manufacturer Detail',
    heroSubhead:
      'Composite needs correct joist spacing and expansion gaps. Call {phone} — we follow brand specs so your surface performs in cold snaps.',
    trustPills: ['Brand-correct spacing', 'Clean fascia lines', 'Hidden fastener options'],
    opening: [
      'Composite and cap-stock decking reward precise installation. Boards move with temperature; manufacturers spell out gapping at ends and breaks — we follow those rules.',
      'We pair composite surfaces with framing that meets span tables and ventilation expectations so you do not void warranty over shortcuts.',
    ],
    whenYouNeed: [
      'You want a deck that shrinks yearly staining without looking like plastic — modern composites balance both.',
      'You are re-decking an existing frame that is sound but tired of wood maintenance.',
    ],
    process: [
      'We confirm joist layout and may sister or add joists for the brand you chose. Layout strings keep board runs straight on long decks.',
      'We install per fastening pattern, picture-frame where planned, and detail stairs and breaker boards so expansion has a place to go.',
    ],
    cost: [
      'Material drives budget — composite runs higher than treated pine but saves long-term coating labor.',
      'Labor reflects detail level: picture frames, breaker boards, and integrated lighting add hours but look intentional.',
    ],
    whyChoose: [
      'We have installed multiple composite lines and read the fine print so details match warranty expectations.',
      'Anchorage temperature swings are real — we plan gaps so winter does not buckle your investment.',
    ],
    finalCta:
      'Ready to swap wood for composite? Tell us the brand you are considering and we will confirm framing readiness.',
  },

  'wood-decking-installation': {
    browserTitle: 'Wood Decking Installation Anchorage AK | Cedar & Treated Decks',
    metaDescription:
      'Wood decking installation in Anchorage: proper gaps, screw patterns, and durable species for northern weather. Deck Masters AK.',
    heroImage: '/projects/021-custom-entrance.avif',
    h1Benefit: 'Natural Boards, Solid Detail',
    heroSubhead:
      'Want the warmth of real wood? Call {phone} — we set crown, gap for drainage, and fasten for a quiet, firm walk.',
    trustPills: ['Species-aware install', 'Drainage-minded gaps', 'Railing integration'],
    opening: [
      'Wood remains popular for cost, feel, and repairability. Installation quality determines how soon you fight cupping, splits, or nail pops.',
      'We think about grain direction, ventilation, and how water leaves the deck — not just laying boards fast.',
    ],
    whenYouNeed: [
      'You prefer periodic staining over synthetic upfront cost, or you are matching an existing wood aesthetic.',
      'You are refreshing decking on a solid frame and want boards that will accept future sanding or spot replacement.',
    ],
    process: [
      'We inspect framing for flatness and span, then lay out board runs to minimize waste and avoid narrow rip strips at the outer edge.',
      'Fasteners follow your preference — face screw with plugs, color-matched screws, or hidden systems compatible with wood thickness.',
    ],
    cost: [
      'Wood decking is typically less than composite upfront; budget for stain or sealer cycles every few years.',
      'Labor is competitive with composite on simple rectangles; diagonal or herringbone patterns add time.',
    ],
    whyChoose: [
      'We build in Alaska and choose details that handle snow shoveling and wet shoulder seasons.',
      'You get carpenters who take pride in straight lines and consistent gapping.',
    ],
    finalCta:
      'Planning a wood surface? We will help you pick fastener and board strategies that match how you maintain the deck.',
  },

  'deck-framing': {
    browserTitle: 'Deck Framing Anchorage AK | Beams, Joists & Ledgers',
    metaDescription:
      'Deck framing in Anchorage: ledgers, beams, joists, and hardware sized for snow loads. Professional framing from Deck Masters AK.',
    heroImage: '/projects/001-aerial-wraparound.avif',
    h1Benefit: 'Structure Built to Carry Loads',
    heroSubhead:
      'Framing is where decks succeed or fail. Call {phone} — we set square, level runs and hardware that matches engineering intent.',
    trustPills: ['Load-path focus', 'Corrosion-resistant hardware', 'Inspection-ready'],
    opening: [
      'Everything you walk on hangs from framing: ledger attachment, posts, beams, and joist layout. Weak points show up as bounce, tilt, or seasonal movement.',
      'We frame with clear spans, proper bearing, and connectors specified for exterior exposure — not interior-grade shortcuts.',
    ],
    whenYouNeed: [
      'You are expanding a deck footprint or raising a surface and need new beams and joists to match.',
      'An inspector or engineer flagged insufficient joists or missing lateral load details.',
    ],
    process: [
      'Layout and temporary posts establish plane and square. We install ledgers with flashing integration where the deck meets the house.',
      'Beams and joists go in per plan; bracing and railing posts are coordinated before decking closes the workspace.',
    ],
    cost: [
      'Framing cost ties to linear feet of lumber, beam size, and height — second-story work adds labor and equipment.',
      'Engineering stamps add fee but remove guesswork on large spans or unusual loads.',
    ],
    whyChoose: [
      'Deck Masters AK focuses on exterior work in Anchorage — we frame decks weekly, not occasionally.',
      'We communicate what we find at the house wall so water issues get addressed before new lumber hides them.',
    ],
    finalCta:
      'Need framing you can stand on with confidence? We will spec and build the skeleton right.',
  },

  'deck-footings-foundations': {
    browserTitle: 'Deck Footings & Foundations Anchorage AK | Piles & Posts',
    metaDescription:
      'Deck footings and foundations in Anchorage: depth, frost heave, and stable posts for elevated decks. Deck Masters AK.',
    heroImage: '/projects/001-aerial-wraparound.avif',
    h1Benefit: 'Anchorage-Grade Support Below Grade',
    heroSubhead:
      'Frost and soil vary block to block. Call {phone} — we set posts and footings so your deck does not drift or sink.',
    trustPills: ['Frost-depth awareness', 'Stable post bases', 'Engineering when required'],
    opening: [
      'Anchorage decks need footings that handle freeze–thaw and sometimes poor soils. The right depth and diameter matter as much as what sits above.',
      'We coordinate pier or pile solutions with your height goals and local expectations — so posts stay plumb season after season.',
    ],
    whenYouNeed: [
      'You are building new or replacing posts that have heaved, rotted at grade, or pulled out of shallow pads.',
      'You are adding weight — hot tubs, heavy planters, or large gatherings — and need verified capacity below.',
    ],
    process: [
      'We locate posts off the plan, dig or drill to spec, and set tubes or piles with level bracing before beams land.',
      'Post bases and connections are detailed for uplift and lateral loads as required before framing continues.',
    ],
    cost: [
      'Footing work is sensitive to access, rock, and depth — site visits reduce surprises.',
      'Multiple posts and tall piers cost more than minimal pads; we quote after seeing grade and layout.',
    ],
    whyChoose: [
      'We have set footings across Anchorage conditions and know when to call for engineered solutions.',
      'You avoid the regret of a beautiful deck on posts that move every spring.',
    ],
    finalCta:
      'Unsure if your old footings are adequate? We will assess and recommend a fix with numbers you can trust.',
  },

  'custom-railing-design': {
    browserTitle: 'Custom Railing Design Anchorage AK | Guards That Fit the View',
    metaDescription:
      'Custom railing design in Anchorage: height, strength, and style that meets code without blocking your deck. Deck Masters AK.',
    heroImage: '/projects/021-custom-entrance.avif',
    h1Benefit: 'Guards That Match the Deck',
    heroSubhead:
      'Rails are safety gear and curb appeal. Call {phone} — we balance code minimums with sightlines you actually want.',
    trustPills: ['Code-height clarity', 'Post layout planning', 'Mixed-material options'],
    opening: [
      'Railings must resist push loads and maintain consistent height — but they also frame how the deck feels. Custom design picks post spacing, top cap profiles, and infill that fits your home.',
      'We plan rails while framing is open so posts land in structurally sound positions, not as afterthoughts bolted to rim boards.',
    ],
    whenYouNeed: [
      'You have a view you do not want chopped by bulky pickets, or you need a modern glass or cable aesthetic.',
      'Your deck shape changes direction often — rails need logical breaks and returns.',
    ],
    process: [
      'We review height requirements for your stair and walking surfaces, then choose post style and infill that meet strength testing expectations.',
      'Fabrication or ordering lead times are built into the schedule so finishes are not delayed at the end.',
    ],
    cost: [
      'Custom metal or glass systems cost more than wood pickets but change the whole look.',
      'We price from perimeter length, corners, stairs, and chosen system — not guesswork.',
    ],
    whyChoose: [
      'We integrate rails with decking and stairs so transitions look built-in, not patched together.',
      'Anchorage wind and use patterns inform how we detail posts and connections.',
    ],
    finalCta:
      'Want rails that feel designed, not defaulted? Bring inspiration photos — we will translate them into a buildable plan.',
  },

  'aluminum-railing-installation': {
    browserTitle: 'Aluminum Railing Installation Anchorage AK | Low-Maintenance Guards',
    metaDescription:
      'Aluminum railing installation in Anchorage: powder-coated systems, secure posts, and code-compliant heights. Deck Masters AK.',
    heroImage: '/projects/020-contemporary-full.avif',
    h1Benefit: 'Strong, Weather-Ready Rails',
    heroSubhead:
      'Aluminum rails shrug off moisture. Call {phone} — we anchor posts and panels square for a tight, rattle-free fit.',
    trustPills: ['Powder-coat systems', 'Secure post mounts', 'Fast install vs. weld'],
    opening: [
      'Aluminum rail kits offer consistent profiles, minimal upkeep, and clean lines on modern decks. Installation is about plumb posts, correct bracket spacing, and stair transitions.',
      'We verify manufacturer requirements against your framing so panels seat without flex or odd gaps at corners.',
    ],
    whenYouNeed: [
      'You want near-zero maintenance rails on a composite or PVC deck.',
      'You are tired of repainting wood pickets every few seasons.',
    ],
    process: [
      'We lay out post centers from plan, attach mounting hardware to framing or fascia per spec, then set rails level with consistent picket reveal.',
      'Stair rails get rake cuts and transitions that meet graspability and height rules for your run.',
    ],
    cost: [
      'Kit pricing is often per linear foot plus corners and stair kits — we quote after measuring.',
      'Retrofit on old decks may need post reinforcement — we flag that early.',
    ],
    whyChoose: [
      'We install kit systems regularly and catch compatibility issues before panels are ordered wrong.',
      'You get crisp lines and hardware that holds up in coastal Alaska moisture.',
    ],
    finalCta:
      'Considering aluminum? Tell us your deck perimeter and stair count for a tight estimate.',
  },

  'cable-railing-installation': {
    browserTitle: 'Cable Railing Installation Anchorage AK | Minimal View Obstruction',
    metaDescription:
      'Cable railing installation in Anchorage: tension, spacing, and posts engineered for thin-profile guards. Deck Masters AK.',
    heroImage: '/projects/008-aerial-elevated.avif',
    h1Benefit: 'Thin Lines, Maximum View',
    heroSubhead:
      'Cable rails need tension and spacing discipline. Call {phone} — we set posts stiff enough so cables stay true.',
    trustPills: ['Tension systems done right', 'Stiff post layout', 'Code spacing checks'],
    opening: [
      'Cable infill looks minimal but demands strong posts and correct cable spacing so a sphere cannot pass — inspectors check this.',
      'We choose frames rated for cable loads and follow manufacturer tension patterns so rails do not loosen after the first season.',
    ],
    whenYouNeed: [
      'You have a view deck, lofted walkout, or waterfront angle where pickets feel heavy.',
      'You want a contemporary look paired with wood or composite decking.',
    ],
    process: [
      'Post stiffness drives the system — we may upgrade posts or reduce spans before cables go in.',
      'We tension per spec, trim cleanly, and verify spacing at corners and stairs where geometry tightens.',
    ],
    cost: [
      'Cable systems cost more than basic wood rails due to hardware and stronger posts.',
      'Corners and stairs multiply fittings — we measure carefully before ordering.',
    ],
    whyChoose: [
      'We respect the engineering intent of cable systems — loose cables fail inspection and look sloppy.',
      'Anchorage wind loads matter; we detail posts for flex you can feel when you lean.',
    ],
    finalCta:
      'Dreaming of cable rails? We will confirm your frame can handle the system before you buy material.',
  },

  'wood-railing-installation': {
    browserTitle: 'Wood Railing Installation Anchorage AK | Traditional Picket Rails',
    metaDescription:
      'Wood railing installation in Anchorage: 4x4 posts, rails, and balusters built to code. Craftsmanship from Deck Masters AK.',
    heroImage: '/projects/021-custom-entrance.avif',
    h1Benefit: 'Classic Craft, Code Heights',
    heroSubhead:
      'Wood rails belong on many Alaska homes. Call {phone} — we set sturdy posts and even picket spacing.',
    trustPills: ['Traditional profiles', 'Paint or stain ready', 'Stair rake cuts'],
    opening: [
      'Wood railings offer warmth and easy local repair. Success is plumb posts, consistent baluster spacing, and solid anchorage to framing.',
      'We think about how rails meet stairs and corners so trim carpentry looks intentional, not improvised.',
    ],
    whenYouNeed: [
      'You are matching historical style or keeping budget lower than metal or glass.',
      'You want a paint color tied to trim — wood takes finish predictably.',
    ],
    process: [
      'Posts are set to height and fastened to framing designed for guard loads. Top and bottom rails follow with balusters on layout marks.',
      'We detail post caps and skirts as specified, then leave surfaces ready for your painter or stain crew.',
    ],
    cost: [
      'Wood rails are typically the most economical guard option upfront; maintenance is the tradeoff.',
      'Complex profiles and large posts add material and labor.',
    ],
    whyChoose: [
      'We build wood rails that survive real use — kids leaning, snow sliding, planters pushed against pickets.',
      'You get clean joinery at corners and consistent reveal lines.',
    ],
    finalCta:
      'Prefer traditional wood guards? We will build them stout and straight.',
  },

  'composite-railing-installation': {
    browserTitle: 'Composite Railing Installation Anchorage AK | Matched Deck Systems',
    metaDescription:
      'Composite railing installation in Anchorage: matched posts, sleeves, and infill for cohesive deck systems. Deck Masters AK.',
    heroImage: '/projects/006-aerial-composite.avif',
    h1Benefit: 'Matched Colors & Profiles',
    heroSubhead:
      'Composite rails pair with synthetic decking. Call {phone} — we install kits so seams and brackets stay hidden.',
    trustPills: ['System-matched parts', 'Hidden bracket options', 'Low upkeep'],
    opening: [
      'Composite railing systems are designed to match decking lines — post sleeves, skirts, and top rails hide fasteners and resist splintering.',
      'Installation follows brand instructions for post blocking, span limits, and thermal movement.',
    ],
    whenYouNeed: [
      'You chose composite decking and want a unified look without painting wood rails.',
      'You want consistent color from walking surface to guardrail cap.',
    ],
    process: [
      'We verify post locations against framing blocking before sleeves slide on. Rails lock into brackets level and straight.',
      'Stair sections use matched kits with adjustable angles where the manufacturer allows.',
    ],
    cost: [
      'Composite rails cost more than pressure-treated wood but less than many glass systems.',
      'Accessory packs for corners and stairs add to material totals — we itemize.',
    ],
    whyChoose: [
      'We install major composite lines and catch incompatible generations before order.',
      'You avoid the disappointment of rails that fade differently than decking — we stick within system families.',
    ],
    finalCta:
      'Already picked a decking brand? We will match railing components that belong with that system.',
  },

  'staircase-design-build': {
    browserTitle: 'Staircase Design & Build Anchorage AK | Deck Stairs That Feel Right',
    metaDescription:
      'Staircase design and build in Anchorage: rise, run, landings, and guards calculated for comfort and code. Deck Masters AK.',
    heroImage: '/projects/050-bonus-1.avif',
    h1Benefit: 'Comfortable Rise-and-Run',
    heroSubhead:
      'Bad stairs trip people and fail inspection. Call {phone} — we engineer runs, landings, and rail continuity.',
    trustPills: ['Consistent tread depth', 'Landing rules', 'Continuous handrails'],
    opening: [
      'Deck stairs are high-traffic and high-risk. Rise and run must stay uniform; landings appear where vertical change demands them; guards connect logically to walking levels.',
      'We design stairs when the deck is planned — not as a late add-on — so framing and posts support the geometry you need.',
    ],
    whenYouNeed: [
      'You are changing deck height, adding a mid-run door, or replacing dangerously steep steps.',
      'You need a switchback or wide landing for furniture moves or accessibility goals.',
    ],
    process: [
      'We calculate total rise, divide into equal treads, and verify headroom and width. Stringers are laid out and hung with proper bearing.',
      'Rails and graspable handrails follow code paths; lighting or trim details finish the look.',
    ],
    cost: [
      'Stair cost scales with width, number of flights, and material — wide stone landings or steel stringers jump budget.',
      'We quote from field measurements because total rise drives everything.',
    ],
    whyChoose: [
      'We build exterior stairs in Alaska conditions — tread grip and drainage matter in icy months.',
      'You get stairs that feel natural to climb, not an afterthought tacked on the side.',
    ],
    finalCta:
      'Replacing or adding stairs? Measure rough height and call — we will sanity-check before cutting stringers.',
  },

  'deck-board-replacement': {
    browserTitle: 'Deck Board Replacement Anchorage AK | Resurface Without Full Tear-Off',
    metaDescription:
      'Deck board replacement in Anchorage: swap damaged boards, upgrade to composite, and refresh walking surfaces. Deck Masters AK.',
    heroImage: '/projects/046-ground-level-1.avif',
    h1Benefit: 'Fresh Boards on Sound Framing',
    heroSubhead:
      'If joists are solid, you may not need a full rebuild. Call {phone} — we replace boards and refasten smart.',
    trustPills: ['Frame check first', 'Matching thickness', 'Fastener upgrades'],
    opening: [
      'Sometimes decking fails before structure: sun checks, cupping, or localized rot from planters. Targeted board replacement restores the walk surface without starting over.',
      'We still inspect joists and ledgers — new boards on bad framing wastes money.',
    ],
    whenYouNeed: [
      'You have isolated rot, nail pops everywhere, or splinters making the deck unpleasant.',
      'You want to upgrade to composite on joists that meet span for the new product.',
    ],
    process: [
      'We remove fasteners, pull damaged boards, and verify joist spacing and flatness. Repairs come first.',
      'New boards go down with correct gapping and fastening pattern for the material you chose.',
    ],
    cost: [
      'Pricing is area-based plus material — a partial resurface costs far less than full replacement when framing is good.',
      'Switching to composite may require joist upgrades — we note that before you buy boards.',
    ],
    whyChoose: [
      'We tell you honestly if boards alone are enough — we do not resurface failing frames.',
      'Fast, clean work minimizes downtime on decks you use daily.',
    ],
    finalCta:
      'Wondering if you only need new boards? Invite us for a walk — we will point at what matters.',
  },

  'structural-deck-repair': {
    browserTitle: 'Structural Deck Repair Anchorage AK | Joists, Ledgers & Posts',
    metaDescription:
      'Structural deck repair in Anchorage: sister joists, ledger fixes, post replacement, and lateral bracing. Deck Masters AK.',
    heroImage: '/projects/001-aerial-wraparound.avif',
    h1Benefit: 'Fix What Carries the Load',
    heroSubhead:
      'Soft posts or a spongy rim are serious. Call {phone} — we stabilize structure before cosmetics.',
    trustPills: ['Load-path focus', 'Flashing integration', 'Engineering referrals'],
    opening: [
      'Structural repairs address bounce, tilt, or decay where the deck ties to the house or meets the ground. These are not cosmetic patches.',
      'We expose problem zones, propose fixes that restore strength, and sequence work so the deck stays safe during repairs.',
    ],
    whenYouNeed: [
      'You notice sagging, visible cracks in joists, or corrosion at connectors.',
      'An inspection flagged missing hardware, inadequate joists, or water at the ledger.',
    ],
    process: [
      'We shore or stage loads as needed, remove compromised members, and install sisters, posts, or beams per plan.',
      'Ledger and flashing work may involve siding cooperation — we coordinate details so water is managed.',
    ],
    cost: [
      'Structural work is time-and-materials sensitive to what we find — we provide ranges and written change notes.',
      'Engineering adds cost but removes liability on complex repairs.',
    ],
    whyChoose: [
      'We focus on exterior structures in Anchorage — this is core work for us, not a side gig.',
      'Safety first: we will red-tag mentally unsafe areas and explain options clearly.',
    ],
    finalCta:
      'Worried your deck is unsafe? Call — we prioritize serious structural issues on the schedule.',
  },

  'railing-repair': {
    browserTitle: 'Deck Railing Repair Anchorage AK | Loose Posts & Balusters',
    metaDescription:
      'Deck railing repair in Anchorage: tighten posts, replace balusters, fix loose top rails, and meet guard height. Deck Masters AK.',
    heroImage: '/projects/021-custom-entrance.avif',
    h1Benefit: 'Guards That Stay Solid',
    heroSubhead:
      'Wobbly rails are a hazard. Call {phone} — we re-anchor posts and rebuild sections to code.',
    trustPills: ['Post tightening', 'Baluster spacing fixes', 'Stair rail continuity'],
    opening: [
      'Rails loosen from seasonal movement, fastener corrosion, or undersized posts. Repairs range from simple re-fastening to partial rebuilds.',
      'We check whether posts are mounted to framing that can actually resist guard loads — sometimes the fix is deeper than a new screw.',
    ],
    whenYouNeed: [
      'Rails move when you lean, balusters are missing, or picket spacing no longer passes code.',
      'You are prepping to sell and need obvious guard issues resolved.',
    ],
    process: [
      'We inspect connections, propose repair vs. replace per section, and work top-down to keep the deck usable.',
      'Finishes tie into existing stain or paint where possible for a blended look.',
    ],
    cost: [
      'Small repairs are modest; full perimeter replacement aligns with new railing estimates.',
      'We quote by linear foot after seeing post condition and access.',
    ],
    whyChoose: [
      'We understand Anchorage wind and kid-load on rails — repairs are done for real-world use.',
      'You get straight answers when a patch is enough versus when replacement is smarter.',
    ],
    finalCta:
      'Rails feel sketchy? Do not wait — we can stabilize many systems in a single visit plan.',
  },

  'stair-repair': {
    browserTitle: 'Deck Stair Repair Anchorage AK | Stringers, Treads & Landing Fixes',
    metaDescription:
      'Deck stair repair in Anchorage: fix cracked stringers, loose treads, and landing issues. Safe steps from Deck Masters AK.',
    heroImage: '/projects/050-bonus-1.avif',
    h1Benefit: 'Steps You Can Trust',
    heroSubhead:
      'Uneven treads or rotted stringers are accidents waiting. Call {phone} — we rebuild runs to uniform rise.',
    trustPills: ['Uniform rise/run', 'Solid stringers', 'Handrail integrity'],
    opening: [
      'Stair failures often show as bounce, split stringers, or inconsistent tread depth — each is a trip or inspection issue.',
      'We evaluate whether localized fixes work or a new stringer set is the economical long-term answer.',
    ],
    whenYouNeed: [
      'Treads rock, nosings are split, or you feel flex mid-flight.',
      'Winter ice exposed drainage problems that rotted bottom treads or posts.',
    ],
    process: [
      'We measure total rise and compare to existing layout — sometimes a full rebuild clears inherited mistakes.',
      'Stringers hang on proper bearing; we replace fasteners and add blocking where manufacturers require.',
    ],
    cost: [
      'Repair cost depends on how many risers and whether landings or posts are involved.',
      'Full stair rebuilds are quoted as mini-projects with clear scope.',
    ],
    whyChoose: [
      'We build exterior stairs regularly — we know where Alaska decks fail first.',
      'You get consistent detail from top tread to yard landing.',
    ],
    finalCta:
      'Stairs feel wrong underfoot? Let us measure once and fix them right.',
  },

  'water-damage-repair-decks': {
    browserTitle: 'Water Damage Deck Repair Anchorage AK | Rot & Ledger Issues',
    metaDescription:
      'Water damage repair for decks in Anchorage: find leaks, fix ledgers, and replace rotted members. Deck Masters AK.',
    heroImage: '/projects/046-ground-level-1.avif',
    h1Benefit: 'Stop the Leak, Then Rebuild',
    heroSubhead:
      'Water always points to a source. Call {phone} — we trace damage and fix flashing, not just boards.',
    trustPills: ['Moisture tracing', 'Ledger & flashing', 'Rot replacement'],
    opening: [
      'Deck water damage often tracks to ledger flashing gaps, clogged gutters above, or splash-back at grade. Boards may look bad while rim joists are worse.',
      'We dry in concept first: stop the water, then replace compromised wood and connectors.',
    ],
    whenYouNeed: [
      'You see staining at the house wall, soft rim, or mushrooms near posts.',
      'Paint or stain keeps failing in the same zone — a symptom, not the disease.',
    ],
    process: [
      'We open suspect areas carefully, document damage extent, and repair in layers: flashing integration, framing, then surface.',
      'We coordinate with siding or roofing trades when the fix crosses disciplines.',
    ],
    cost: [
      'Cost scales with how far water traveled — sometimes a small opening reveals a bigger repair.',
      'We communicate staged pricing once the envelope is visible.',
    ],
    whyChoose: [
      'We fix decks, not just symptoms — recurring rot after a cheap skin job is a waste.',
      'Anchorage precipitation and melt patterns inform where we look first.',
    ],
    finalCta:
      'Seeing rot or stains? Address it before it reaches the house envelope — call for an assessment.',
  },

  'mold-remediation-decks': {
    browserTitle: 'Deck Mold & Mildew Treatment Anchorage AK | Ventilation & Repairs',
    metaDescription:
      'Deck-related mold and mildew in Anchorage: improve drainage, ventilation, and replace affected materials. Deck Masters AK.',
    heroImage: '/projects/046-ground-level-1.avif',
    h1Benefit: 'Dry Details, Healthier Spaces',
    heroSubhead:
      'Mildew on decking is often moisture + shade. Call {phone} — we fix airflow and materials, not just spray-and-ignore.',
    trustPills: ['Moisture source focus', 'Material replacement', 'Ventilation advice'],
    opening: [
      'Exterior mold on decks ties to standing moisture on boards, debris between gaps, or poor sun exposure. Sometimes it signals rot underneath.',
      'We separate cosmetic growth from structural decay — different scopes, different fixes.',
    ],
    whenYouNeed: [
      'Persistent black growth returns every season despite cleaning.',
      'You smell mustiness near enclosed patio areas or under poorly ventilated storage beneath the deck.',
    ],
    process: [
      'We inspect ventilation, drainage, and framing beneath. Cleaning may help surfaces; rotten members get replaced.',
      'We recommend maintenance rhythms and sometimes redesign details that trap moisture.',
    ],
    cost: [
      'Light cleaning and treatment costs little; hidden rot repairs add scope.',
      'We quote after identifying whether the issue is surface-only.',
    ],
    whyChoose: [
      'We will not sell mystery chemicals without addressing why moisture stayed.',
      'Your deck should be a place to breathe easy — we target durable solutions.',
    ],
    finalCta:
      'Battling mildew every summer? Let us find whether it is shade, drainage, or something worse.',
  },

  'storm-damage-repair-decks': {
    browserTitle: 'Storm Damage Deck Repair Anchorage AK | Wind, Snow & Impact',
    metaDescription:
      'Storm damage deck repair in Anchorage: wind-lifted rails, broken posts, and snow-load issues. Fast assessments from Deck Masters AK.',
    heroImage: '/projects/001-aerial-wraparound.avif',
    h1Benefit: 'Recover After Weather Hits',
    heroSubhead:
      'Storms expose weak connections. Call {phone} — we secure what’s loose and replace what bent or broke.',
    trustPills: ['Rapid assessment', 'Insurance-ready notes', 'Structural priority'],
    opening: [
      'High wind and heavy snow test posts, guards, and roof-adjacent decks. Damage may be obvious — lifted rails — or subtle — shifted ledger bolts.',
      'We document conditions, prioritize life-safety fixes, and rebuild to stronger detail where storms found weakness.',
    ],
    whenYouNeed: [
      'Branches impacted the deck, rails tore loose, or snow bent unsupported cantilevers.',
      'You need documentation for an insurance claim with clear scope language.',
    ],
    process: [
      'We stabilize immediately where possible, then scope full repairs with photos and measurements.',
      'Rebuilds incorporate strapping, posts, and hardware suited to exposed locations.',
    ],
    cost: [
      'Emergency stabilization may be a separate line from full cosmetic restoration.',
      'We work with your timeline when materials are scarce after regional storms.',
    ],
    whyChoose: [
      'We know Alaska weather loads and where decks fail first in gusts.',
      'Clear written scopes help carriers and homeowners align expectations.',
    ],
    finalCta:
      'Storm damage? Secure the area, then call — we will triage and plan permanent fixes.',
  },

  'exterior-home-renovations': {
    browserTitle: 'Exterior Home Renovations Anchorage AK | Siding, Trim & Envelope',
    metaDescription:
      'Exterior home renovations in Anchorage: coordinated siding, trim, and deck tie-ins for a cohesive envelope. Deck Masters AK.',
    heroImage: '/projects/006-aerial-composite.avif',
    h1Benefit: 'Facades That Work Together',
    heroSubhead:
      'Decks meet walls at critical flashings. Call {phone} — we coordinate exterior upgrades so transitions seal.',
    trustPills: ['Envelope thinking', 'Deck-to-wall details', 'Phased projects'],
    opening: [
      'Renovating the outside of your home is a chance to fix water paths where decks, doors, and roofs intersect. Piecemeal patches often leak again.',
      'We align deck work with siding and trim schedules so flashings lap correctly and finishes match.',
    ],
    whenYouNeed: [
      'You are re-siding or replacing windows and want deck ledgers addressed properly at the same time.',
      'Multiple trades are involved — you need a carpenter who reads the whole facade.',
    ],
    process: [
      'We sequence demolition, structural fixes, weather barrier, and trim. Deck connections are detailed before siding closes access.',
      'Final walks verify caulk lines, counter-flashing, and customer punch items.',
    ],
    cost: [
      'Whole-exterior scopes are estimate-driven; we break out deck-related portions when helpful.',
      'Phasing spreads cash flow but can cost more in mobilization — we discuss tradeoffs.',
    ],
    whyChoose: [
      'Deck Masters AK bridges deck craft with broader exterior carpentry needs in Anchorage.',
      'Fewer finger-pointing issues between “deck guy” and “siding guy” when one team plans transitions.',
    ],
    finalCta:
      'Planning a facade refresh? Bring us in early where decks touch the house.',
  },

  'siding-replacement': {
    browserTitle: 'Siding Replacement Anchorage AK | Lap, Panel & Trim',
    metaDescription:
      'Siding replacement in Anchorage: remove failed cladding, repair sheathing, and install durable exterior finishes. Deck Masters AK.',
    heroImage: '/projects/006-aerial-composite.avif',
    h1Benefit: 'New Skin, Solid Sheathing',
    heroSubhead:
      'Failed siding hides wall damage. Call {phone} — we strip, repair, and re-side with deck ties coordinated.',
    trustPills: ['Weather barrier discipline', 'Deck ledger access', 'Clean lines'],
    opening: [
      'Siding replacement is the right time to fix what is behind the pretty layer: flashing, WRB continuity, and insect damage.',
      'Where decks mount, we sequence siding and ledger flashing so you do not trap moisture at the rim.',
    ],
    whenYouNeed: [
      'Panels are cracked, warped, or wavy; paint fails quickly; or you are updating curb appeal before sale.',
      'You discovered soft sheathing when replacing a window near a deck attachment.',
    ],
    process: [
      'We remove cladding in zones, repair structure, install house wrap or membranes per spec, then apply new siding and trim.',
      'Color and exposure lines are laid out before cuts multiply.',
    ],
    cost: [
      'Costs vary widely by material — fiber cement vs. vinyl vs. wood — and by story height.',
      'Deck integration may add flashing labor separate from field siding.',
    ],
    whyChoose: [
      'We work exteriors in Alaska’s wet climate — details matter at eaves and penetrations.',
      'Deck integration experience reduces leak callbacks at the most common failure points.',
    ],
    finalCta:
      'Quoting siding? Ask how deck attachments will be flashed — we can own that slice.',
  },

  'fascia-soffit-installation': {
    browserTitle: 'Fascia & Soffit Installation Anchorage AK | Vented & Clean Eaves',
    metaDescription:
      'Fascia and soffit installation in Anchorage: protect rafter tails, improve ventilation, and crisp roof edges. Deck Masters AK.',
    heroImage: '/projects/009-masterpiece-main.avif',
    h1Benefit: 'Protected Eaves, Neat Lines',
    heroSubhead:
      'Soffit vents attic space; fascia carries gutter loads. Call {phone} — we integrate both with roof and wall lines.',
    trustPills: ['Vent math awareness', 'Gutter-ready fascia', 'Clean closures'],
    opening: [
      'Fascia caps rafter ends; soffit closes the underside for a finished look and airflow. Poor installs invite squirrels, water, and ice dam issues at the edge.',
      'We align soffit and fascia work with any deck roof tie-ins or porch ceilings for consistent trim.',
    ],
    whenYouNeed: [
      'Wood fascia is rotting or paint is failing from drip edge problems.',
      'You need better attic intake ventilation to balance ridge vents.',
    ],
    process: [
      'We remove failing material, inspect rafter tails, sister if needed, then install metal or PVC fascia and vented or solid soffit per plan.',
      'Transitions to siding and corners are mitered or capped cleanly.',
    ],
    cost: [
      'Pricing is perimeter-based plus height and complexity at valleys.',
      'Upgrading to wider fascia for gutters may add material.',
    ],
    whyChoose: [
      'We think in systems — fascia, gutters, and decks interact at eaves.',
      'Anchorage snow loads inform how we detail edges against ice and wind.',
    ],
    finalCta:
      'Eaves looking tired? We can refresh fascia and soffit with ventilation in mind.',
  },

  'roofing-services': {
    browserTitle: 'Roofing Services Anchorage AK | Repairs & Deck Adjacent Work',
    metaDescription:
      'Roofing services in Anchorage: repairs, tie-ins, and coordination where decks meet rooflines. Deck Masters AK.',
    heroImage: '/projects/006-aerial-composite.avif',
    h1Benefit: 'Dry Deck-to-Roof Transitions',
    heroSubhead:
      'Deck roofs and second-story walkouts leak at valleys. Call {phone} — we coordinate roof and deck flashing.',
    trustPills: ['Flashing coordination', 'Leak tracing', 'Exterior integration'],
    opening: [
      'We handle roofing scopes tied to exterior projects — especially where low-slope tie-ins, porch roofs, or second-story decks intersect roof planes.',
      'Proper step flashing, sidewall metal, and membrane integration keep water out of the wall cavity.',
    ],
    whenYouNeed: [
      'You see stains on ceilings below deck roofs or at chimney and wall intersections near decks.',
      'You are re-decking a roofed porch and need the roof edge detailed before new framing closes access.',
    ],
    process: [
      'We strip to sound deck, repair sheathing, install ice and water shield where codes demand, then shingle or panel per slope.',
      'Deck posts and headers are coordinated so loads and flashings do not fight each other.',
    ],
    cost: [
      'Small repairs are localized estimates; full slopes scale with pitch, access, and material.',
      'Complex tie-ins take longer — we quote after inspection.',
    ],
    whyChoose: [
      'We understand how deck carpentry meets roofing — fewer leaks at the worst joints.',
      'Clear scopes separate deck framing from roof coverage when multiple systems overlap.',
    ],
    finalCta:
      'Leak near a deck roof? Let us trace it and propose a lasting fix, not a tar patch.',
  },

  'garage-wall-reconstruction': {
    browserTitle: 'Garage Wall Reconstruction Anchorage AK | Framing & Sheathing',
    metaDescription:
      'Garage wall reconstruction in Anchorage: rebuild failed walls, integrate doors, and tie into existing roof lines. Deck Masters AK.',
    heroImage: '/projects/005-aerial-wide.avif',
    h1Benefit: 'Square Walls, Solid Openings',
    heroSubhead:
      'Garage walls take vehicle bumps and moisture. Call {phone} — we rebuild plumb framing and sheathing.',
    trustPills: ['Opening reinforcement', 'Sheathing ties', 'Weather sealing'],
    opening: [
      'Garage walls fail from impact, rot at grade, or poor door flashing. Reconstruction resets structure so doors hang true and loads transfer correctly.',
      'We integrate with roof diaphragms and adjacent siding transitions so the repair does not look patched forever.',
    ],
    whenYouNeed: [
      'Sections are leaning, sheathing is soft, or large openings sag without proper headers.',
      'You are upsizing a garage door and need new posts and beam support.',
    ],
    process: [
      'We shore roof loads temporarily, remove failed studs and plates, and rebuild to plan with modern connectors.',
      'Sheathing, house wrap, and siding or trim close the envelope before door installers finish.',
    ],
    cost: [
      'Scope swings with wall length, height, and whether roof work is involved.',
      'Engineering may be required for wide openings — we flag early.',
    ],
    whyChoose: [
      'We frame heavy exterior walls and understand Anchorage snow loads on attached garages.',
      'Clean execution means doors seal and tracks stay true.',
    ],
    finalCta:
      'Garage wall failing? Send photos and dimensions — we will outline a rebuild approach.',
  },

  'garage-roof-reconstruction': {
    browserTitle: 'Garage Roof Reconstruction Anchorage AK | Structure & Covering',
    metaDescription:
      'Garage roof reconstruction in Anchorage: replace failed rafters, improve ventilation, and re-cover. Deck Masters AK.',
    heroImage: '/projects/006-aerial-composite.avif',
    h1Benefit: 'A Roof That Sheds Snow',
    heroSubhead:
      'Sagging garage roofs risk everything below. Call {phone} — we rebuild structure before new shingles.',
    trustPills: ['Structural assessment', 'Ventilation upgrades', 'Deck/porch ties'],
    opening: [
      'Garage roofs see snow drift, ice, and sometimes bad original venting. Reconstruction fixes sagging planes and upgrades insulation paths where accessible.',
      'If a deck ties into the garage roofline, we detail valleys and sidewalls together.',
    ],
    whenYouNeed: [
      'Ceiling drywall cracks along the ridge or rafter tails are separating at the wall plate.',
      'You are converting attic space or adding structural capacity for solar.',
    ],
    process: [
      'We strip coverings, expose framing, sister or replace members, and re-sheet the plane.',
      'Ventilation and insulation plans align with your goals and code minimums.',
    ],
    cost: [
      'Costs track pitch, area, and whether trusses vs. stick framing are involved.',
      'Structural upgrades exceed simple re-roof pricing — we separate line items.',
    ],
    whyChoose: [
      'We rebuild exteriors holistically — garage roofs interact with walls and sometimes decks above.',
      'Anchorage snow informs how we detail edges and supports.',
    ],
    finalCta:
      'Worried about garage roof sag? Schedule an inspection before the next heavy winter.',
  },

  'residential-general-contracting': {
    browserTitle: 'Residential General Contracting Anchorage AK | Single-Family Projects',
    metaDescription:
      'Residential general contracting in Anchorage: coordinate trades, schedules, and quality on home projects. Deck Masters AK.',
    heroImage: '/projects/009-masterpiece-main.avif',
    h1Benefit: 'One Lead for Your Project',
    heroSubhead:
      'Tired of chasing subcontractors? Call {phone} — we run exterior-focused scopes with clear communication.',
    trustPills: ['Schedule ownership', 'Quality checks', 'Transparent change orders'],
    opening: [
      'General contracting means sequencing demolition, inspections, and finishes so the job finishes — not stalls mid-trades.',
      'We emphasize exterior and structural scopes where our carpentry strength shines, and coordinate partners for licensed trades.',
    ],
    whenYouNeed: [
      'You have a multi-part remodel — deck, siding, and roof — and want one accountable lead.',
      'You are remote or busy and need someone onsite making decisions.',
    ],
    process: [
      'We start with scope documents, milestones, and permit plans. Weekly updates keep you informed.',
      'Punch lists close before final payment; warranties are documented.',
    ],
    cost: [
      'GC services add a management percentage or fixed fee — clarity upfront beats surprise markup.',
      'Allowances for finishes keep selections flexible within budget bands.',
    ],
    whyChoose: [
      'We are builders, not paper-pushers — you get field experience directing your job.',
      'Anchorage schedules shift with weather; we buffer realistically.',
    ],
    finalCta:
      'Planning a bigger exterior project? Let’s talk scope and a single point of contact.',
  },

  'water-damage-restoration': {
    browserTitle: 'Water Damage Restoration Anchorage AK | Structure Drying & Repair',
    metaDescription:
      'Water damage restoration in Anchorage: assess saturation, remove failed materials, and rebuild sound structure. Deck Masters AK.',
    heroImage: '/projects/046-ground-level-1.avif',
    h1Benefit: 'Dry It Out, Build It Back',
    heroSubhead:
      'Floods and leaks soak more than surfaces. Call {phone} — we remove rot and rebuild to code.',
    trustPills: ['Damage assessment', 'Controlled demo', 'Structural rebuild'],
    opening: [
      'Restoration starts with stopping active leaks and understanding how far moisture traveled in framing, insulation, and finishes.',
      'We remove unsalvageable materials, dry cavities when appropriate, and rebuild with treated or compatible lumber where exposure demands.',
    ],
    whenYouNeed: [
      'Insurance events saturated walls near deck doors or garage transitions.',
      'Long-term leaks softened plates or posts — cosmetic cover-ups will not hold.',
    ],
    process: [
      'We document layers as we open, coordinate drying equipment if needed, and rebuild in inspection-friendly stages.',
      'Finishes return last after structure passes muster.',
    ],
    cost: [
      'Restoration is discover-as-you-go work — we provide ranges and written updates.',
      'Carrier scopes sometimes differ from code-minimum repairs — we help translate.',
    ],
    whyChoose: [
      'We rebuild exteriors where water hits first — decks, walls, and transitions.',
      'Honest triage: we do not demo sound wood for billing padding.',
    ],
    finalCta:
      'Dealing with water damage? Call — we will stabilize and map a rebuild path.',
  },

  'structural-repairs': {
    browserTitle: 'Structural Repairs Anchorage AK | Beams, Posts & Load Paths',
    metaDescription:
      'Structural repairs in Anchorage: fix compromised beams, posts, and connections for homes and attached decks. Deck Masters AK.',
    heroImage: '/projects/001-aerial-wraparound.avif',
    h1Benefit: 'Restore Strength & Safety',
    heroSubhead:
      'Creaking floors or sagging beams need engineering-minded fixes. Call {phone} — we sister, post, and connect properly.',
    trustPills: ['Load-path clarity', 'Engineer coordination', 'Exterior expertise'],
    opening: [
      'Structural repairs address members carrying roof, floor, or deck loads. We identify overload, decay, or modification mistakes — then fix with connectors rated for the job.',
      'When stamps are required, we work with engineers so details are buildable on site.',
    ],
    whenYouNeed: [
      'Bouncy floors, cracked headers, or visibly bowing beams after remodels or water events.',
      'You removed a wall that was more load-bearing than expected.',
    ],
    process: [
      'Temporary shoring protects occupants while we install new members or posts.',
      'Connections use bolts and hangers per spec; inspections align with municipal expectations.',
    ],
    cost: [
      'Pricing follows complexity — simple sistering differs from steel beam installs.',
      'Engineering fees are passed transparently when required.',
    ],
    whyChoose: [
      'We combine structural seriousness with exterior craft — common in deck-heavy homes.',
      'Safety communication is direct — no sugar-coating serious issues.',
    ],
    finalCta:
      'Structural concerns? Get eyes on it early — we will recommend engineer involvement when needed.',
  },

  'project-management': {
    browserTitle: 'Construction Project Management Anchorage AK | Timelines & Quality',
    metaDescription:
      'Construction project management in Anchorage: schedules, trade coordination, and site communication for exterior jobs. Deck Masters AK.',
    heroImage: '/projects/009-masterpiece-main.avif',
    h1Benefit: 'Schedules That Actually Move',
    heroSubhead:
      'Jobs stall in the gaps between trades. Call {phone} — we keep milestones tied to real field progress.',
    trustPills: ['Milestone tracking', 'Trade coordination', 'Clear reporting'],
    opening: [
      'Project management is the glue between design, permits, materials lead times, and skilled labor on the correct day.',
      'We focus management energy on exterior scopes where weather and sequencing matter most.',
    ],
    whenYouNeed: [
      'You have multiple vendors and need a single schedule owner.',
      'Past projects dragged because inspections or deliveries were not aligned.',
    ],
    process: [
      'We build a critical path, assign owners, and run site meetings or updates as you prefer.',
      'Risk items — long-lead windows, engineered lumber — get early ordering attention.',
    ],
    cost: [
      'Management fees reflect project duration and complexity — we quote upfront.',
      'Good PM often saves more than it costs in idle days avoided.',
    ],
    whyChoose: [
      'We speak carpenter and client — fewer translation errors.',
      'Anchorage logistics are familiar territory for us.',
    ],
    finalCta:
      'Need a steady hand on a multi-phase exterior job? Ask how we can run point.',
  },

  'permit-acquisition-assistance': {
    browserTitle: 'Building Permit Help Anchorage AK | Applications & Code Alignment',
    metaDescription:
      'Permit acquisition assistance in Anchorage: align drawings, scopes, and applications with local requirements. Deck Masters AK.',
    heroImage: '/projects/017-contemporary-design.avif',
    h1Benefit: 'Paperwork That Matches the Build',
    heroSubhead:
      'Permits confuse homeowners fast. Call {phone} — we align scope language with what we actually build.',
    trustPills: ['Local process familiarity', 'Scope clarity', 'Inspector coordination'],
    opening: [
      'Permitting is about accurate descriptions, compliant plans, and realistic timelines. Misalignment causes failed inspections and rework.',
      'We help assemble what jurisdictions expect for deck and exterior scopes — and flag when engineers or surveys are needed.',
    ],
    whenYouNeed: [
      'Your project crossed thresholds for stamped drawings or zoning setbacks.',
      'You want to avoid stop-work orders from mismatched site conditions.',
    ],
    process: [
      'We review your goals against code triggers, coordinate drawings, and prep submission packages.',
      'After approval, we build to the permitted scope and schedule inspections at the right stages.',
    ],
    cost: [
      'Permit fees go to the municipality; our assistance is quoted as professional time.',
      'Revisions cost less when the first submission is tight — we invest upfront.',
    ],
    whyChoose: [
      'We file exterior permits regularly and know common reviewer questions.',
      'You spend less time in line and more time building.',
    ],
    finalCta:
      'Unsure if your deck needs a permit? Call — we will tell you straight and help if it does.',
  },

  'site-preparation': {
    browserTitle: 'Construction Site Preparation Anchorage AK | Access & Safety',
    metaDescription:
      'Site preparation in Anchorage: safe access, staging, and protection before exterior builds. Deck Masters AK.',
    heroImage: '/projects/001-aerial-wraparound.avif',
    h1Benefit: 'Clean Start, Safer Builds',
    heroSubhead:
      'Good jobs start with protected yards and clear paths. Call {phone} — we stage smart before framing.',
    trustPills: ['Property protection', 'Waste planning', 'Access paths'],
    opening: [
      'Site prep sets tone: protected landscaping, dumpster placement, power tool paths, and neighbor courtesy.',
      'We plan how materials arrive — crane vs. carry — especially for elevated decks or tight lots.',
    ],
    whenYouNeed: [
      'You have delicate plantings or tight side yards that need mats and barriers.',
      'Demolition debris must be separated and hauled before new work clogs the site.',
    ],
    process: [
      'We walk the site with you, mark limits, and set protection. Temporary fencing or signage goes up if needed.',
      'Daily cleanup keeps homeowners and inspectors happier — we build that into rhythm.',
    ],
    cost: [
      'Prep is partly labor, partly rentals — dumpsters, toilets on large jobs, equipment.',
      'Tight sites cost more in time — realistic budgets account for it.',
    ],
    whyChoose: [
      'Respect for your property reduces conflict mid-project.',
      'We have worked Anchorage lots from wide suburban to tight infill.',
    ],
    finalCta:
      'Worried about yard damage? Ask about our site protection approach before day one.',
  },

  'material-sourcing': {
    browserTitle: 'Construction Material Sourcing Anchorage AK | Decking, Lumber & Orders',
    metaDescription:
      'Material sourcing in Anchorage: order correct grades, lengths, and compatible systems for your project. Deck Masters AK.',
    heroImage: '/projects/020-contemporary-full.avif',
    h1Benefit: 'Right Stock, On Time',
    heroSubhead:
      'Wrong lumber shows up late or in the wrong grade. Call {phone} — we order to the cut list.',
    trustPills: ['Compatible systems', 'Lead-time awareness', 'Waste reduction'],
    opening: [
      'Sourcing is more than picking SKUs — it is matching joist heights, board lengths that minimize waste, and fasteners that belong with your decking line.',
      'We coordinate deliveries so materials do not sit in the rain longer than necessary.',
    ],
    whenYouNeed: [
      'You are owner-supplying materials but want a pro bill of materials before you buy.',
      'Lead times for composite or specialty posts threaten your schedule — we sequence orders.',
    ],
    process: [
      'We generate takeoffs from approved plans, add sensible overage, and split deliveries if staging space is tight.',
      'We verify compatibility — not all clips work with all boards.',
    ],
    cost: [
      'Material passes through at cost plus handling on some contracts; others are turnkey — we clarify upfront.',
      'Better ordering reduces expensive last-minute air freight for forgotten brackets.',
    ],
    whyChoose: [
      'We know which suppliers stock what in Anchorage versus special order.',
      'Fewer wrong deliveries mean fewer idle crew days.',
    ],
    finalCta:
      'Buying materials yourself? Run your list by us before you click purchase.',
  },

  'rough-carpentry': {
    browserTitle: 'Rough Carpentry Anchorage AK | Framing, Sheathing & Structure',
    metaDescription:
      'Rough carpentry in Anchorage: framing walls, floors, and deck structures before finishes. Deck Masters AK.',
    heroImage: '/projects/005-aerial-wide.avif',
    h1Benefit: 'Straight, Square Structure',
    heroSubhead:
      'Finish work hides rough carpentry — until it does not. Call {phone} — we frame level and plumb.',
    trustPills: ['Structural focus', 'Fast weather-in', 'Inspection-ready'],
    opening: [
      'Rough carpentry is the skeleton: plates, studs, joists, rafters, and deck framing before insulation and finishes.',
      'Quality here prevents callbacks when cabinets gap or doors swing odd — we obsess plumb and plane.',
    ],
    whenYouNeed: [
      'You are adding an addition or rebuilding a section that needs new framing first.',
      'You need deck framing integrated with wall framing at transitions.',
    ],
    process: [
      'We follow plans and engineer details, install connectors, and sheath or dry-in as the scope demands.',
      'Rough inspections pass before insulation closes cavities.',
    ],
    cost: [
      'Priced by labor hours and material — complex roofs and valleys add time.',
      'We quote from drawings and site verify before cutting.',
    ],
    whyChoose: [
      'Our crews live in rough exterior work — decks, walls, and garages.',
      'Anchorage loads and bracing requirements are baked into habits.',
    ],
    finalCta:
      'Need rough-in done right the first time? Bring plans — we will estimate fairly.',
  },

  'finish-carpentry': {
    browserTitle: 'Finish Carpentry Anchorage AK | Trim, Stairs & Details',
    metaDescription:
      'Finish carpentry in Anchorage: trim, skirt boards, stair details, and refined exterior woodwork. Deck Masters AK.',
    heroImage: '/projects/017-contemporary-design.avif',
    h1Benefit: 'Details That Look Intentional',
    heroSubhead:
      'Finish work is what you see daily. Call {phone} — we miter, scribe, and sand to standards that last outdoors.',
    trustPills: ['Trim precision', 'Weather-exposed expertise', 'Paint-ready surfaces'],
    opening: [
      'Finish carpentry turns structure into architecture: fascia details, stair skirts, column wraps, and built-in benches.',
      'Exterior finishes must drain and move — we detail joints so coatings hold.',
    ],
    whenYouNeed: [
      'You want upgraded trim profiles on a new deck or porch ceiling.',
      'Interior-exterior transitions at doors need tight casing and sill integration.',
    ],
    process: [
      'We install from longest runs to shortest fillers, scribing to irregular siding where needed.',
      'Sanding and nail set prep surfaces for painters or leave natural per spec.',
    ],
    cost: [
      'Finish hours add up on intricate profiles — we price from detail level.',
      'Material grade — cedar, PVC, composite trim — shifts budgets.',
    ],
    whyChoose: [
      'We care how corners meet — the small stuff defines perceived quality.',
      'Outdoor finish knowledge prevents premature swelling and paint failure.',
    ],
    finalCta:
      'Want trim that elevates the whole deck? Show us inspiration — we will build to match.',
  },

  'framing-services': {
    browserTitle: 'Framing Services Anchorage AK | Decks, Additions & Repairs',
    metaDescription:
      'Framing services in Anchorage: new frames, sisters, and repairs for decks and small additions. Deck Masters AK.',
    heroImage: '/projects/008-aerial-elevated.avif',
    h1Benefit: 'Frames Built for Loads',
    heroSubhead:
      'Framing is our bread and butter. Call {phone} — we lay out efficient structures that inspect clean.',
    trustPills: ['Efficient layouts', 'Connector discipline', 'Multi-scope experience'],
    opening: [
      'Framing services cover decks, small bump-outs, and structural repairs where new members meet old.',
      'We think about how loads travel to footings and how future trades will sheath and insulate.',
    ],
    whenYouNeed: [
      'You have approved plans and need execution-only framing labor.',
      'You need sisters or headers upgraded for new openings.',
    ],
    process: [
      'Layout snaps on deck or slab, plates anchor per detail, and members fly with temporary bracing until sheathed.',
      'We coordinate inspection holds before concealment.',
    ],
    cost: [
      'Typically labor + materials with clear hourly or lump estimates from drawings.',
      'Site surprises adjust hours — communication stays open.',
    ],
    whyChoose: [
      'Deck-heavy framing experience means efficient repetitive layouts.',
      'We respect adjacent finishes — dust and vibration controlled.',
    ],
    finalCta:
      'Need framers who show up ready? Let’s align on plans and schedule.',
  },

  'demolition-services': {
    browserTitle: 'Selective Demolition Anchorage AK | Deck & Exterior Tear-Out',
    metaDescription:
      'Demolition services in Anchorage: controlled tear-out of decks, siding, and failing structures. Deck Masters AK.',
    heroImage: '/projects/005-aerial-wide.avif',
    h1Benefit: 'Controlled Tear-Out, Less Collateral',
    heroSubhead:
      'Demo is not swinging a sledge blind. Call {phone} — we strip to the line you need intact.',
    trustPills: ['Protection first', 'Waste sorting', 'Salvage awareness'],
    opening: [
      'Selective demolition removes failed decks or cladding while protecting windows, HVAC, and landscaping you want to keep.',
      'We sequence cuts, detach ledgers carefully, and pile debris for efficient haul-off.',
    ],
    whenYouNeed: [
      'You need a deck removed before sale or before a full redesign.',
      'Demo must stop at a property line or shared wall without damaging neighbors.',
    ],
    process: [
      'We establish cut lines, utilities locates as needed, and protect paths. Structural shoring installs before risky cuts.',
      'Salvageable materials are separated when practical; the rest goes to appropriate waste streams.',
    ],
    cost: [
      'Priced by volume, height, and hazard — nails, glass, and asbestos suspects change approach.',
      'Dumpster and haul fees are itemized.',
    ],
    whyChoose: [
      'Careful demo saves money on repairs to things you did not mean to break.',
      'We work Anchorage weather — mud and protection plans included.',
    ],
    finalCta:
      'Need something gone safely? Describe the structure — we will plan the strip-out.',
  },

  'consultation-planning': {
    browserTitle: 'Deck & Exterior Consultation Anchorage AK | Planning Before You Build',
    metaDescription:
      'Consultation and planning in Anchorage: feasibility, budgets, and phased scopes for decks and exteriors. Deck Masters AK.',
    heroImage: '/projects/017-contemporary-design.avif',
    h1Benefit: 'Clarity Before Commitment',
    heroSubhead:
      'Not ready to build yet? Call {phone} — we help prioritize phases and realistic numbers.',
    trustPills: ['Feasibility checks', 'Budget ranges', 'Phased scopes'],
    opening: [
      'Consultation turns wish lists into plans you can price. We discuss code triggers, likely costs, and sequencing for Alaska seasons.',
      'You leave with actionable next steps — not a vague “call us later.”',
    ],
    whenYouNeed: [
      'You are comparing repair vs. replace or debating composite vs. wood.',
      'You need a professional opinion before buying a home with a questionable deck.',
    ],
    process: [
      'We visit or review photos, ask targeted questions, and outline options with pros and cons.',
      'Written summaries available when requested for larger decisions.',
    ],
    cost: [
      'Consult fees may apply toward build contracts — ask when booking.',
      'Hourly or flat consult rates beat guessing wrong on a five-figure decision.',
    ],
    whyChoose: [
      'We are builders, not salespeople — straight talk even if it delays a job.',
      'Local experience informs what works in Anchorage yards.',
    ],
    finalCta:
      'On the fence? Book a consult — clarity is cheaper than the wrong build.',
  },

  'building-code-compliance': {
    browserTitle: 'Building Code Compliance Anchorage AK | Decks & Exterior Work',
    metaDescription:
      'Building code compliance in Anchorage: guard heights, spans, and connections built to current expectations. Deck Masters AK.',
    heroImage: '/projects/017-contemporary-design.avif',
    h1Benefit: 'Built to Pass Inspection',
    heroSubhead:
      'Codes exist for safety. Call {phone} — we build decks that match today’s rules, not last decade’s guess.',
    trustPills: ['Current guard rules', 'Span tables respected', 'Documentation'],
    opening: [
      'Compliance means understanding adopted codes, local amendments, and how inspectors interpret gray areas on site.',
      'We default to conservative details when ambiguity exists — cheaper than ripping out failed inspections.',
    ],
    whenYouNeed: [
      'You are selling and need work that passes buyer inspections.',
      'You DIY’d part of a deck and need professional correction.',
    ],
    process: [
      'We compare your scope to trigger points for permits, engineered connections, and fire separation where relevant.',
      'Construction follows approved details; inspections are scheduled at the right milestones.',
    ],
    cost: [
      'Code-compliant work may cost more than shortcuts — that is the price of legality and safety.',
      'We quote realistic numbers including permits and engineering when required.',
    ],
    whyChoose: [
      'We build for inspectors we will see again — reputation matters.',
      'You sleep better knowing your deck is defensible in wind and crowd loads.',
    ],
    finalCta:
      'Worried about code gaps? We will audit and fix what matters — honestly scoped.',
  },

  'construction-clean-up': {
    browserTitle: 'Construction Clean-Up Anchorage AK | Job Site Final & Touch-Up',
    metaDescription:
      'Construction clean-up in Anchorage: sweep, magnetic nail sweep, and debris removal after exterior projects. Deck Masters AK.',
    heroImage: '/projects/020-contemporary-full.avif',
    h1Benefit: 'Leave the Site Livable',
    heroSubhead:
      'Nails in grass ruin tires and trust. Call {phone} — we include real cleanup, not a token sweep.',
    trustPills: ['Magnetic sweep', 'Debris hauling', 'Neighbor-friendly'],
    opening: [
      'Cleanup is part of craftsmanship — clients should not find fasteners or splinters after we leave.',
      'We stage dumpsters responsibly, tarp when cutting, and walk the yard before final sign-off.',
    ],
    whenYouNeed: [
      'Large tear-offs or re-decks that generated heavy debris.',
      'You need photo-ready completion for listing or event deadlines.',
    ],
    process: [
      'Daily lightweight cleanup on long jobs; deep clean and haul at project end.',
      'We coordinate dump runs and recycling where lumber can be repurposed.',
    ],
    cost: [
      'Often included in project totals; standalone cleanups quoted by lot size and debris volume.',
      'Hazardous materials require specialists — we refer when outside our license.',
    ],
    whyChoose: [
      'Respect for your property extends to how we leave it — neighbors notice too.',
      'Kids and pets deserve a nail-free lawn.',
    ],
    finalCta:
      'Finishing a messy DIY? We can clear debris and sweep magnetic so you are safe.',
  },

  'custom-staircases-landings': {
    browserTitle: 'Custom Staircases & Landings Anchorage AK | Outdoor Access',
    metaDescription:
      'Custom staircases and landings in Anchorage: exterior stairs that connect yards, decks, and doors with code-compliant guards. Deck Masters AK.',
    heroImage: '/projects/050-bonus-1.avif',
    h1Benefit: 'Designed Steps Between Levels',
    heroSubhead:
      'Yards in Anchorage are rarely flat. Call {phone} — we stitch levels with landings that feel natural.',
    trustPills: ['Landing sizing', 'Drainage on steps', 'Rail continuity'],
    opening: [
      'Outdoor stairs are part deck, part hardscape — width, landing depth, and rail transitions must read as one system.',
      'We design landings where doors swing, snow piles, and people turn — not just where math ends.',
    ],
    whenYouNeed: [
      'You need a gracious arrival from driveway to deck or yard to hot tub platform.',
      'Code requires a landing at doors — we make it usable, not a token slab.',
    ],
    process: [
      'We model total rise across runs, choose materials for treads and stringers, and detail posts for rail continuity.',
      'Footings and frost depth align with Anchorage expectations before finish surfaces.',
    ],
    cost: [
      'Wide granite or paver landings jump cost versus wood-only systems.',
      'We quote after field measure of total rise and path.',
    ],
    whyChoose: [
      'We blend deck carpentry with practical outdoor flow — not just a calculator.',
      'Ice and snow inform tread choices and drainage details.',
    ],
    finalCta:
      'Connecting two outdoor levels awkwardly today? Let’s design stairs you will actually use.',
  },

  'elevated-deck-systems': {
    browserTitle: 'Elevated Deck Systems Anchorage AK | High Decks & Views',
    metaDescription:
      'Elevated deck systems in Anchorage: tall posts, bracing, and guards for second-story and view decks. Deck Masters AK.',
    heroImage: '/projects/008-aerial-elevated.avif',
    h1Benefit: 'Height Done With Confidence',
    heroSubhead:
      'Elevation multiplies wind and sway. Call {phone} — we brace and rail elevated decks for real loads.',
    trustPills: ['Lateral bracing', 'Tall post bases', 'Guard strength'],
    opening: [
      'Elevated decks demand stronger posts, lateral connections, and often engineered solutions — the view is not worth a flexing frame.',
      'We coordinate guard heights for multiple walking levels and stairs that may start mid-air.',
    ],
    whenYouNeed: [
      'Walkouts sit high above grade or you want a canopy-clear view over obstacles.',
      'Older tall decks show movement — time for upgraded structure and rails.',
    ],
    process: [
      'Engineering may size posts, beams, and bracing; we build to stamped details.',
      'We stage equipment for safe material handling at height and detail fall protection during construction.',
    ],
    cost: [
      'Elevation increases footing depth, post size, and labor — expect materially higher totals than ground-level decks.',
      'Glass or cable rails on tall decks add cost but preserve views.',
    ],
    whyChoose: [
      'We specialize in elevated exterior structures common in Alaska hillside lots.',
      'Safety and stiffness are non-negotiable — we do not improvise tall posts.',
    ],
    finalCta:
      'Building high? Talk to us before posts go in — bracing decisions happen early.',
  },
};
