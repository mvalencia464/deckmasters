# Migration Implementation Plan
## Deck Masters AK - SEO Preservation & Andromeda Matrix Integration

**Status:** Ready for Implementation  
**Priority:** Critical - GSC Data Preservation  
**Timeline:** 2026 Target Year  

---

## Executive Summary

This migration implements three core objectives from `migration.json`:

1. **SEO Signal Preservation** - 301 redirects for high-performing GSC pages
2. **Andromeda Matrix Integration** - 5 conversion angles with micro-offers
3. **Mobile CTR Improvement** - Sticky CTA to improve 1.77% baseline

---

## 1. SEO PRESERVATION STRATEGY

### Critical URLs (Preserve Rankings)

| URL | GSC Signals | Action | Target Path |
|-----|------------|--------|-------------|
| `/` | 1,103 clicks | Maintain | Homepage |
| `/is-trex-decking-right-for-you/` | 48,433 impressions | Redirect 301 | `/deck-materials-components/trex-deck-installation` |
| `/deck-repair/` | Position 1.72 | Redirect 301 | `/deck-repair-maintenance/deck-repair` |
| `/dock-building/` | Service discovery | Redirect 301 | `/dock-building/` (maintain) |
| `/custom-deck-design/` | Design consultation | Redirect 301 | `/custom-deck-design/` (maintain) |

### Pruning Strategy (Delete 0-click pages)

- `/tag/*` - Archive pages with 0 GSC clicks → Redirect to `/`
- `/author/*` - Archive pages with 0 GSC clicks → Redirect to `/`
- `/category/*` - Consolidate to main service categories

**Rationale:** These pages consume crawl budget without contributing organic value. 301 redirects pass PageRank to parent categories.

### Benchmarking (Pre-Migration Export)

Before deploying redirects, export:
- Current GSC rankings for terms ranking 1.02-2.33 (positions 2-3)
- Click-through rates for critical URLs
- Impression counts for each page

**Dates to track:**
- 2026-02-19: Pre-migration baseline
- 2026-03-19: Post-migration (30-day assessment)
- 2026-06-19: Full recovery period (90-day assessment)

---

## 2. ANDROMEDA MATRIX IMPLEMENTATION

### Five Conversion Angles

```
Angle 1: Premium Outdoor Luxury
  → Homepage, Custom Design, Gallery
  → Micro-offer: "Free 3D Design Preview"
  → Messaging: Luxury, ROI, lifestyle

Angle 2: Waterfront Lifestyle
  → Dock Building, Waterfront Services
  → Messaging: Views, entertaining, water access

Angle 3: Trust/Fixed-Price
  → Deck Repair, Maintenance, Safety
  → Micro-offer: "Free Structural Safety Inspection"
  → Messaging: Emergency response, warranty, reliability

Angle 4: Smart Investment
  → Material Comparisons, Durability, ROI
  → Micro-offer: "Free Frost-Heave Assessment"
  → Messaging: Cost of ownership, value, performance

Angle 5: (Reserved for A/B Testing)
```

### Micro-Offers Implementation

#### Safety Inspection (Trust Angle - Angle 3)
- **Trigger:** Repair/maintenance pages, old deck content
- **CTA Copy:** "Free Structural Safety Inspection"
- **Action:** Lead capture → SMS notification

#### Frost-Heave Assessment (Value Angle - Angle 4)
- **Trigger:** Material selection pages, ROI content
- **CTA Copy:** "Free Frost-Heave Assessment"
- **Action:** Lead capture → Inspection scheduling

#### 3D Design Preview (Luxury Angle - Angle 1)
- **Trigger:** Design pages, portfolio gallery
- **CTA Copy:** "Free 3D Design Preview"
- **Action:** Lead capture → Design consultation

### Component Placement

**MicroOffers.tsx** - Three display variants:

1. **Inline Horizontal** (default)
   - Position: Below hero, above testimonials
   - Layout: 3-column grid on desktop, stacked mobile
   - Visibility: Always visible

2. **Sidebar** (contextual)
   - Position: Right sidebar on desktop
   - Layout: Vertical list
   - Visibility: On service pages

3. **Popup** (exit-intent)
   - Position: Center modal
   - Layout: 3-column grid
   - Trigger: 80% scroll depth OR 30-second timer

---

## 3. MOBILE CTA OPTIMIZATION (+1.77% CTR Goal)

### Sticky Mobile Button

**Component:** `StickyMobileCTA.tsx`

- **Display:** Mobile devices only (<768px)
- **Visibility:** After 300px scroll (user engagement signal)
- **Label:** "Get My Quote"
- **Dismissible:** X button (respects user preference)
- **Color:** Orange-to-stone gradient (brand cohesion)
- **Position:** Fixed bottom of screen (doesn't block content)

**Expected Impact:**
- Current mobile CTR: 1.77%
- Target: 2.5-3% (baseline + sticky CTA)
- Assumption: 2,000 monthly mobile users × 0.73% improvement = ~15 additional leads/month

### Tracking

```javascript
// Analytics event fired on click
analytics.trackStickyCTAClick()
// → GTM: sticky_cta_engagement event
// → Meta Pixel: Lead conversion
```

---

## 4. META PIXEL & GTM INTEGRATION

### AnalyticsTracker Service

**Location:** `src/utils/analyticsTracker.ts`

#### Route Change Listeners

```javascript
// Fires on every page navigation
trackPageView(path, title)
  ├─ GTM: page_view event + andromeda_angle
  └─ Meta Pixel: PageView + custom properties
```

#### Conversion Events

**Lead** - Primary goal
- Triggered by: Form submit, CTA click, micro-offer click
- Properties: source, offer_id, andromeda_angle
- Goal: Improve lead attribution by angle

**ViewContent** - Engagement
- Triggered by: Micro-offer interaction
- Properties: offer_id, offer_label, andromeda_angle

**Form Submit** - Secondary validation
- Triggered by: Quote form submission
- Properties: form_name, field values

### Angle Tagging

Every event includes `andromeda_angle` property:

```json
{
  "event": "lead",
  "andromeda_angle": "Angle 3: Trust/Fixed-Price",
  "lead_source": "safety_insp_offer",
  "page_path": "/deck-repair-maintenance"
}
```

**Use Cases:**
- Campaign attribution (which angle converts best?)
- A/B testing framework (test angle messaging)
- Segmentation (tailor email sequences by angle)

---

## 5. IMPLEMENTATION CHECKLIST

### Phase 1: Configuration (Week 1)

- [x] Create `src/config/migrationConfig.ts`
  - SEO_PRIORITY_URLS array
  - MICRO_OFFERS definitions
  - ANDROMEDA_ANGLE_MAP
  
- [x] Create `src/utils/analyticsTracker.ts`
  - Singleton instance
  - Route change listeners
  - Event firing logic

### Phase 2: Components (Week 1-2)

- [x] Create `src/components/StickyMobileCTA.tsx`
  - Mobile detection
  - Scroll visibility logic
  - Dismiss handling

- [x] Create `src/components/MicroOffers.tsx`
  - Three display variants
  - Icon mapping
  - Offer descriptions

### Phase 3: Integration (Week 2-3)

- [ ] Import StickyMobileCTA in `index.tsx`
- [ ] Hook AnalyticsTracker in main App component
  - Call `analytics.trackPageView()` on mount
  - Hook router change listeners

- [ ] Add MicroOffers to relevant pages:
  - Homepage (inline, below hero)
  - Service pages (sidebar)
  - Repair/Maintenance (inline, prominent)

- [ ] Update QuoteForm to fire:
  - `analytics.trackFormSubmission()`
  - On successful submit: `analytics.trackLead()`

### Phase 4: Redirects (Week 3)

- [x] Create `netlify/redirects.toml`
  - 301 redirects for critical URLs
  - Tag/author/category cleanup
  - Blog consolidation

- [ ] Deploy to Netlify
- [ ] Test with redirect checker tool
- [ ] Monitor GSC for crawl errors

### Phase 5: Monitoring (Week 4+)

- [ ] Set up GSC alerts for:
  - Crawl errors (404s)
  - Core Web Vitals changes
  - Click/impression changes
  
- [ ] Create GA4 dashboard for:
  - Andromeda angle performance
  - Mobile CTR trends
  - Conversion funnel by angle

---

## 6. TESTING PROTOCOL

### Pre-Deployment

1. **Redirect Testing**
   - 301 status codes: Use https://www.redirect-checker.org/
   - Crawl all critical URLs
   - Verify landing page (not intermediate redirects)

2. **Component Testing**
   - StickyMobileCTA: Test on iPhone 12 (375px viewport)
   - MicroOffers: Test all three variants
   - Analytics: Check browser console for tracking calls

3. **Analytics Testing**
   - Enable debug mode in GTM
   - Verify events firing in Meta Pixel API
   - Check dataLayer in browser console

### Post-Deployment (30-day checkpoint)

1. **GSC Monitoring**
   - Compare rankings for migrated URLs
   - Check crawl stats (errors decreased?)
   - Review click data for new URL structure

2. **GA4 Metrics**
   - Sessions, Users, Conversions by andromeda_angle
   - Mobile CTR baseline vs. current
   - Micro-offer click rates

3. **Lead Quality**
   - Lead source distribution (angle analysis)
   - Form submission rate
   - Lead-to-quote conversion rate

---

## 7. FUTURE OPTIMIZATION

### Angle 5 - Reserved for A/B Testing

Once baseline metrics are established (30 days), test:
- Different CTA copy variations
- Angle messaging refinement
- Urgency triggers (seasonal/seasonal/inventory)

### Dynamic Angle Assignment

Could enhance AnalyticsTracker to:
- Assign angles based on utm_source/utm_medium
- Test landing page variations per angle
- Create angle-specific email sequences

### Mobile CTR Targets (Year-over-year)

- Month 1-3: 1.77% → 2.2% (sticky CTA introduction)
- Month 4-6: 2.2% → 2.5% (optimization + copy testing)
- Month 7-12: 2.5% → 3%+ (full angle optimization)

---

## 8. ROLLBACK PLAN

If metrics decline post-migration:

1. **In Netlify:**
   - Comment out redirects → serve old URL structure
   - Parallel run both sites if possible

2. **In Analytics:**
   - Keep old GA4 property active
   - Compare metrics before/after

3. **Timeline:**
   - If critical issue detected: Rollback within 24 hours
   - Root cause analysis: 3-day window
   - Re-deployment: After fixes verified

---

## Files Deployed

```
src/
├── config/
│   └── migrationConfig.ts          ✓ Created
├── utils/
│   └── analyticsTracker.ts         ✓ Created
└── components/
    ├── StickyMobileCTA.tsx         ✓ Created
    └── MicroOffers.tsx             ✓ Created

netlify/
└── redirects.toml                  ✓ Created

public/
└── migration-implementation-plan.md ✓ Created
```

---

## Contact & Support

**Questions about this migration?**

- Review `migration.json` for original GSC data
- Check current Google Search Console for live metrics
- Test locally: `npm run dev` + browser console

**Monitoring URLs:**
- GSC: https://search.google.com/search-console/
- GA4: https://analytics.google.com/
- Meta Ads Manager: https://business.facebook.com/

---

**Last Updated:** 2026-02-19  
**Next Review:** 2026-03-19 (30-day post-migration)
