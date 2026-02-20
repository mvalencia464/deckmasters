# DeckMasters - Professional Deck Building & Restoration

Portfolio website for DeckMasters, showcasing deck construction, restoration, and outdoor living services in Anchorage, Alaska.

## Quick Start

**Prerequisites:** Node.js 16+

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## Project Structure

```
├── src/
│   ├── components/          # React components
│   ├── utils/               # Helper functions (assetMapper, etc)
│   ├── styles/              # Global styles
│   └── App.tsx
├── public/
│   ├── assets/testimonials/ # Customer review images & videos
│   └── favicon files
├── Testimonials.json        # Review data (text, ratings, images, videos)
├── netlify.toml            # Deployment config
└── vite.config.ts          # Build config
```

## Key Features

- **Responsive Design** - Mobile-first, works on all devices
- **Image Optimization** - Local asset serving + lazy loading
- **Video Testimonials** - Embedded video player for customer reviews
- **Photo Gallery** - Portfolio grid with image modal
- **Contact Form** - Quote requests with Cloudflare Turnstile verification
- **Performance** - Optimized images, code splitting, caching

## Development

- **Build:** `npm run build` (creates `dist/` folder)
- **Format:** TypeScript, React with Tailwind CSS
- **Linting:** ESLint configured

## Deployment

Deployed on **Netlify** via GitHub push.

**Build command:** `npm run build`  
**Publish directory:** `dist/`

See `netlify.toml` for configuration.

## Data

**Testimonials:** `Testimonials.json` contains customer reviews with text, ratings, avatars, images, and optional video.

**Images:** Stored locally in `public/assets/testimonials/images/` for fast loading.

**Videos:** Customer testimonial videos in `public/assets/testimonials/videos/`

## Important Files

- `src/components/TestimonialImageModal.tsx` - Image viewer for reviews
- `src/components/TestimonialVideoCard.tsx` - Video player for testimonials
- `src/utils/assetMapper.ts` - Maps testimonial URLs to local assets
- `index.tsx` - Main app component with all sections
