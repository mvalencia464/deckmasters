To move to the Astro 6 native way, you are essentially shifting from a "Push" model (manually preparing and pushing files) to a "Pull" model (putting raw files in R2 and letting Astro's Content Layer and Middleware do the work).

Here is a prompt you can use to have your code updated, followed by the "Why" and "How" of the Astro 6 approach.

The Prompt for your AI/Developer
Copy and paste this to refactor your setup:

"I want to refactor my Cloudflare R2 media workflow to be Astro 6 Native.

Eliminate the media-optimize.mjs script. I want to upload raw high-quality images to R2 and let Astro’s built-in Image Service handle optimization (AVIF/WebP) on-the-fly.

Refactor media-upload-r2.mjs to be a simple 'sync' tool that moves media/raw to the bucket without local processing.

Implement the Astro 6 Content Layer: Create a loader in src/content.config.ts that fetches the list of image keys from R2 so I can use them as a type-safe collection.

Configure astro:env: Define a schema for R2 credentials (Account ID, Keys, Bucket Name) using the server access level for security.

Update Components: Use the Astro <Image /> component with the remote R2 URLs, ensuring the astro.config.mjs is configured to allow the R2 domain."

Why this is better for Astro 6
Single Source of Truth: You no longer have "raw" and "dist" folders locally. Your R2 bucket becomes your single source of truth.

Type Safety: By using the Content Layer, you can reference images in your code (e.g., getCollection('projectImages')) and get autocomplete for every image stored in R2.

On-Demand Optimization: If you decide next month that AVIF isn't enough and you want a new format, you just change one line in your Astro config. You don't have to re-run scripts on thousands of images.

Security: Using astro:env prevents your R2 Secret Key from ever accidentally leaking into a client-side JavaScript bundle.

The Astro 6 Native Way (The Setup)
1. Remote Image Configuration
In astro.config.mjs, you must authorize your R2 bucket so Astro is allowed to "touch" the images to optimize them:

JavaScript
import { defineConfig } from 'astro/config';

export default defineConfig({
  image: {
    domains: ['media.your-custom-domain.com'], // Your R2 Public URL
  },
  // If you are deploying to Cloudflare, use the cloudflare adapter
  adapter: cloudflare(), 
});
2. Secure Environment Variables
Instead of a generic .env, Astro 6 uses a schema. In astro.config.mjs:

JavaScript
import { envField } from 'astro/config';

export default defineConfig({
  experimental: {
    env: {
      schema: {
        R2_SECRET_ACCESS_KEY: envField.string({ context: 'server', access: 'secret' }),
        R2_ACCESS_KEY_ID: envField.string({ context: 'server', access: 'public' }),
        R2_BUCKET_NAME: envField.string({ context: 'server', access: 'public' }),
      }
    }
  }
});
3. The Content Layer (The "Magic")
In src/content.config.ts, you can define a loader that automatically lists your images from R2. This replaces the need to manually track what you've uploaded.

TypeScript
import { defineCollection } from 'astro:content';
import { r2Loader } from './loaders/r2-loader'; // You would create this helper

const projectImages = defineCollection({
  loader: r2Loader({ folder: 'projects/' }),
});

export const collections = { projectImages };
4. Usage in Components
Now, you simply use the standard Astro component. No more worrying about paths:

Code snippet
---
import { Image } from 'astro:assets';
// Image source comes from your R2 bucket via the content layer
const { src, alt } = Astro.props; 
---
<Image 
  src={src} 
  alt={alt} 
  width={800} 
  format="avif" 
/>
Summary: Your previous plan was a Build-Step Workflow. The Astro 6 way is a Data-Layer Workflow. It is much more maintainable because the framework manages the "transformation" of images while you just manage the "storage" of images.