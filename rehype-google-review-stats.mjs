/**
 * Build-time replacement in Markdown/HTML for live Google totals from `src/data/google-reviews.json`.
 * Placeholders: {{GR_COUNT}}, {{GR_AVG}} (same filter as SocialProofPill / homepage).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { visit } from 'unist-util-visit';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadGoogleReviewStats() {
  const jsonPath = path.join(__dirname, 'src/data/google-reviews.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const raw = data?.rawReviews ?? [];
  const statsGoogle = raw.filter(
    (r) => String(r.source ?? '').toLowerCase().includes('google') && Number(r.rating) > 0
  );
  const count = statsGoogle.length;
  const average =
    count > 0
      ? (statsGoogle.reduce((a, r) => a + Number(r.rating), 0) / count).toFixed(1)
      : '0';
  return { count, average };
}

export function rehypeGoogleReviewStats() {
  const { count, average } = loadGoogleReviewStats();
  return (tree) => {
    visit(tree, 'text', (node) => {
      if (typeof node.value !== 'string') return;
      if (!node.value.includes('{{GR_')) return;
      node.value = node.value.replace(/\{\{GR_COUNT\}\}/g, String(count)).replace(/\{\{GR_AVG\}\}/g, average);
    });
  };
}
