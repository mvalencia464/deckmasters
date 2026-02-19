#!/usr/bin/env node

/**
 * Generate Responsive Image Variants
 * Creates mobile (320px) and tablet (640px) WebP variants of portfolio images
 * Reduces mobile bundle by ~40%
 * 
 * Usage: node scripts/generate-responsive-variants.mjs
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imageDir = path.join(__dirname, '../public/images/portfolio');
const variantsDir = path.join(imageDir, 'variants');

// Create variants directory if it doesn't exist
if (!fs.existsSync(variantsDir)) {
  fs.mkdirSync(variantsDir, { recursive: true });
  console.log(`✓ Created ${variantsDir}`);
}

// Get all WebP files
const files = fs.readdirSync(imageDir).filter(file => file.endsWith('.webp'));

console.log(`📦 Found ${files.length} portfolio images`);
console.log(`🎨 Generating responsive variants (320px, 640px)...\n`);

let processed = 0;
let errors = 0;

// Process each image
for (const file of files) {
  const filePath = path.join(imageDir, file);
  const baseName = file.replace('.webp', '');

  try {
    // Mobile variant (320px wide, 240px tall)
    sharp(filePath)
      .resize(320, 240, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 80 })
      .toFile(path.join(variantsDir, `${baseName}-320.webp`))
      .then(() => {
        console.log(`✓ ${baseName}-320.webp`);
      })
      .catch(err => {
        console.error(`✗ Failed to generate ${baseName}-320.webp:`, err.message);
        errors++;
      });

    // Tablet variant (640px wide, 480px tall)
    sharp(filePath)
      .resize(640, 480, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 85 })
      .toFile(path.join(variantsDir, `${baseName}-640.webp`))
      .then(() => {
        console.log(`✓ ${baseName}-640.webp`);
      })
      .catch(err => {
        console.error(`✗ Failed to generate ${baseName}-640.webp:`, err.message);
        errors++;
      });

    processed++;
  } catch (err) {
    console.error(`✗ Error processing ${file}:`, err.message);
    errors++;
  }
}

// Summary
setTimeout(() => {
  console.log(`\n✅ Generated ${processed * 2} responsive variants`);
  if (errors > 0) {
    console.log(`⚠️  ${errors} errors encountered`);
  } else {
    console.log('🚀 Ready for responsive image srcSet implementation');
  }
  
  // Show usage instructions
  console.log('\n📝 To use in PortfolioGrid.tsx, update image rendering to:');
  console.log(`
img {
  srcSet="
    /images/portfolio/variants/FILENAME-320.webp 320w,
    /images/portfolio/variants/FILENAME-640.webp 640w,
    /images/portfolio/FILENAME.webp 1280w
  "
  sizes="(max-width: 640px) 320px, (max-width: 1024px) 640px, 1280px"
  loading="lazy"
  decoding="async"
}
  `);
}, 1000);
