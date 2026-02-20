import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const portfolioDir = path.join(__dirname, '../public/images/portfolio');
const contentDir = path.join(__dirname, '../public/images/content');

async function reoptimizeImages(dir, dirName) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp') && !f.match(/-(320|640|1024)\.webp$/));
  
  console.log(`\nReoptimizing ${dirName} images with higher compression...\n`);
  
  for (const file of files) {
    const inputPath = path.join(dir, file);
    const outputPath = inputPath;
    const baseName = path.basename(file, '.webp');
    
    try {
      const metadata = await sharp(inputPath).metadata();
      const originalSize = fs.statSync(inputPath).size;
      
      // Re-encode with higher compression (quality 75-78 for smaller files)
      await sharp(inputPath)
        .webp({ quality: 75, alphaQuality: 100 })
        .toFile(outputPath + '.tmp');
      
      const newSize = fs.statSync(outputPath + '.tmp').size;
      const savings = originalSize - newSize;
      const percent = ((savings / originalSize) * 100).toFixed(1);
      
      if (savings > 0) {
        fs.renameSync(outputPath + '.tmp', outputPath);
        console.log(`  ✓ ${baseName}.webp: ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (saved ${percent}%)`);
      } else {
        fs.unlinkSync(outputPath + '.tmp');
        console.log(`  - ${baseName}.webp: No improvement`);
      }
    } catch (err) {
      console.error(`  ✗ Error processing ${file}:`, err.message);
    }
  }
}

(async () => {
  await reoptimizeImages(portfolioDir, 'Portfolio');
  await reoptimizeImages(contentDir, 'Content');
  console.log('\n✅ Reoptimization complete!');
})().catch(console.error);
