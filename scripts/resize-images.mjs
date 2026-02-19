import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseDir = path.join(__dirname, '..');

const IMAGE_DIRS = [
  'public/images',
  'public/images/portfolio'
];

const WIDTHS = [320, 640, 1024, 1440];
const MAX_WIDTH = 1440;

async function processImage(imagePath) {
  const ext = path.extname(imagePath).toLowerCase();
  const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

  if (!supportedFormats.includes(ext)) return;

  try {
    const metadata = await sharp(imagePath).metadata();
    const filename = path.basename(imagePath, ext);
    const dirname = path.dirname(imagePath);

    // Skip if already a variant
    if (filename.match(/-\d+$/)) return;

    console.log(`Processing: ${filename}${ext} (${metadata.width}x${metadata.height})`);

    // Only process images wider than our smallest breakpoint
    if (metadata.width > WIDTHS[0]) {
      for (const width of WIDTHS) {
        if (width >= metadata.width) break;

        const variantName = `${filename}-${width}${ext}`;
        const variantPath = path.join(dirname, variantName);

        await sharp(imagePath)
          .resize(width, Math.round((metadata.height / metadata.width) * width), {
            fit: 'contain',
            withoutEnlargement: true
          })
          .toFile(variantPath);

        console.log(`  ✓ Created ${variantName}`);
      }
    }
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error.message);
  }
}

async function processDirectory(dirPath) {
  const fullPath = path.join(baseDir, dirPath);

  if (!fs.existsSync(fullPath)) {
    console.log(`Directory not found: ${fullPath}`);
    return;
  }

  const files = fs.readdirSync(fullPath);

  for (const file of files) {
    const filePath = path.join(fullPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      await processImage(filePath);
    } else if (stat.isDirectory() && file !== 'variants') {
      await processDirectory(path.join(dirPath, file));
    }
  }
}

async function main() {
  console.log('Starting image resizing...\n');

  for (const dir of IMAGE_DIRS) {
    console.log(`\n📁 Processing: ${dir}`);
    await processDirectory(dir);
  }

  console.log('\n✅ Image resizing complete!');
}

main().catch(console.error);
