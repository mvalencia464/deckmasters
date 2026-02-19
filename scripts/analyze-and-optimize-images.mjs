import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageDir = path.join(__dirname, '../public/images/moreimages');
const outputDir = path.join(__dirname, '../public/images/portfolio-optimized');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

async function getImageBase64(imagePath) {
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString('base64');
}

async function analyzeImages(imageFiles) {
  console.log(`Analyzing ${imageFiles.length} images with Gemini...`);
  
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  // Process in smaller batches to avoid rate limits
  const batchSize = 5;
  const analyses = {};

  for (let i = 0; i < imageFiles.length; i += batchSize) {
    const batch = imageFiles.slice(i, Math.min(i + batchSize, imageFiles.length));
    
    for (const file of batch) {
      try {
        const imagePath = path.join(imageDir, file);
        const base64 = await getImageBase64(imagePath);
        
        console.log(`Analyzing ${file}...`);
        
        const response = await model.generateContent([
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64,
            },
          },
          {
            text: `Analyze this deck/outdoor living space image. Provide a brief JSON response with:
{
  "location": "specific location/neighborhood if identifiable",
  "deckType": "new build / resurfacing / covered / railing upgrade / other",
  "features": ["list", "of", "key", "features"],
  "quality": "excellent / good / standard",
  "primarySubject": "what is the main focus of this image",
  "groupingHint": "brief description to help group with similar images"
}

Be concise and precise.`
          }
        ]);

        const content = response.response.text();
        
        // Extract JSON from response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          analyses[file] = JSON.parse(jsonMatch[0]);
          console.log(`✓ Analyzed ${file}`);
        }
      } catch (error) {
        console.error(`Error analyzing ${file}:`, error.message);
      }
    }

    // Add delay between batches
    if (i + batchSize < imageFiles.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return analyses;
}

function groupImages(analyses) {
  const groups = {};

  Object.entries(analyses).forEach(([filename, analysis]) => {
    const groupKey = `${analysis.deckType}-${analysis.location || 'unknown'}`;
    
    if (!groups[groupKey]) {
      groups[groupKey] = {
        deckType: analysis.deckType,
        location: analysis.location || 'Anchorage Area',
        features: analysis.features,
        quality: analysis.quality,
        images: []
      };
    }

    groups[groupKey].images.push({
      filename,
      primarySubject: analysis.primarySubject,
      quality: analysis.quality
    });
  });

  // Sort images within each group by quality (excellent first)
  Object.values(groups).forEach(group => {
    group.images.sort((a, b) => {
      const qualityOrder = { excellent: 0, good: 1, standard: 2 };
      return (qualityOrder[a.quality] || 2) - (qualityOrder[b.quality] || 2);
    });
  });

  return groups;
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
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
  }
}

async function processImages(groups) {
  console.log('\nOptimizing images to WebP format...');
  
  const processedGroups = {};

  for (const [groupKey, group] of Object.entries(groups)) {
    const groupDirName = groupKey.replace(/\//g, '-').replace(/\s+/g, '-').toLowerCase();
    const groupOutputDir = path.join(outputDir, groupDirName);

    if (!fs.existsSync(groupOutputDir)) {
      fs.mkdirSync(groupOutputDir, { recursive: true });
    }

    const processedImages = [];

    for (const image of group.images) {
      const inputPath = path.join(imageDir, image.filename);
      const outputFilename = path.basename(image.filename, path.extname(image.filename)) + '.webp';
      const outputPath = path.join(groupOutputDir, outputFilename);

      await optimizeImage(inputPath, outputPath);

      processedImages.push({
        filename: outputFilename,
        path: `/images/portfolio-optimized/${groupDirName}/${outputFilename}`,
        originalFilename: image.filename
      });
    }

    processedGroups[groupKey] = {
      ...group,
      images: processedImages
    };
  }

  return processedGroups;
}

function generatePortfolioData(groups) {
  const portfolioData = [];
  let id = 1;

  Object.entries(groups).forEach(([groupKey, group]) => {
    if (group.images.length === 0) return;

    const primaryImage = group.images[0];
    const galleryImages = group.images.slice(1);

    const deckTypeMap = {
      'new build': 'New Build',
      'resurfacing': 'Resurfacing',
      'covered': 'Covered Deck',
      'railing upgrade': 'Railing',
      'railing': 'Railing',
      'outdoor living': 'Outdoor Living'
    };

    const niche = deckTypeMap[group.deckType.toLowerCase()] || 'New Build';

    portfolioData.push({
      id: `portfolio-${id}`,
      title: `${group.location} ${group.deckType.charAt(0).toUpperCase() + group.deckType.slice(1)}`,
      niche,
      location: group.location,
      description: `Premium deck construction featuring ${group.features.join(', ')}. Built to Alaska standards with precision engineering and attention to detail.`,
      beforeImage: primaryImage.path,
      afterImage: primaryImage.path,
      gallery: galleryImages.map(img => ({
        url: img.path,
        label: `Project Image ${group.images.indexOf(img) + 1}`
      })),
      date: new Date().toISOString().split('T')[0],
      featured: group.quality === 'excellent',
      testimonial: {
        quote: `Beautiful deck construction with outstanding attention to detail.`,
        author: `${group.location} Homeowner`,
        rating: 5
      }
    });

    id++;
  });

  return portfolioData;
}

async function main() {
  try {
    console.log('Starting image analysis and optimization...\n');

    // Get list of image files
    const imageFiles = fs.readdirSync(imageDir)
      .filter(file => /\.(jpg|jpeg|JPG|JPEG)$/.test(file));

    console.log(`Found ${imageFiles.length} images to process\n`);

    // Analyze images
    const analyses = await analyzeImages(imageFiles);
    console.log(`\nAnalyzed ${Object.keys(analyses).length} images\n`);

    // Group similar images
    const groups = groupImages(analyses);
    console.log(`Grouped into ${Object.keys(groups).length} projects\n`);

    // Optimize and process images
    const processedGroups = await processImages(groups);

    // Generate portfolio data
    const portfolioData = generatePortfolioData(processedGroups);

    // Save portfolio data as JSON
    const dataPath = path.join(__dirname, '../src/data/portfolio-data.json');
    fs.writeFileSync(dataPath, JSON.stringify(portfolioData, null, 2));

    console.log(`\n✓ Portfolio data saved to ${dataPath}`);
    console.log(`\nGenerated ${portfolioData.length} portfolio entries`);
    console.log('\nPortfolio data:');
    console.log(JSON.stringify(portfolioData, null, 2));

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
