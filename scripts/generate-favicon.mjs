/**
 * Renders the brand SVG into square PNG/ICO files for public/.
 * Google Search works best with a ≥48×48 square raster favicon; SVG-only often shows as a generic globe in SERPs.
 * Run: node scripts/generate-favicon.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import toIco from 'to-ico';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');
const srcSvg = join(root, 'src', 'assets', 'icon.svg');

const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

async function raster(size) {
  return sharp(readFileSync(srcSvg))
    .resize(size, size, { fit: 'contain', background: transparent })
    .png();
}

async function main() {
  mkdirSync(publicDir, { recursive: true });

  const png16 = await raster(16);
  const png32 = await raster(32);
  const png48 = await raster(48);
  const png180 = await raster(180);
  const png192 = await raster(192);

  const buf16 = await png16.toBuffer();
  const buf32 = await png32.toBuffer();
  const buf48 = await png48.toBuffer();

  writeFileSync(join(publicDir, 'favicon-16x16.png'), buf16);
  writeFileSync(join(publicDir, 'favicon-32x32.png'), buf32);
  writeFileSync(join(publicDir, 'favicon-48x48.png'), buf48);
  writeFileSync(join(publicDir, 'favicon-192x192.png'), await png192.toBuffer());
  writeFileSync(join(publicDir, 'apple-touch-icon.png'), await png180.toBuffer());

  const ico = await toIco([buf16, buf32, buf48]);
  writeFileSync(join(publicDir, 'favicon.ico'), ico);

  console.log('Wrote public favicon files from src/assets/icon.svg');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
