import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { R2_SITE_SLUG } from 'astro:env/server';
import { r2Loader } from './loaders/r2-loader';
import { mediaPublicUrl } from './utils/media';

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
    /** R2 key: <clientSlug>/<file.ext> or absolute URL */
    featuredImage: r2MediaSrc,
    galleryImages: z.array(r2MediaSrc),
    /** R2 key or absolute URL for walkthrough / hero video */
    video: r2MediaSrc.optional(),
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

const siteSlugForR2 = (R2_SITE_SLUG ?? '').trim().replace(/^\/+|\/+$/g, '');
/** ListObjects prefix: whole tenant prefix (flat keys: <slug>/<client>/<file>). */
const projectMediaListPrefix = siteSlugForR2 ? `${siteSlugForR2}/` : '';

const projectImages = defineCollection({
  loader: r2Loader({ folder: projectMediaListPrefix }),
  schema: z.object({
    id: z.string(),
    key: z.string(),
    url: z.string(),
    kind: z.enum(['image', 'video']),
    lastModified: z.coerce.date().optional(),
    size: z.number().optional(),
  }),
});

export const collections = { blog, projects, projectImages };
