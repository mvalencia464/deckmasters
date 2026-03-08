/**
 * DataForSEO Google Reviews sync — search by business name, multi-client ready.
 *
 * 1. POST reviews/task_post with keyword (business name) + location + language
 * 2. Poll task_get until results are ready
 * 3. Download avatars, map to reviews.json schema, write to client output paths
 *
 * Credentials: .env with DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD.
 * Config: scripts/reviews-clients.json (keyword, location_code or location_name, language_code per client).
 *
 * Usage:
 *   node --env-file=.env scripts/sync-reviews.js              # default client
 *   node --env-file=.env scripts/sync-reviews.js deck-masters # client by slug
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const API_REVIEWS = 'https://api.dataforseo.com/v3/business_data/google/reviews';
const POLL_INTERVAL_MS = 3000;
const POLL_MAX_ATTEMPTS = 30;

function getAuthHeader() {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) {
    console.error('Missing DATAFORSEO_LOGIN or DATAFORSEO_PASSWORD. Set them in .env');
    process.exit(1);
  }
  return `Basic ${Buffer.from(`${login}:${password}`, 'utf8').toString('base64')}`;
}

function loadConfig() {
  const configPath = path.join(__dirname, 'reviews-clients.json');
  const raw = fs.readFileSync(configPath, 'utf8');
  const config = JSON.parse(raw);
  if (!Array.isArray(config.clients) || config.clients.length === 0) {
    console.error('reviews-clients.json must have a non-empty "clients" array.');
    process.exit(1);
  }
  return config;
}

function selectClient(config) {
  const slug = process.argv[2] || process.env.CLIENT_SLUG || config.defaultSlug;
  const client = config.clients.find((c) => c.slug === slug) || config.clients[0];
  if (slug && client.slug !== slug) {
    console.warn(`Client "${slug}" not found, using "${client.slug}"`);
  }
  if (client.location_code == null && !client.location_name) {
    console.error(`Client "${client.slug}" must have location_code or location_name in reviews-clients.json`);
    process.exit(1);
  }
  return client;
}

function safeFilename(reviewId) {
  if (!reviewId || typeof reviewId !== 'string') return 'unknown';
  return reviewId.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 128) || 'unknown';
}

function formatDate(timestamp) {
  if (!timestamp) return '';
  return String(timestamp).trim().replace(/\s*\+00:00\s*$/, '').trim() || '';
}

async function taskPost(client) {
  const location = client.location_code != null
    ? { location_code: client.location_code }
    : client.location_name
      ? { location_name: client.location_name }
      : {};
  const body = [
    {
      keyword: client.keyword,
      language_code: client.language_code || 'en',
      depth: client.depth ?? 10,
      sort_by: client.sort_by || 'highest_rating',
      ...location,
    },
  ];
  const res = await fetch(`${API_REVIEWS}/task_post`, {
    method: 'POST',
    headers: {
      Authorization: getAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DataForSEO task_post error ${res.status}: ${text}`);
  }
  const data = await res.json();
  const task = data?.tasks?.[0];
  if (!task?.id) {
    throw new Error('No task id in task_post response: ' + JSON.stringify(data));
  }
  return task.id;
}

async function taskGet(taskId) {
  const res = await fetch(`${API_REVIEWS}/task_get/${taskId}`, {
    method: 'GET',
    headers: {
      Authorization: getAuthHeader(),
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DataForSEO task_get error ${res.status}: ${text}`);
  }
  return res.json();
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
    // Don't throw on "Task In Queue" or any intermediate status — just keep polling.
    // Only give up when we've used all attempts.
    if (attempt < POLL_MAX_ATTEMPTS - 1) {
      console.log(`  Waiting for task... (${attempt + 1}/${POLL_MAX_ATTEMPTS}) ${msg || 'in progress'}`);
      await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
    }
  }
  throw new Error('Task did not complete in time. Try again later or check the task in DataForSEO dashboard.');
}

function extractItems(apiBody) {
  const result = apiBody?.tasks?.[0]?.result;
  if (!Array.isArray(result) || result.length === 0) return [];
  const first = result[0];
  const items = first?.items;
  return Array.isArray(items) ? items : [];
}

async function downloadAvatar(url, filepath) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) return false;
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, buf);
  return true;
}

function mapItemToReview(item, avatarFilename, projectImageFilenames = []) {
  const rating = item?.rating?.value;
  const numRating = typeof rating === 'number' ? Math.round(rating) : 5;
  return {
    date: formatDate(item?.timestamp ?? ''),
    text: (item?.review_text ?? '').trim(),
    author: (item?.profile_name ?? '').trim() || 'Google User',
    rating: numRating,
    source: 'Google',
    avatarUrl: avatarFilename || '',
    images: Array.isArray(projectImageFilenames) ? projectImageFilenames : [],
  };
}

async function main() {
  const config = loadConfig();
  const client = selectClient(config);
  console.log(`Client: ${client.name} (${client.slug}) — keyword: "${client.keyword}"`);

  console.log('Creating reviews task (task_post)...');
  const taskId = await taskPost(client);
  console.log(`Task id: ${taskId}. Waiting for results...`);

  const body = await pollUntilReady(taskId);
  const items = extractItems(body);
  if (items.length === 0) {
    console.warn('No review items in API response. Writing empty rawReviews.');
    const outPath = path.join(ROOT, client.outputJson || 'src/data/google-reviews.json');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify({ rawReviews: [] }, null, 2), 'utf8');
    return;
  }

  const avatarsDir = path.join(ROOT, client.outputAvatarsDir || 'src/assets/avatars');
  const reviewImagesDir = path.join(ROOT, client.outputReviewImagesDir || 'src/assets/review-images');
  fs.mkdirSync(avatarsDir, { recursive: true });
  fs.mkdirSync(reviewImagesDir, { recursive: true });
  const rawReviews = [];
  const MAX_PROJECT_IMAGES_PER_REVIEW = 6;

  for (const item of items) {
    const reviewId = item?.review_id;
    const imageUrl = item?.profile_image_url;
    let avatarFilename = '';

    if (imageUrl && reviewId) {
      const base = safeFilename(reviewId);
      avatarFilename = `${base}.jpg`;
      const filepath = path.join(avatarsDir, avatarFilename);
      try {
        const ok = await downloadAvatar(imageUrl, filepath);
        if (!ok) avatarFilename = '';
      } catch (e) {
        console.warn(`Avatar download failed for ${reviewId}:`, e.message);
        avatarFilename = '';
      }
    }

    const projectImageFilenames = [];
    const reviewImages = item?.images;
    if (Array.isArray(reviewImages) && reviewImages.length > 0 && reviewId) {
      const base = safeFilename(reviewId);
      const toDownload = reviewImages.slice(0, MAX_PROJECT_IMAGES_PER_REVIEW);
      for (let i = 0; i < toDownload.length; i++) {
        const imgUrl = toDownload[i]?.image_url;
        if (!imgUrl) continue;
        const filename = `${base}_${i}.jpg`;
        const filepath = path.join(reviewImagesDir, filename);
        try {
          const ok = await downloadAvatar(imgUrl, filepath);
          if (ok) projectImageFilenames.push(filename);
        } catch (e) {
          console.warn(`Review image download failed ${reviewId} [${i}]:`, e.message);
        }
      }
    }

    rawReviews.push(mapItemToReview(item, avatarFilename, projectImageFilenames));
  }

  const outPath = path.join(ROOT, client.outputJson || 'src/data/google-reviews.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify({ rawReviews }, null, 2), 'utf8');
  console.log(`Wrote ${rawReviews.length} reviews to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
