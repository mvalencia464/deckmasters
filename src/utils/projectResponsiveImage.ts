import fs from 'node:fs';
import path from 'node:path';

const PROJECTS_PATH = /^(\/projects\/[^.]+)\.(avif|webp|jpe?g)$/i;

export type ProjectResponsiveSet = {
  avif: string;
  webp: string;
  fallback: string;
};

/**
 * When `public/projects/<base>.avif` exists, returns URLs for <picture> AVIF/WebP sources
 * and a raster fallback. Otherwise returns null (use a plain <img src>).
 */
export function getProjectResponsiveSet(url: string): ProjectResponsiveSet | null {
  const m = url.match(PROJECTS_PATH);
  if (!m) return null;
  const base = m[1];
  const ext = m[2].toLowerCase();
  const avif = `${base}.avif`;
  const webp = `${base}.webp`;
  const avifFs = path.join(process.cwd(), 'public', avif.replace(/^\//, ''));
  if (!fs.existsSync(avifFs)) return null;

  let fallback: string;
  if (ext === 'jpg' || ext === 'jpeg') {
    fallback = `${base}.${ext}`;
  } else {
    fallback = webp;
  }

  return { avif, webp, fallback };
}
