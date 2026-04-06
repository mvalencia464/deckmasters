/**
 * Google review totals used across the site (matches SocialProofPill / homepage).
 * Data: `scripts/sync-reviews.js` → `src/data/google-reviews.json`.
 */

export type GoogleReviewStats = {
  count: number;
  /** One decimal, e.g. "4.9" */
  average: string;
};

export async function getGoogleReviewStats(): Promise<GoogleReviewStats> {
  const data = (await import('../data/google-reviews.json')).default;
  const raw = data?.rawReviews ?? [];
  const statsGoogle = raw.filter((r: { source?: string; rating?: number }) =>
    String(r.source ?? '').toLowerCase().includes('google') && Number(r.rating) > 0
  );
  const count = statsGoogle.length;
  const average =
    count > 0
      ? (statsGoogle.reduce((a: number, r: { rating?: number }) => a + Number(r.rating), 0) / count).toFixed(1)
      : '0';
  return { count, average };
}
