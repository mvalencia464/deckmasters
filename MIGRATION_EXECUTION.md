# Migration Execution Summary
## Deck Masters AK - Google Search Console Data Integration

**Date:** 2026-02-19  
**Status:** ✅ Implementation Complete - Ready for Testing  
**Scope:** SEO Preservation + Andromeda Matrix + Mobile CTR Optimization

---

## What Was Implemented

### 1. SEO Preservation Configuration
**File:** `src/config/migrationConfig.ts`

Defines all critical GSC pages requiring 301 redirects:
- Homepage: 1,103 clicks → Maintain
- Trex article: 48,433 impressions → Redirect to material section
- Deck repair: Position 1.72 → Redirect to repair service

Includes Andromeda Matrix angle mapping and micro-offer definitions.

### 2. Analytics Tracking Service
**File:** `src/utils/analyticsTracker.ts`

Singleton service that:
- Tracks page views with route-change listeners
- Fires GTM events for all page navigation
- Fires Meta Pixel conversion events (Lead, ViewContent)
- Tags every event with `andromeda_angle` for attribution
- Supports micro-offer click tracking
- Logs all events to browser console for debugging

**Usage in App:**
```typescript
// On route change
analytics.trackPageView(newPath, document.title)

// On lead conversion
analytics.trackLead('sticky_cta_mobile', 'Get My Quote')

// On micro-offer click
analytics.trackMicroOfferClick('safety_insp', 'Free Structural Safety Inspection')
```

### 3. Sticky Mobile CTA Component
**File:** `src/components/StickyMobileCTA.tsx`

Features:
- Mobile-only display (<768px viewport)
- Triggers after 300px scroll (user engagement)
- Persistent "Get My Quote" button
- Dismissible with X button (respects preference)
- Tracks clicks via analytics service
- Scrolls user to quote form on click

**Goal:** Improve 1.77% baseline mobile CTR to 2.5-3%

### 4. Micro Offers Component
**File:** `src/components/MicroOffers.tsx`

Three conversion angles (Andromeda Matrix):

**Angle 1: Premium Outdoor Luxury**
- CTA: "Free 3D Design Preview"
- Icon: Eye
- Context: Design pages, portfolio, homepage

**Angle 3: Trust/Fixed-Price**
- CTA: "Free Structural Safety Inspection"
- Icon: Shield
- Context: Repair pages, old deck content

**Angle 4: Smart Investment**
- CTA: "Free Frost-Heave Assessment"
- Icon: Thermometer
- Context: Material selection, ROI pages

Three display variants:
1. **Inline** (horizontal 3-column grid) - Homepage
2. **Sidebar** (vertical list) - Service pages
3. **Popup** (modal) - Exit intent / 30-second timer

Each click fires analytics event with angle tagging for attribution testing.

### 5. SEO Redirects Configuration
**File:** `netlify/redirects.toml`

Implements 1:1 mapping for critical URLs:

```
Critical (1,103 clicks):
  / → / (maintain)

High Priority (48,433+ impressions):
  /is-trex-decking-right-for-you → /deck-materials-components/trex-deck-installation
  /deck-repair → /deck-repair-maintenance/deck-repair

Pruning (0 GSC clicks):
  /tag/* → / (consolidate)
  /author/* → / (consolidate)
  /category/* → service categories

Blog Migration:
  /blog/frost-heave-decks → /new-deck-construction
  /blog/wood-vs-composite → /deck-materials-components
  /blog/* → / (general catch-all)
```

**301 vs 302:** All redirects use 301 (permanent) to pass PageRank and preserve keyword signals.

### 6. Main App Integration
**File:** `index.tsx` (updated)

Added:
```typescript
import StickyMobileCTA from './src/components/StickyMobileCTA';
import MicroOffers from './src/components/MicroOffers';
import { analytics } from './src/utils/analyticsTracker';
```

Integrated into:
1. **useEffect hook** - Track initial page load and hash changes
2. **Homepage render** - MicroOffers section after portfolio
3. **App footer** - StickyMobileCTA + FloatingActionButton

---

## Testing Checklist

### Pre-Launch (Before deploying to Netlify)

- [ ] **Component Testing**
  - StickyMobileCTA on iPhone 12 (375px)
  - MicroOffers on all three viewport sizes
  - Click handlers working correctly

- [ ] **Analytics Testing**
  - Open browser DevTools → Console
  - Navigate pages, verify `[Analytics]` logs
  - Click micro-offers, verify events logged
  - Check GTM dataLayer: `window.dataLayer`
  - Check Meta Pixel: `window.fbq` (if Meta SDK loaded)

- [ ] **Routing Testing**
  - Hash navigation works (#/path)
  - Page title updates on navigation
  - Quote form scroll-to works

### Post-Launch (After Netlify deployment)

- [ ] **Redirect Testing**
  - Use https://www.redirect-checker.org/
  - Test all critical URLs return 301
  - No redirect chains (A→B→C)
  - Final landing page is correct

- [ ] **SEO Monitoring**
  - Check Google Search Console for crawl errors
  - Monitor Core Web Vitals
  - Track Click/Impression changes

- [ ] **Analytics Verification**
  - GA4 events firing correctly
  - Meta Pixel Lead events recorded
  - Andromeda angle tagging in all events

---

## Migration Timeline

### Week 1-2: Testing
- Local testing of all components
- Verify analytics in dev environment
- Pre-migration GSC export (position data)

### Week 2-3: Staging
- Deploy to Netlify staging environment
- Test 301 redirects
- Verify crawlability with Screaming Frog

### Week 3-4: Production
- Deploy redirects.toml to Netlify production
- Monitor GSC for 24 hours
- Ready to scale analytics campaigns

### Month 1-3: Optimization
- Measure 1.77% → 2.5% mobile CTR improvement
- Analyze which angle converts best
- Refine messaging based on Andromeda angle performance

---

## Key Metrics to Track

### Mobile CTR Improvement
- **Baseline:** 1.77%
- **Target (Month 1):** 2.2%
- **Target (Month 3):** 2.5%+
- **Calculation:** Sticky CTA visible to ~2,000 monthly mobile users × 0.73% improvement = ~15 leads/month

### Andromeda Angle Performance
Track in GA4:
- Lead count by angle
- Conversion rate by angle
- CPC by angle (if running ads)

Example GA4 custom report:
```
Dimension: andromeda_angle
Metrics: Sessions, Events, Conversions
```

### Redirect Success
Monitor GSC:
- 404 errors (should decrease)
- Crawl budget efficiency
- Ranking changes for migrated URLs

---

## Files Created

```
src/
├── config/
│   └── migrationConfig.ts                    [NEW] 90 lines
├── utils/
│   └── analyticsTracker.ts                   [NEW] 250 lines
└── components/
    ├── StickyMobileCTA.tsx                   [NEW] 90 lines
    └── MicroOffers.tsx                       [NEW] 200 lines

netlify/
└── redirects.toml                            [NEW] 180+ redirect rules

public/
├── migration.json                            [EXISTING] Config from GSC data
├── migration-implementation-plan.md          [NEW] Detailed plan
└── MIGRATION_EXECUTION.md                    [NEW] This file

index.tsx                                     [UPDATED] +3 imports, +5 integration points
```

**Total new code:** ~650 lines of TypeScript/React  
**Total redirects:** 60+ rules covering pruning + consolidation + 301 preservation

---

## Next Steps

1. **Run locally:**
   ```bash
   npm run dev
   # Check console for [Analytics] messages
   # Test StickyMobileCTA on mobile viewport
   # Click micro-offers, verify scroll-to behavior
   ```

2. **Deploy to Netlify:**
   ```bash
   git add .
   git commit -m "Migration: SEO preservation + Andromeda Matrix + mobile CTR"
   git push
   # Netlify auto-deploys
   ```

3. **Monitor:**
   - GSC for 301 redirects taking effect (24-48 hours)
   - GA4 for angle performance
   - Meta Pixel for Lead events

4. **Optimize (Day 30+):**
   - Identify top-performing angle
   - A/B test messaging per angle
   - Refine micro-offer triggers

---

## Questions?

- **How do redirects work?** Each 301 in `redirects.toml` maps old URL → new URL with status code 301 (permanent). Netlify applies these rules on the edge.

- **Where does analytics data go?** GTM (Google Tag Manager) and Meta Pixel (facebook.com ads). You control what happens in GTM tags (e.g., GA4, CRM sync).

- **Can I disable StickyMobileCTA?** Yes. Remove from index.tsx line or set dismissal in localStorage.

- **How are angles assigned?** Automatically based on current page path. Homepage = Angle 1, Repair pages = Angle 3, etc. (see getAndromedaAngle in analyticsTracker.ts).

---

**Implementation Status:** ✅ COMPLETE  
**Ready for Launch:** ✅ YES (after local testing)  
**Estimated Launch Date:** 2026-02-26  
