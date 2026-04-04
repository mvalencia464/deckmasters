import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import type { Loader } from 'astro/loaders';
import {
  R2_ACCOUNT_ID,
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME,
  R2_PUBLIC_BASE_URL,
  R2_SITE_SLUG,
} from 'astro:env/server';

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif|svg)$/i;
const VIDEO_EXT = /\.(mp4|mov|webm)$/i;

export type R2MediaKind = 'image' | 'video';

export interface R2LoaderOptions {
  /** ListObjectsV2 Prefix: optional site slug + "/" or "" to scan bucket root (filtered to flat keys). */
  folder: string;
}

function classifyKey(key: string): R2MediaKind | null {
  if (IMAGE_EXT.test(key)) return 'image';
  if (VIDEO_EXT.test(key)) return 'video';
  return null;
}

/**
 * Flat layout: exactly one "/" in the logical key (client/file), after optional site prefix.
 * Examples: keller/a.webp, deckmasters/keller/a.webp
 */
function isFlatMediaKey(key: string, siteSlug: string): boolean {
  let rest = key;
  if (siteSlug && key.startsWith(`${siteSlug}/`)) {
    rest = key.slice(siteSlug.length + 1);
  }
  const parts = rest.split('/').filter(Boolean);
  return parts.length === 2;
}

async function listAllKeys(
  client: S3Client,
  bucket: string,
  prefix: string,
): Promise<Array<{ Key?: string; LastModified?: Date; Size?: number }>> {
  const out: Array<{ Key?: string; LastModified?: Date; Size?: number }> = [];
  let ContinuationToken: string | undefined;

  do {
    const data = await client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken,
      }),
    );
    if (data.Contents?.length) out.push(...data.Contents);
    ContinuationToken = data.IsTruncated ? data.NextContinuationToken : undefined;
  } while (ContinuationToken);

  return out;
}

export function r2Loader({ folder }: R2LoaderOptions): Loader {
  return {
    name: 'r2-loader',
    load: async ({ store, logger }) => {
      const siteSlug = (R2_SITE_SLUG ?? '').trim().replace(/^\/+|\/+$/g, '');
      const listPrefix = folder;

      logger.info(`Listing objects in R2 bucket "${R2_BUCKET_NAME}" prefix "${listPrefix}"...`);

      const client = new S3Client({
        region: 'auto',
        endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: R2_ACCESS_KEY_ID,
          secretAccessKey: R2_SECRET_ACCESS_KEY,
        },
      });

      try {
        const objects = await listAllKeys(client, R2_BUCKET_NAME, listPrefix);

        store.clear();

        let images = 0;
        let videos = 0;

        for (const obj of objects) {
          if (!obj.Key) continue;
          if (!isFlatMediaKey(obj.Key, siteSlug)) continue;

          const kind = classifyKey(obj.Key);
          if (!kind) continue;

          const id = obj.Key;
          const publicUrl = `${R2_PUBLIC_BASE_URL.replace(/\/+$/, '')}/${obj.Key}`;

          store.set({
            id,
            data: {
              id,
              key: obj.Key,
              url: publicUrl,
              kind,
              lastModified: obj.LastModified,
              size: obj.Size,
            },
          });

          if (kind === 'image') images++;
          else videos++;
        }

        logger.info(
          `Loaded ${store.entries().length} media objects from R2 (${images} images, ${videos} videos).`,
        );
      } catch (err) {
        logger.error(`Failed to list objects from R2: ${err instanceof Error ? err.message : String(err)}`);
        throw err;
      }
    },
  };
}
