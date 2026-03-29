/**
 * Shared shape for review-mined quotes. Service/category copy lives in `servicePageVoc.ts`.
 */
export interface VocSnippet {
  excerpt: string;
  author: string;
  fullText?: string;
}
