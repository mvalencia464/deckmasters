import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { R2_PUBLIC_BASE_URL, R2_SITE_SLUG } from 'astro:env/server';
import { r2Loader } from './loaders/r2-loader';

/** R2 object key or absolute URL → absolute URL for <Image /> and <img>. */
function mediaPublicUrl(keyOrUrl: string): string {
  const raw = keyOrUrl.trim();
  if (/^https?:\/\//i.test(raw)) return raw;
  const base = R2_PUBLIC_BASE_URL.replace(/\/+$/, '');
  const key = raw.replace(/^\/+/, '');

  const siteSlug = (R2_SITE_SLUG ?? '').trim().replace(/^\/+|\/+$/g, '');
  if (!siteSlug) return `${base}/${key}`;

  // If the key is already prefixed, don't double-prefix.
  if (key.startsWith(`${siteSlug}/`)) return `${base}/${key}`;
  return `${base}/${siteSlug}/${key}`;
}

const r2MediaSrc = z.string().transform(mediaPublicUrl);

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    /** Meta description + default article deck; keep ~150–165 chars for SERPs */
    description: z.string(),
    /** Optional opener shown under the title when you want a longer hook than `description` */
    lede: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /** Project image slug (e.g. "006-aerial-composite") for featured image; uses /projects/{image}.avif */
    image: z.string().optional(),
    /** YouTube video ID (e.g. "LgI04T7LvXE") to embed at the top of the post */
    video: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    h1: z.string(),
    subhead: z.string(),
    sectionH2: z.string(),
    p1: z.string(),
    p2: z.string(),
    location: z.string().default('Anchorage, Alaska'),
    deckType: z.string(),
    keyFeatures: z.string(),
    /** R2 key relative to bucket (e.g. projects/keller/hero.webp) or absolute image URL */
    featuredImage: r2MediaSrc,
    galleryImages: z.array(r2MediaSrc),
    video: z.string().optional(),
    /**
     * hero: video replaces featured image under the title (default).
     * afterGallery: keep featured image at top; show video below the photo grid.
     */
    videoPlacement: z.enum(['hero', 'afterGallery']).default('hero'),
    /** Short intro for on-site walkthrough videos (shown under the player when set) */
    walkthroughIntro: z.string().optional(),
    /** Pull quotes from the walkthrough transcript */
    walkthroughQuotes: z.array(z.string()).optional(),
    isFeatured: z.boolean().default(false),
  }),
});

const projectImages = defineCollection({
  loader: r2Loader({
    folder: `${(R2_SITE_SLUG ?? '').trim().replace(/^\/+|\/+$/g, '') || ''}projects/`,
  }),
});

export const collections = { blog, projects, projectImages };
