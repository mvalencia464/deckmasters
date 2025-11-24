# Project Memory & Strategy Log

**Last Updated:** Friday, November 21, 2025

## 1. Routing & SEO Strategy
**Current State:** Hash-based Routing (`/#/new-deck-construction`)
**Reason:** Essential for preventing "404 Not Found" errors in the local/preview environment where the server cannot handle client-side route rewrites.
**Production Goal:** Standard History API Routing (`/new-deck-construction`)
**Action Plan for Deployment:**
1.  When deploying to a host like Vercel, Netlify, or AWS Amplify, configure the "Rewrite" rules to serve `index.html` for all paths.
2.  Update `index.tsx` to remove hash parsing logic and use `window.location.pathname`.
3.  **Why?** Clean URLs are significantly better for Google Business Profile ranking and general SEO authority.

## 2. Content Strategy
**Structure:**
-   **Layer 2 (Hubs):** Broad category pages (e.g., "New Deck Construction") linking to specific services. Target word count: ~1,500 words.
-   **Layer 3 (Services):** Specific service pages (e.g., "Trex Deck Installation"). Target word count: **900-1,100 words**.
-   **Enrichment Protocol:** To meet word counts, copy must avoid "fluff" and instead lean heavily into:
    -   **Technical Specifications:** e.g., "Sodium percarbonate cleaners" vs. "bleach".
    -   **Local Engineering:** e.g., "Chinook wind loads exceeding 100mph in Bear Valley."
    -   **Step-by-Step Process:** Breaking down a 1-step action into 5 detailed micro-steps.
-   **Localization:** Heavy emphasis on Anchorage neighborhoods (Hillside, Glen Alps, Midtown) and specific engineering challenges (Frost Heave, Seismic, Snow Load).

## 3. Catalog & Material Preferences (Verified Sales Data)
**Primary Materials:**
-   **Composite:** Trex Enhance & Transcends (Colors: Toasted Sand, Foggy Wharf, Coastal Bluff).
-   **Framing:** Pressure Treated 2x8, 2x6, 4x12, 4x6 (Ground Contact).
-   **Railing:** Stainless Steel Cable, Black Aluminum Posts, Cedar Posts.
-   **Foundations:** Steel Piles & Helical Piles (preferred over concrete).

**Key Selling Points:**
-   **"Seamless Beauty":** Hidden fasteners, no visible screws.
-   **"Maximize Your View":** Fascia-mounted railings to increase usable square footage and keep sightlines clear.
-   **"Frost-Proof Stability":** Helical piles as the antidote to Anchorage frost heaves.
-   **"Polished Perfection":** Wrapping rough lumber with Trex Fascia and composite top caps.

**Ancillary Services:**
-   Snow Plowing & Sand Spreading (Winter).
-   Excavation & Retaining Wall Rebuilding.
-   Permitting Management (~$850 fixed fee).

## 4. Technical Stack
-   **Framework:** React (Single File `index.tsx` for portability/simplicity in this phase)
-   **Bundler:** Vite
-   **Styling:** Tailwind CSS (implied by usage of classes like `bg-stone-950`, `text-orange-600`)
-   **Icons:** Lucide React

## 5. Key Features Implemented
-   **Rich Text Rendering:** Custom helper to parse `**bold**` and `[links](/url)` with brand styling.
-   **Dynamic Sections:** `ServicePageTemplate` supports long-form content arrays with optional image placeholders.
-   **Lead Capture:** Multi-step modal form for quotes.
