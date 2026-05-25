import { MEDIA_UPLOAD_CONFIG, type MediaKind } from './mediaUploadConfig';

export type ValidatedMedia = {
  kind: MediaKind;
  mime: string;
  size: number;
  name: string;
};

export type ValidationFailure = {
  error: string;
  status: number;
  allowed?: readonly string[];
};

/**
 * Validates an incoming File for type and size against production limits.
 */
export function validateMediaFile(file: File): ValidatedMedia | ValidationFailure {
  const name = file.name || 'upload';
  const mime = (file.type || '').toLowerCase().trim();
  const size = file.size;

  const isImage = (MEDIA_UPLOAD_CONFIG.ALLOWED_IMAGE_TYPES as readonly string[]).includes(mime);
  const isVideo = (MEDIA_UPLOAD_CONFIG.ALLOWED_VIDEO_TYPES as readonly string[]).includes(mime);

  if (!isImage && !isVideo) {
    return {
      error: 'UNSUPPORTED_FILE_TYPE',
      status: 400,
      allowed: [
        ...MEDIA_UPLOAD_CONFIG.ALLOWED_IMAGE_TYPES,
        ...MEDIA_UPLOAD_CONFIG.ALLOWED_VIDEO_TYPES,
      ],
    };
  }

  const limit = isImage ? MEDIA_UPLOAD_CONFIG.MAX_IMAGE_SIZE : MEDIA_UPLOAD_CONFIG.MAX_VIDEO_SIZE;
  if (size > limit) {
    const limitMb = Math.round(limit / (1024 * 1024));
    return {
      error: `FILE_TOO_LARGE_LIMIT_${limitMb}MB`,
      status: 400,
    };
  }

  return {
    kind: isImage ? 'image' : 'video',
    mime,
    size,
    name,
  };
}
