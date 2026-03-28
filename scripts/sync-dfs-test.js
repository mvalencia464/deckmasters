/**
 * Standalone DataForSEO → local JSON + review images (test dataset).
 *
 * Project photos: src/assets/review-images/test/
 * Profile avatars: src/assets/avatars/test/
 * (under src/assets so Astro can optimize via astro:assets <Image />.)
 *
 * Usage:
 *   node scripts/sync-dfs-test.js
 *   npm run sync-dfs-test
 *
 * Requires .env: DATAFORSEO_LOGIN, DATAFORSEO_PASSWORD
 */

import axios from 'axios';
import fse from 'fs-extra';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

dotenv.config({ path: path.join(ROOT, '.env') });

const API_REVIEWS = 'https://api.dataforseo.com/v3/business_data/google/reviews';
const POLL_INTERVAL_MS = 3000;
const POLL_MAX_ATTEMPTS = 30;
const DOWNLOAD_CONCURRENCY = 4;

const KEYWORD = 'Deck Masters AK';
const LOCATION_CODE = 2840; // Anchorage (matches reviews-clients deck-masters)

const OUTPUT_JSON = path.join(ROOT, 'src/data/dfs-test-reviews.json');
const IMAGES_DIR = path.join(ROOT, 'src/assets/review-images/test');
const AVATARS_DIR = path.join(ROOT, 'src/assets/avatars/test');

function getAuthHeader() {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) {
    console.error('Missing DATAFORSEO_LOGIN or DATAFORSEO_PASSWORD in .env');
    process.exit(1);
  }
  return `Basic ${Buffer.from(`${login}:${password}`, 'utf8').toString('base64')}`;
}

function safeFilename(reviewId) {
  if (!reviewId || typeof reviewId !== 'string') return 'unknown';
  return reviewId.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 128) || 'unknown';
}

function formatPublishDate(timestamp) {
  if (!timestamp) return '';
  return String(timestamp).trim().replace(/\s*\+00:00\s*$/, '').trim() || '';
}

function extractItems(apiBody) {
  const result = apiBody?.tasks?.[0]?.result;
  if (!Array.isArray(result) || result.length === 0) return [];
  const first = result[0];
  const items = first?.items;
  return Array.isArray(items) ? items : [];
}

async function taskPost() {
  const body = [
    {
      keyword: KEYWORD,
      location_code: LOCATION_CODE,
      language_code: 'en',
      depth: 150,
      sort_by: 'newest',
    },
  ];
  const res = await axios.post(`${API_REVIEWS}/task_post`, body, {
    headers: {
      Authorization: getAuthHeader(),
      'Content-Type': 'application/json',
    },
    validateStatus: () => true,
  });
  if (res.status >= 400) {
    throw new Error(`DataForSEO task_post error ${res.status}: ${JSON.stringify(res.data)}`);
  }
  const task = res.data?.tasks?.[0];
  // task_post: 20000 Ok, 20100 Task Created — both mean the async job was accepted.
  const postOk = task?.status_code === 20000 || task?.status_code === 20100;
  if (task?.status_code != null && !postOk) {
    throw new Error(
      `DataForSEO task_post failed: ${task.status_code} ${task.status_message ?? ''}`.trim()
    );
  }
  if (!task?.id) {
    throw new Error('No task id in task_post response: ' + JSON.stringify(res.data));
  }
  return task.id;
}

async function taskGet(taskId) {
  const res = await axios.get(`${API_REVIEWS}/task_get/${taskId}`, {
    headers: {
      Authorization: getAuthHeader(),
      'Content-Type': 'application/json',
    },
    validateStatus: () => true,
  });
  if (res.status >= 400) {
    throw new Error(`DataForSEO task_get error ${res.status}: ${JSON.stringify(res.data)}`);
  }
  return res.data;
}

async function pollUntilReady(taskId) {
  for (let attempt = 0; attempt < POLL_MAX_ATTEMPTS; attempt++) {
    const body = await taskGet(taskId);
    const task = body?.tasks?.[0];
    const result = task?.result;
    const status = task?.status_code;
    const msg = task?.status_message ?? body?.status_message ?? '';
    if (status === 20000 && Array.isArray(result) && result.length > 0) {
      return body;
    }
    if (attempt < POLL_MAX_ATTEMPTS - 1) {
      console.log(`  Waiting for task... (${attempt + 1}/${POLL_MAX_ATTEMPTS}) ${msg || 'in progress'}`);
      await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
    }
  }
  throw new Error('Task did not complete in time. Try again later or check the DataForSEO dashboard.');
}

/**
 * Run async tasks with a fixed concurrency limit (avoids FS / socket pile-ups).
 */
async function runPool(jobs, concurrency, worker) {
  const results = new Array(jobs.length);
  let next = 0;

  async function workerFn() {
    while (next < jobs.length) {
      const i = next++;
      results[i] = await worker(jobs[i], i);
    }
  }

  const n = Math.max(1, Math.min(concurrency, jobs.length || 1));
  await Promise.all(Array.from({ length: n }, () => workerFn()));
  return results;
}

async function downloadImage(url, filepath) {
  const res = await axios.get(url, {
    responseType: 'arraybuffer',
    timeout: 60000,
    maxRedirects: 5,
    validateStatus: (s) => s >= 200 && s < 400,
  });
  await fse.outputFile(filepath, Buffer.from(res.data));
}

async function main() {
  console.log(`DataForSEO test sync — "${KEYWORD}" (depth 150, newest, en)`);

  console.log('Creating reviews task (task_post)...');
  const taskId = await taskPost();
  console.log(`Task id: ${taskId}. Waiting for results...`);

  const apiBody = await pollUntilReady(taskId);
  const items = extractItems(apiBody);

  await fse.ensureDir(IMAGES_DIR);
  await fse.ensureDir(AVATARS_DIR);

  const downloadJobs = [];

  const reviews = [];

  for (const item of items) {
    const reviewId = item?.review_id;
    const ratingVal = item?.rating?.value;
    const rating = typeof ratingVal === 'number' ? Math.round(ratingVal) : 0;
    const reviewText = (item?.review_text ?? '').trim();
    const authorName = (item?.profile_name ?? '').trim() || 'Google User';
    const publishDate = formatPublishDate(item?.timestamp ?? '');
    const profileImageUrl = item?.profile_image_url;

    const localPaths = [];
    let localAvatarPath = '';

    const base = reviewId ? safeFilename(reviewId) : '';
    if (base && profileImageUrl && typeof profileImageUrl === 'string') {
      const filename = `${base}.jpg`;
      const absFile = path.join(AVATARS_DIR, filename);
      localAvatarPath = path.join('src/assets/avatars/test', filename).split(path.sep).join('/');
      downloadJobs.push({
        kind: 'avatar',
        url: profileImageUrl,
        filepath: absFile,
        relPath: localAvatarPath,
        reviewIndex: reviews.length,
      });
    }

    const imgs = item?.images;
    if (reviewId && Array.isArray(imgs) && imgs.length > 0) {
      imgs.forEach((img, index) => {
        const imageUrl = img?.image_url;
        if (!imageUrl || typeof imageUrl !== 'string') return;
        const filename = `${base}_${index}.jpg`;
        const absFile = path.join(IMAGES_DIR, filename);
        const relProject = path.join('src/assets/review-images/test', filename).split(path.sep).join('/');
        downloadJobs.push({
          kind: 'project',
          url: imageUrl,
          filepath: absFile,
          relPath: relProject,
          reviewIndex: reviews.length,
        });
        localPaths.push(relProject);
      });
    }

    reviews.push({
      review_id: reviewId ?? '',
      rating,
      review_text: reviewText,
      author_name: authorName,
      publish_date: publishDate,
      local_avatar_path: localAvatarPath,
      local_image_paths: localPaths,
    });
  }

  if (downloadJobs.length > 0) {
    console.log(`Downloading ${downloadJobs.length} files (concurrency ${DOWNLOAD_CONCURRENCY})...`);
    await runPool(downloadJobs, DOWNLOAD_CONCURRENCY, async (job) => {
      try {
        await downloadImage(job.url, job.filepath);
      } catch (e) {
        console.warn(`Download failed (${job.url.slice(0, 80)}…):`, e.message ?? e);
        const r = reviews[job.reviewIndex];
        if (r && job.kind === 'project' && Array.isArray(r.local_image_paths)) {
          r.local_image_paths = r.local_image_paths.filter((p) => p !== job.relPath);
        }
        if (r && job.kind === 'avatar') {
          r.local_avatar_path = '';
        }
        try {
          await fse.remove(job.filepath);
        } catch {
          /* ignore */
        }
      }
    });
  }

  const payload = {
    reviews,
    meta: {
      keyword: KEYWORD,
      location_code: LOCATION_CODE,
      depth: 150,
      sort_by: 'newest',
      syncedAt: new Date().toISOString(),
    },
  };

  await fse.outputFile(OUTPUT_JSON, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`Wrote ${reviews.length} reviews → ${path.relative(ROOT, OUTPUT_JSON)}`);
  console.log(`Project images: ${path.relative(ROOT, IMAGES_DIR)}`);
  console.log(`Avatars: ${path.relative(ROOT, AVATARS_DIR)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
