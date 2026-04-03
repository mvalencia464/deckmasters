/**
 * Astro local image service: Sharp pipeline + subtle saturation (1.12) on raster output.
 * SVG passthrough unchanged. Applies to all Astro-optimized assets (Image, getImage, Picture).
 */
import { AstroError, AstroErrorData } from 'astro/errors';
import { baseService } from 'astro/assets';

const qualityTable = {
  low: 25,
  mid: 50,
  high: 80,
  max: 100,
} as const;

function parseQuality(quality: string | number): number | string {
  const result = Number.parseInt(String(quality), 10);
  if (Number.isNaN(result)) {
    return quality;
  }
  return result;
}

let sharp: typeof import('sharp').default;

async function loadSharp() {
  try {
    const sharpImport = (await import('sharp')).default;
    sharpImport.cache(false);
    return sharpImport;
  } catch {
    throw new AstroError(AstroErrorData.MissingSharp);
  }
}

const fitMap: Record<string, string> = {
  fill: 'fill',
  contain: 'inside',
  cover: 'cover',
  none: 'outside',
  'scale-down': 'inside',
  outside: 'outside',
  inside: 'inside',
};

/** Subtle global saturation boost for brand warmth (12%). */
const SATURATION = 1.12;

const service = {
  validateOptions: baseService.validateOptions,
  getURL: baseService.getURL,
  parseURL: baseService.parseURL,
  getHTMLAttributes: baseService.getHTMLAttributes,
  getSrcSet: baseService.getSrcSet,
  getRemoteSize: baseService.getRemoteSize,
  async transform(
    inputBuffer: Uint8Array,
    transformOptions: Parameters<typeof baseService.validateOptions>[0] extends infer T ? T : never,
    config: { service: { config?: { kernel?: string; limitInputPixels?: number } } }
  ) {
    if (!sharp) sharp = await loadSharp();
    const transform = transformOptions as {
      format?: string;
      width?: number;
      height?: number;
      fit?: keyof typeof fitMap;
      position?: string;
      quality?: string | number;
      background?: string;
    };
    const kernel = config.service.config?.kernel;

    if (transform.format === 'svg') return { data: inputBuffer, format: 'svg' };

    const result = sharp(inputBuffer, {
      failOnError: false,
      pages: -1,
      limitInputPixels: config.service.config?.limitInputPixels,
    });

    result.rotate();
    result.modulate({ saturation: SATURATION });

    const { format } = await result.metadata();

    if (transform.width && transform.height) {
      const fit = transform.fit ? (fitMap[transform.fit] ?? 'inside') : undefined;
      result.resize({
        width: Math.round(transform.width),
        height: Math.round(transform.height),
        kernel,
        fit: fit as never,
        position: transform.position,
        withoutEnlargement: true,
      });
    } else if (transform.height && !transform.width) {
      result.resize({
        height: Math.round(transform.height),
        withoutEnlargement: true,
        kernel,
      });
    } else if (transform.width) {
      result.resize({
        width: Math.round(transform.width),
        withoutEnlargement: true,
        kernel,
      });
    }

    if (transform.background) {
      result.flatten({ background: transform.background });
    }

    if (transform.format) {
      let quality: number | undefined;
      if (transform.quality) {
        const parsedQuality = parseQuality(transform.quality);
        if (typeof parsedQuality === 'number') {
          quality = parsedQuality;
        } else {
          quality =
            parsedQuality in qualityTable ? qualityTable[parsedQuality as keyof typeof qualityTable] : undefined;
        }
      }
      if (transform.format === 'webp' && format === 'gif') {
        result.webp({ quality: typeof quality === 'number' ? quality : undefined, loop: 0 });
      } else {
        result.toFormat(transform.format as never, { quality });
      }
    }

    const { data, info } = await result.toBuffer({ resolveWithObject: true });
    const needsCopy = 'buffer' in data && data.buffer instanceof SharedArrayBuffer;
    return {
      data: needsCopy ? new Uint8Array(data) : data,
      format: info.format,
    };
  },
};

export default service;
