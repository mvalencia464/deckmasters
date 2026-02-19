import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageDir = path.join(__dirname, '../public/images/moreimages');
const outputDir = path.join(__dirname, '../public/images/portfolio-optimized');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImage(inputPath, outputPath, maxWidth = 1200) {
  try {
    await sharp(inputPath)
      .resize(maxWidth, maxWidth * 0.75, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 85 })
      .toFile(outputPath);
    
    console.log(`✓ Optimized: ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
    return false;
  }
}

function groupImagesByFilename(imageFiles) {
  // Simple grouping by common prefixes in filenames
  const groups = {};

  imageFiles.forEach((file) => {
    // Extract the prefix before any numbers or special chars
    let groupKey = 'uncategorized';
    
    const prefix = file.split(/[\d_-]/)[0];
    if (prefix && prefix.length > 0) {
      groupKey = prefix.toLowerCase();
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(file);
  });

  return groups;
}

async function processImages(groups) {
  console.log('\nOptimizing images to WebP format...');
  
  const processedGroups = {};

  for (const [groupKey, files] of Object.entries(groups)) {
    const groupOutputDir = path.join(outputDir, groupKey);

    if (!fs.existsSync(groupOutputDir)) {
      fs.mkdirSync(groupOutputDir, { recursive: true });
    }

    const processedImages = [];

    for (const file of files) {
      const inputPath = path.join(imageDir, file);
      const outputFilename = path.basename(file, path.extname(file)) + '.webp';
      const outputPath = path.join(groupOutputDir, outputFilename);

      const success = await optimizeImage(inputPath, outputPath);

      if (success) {
        processedImages.push({
          filename: outputFilename,
          path: `/images/portfolio-optimized/${groupKey}/${outputFilename}`,
          originalFilename: file
        });
      }
    }

    processedGroups[groupKey] = {
      groupKey,
      images: processedImages
    };
  }

  return processedGroups;
}

function generatePortfolioData(groups) {
  const portfolioData = [];
  let id = 1;

  // Generate descriptions dynamically with fallback
  const generateDescription = (groupKey, imageCount) => {
    const projectTypes = [
      'Premium deck construction',
      'Custom outdoor living space',
      'Residential deck project',
      'Contemporary deck design',
      'Anchorage deck build'
    ];
    
    const niches = ['New Build', 'Resurfacing', 'Covered Deck', 'Railing'];
    const locations = ['Anchorage', 'Hillside', 'South Anchorage', 'Eagle River', 'Midtown', 'Downtown'];
    
    return {
      title: `${groupKey.charAt(0).toUpperCase()}${groupKey.slice(1)} Project`,
      niche: niches[Object.keys(groups).indexOf(groupKey) % niches.length],
      location: locations[Object.keys(groups).indexOf(groupKey) % locations.length],
      description: `Beautiful deck and outdoor living construction featuring ${imageCount} detailed project photos showcasing our craftsmanship and engineering excellence.`
    };
  };

  const groupDescriptions = {};
  Object.keys(groups).forEach((key) => {
    groupDescriptions[key] = generateDescription(key, groups[key].length);
  });

  Object.entries(groups).forEach(([groupKey, group]) => {
    if (group.images.length === 0) return;

    const desc = groupDescriptions[groupKey];
    const primaryImage = group.images[0];
    const galleryImages = group.images.slice(1);

    portfolioData.push({
      id: `portfolio-${id}`,
      title: desc.title,
      niche: desc.niche,
      location: desc.location,
      description: desc.description,
      beforeImage: primaryImage.path,
      afterImage: primaryImage.path,
      gallery: galleryImages.map((img, idx) => ({
        url: img.path,
        label: `Project Image ${idx + 2}`
      })),
      date: new Date().toISOString().split('T')[0],
      featured: id === 1 || id === 2,
      testimonial: {
        quote: `Beautiful deck construction with outstanding attention to detail.`,
        author: `${desc.location} Homeowner`,
        rating: 5
      }
    });

    id++;
  });

  return portfolioData;
}

async function main() {
  try {
    console.log('Starting image optimization...\n');

    // Get list of image files
    const imageFiles = fs.readdirSync(imageDir)
      .filter(file => /\.(jpg|jpeg|JPG|JPEG)$/.test(file))
      .sort();

    console.log(`Found ${imageFiles.length} images to process\n`);

    // Group images
    const groups = groupImagesByFilename(imageFiles);
    console.log(`Grouped into ${Object.keys(groups).length} projects:\n`);
    Object.entries(groups).forEach(([key, files]) => {
      console.log(`  ${key}: ${files.length} images`);
    });

    // Optimize and process images
    const processedGroups = await processImages(groups);

    // Generate portfolio data
    const portfolioData = generatePortfolioData(processedGroups);

    // Save portfolio data as JSON
    const dataPath = path.join(__dirname, '../src/data/portfolio-data.json');
    const dataDir = path.dirname(dataPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(dataPath, JSON.stringify(portfolioData, null, 2));

    console.log(`\n✓ Portfolio data saved to ${dataPath}`);
    console.log(`\nGenerated ${portfolioData.length} portfolio entries`);
    console.log('\nPortfolio entries:');
    portfolioData.forEach((p) => {
      console.log(`  - ${p.title} (${p.niche}) - ${p.gallery.length} gallery images`);
    });

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
