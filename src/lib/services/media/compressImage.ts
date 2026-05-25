import sharp from 'sharp';
import { MEDIA_UPLOAD_CONFIG } from './mediaUploadConfig';

export type ImageCompressionResult = {
  buffer: Buffer;
  contentType: string;
  outputFileName: string;
  originalSize: number;
  compressedSize: number;
  optimized: boolean;
  detail: string;
};

function replaceExtension(filename: string, ext: string): string {
  const base = filename.replace(/\.[^/.]+$/, '') || 'image';
  return `${base}.${ext}`;
}

/**
 * Losslessly rotates by EXIF, optionally downscales for web display, then encodes to WebP
 * or re-optimizes in the original format if WebP would be larger.
 * Skips re-encoding for animated GIF/WebP to avoid breaking animation.
 */
export async function compressImage(
  buffer: Buffer,
  originalFileName: string,
  sourceMime: string
): Promise<ImageCompressionResult> {
  const originalSize = buffer.length;

  const meta = await sharp(buffer).metadata();
  if (meta.pages && meta.pages > 1) {
    return {
      buffer,
      contentType: sourceMime,
      outputFileName: originalFileName,
      originalSize,
      compressedSize: originalSize,
      optimized: false,
      detail: 'multi_frame_skipped',
    };
  }
  if (meta.format === 'gif') {
    return {
      buffer,
      contentType: sourceMime,
      outputFileName: originalFileName,
      originalSize,
      compressedSize: originalSize,
      optimized: false,
      detail: 'animation_skipped',
    };
  }

  const maxEdge = MEDIA_UPLOAD_CONFIG.IMAGE_MAX_EDGE_PX;
  let pipeline = sharp(buffer).rotate();

  if (meta.width && meta.height && (meta.width > maxEdge || meta.height > maxEdge)) {
    pipeline = pipeline.resize({
      width: maxEdge,
      height: maxEdge,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  const webpBuffer = await pipeline
    .clone()
    .webp({ quality: 86, effort: 4, smartSubsample: true })
    .toBuffer();

  let best = webpBuffer;
  let contentType = 'image/webp';
  let outputFileName = replaceExtension(originalFileName, 'webp');
  let detail = 'webp';

  if (webpBuffer.length >= originalSize) {
    const jpegish =
      sourceMime === 'image/jpeg' || sourceMime === 'image/jpg' || meta.format === 'jpeg';
    const pngish = sourceMime === 'image/png' || meta.format === 'png';

    if (jpegish) {
      const jpegBuf = await sharp(buffer)
        .rotate()
        .resize({
          width: maxEdge,
          height: maxEdge,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({ quality: 88, mozjpeg: true })
        .toBuffer();
      if (jpegBuf.length < best.length) {
        best = jpegBuf;
        contentType = 'image/jpeg';
        outputFileName = replaceExtension(originalFileName, 'jpg');
        detail = 'jpeg_mozjpeg';
      }
    } else if (pngish) {
      const pngBuf = await sharp(buffer)
        .rotate()
        .resize({
          width: maxEdge,
          height: maxEdge,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .png({ compressionLevel: 9, adaptiveFiltering: true })
        .toBuffer();
      if (pngBuf.length < best.length) {
        best = pngBuf;
        contentType = 'image/png';
        outputFileName = replaceExtension(originalFileName, 'png');
        detail = 'png_optimized';
      }
    }
  }

  if (best.length >= originalSize) {
    return {
      buffer,
      contentType: sourceMime,
      outputFileName: originalFileName,
      originalSize,
      compressedSize: originalSize,
      optimized: false,
      detail: 'original_smaller_or_equal',
    };
  }

  return {
    buffer: best,
    contentType,
    outputFileName,
    originalSize,
    compressedSize: best.length,
    optimized: true,
    detail,
  };
}
