import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import type { Loader } from 'astro/loaders';
import { 
  R2_ACCOUNT_ID, 
  R2_ACCESS_KEY_ID, 
  R2_SECRET_ACCESS_KEY, 
  R2_BUCKET_NAME, 
  R2_PUBLIC_BASE_URL 
} from 'astro:env/server';

interface R2LoaderOptions {
  folder: string;
}

export function r2Loader({ folder }: R2LoaderOptions): Loader {
  return {
    name: 'r2-loader',
    load: async ({ store, logger }) => {
      logger.info(`Listing objects in R2 bucket "${R2_BUCKET_NAME}" folder "${folder}"...`);

      const client = new S3Client({
        region: 'auto',
        endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: R2_ACCESS_KEY_ID,
          secretAccessKey: R2_SECRET_ACCESS_KEY,
        },
      });

      const command = new ListObjectsV2Command({
        Bucket: R2_BUCKET_NAME,
        Prefix: folder,
      });

      try {
        const data = await client.send(command);
        const objects = data.Contents || [];

        store.clear();

        for (const obj of objects) {
          if (!obj.Key) continue;
          
          // Only include common image extensions
          if (!/\.(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(obj.Key)) continue;

          const id = obj.Key;
          const publicUrl = `${R2_PUBLIC_BASE_URL}/${obj.Key}`;

          store.set({
            id,
            data: {
              key: obj.Key,
              url: publicUrl,
              lastModified: obj.LastModified,
              size: obj.Size,
            },
          });
        }

        logger.info(`Loaded ${store.entries().length} images from R2 folder "${folder}".`);
      } catch (err) {
        logger.error(`Failed to list objects from R2: ${err instanceof Error ? err.message : String(err)}`);
        throw err;
      }
    },
  };
}
