import { spawn } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { randomUUID } from 'crypto';
import { MEDIA_UPLOAD_CONFIG } from './mediaUploadConfig';

export type VideoCompressionResult = {
  buffer: Buffer;
  contentType: string;
  outputFileName: string;
  originalSize: number;
  compressedSize: number;
  optimized: boolean;
  detail: string;
};

function sanitizeExt(name: string): string {
  const ext = path.extname(name).toLowerCase();
  if (['.mp4', '.mov', '.webm', '.m4v'].includes(ext)) return ext;
  return '.mp4';
}

function runFfmpeg(bin: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(bin, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    child.stderr?.on('data', () => {});
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg_exit_${code}`));
    });
  });
}

/**
 * Re-encodes video to H.264/AAC MP4 with web-friendly settings (CRF 22, capped width, faststart).
 * Videos with no audio stream are supported. If the output is not smaller than the input, returns the original bytes.
 */
export async function compressVideo(
  buffer: Buffer,
  originalFileName: string,
  sourceMime: string
): Promise<VideoCompressionResult> {
  const originalSize = buffer.length;
  const bin = ffmpegPath;
  if (!bin) {
    throw new Error('VIDEO_ENCODER_NOT_AVAILABLE');
  }

  const id = randomUUID();
  const tmpDir = os.tmpdir();
  const ext = sanitizeExt(originalFileName);
  const inPath = path.join(tmpDir, `rs-in-${id}${ext}`);
  const outPath = path.join(tmpDir, `rs-out-${id}.mp4`);

  await fs.writeFile(inPath, buffer);

  const w = MEDIA_UPLOAD_CONFIG.VIDEO_MAX_WIDTH_PX;
  const vf = `scale='min(${w},iw)':-2:flags=lanczos,format=yuv420p`;

  const args = [
    '-hide_banner',
    '-loglevel',
    'error',
    '-y',
    '-i',
    inPath,
    '-map_metadata',
    '-1',
    '-map',
    '0:v:0',
    '-c:v',
    'libx264',
    '-preset',
    'medium',
    '-crf',
    '22',
    '-vf',
    vf,
    '-movflags',
    '+faststart',
    '-map',
    '0:a?',
    '-c:a',
    'aac',
    '-b:a',
    '128k',
    '-ar',
    '44100',
    outPath,
  ];

  let encoded: Buffer;
  try {
    await runFfmpeg(bin, args);
    encoded = await fs.readFile(outPath);
  } finally {
    await fs.unlink(inPath).catch(() => {});
    await fs.unlink(outPath).catch(() => {});
  }

  const base = originalFileName.replace(/\.[^/.]+$/, '') || 'video';
  const outputFileName = `${base}.mp4`;

  if (encoded.length >= originalSize) {
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
    buffer: encoded,
    contentType: 'video/mp4',
    outputFileName,
    originalSize,
    compressedSize: encoded.length,
    optimized: true,
    detail: 'h264_aac_mp4',
  };
}
