import { defineConfig, fontProviders, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { sitemapSerialize } from './sitemap-serialize.mjs';

export default defineConfig({
  site: 'https://deckmastersak.com',
  output: 'static',
  // No Cloudflare adapter: this site is fully static HTML/CSS + pre-optimized images at build time.
  // @astrojs/cloudflare emits dist/server/wrangler.json with ASSETS/KV/triggers that Pages rejects
  // during deploy; Pages Functions in /functions stay independent of the Astro worker bundle.
  env: {
    schema: {
      R2_SECRET_ACCESS_KEY: envField.string({ context: 'server', access: 'secret' }),
      R2_ACCESS_KEY_ID: envField.string({ context: 'server', access: 'public' }),
      R2_BUCKET_NAME: envField.string({ context: 'server', access: 'public' }),
      R2_ACCOUNT_ID: envField.string({ context: 'server', access: 'public' }),
      R2_PUBLIC_BASE_URL: envField.string({ context: 'server', access: 'public' }),
      // Optional prefix for multi-site media isolation in R2.
      // When set, we upload + resolve objects under: <siteSlug>/projects/...
      // When empty, we keep the current behavior: projects/...
      R2_SITE_SLUG: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
        default: '',
      }),
    },
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Oswald',
      cssVariable: '--font-oswald',
      weights: [500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      // Heavier condensed system fonts read closer to Oswald than generic sans-serif while loading.
      fallbacks: ['Arial Black', 'Impact', 'sans-serif'],
    },
  ],
  integrations: [
    sitemap({
      lastmod: new Date(),
      serialize: sitemapSerialize,
      /** Exclude internal tools from sitemap (still noindex on page). */
      filter: (page) => {
        try {
          const path = new URL(page).pathname.replace(/\/$/, '') || '/';
          if (path.startsWith('/admin')) return false;
          return true;
        } catch {
          return true;
        }
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    service: {
      entrypoint: './src/image-services/sharp-saturated.ts',
    },
    formats: ['avif', 'webp'],
    domains: ['media.stokeleads.com'],
  },
});
