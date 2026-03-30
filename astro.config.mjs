import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { sitemapSerialize } from './sitemap-serialize.mjs';

export default defineConfig({
  site: 'https://deckmastersak.com',
  output: 'static',
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
    formats: ['avif', 'webp'],
  },
});
