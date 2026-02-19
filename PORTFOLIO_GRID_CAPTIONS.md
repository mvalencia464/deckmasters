# Portfolio Grid Enhanced with Emotional Captions

## What's New

### 1. Emotionally Resonant Captions
Every image now has a custom caption that taps into the 5 advertising angles:

**Angle 1: Premium Outdoor Luxury (Status & Pride)**
- "Why fly to Hawaii? Walk out your back door instead."
- "The most impressive room in your house... isn't inside."
- "Turn your backyard into the private resort your neighbors envy."

**Angle 2: Speed & Efficiency (Time & Regret)**
- "Wraparound dreams. Custom built. 21-day guarantee."
- "From concept to completion. No surprises. Just results."

**Angle 3: Trust & No Surprises (Fear & Skepticism)**
- "Precision craftsmanship in every hidden fastener."
- "Zero surprises. Pure joy."

**Angle 4: Smart Investment (Logic & ROI)**
- "Premium composite that won't rot, warp, or splinter."
- "Unobstructed views. Wind-rated cable railing perfection."

**Angle 5: Relief & Ease (Peace of Mind)**
- "Sunset views. Stress-free living. No maintenance."
- "Contemporary beauty. Frost-heave resistant. Built right."

### 2. Enhanced Grid Hover Experience
- Caption now slides up from bottom on hover
- Dark gradient overlay for text readability
- Smooth transitions
- Playful, desire-driven language throughout

### 3. Advanced Lightbox Navigation
**Visual Improvements:**
- Larger, centered image display
- Caption displayed below image in semi-transparent backdrop
- Current image counter (e.g., "Image 3 of 41")
- Left/Right navigation arrows with hover effects (orange on hover)

**Navigation Methods:**
- **Click arrows** on left/right sides
- **Keyboard arrows** (← → keys)
- **Escape key** to close
- **Click outside** image to close

### 4. Keyboard Support
- `→` Next image
- `←` Previous image  
- `Esc` Close lightbox

---

## Caption Strategy

All 41 captions are designed to:
1. **Stimulate desire** - "Why fly to Hawaii? Walk out your back door instead."
2. **Highlight benefits** - "Premium composite that won't rot, warp, or splinter."
3. **Tap cable railing appeal** - Multiple mentions of views, railing, unobstructed sightlines
4. **Build confidence** - "Zero surprises. Pure joy."
5. **Emphasize transformation** - "Where entertaining becomes art."

---

## Technical Implementation

**File**: `src/components/PortfolioGrid.tsx`

**Key Features:**
- 41 custom captions (one per image)
- Current image index tracking for lightbox
- Keyboard event listener with cleanup
- Smooth transitions on all interactions
- Accessible alt text using captions

---

## Build Status
✓ Build successful
✓ All images displaying with captions
✓ Lightbox navigation working
✓ Keyboard support active
