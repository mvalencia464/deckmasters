import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, '../public/images/portfolio/legacy');
const outputDir = path.join(__dirname, '../public/images/portfolio');

const files = fs.readdirSync(baseDir).filter(f => f.endsWith('.webp'));

async function resizeImage(inputPath, outputDir, basename) {
  const baseName = path.basename(basename, '.webp');
  
  try {
    // Get original dimensions
    const metadata = await sharp(inputPath).metadata();
    console.log(`Processing ${baseName}: ${metadata.width}x${metadata.height}`);
    
    // Create responsive variants: 320px, 640px, 1024px
    const widths = [320, 640, 1024];
    
    for (const width of widths) {
      const outputPath = path.join(outputDir, `${baseName}-${width}.webp`);
      await sharp(inputPath)
        .resize(width, Math.round((width / metadata.width) * metadata.height), {
          fit: 'cover',
          withoutEnlargement: true
        })
        .webp({ quality: 85 })
        .toFile(outputPath);
      
      const stats = fs.statSync(outputPath);
      console.log(`  ✓ ${baseName}-${width}.webp: ${(stats.size / 1024).toFixed(1)}KB`);
    }
    
    // Copy and optimize original
    const optimizedPath = path.join(outputDir, `${baseName}.webp`);
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(optimizedPath);
    
    const stats = fs.statSync(optimizedPath);
    console.log(`  ✓ ${baseName}.webp: ${(stats.size / 1024).toFixed(1)}KB`);
  } catch (err) {
    console.error(`Error processing ${basename}:`, err.message);
  }
}

(async () => {
  console.log('Starting image optimization...\n');
  for (const file of files) {
    const inputPath = path.join(baseDir, file);
    await resizeImage(inputPath, outputDir, file);
  }
  console.log('\n✅ All images optimized and resized!');
})().catch(console.error);
