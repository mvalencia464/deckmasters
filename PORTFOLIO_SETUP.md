# Portfolio Image Setup Guide

## Adding New Images

1. **Add images to** `public/images/moreimages/`
   - Images should be in WebP format (already optimized)
   - Group related images with the same filename prefix
   - Example: `deck-project-01.webp`, `deck-project-02.webp`, etc.

2. **Run the grouping script**
   ```bash
   node scripts/optimize-and-group-images.mjs
   ```

## How Image Grouping Works

Images are automatically grouped by filename prefix. The first word/letters before any numbers or underscores become the group name.

### Examples:

- `DJI_0001.webp` → Group: `dji`
- `DSC_9500.webp` → Group: `dsc`
- `deck-project-01.webp` → Group: `deck`
- `hillside-build-01.webp` → Group: `hillside`
- `IMG_1234.webp` → Group: `img`

## Output

The script generates:
- Optimized WebP images in `public/images/portfolio-optimized/`
- Portfolio data in `src/data/portfolio-data.json`
- Automatically creates portfolio entries with the first image as featured

## Portfolio Structure

Each group becomes a portfolio project card on the grid:
- **Featured Image**: First image in the group (shown in grid)
- **Gallery**: All other images (shown in modal pop-up)
- **Navigation**: Use arrow keys (← →) or click buttons to cycle through gallery

## Navigation

When viewing a project modal:
- **Arrow Keys**: ← → to navigate images
- **Escape**: Close modal
- **Mouse**: Click arrow buttons to navigate

## Merging with Existing Projects

The script merges new images with legacy projects. Total portfolio includes:
- 6 legacy/showcase projects
- All new image-based projects
- All 64+ images from the moreimages folder
