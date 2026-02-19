# Portfolio Nomenclature Guide

## To Avoid Future Confusion

### Portfolio Section (Homepage)
- **Display**: "Built to Endure" section on the homepage
- **Content**: 13 featured projects (6 legacy + 7 new)
- **File**: `src/components/PortfolioSection.tsx`
- **Data**: 
  - Legacy projects: `src/constants/portfolio.ts` (cloud-hosted)
  - New projects: `src/data/portfolio-data.json` (local images)
- **Images**: `/public/images/portfolio/` (42 WEBP files)
- **Description**: Curated showcase on main landing page with filtering by niche

### Gallery Archive (Dedicated Page)
- **Display**: Full-page project gallery with admin capabilities
- **Route**: `/gallery-archive`
- **File**: `src/pages/GalleryArchive.tsx` (renamed from PortfolioPage.tsx)
- **Data**: Same as Portfolio Section (MOCK_PROJECTS)
- **Description**: Comprehensive view of all projects with advanced filtering, admin controls, and project management

---

## Clear Terminology

When discussing features or changes, use:

| What You Mean | Say This | NOT This |
|---|---|---|
| The hero section with 13 projects | **Portfolio Section** | Portfolio page |
| The full-page gallery with admin | **Gallery Archive** | Portfolio page |
| Images in the public folder | `/public/images/portfolio/` | portfolio folder |

---

## File Structure (Cleaned Up)

```
public/images/
├── portfolio/ ✓ (Active - 42 WEBP images for both sections)
├── assets/
│   └── testimonials/
├── 24-hour-replacement-promise.webp
├── consultation.webp
├── deck-demolition-crew.webp
├── deck-installation-thumbnail.webp
├── drone-wraparound.mp4
├── dsc_9524_webp.webp
├── icon.svg
├── icon.webp
├── moa-inspection-permit.webp
└── moa.webp

src/pages/
├── GalleryArchive.tsx ✓ (Renamed from PortfolioPage.tsx)
├── PrivacyPage.tsx
├── ProductsPage.tsx
└── TermsPage.tsx

src/components/
├── PortfolioSection.tsx ✓ (Homepage hero section)
└── portfolio/
    ├── ProjectCard.tsx
    ├── ProjectModal.tsx
    ├── BeforeAfterSlider.tsx
    └── AdminProjectForm.tsx

src/data/
└── portfolio-data.json ✓ (7 featured projects)

src/constants/
└── portfolio.ts ✓ (6 legacy projects + merged data)
```

---

## Deleted

- ❌ `/public/images/portfolio-optimized/` (old nested structure)
- ❌ `/public/images/moreimages/` (unused legacy folder)

---

## Going Forward

When adding new projects to the **Portfolio Section**:
1. Add optimized WEBP images to `/public/images/portfolio/`
2. Update `src/data/portfolio-data.json` with project details
3. Images will automatically display in both Portfolio Section and Gallery Archive

When referencing in conversations:
- Always say "Portfolio Section" for the homepage "Built to Endure" area
- Always say "Gallery Archive" for the dedicated `/gallery-archive` page
