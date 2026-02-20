import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, '../public/images/content');
const outputDir = path.join(__dirname, '../public/images/content');

const files = fs.readdirSync(baseDir).filter(f => f.endsWith('.png') || f.endsWith('.webp'));

async function optimizeImage(inputPath, outputDir, basename) {
  const baseName = path.basename(basename, path.extname(basename));
  
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
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      const stats = fs.statSync(outputPath);
      console.log(`  ✓ ${baseName}-${width}.webp: ${(stats.size / 1024).toFixed(1)}KB`);
    }
    
    // Convert original to optimized WebP
    const optimizedPath = path.join(outputDir, `${baseName}.webp`);
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(optimizedPath);
    
    const stats = fs.statSync(optimizedPath);
    console.log(`  ✓ ${baseName}.webp: ${(stats.size / 1024).toFixed(1)}KB`);
    
    // Remove original PNG if it exists
    const originalPath = path.join(outputDir, `${baseName}.png`);
    if (fs.existsSync(originalPath)) {
      fs.unlinkSync(originalPath);
      console.log(`  ✓ Removed original PNG`);
    }
  } catch (err) {
    console.error(`Error processing ${basename}:`, err.message);
  }
}

(async () => {
  console.log('Starting content image optimization...\n');
  for (const file of files) {
    const inputPath = path.join(baseDir, file);
    await optimizeImage(inputPath, outputDir, file);
  }
  console.log('\n✅ All content images optimized!');
})().catch(console.error);
