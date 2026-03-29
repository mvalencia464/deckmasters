import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

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

export const collections = { blog };
