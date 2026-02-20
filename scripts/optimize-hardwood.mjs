import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, '../public/images/content/hardwood-crafts.webp');
const outputDir = path.join(__dirname, '../public/images/content');

(async () => {
  const metadata = await sharp(inputPath).metadata();
  console.log(`Processing hardwood-crafts: ${metadata.width}x${metadata.height}`);
  
  const widths = [320, 640, 1024];
  
  for (const width of widths) {
    const outputPath = path.join(outputDir, `hardwood-crafts-${width}.webp`);
    await sharp(inputPath)
      .resize(width, Math.round((width / metadata.width) * metadata.height), {
        fit: 'cover',
        withoutEnlargement: true
      })
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    const stats = fs.statSync(outputPath);
    console.log(`  ✓ hardwood-crafts-${width}.webp: ${(stats.size / 1024).toFixed(1)}KB`);
  }
  
  const optimizedPath = path.join(outputDir, "hardwood-crafts.webp");
  await sharp(inputPath)
    .webp({ quality: 80 })
    .toFile(optimizedPath);
  
  const stats = fs.statSync(optimizedPath);
  console.log(`  ✓ hardwood-crafts.webp: ${(stats.size / 1024).toFixed(1)}KB`);
  
  console.log('Done!');
})();
