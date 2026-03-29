# SITE ARCHITECTURE FOR DECK MASTERS AK

**Prompt 0 — Planning (production-ready)**  
Generated from `src/data/site.json`. This document is the single source of truth for URLs, hierarchy, navigation, and internal linking for subsequent Core30 prompts.

**Conventions**

- **Homepage** stays `/` (existing site; strong foundation). Title/meta still target *Deck Builder Anchorage AK* (or equivalent).
- **URL pattern:** `/services/...` for all service, category, and core hub pages (short, consistent, easy to migrate from).
- **One URL per service:** *Deck Board Replacement* is listed in two GBP groups; **only one page** exists — parent **Deck Repair & Maintenance** (see note under that category).
- **Fencing:** No selected services — **no pages** until offerings change.
- **Blog** (`/blog`, `/[slug]` posts): Out of scope for this architecture table; keep linking from footer as you do today.

---

## BASIC INFORMATION

| Field | Value |
|--------|--------|
| **BUSINESS NAME** | Deck Masters AK |
| **INDUSTRY** | Deck contractor / residential construction (deck builder, repairs, outdoor structures, general contracting) |
| **CITY** | Anchorage |
| **STATE** | Alaska |
| **STATE ABBREVIATION** | AK |
| **ZIP CODE** | 99518 |
| **PHONE NUMBER** | (907) 782-4043 |
| **EMAIL** | *(not in site.json — use contact form / publish when available)* |
| **PRIMARY GBP CATEGORY** | Deck Builder |
| **SECONDARY GBP CATEGORIES** | Deck Repair & Maintenance; General Contracting; Outdoor Living; *(Fencing — no active offerings in data)* |

**TARGET KEYWORD (homepage):** Deck Builder Anchorage AK *(+ variants in copy/meta)*

**SERVICE AREAS (anchors for copy / schema):** Anchorage and surrounding areas; neighborhoods: Spenard, Fairview, Downtown Anchorage, Midtown Anchorage, Sand Lake, South Addition, Turnagain, Government Hill, Mountain View, Hillside.

**TRUST SIGNALS (suggested for templates / copy):**

1. Strong Google review presence — use **exact count + average** from live GBP when writing.
2. **Local owner-operated** business (Jordan Webb) — Alaska-specific build experience.
3. **Cold-climate construction** — materials and methods suited to snow load, freeze-thaw, moisture.
4. **Transparent process** — consult, clear scope, free estimates *(confirm “free estimates” remains accurate)*.

**LOCAL ISSUES (content / FAQ hooks):**

1. Extreme cold and **freeze-thaw** stress on fasteners, footings, and coatings.  
2. **Heavy snow and ice** — load, drainage, railing safety.  
3. **Moisture intrusion** — rot, mold, water damage at connections and ledger.  
4. **High winds** — railing, uplift, anchoring.  
5. **Short season / scheduling** — realistic timelines for exterior work in Anchorage.

---

## URL STRUCTURE

**HOMEPAGE:** `/`

**MAIN PAGES**

| Page | URL |
|------|-----|
| Services (hub) | `/services` |
| About | `/about` |
| Contact | `/contact` |

**SECONDARY CATEGORY PAGES** (GBP-aligned hubs; link down to core or child pages)

| Category | URL |
|----------|-----|
| Deck Builder (primary line of business) | `/services/deck-building` |
| Deck Repair & Maintenance | `/services/deck-repair` |
| General Contracting | `/services/general-contracting` |
| Outdoor Living | `/services/outdoor-living` |

**CORE SERVICE PAGES** (mid-tier hubs; only where listed)

| Core hub | URL | Parent category |
|----------|-----|-----------------|
| Custom Decks & Design | `/services/custom-decks-design` | Deck Builder |
| Deck Replacement & Decking | `/services/deck-replacement-decking` | Deck Builder |
| Deck Framing & Foundations | `/services/deck-framing-foundations` | Deck Builder |
| Railings & Staircases | `/services/railings-staircases` | Deck Builder |
| Exterior Renovations & Roofing | `/services/exterior-renovations-roofing` | General Contracting |
| Contracting & Project Services | `/services/contracting-project-services` | General Contracting |

**CHILD SERVICE PAGES** — see Service Hierarchy below (full list with URLs).

**GENERAL / STANDALONE**

| Page | URL | Notes |
|------|-----|--------|
| Dock Building | `/dock-building` | Existing route; link from Services hub + relevant categories; child of “general” intent → link **up** to homepage and **across** to `/services` |

---

## SERVICE HIERARCHY

### SECONDARY CATEGORY 1: Deck Builder

**Category page URL:** `/services/deck-building`

**Core Service 1: Custom Decks & Design** — `/services/custom-decks-design`

Child services:

| Service (exact name in data) | URL |
|------------------------------|-----|
| Custom Deck Design | `/services/custom-deck-design` |
| New Deck Construction | `/services/new-deck-construction` |
| Multi-level Decks | `/services/multi-level-decks` |

**Core Service 2: Deck Replacement & Decking** — `/services/deck-replacement-decking`

Child services:

| Service | URL |
|---------|-----|
| Deck Replacement | `/services/deck-replacement` |
| Composite Decking Installation | `/services/composite-decking-installation` |
| Wood Decking Installation | `/services/wood-decking-installation` |

**Core Service 3: Deck Framing & Foundations** — `/services/deck-framing-foundations`

Child services:

| Service | URL |
|---------|-----|
| Deck Framing | `/services/deck-framing` |
| Deck Footings and Foundations | `/services/deck-footings-foundations` |

**Core Service 4: Railings & Staircases** — `/services/railings-staircases`

Child services:

| Service | URL |
|---------|-----|
| Custom Railing Design | `/services/custom-railing-design` |
| Aluminum Railing Installation | `/services/aluminum-railing-installation` |
| Cable Railing Installation | `/services/cable-railing-installation` |
| Wood Railing Installation | `/services/wood-railing-installation` |
| Composite Railing Installation | `/services/composite-railing-installation` |
| Staircase Design and Build | `/services/staircase-design-build` |

**Note:** *Deck Board Replacement* is **selected** under Deck Builder in `site.json` but **does not** get a second URL here. The single canonical page is under **Deck Repair** (`/services/deck-board-replacement`). On deck-building pages, link to that URL when “replace boards” is relevant.

---

### SECONDARY CATEGORY 2: Deck Repair & Maintenance

**Category page URL:** `/services/deck-repair`

**Core services:** None — children attach directly to this category.

Child services:

| Service | URL |
|---------|-----|
| Deck Board Replacement | `/services/deck-board-replacement` |
| Structural Deck Repair | `/services/structural-deck-repair` |
| Railing Repair | `/services/railing-repair` |
| Stair Repair | `/services/stair-repair` |
| Water Damage Repair | `/services/water-damage-repair-decks` |
| Mold Remediation (Deck related) | `/services/mold-remediation-decks` |
| Storm Damage Repair | `/services/storm-damage-repair-decks` |

---

### SECONDARY CATEGORY 3: General Contracting

**Category page URL:** `/services/general-contracting`

**Core Service 1: Exterior Renovations & Roofing** — `/services/exterior-renovations-roofing`

Child services:

| Service | URL |
|---------|-----|
| Exterior Home Renovations | `/services/exterior-home-renovations` |
| Siding Replacement | `/services/siding-replacement` |
| Fascia & Soffit Installation | `/services/fascia-soffit-installation` |
| Roofing Services | `/services/roofing-services` |
| Garage Wall Reconstruction | `/services/garage-wall-reconstruction` |
| Garage Roof Reconstruction | `/services/garage-roof-reconstruction` |

**Core Service 2: Contracting & Project Services** — `/services/contracting-project-services`

Child services:

| Service | URL |
|---------|-----|
| Residential General Contracting | `/services/residential-general-contracting` |
| Water Damage Restoration | `/services/water-damage-restoration` |
| Structural Repairs | `/services/structural-repairs` |
| Project Management | `/services/project-management` |
| Permit Acquisition Assistance | `/services/permit-acquisition-assistance` |
| Site Preparation | `/services/site-preparation` |
| Material Sourcing | `/services/material-sourcing` |
| Rough Carpentry | `/services/rough-carpentry` |
| Finish Carpentry | `/services/finish-carpentry` |
| Framing Services | `/services/framing-services` |
| Demolition Services | `/services/demolition-services` |
| Consultation and Planning | `/services/consultation-planning` |
| Building Code Compliance | `/services/building-code-compliance` |
| Construction Clean-up | `/services/construction-clean-up` |

---

### SECONDARY CATEGORY 4: Outdoor Living

**Category page URL:** `/services/outdoor-living`

**Core services:** None — children attach directly to this category.

Child services:

| Service | URL |
|---------|-----|
| Custom Staircases and Landings | `/services/custom-staircases-landings` |
| Elevated Deck Systems | `/services/elevated-deck-systems` |

---

### GENERAL / STANDALONE

| Service | URL |
|---------|-----|
| Dock Building | `/dock-building` |

Link **up** to `/` and `/services`; optionally cross-link to `/services/deck-building` where relevant.

---

## NAVIGATION STRUCTURE

**MAIN NAV**

- Home → `/`
- Services → `/services`
- About Us → `/about`
- Contact → `/contact`

*(Optional later: “Gallery,” “Schedule,” “Blog” — match current site; do not duplicate service URLs in nav unless you add a dropdown — Core30 prefers simple nav; a single Services entry is enough if the hub lists everything.)*

**FOOTER LINKS (minimum)**

- Home, Services, About, Contact  
- Privacy, Terms *(if present)*  
- Blog index *(if active)*  
- Social: Instagram, Facebook, LinkedIn *(from `site.json`)*  
- Phone (click-to-call), address (Anchorage), service area line  

---

## INTERNAL LINKING MAP

**HOMEPAGE (`/`) links to**

- `/services` (primary)
- `/about`, `/contact`
- Featured service deep links: prioritize **tier-1 commercial URLs** (e.g. `/services/deck-replacement`, `/services/new-deck-construction`, `/services/composite-decking-installation`, `/services/structural-deck-repair`) — adjust to campaign priorities
- `/dock-building` *(if you promote docks from home)*
- Blog *(optional)*

**`/services/deck-building` links to**

- All four core hubs: `custom-decks-design`, `deck-replacement-decking`, `deck-framing-foundations`, `railings-staircases`
- Direct links to each **child** under those cores (from grids or body copy)
- `/` (home), `/services`, `/contact`
- `/services/deck-board-replacement` when discussing board-level issues (canonical repair page)

**`/services/deck-repair` links to**

- All seven child service pages listed above
- `/services/deck-building`, `/services/general-contracting` (related work)
- `/`, `/services`, `/contact`

**`/services/general-contracting` links to**

- `exterior-renovations-roofing`, `contracting-project-services`
- All GC child URLs under those cores
- `/`, `/services`, `/contact`

**`/services/outdoor-living` links to**

- `custom-staircases-landings`, `elevated-deck-systems`
- `/services/deck-building`, `/services/railings-staircases` *(related)*
- `/`, `/services`, `/contact`

**Each CORE SERVICE page links to**

- Its **child** pages (every child named and linked in body + grid)
- Parent **secondary category** page
- `/services`, `/contact`
- Homepage with varied anchor text (see below)

**Each CHILD SERVICE page links back to**

- **Parent:** either its **core service** URL (if under a core) **or** its **secondary category** URL (if no core)
- **Deck Repair children** → parent `/services/deck-repair`
- **Outdoor Living children** → parent `/services/outdoor-living`
- **`/dock-building`** → homepage `/` and `/services` *(per general-services rule)*
- Cross-links: 1–2 contextual links to related services (e.g. *Deck Replacement* → *Composite Decking Installation*)

**HOMEPAGE ANCHOR TEXT OPTIONS (for links from child/core pages back to home)**

- “Anchorage deck builder”
- “Custom decks in Anchorage, AK”
- “Deck Masters AK — Anchorage deck contractor”
- “Back to Deck Masters AK home”

Rotate naturally; avoid identical anchor on every page.

---

## PAGE COUNT SUMMARY

| Bucket | Count |
|--------|------:|
| Homepage | 1 |
| Main pages (Services, About, Contact) | 3 |
| Secondary category pages | 4 |
| Core service pages | 6 |
| Child service pages | 43 |
| Standalone general (Dock Building) | 1 |
| **TOTAL (this architecture)** | **58** |

*Excluded: blog posts, utility pages (privacy, terms, 404, schedule, gallery, etc.) — track separately.*

**Breakdown of child pages (43)**

- Under Deck Builder cores: 14 *(Deck Board Replacement excluded — see note)*  
- Under Deck Repair: 7  
- Under General Contracting: 20 *(6 + 14)*  
- Under Outdoor Living: 2  

---

## PRODUCTION NOTES (replaces “Content coming soon”)

- Ship pages **when content + metadata + schema** for that URL are ready.  
- Update **`sitemap.xml`** and internal links **with each batch**; use **Google Search Console** indexing checks between batches as planned.  
- **Homepage:** add map embed + light SEO touches only; do not replace existing successful layout without a separate design decision.

---

*End of Prompt 0 site architecture for Deck Masters AK.*
