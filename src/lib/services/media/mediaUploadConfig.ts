/** Shared limits and allowlists for admin media uploads (API + validation). */

export const MEDIA_UPLOAD_CONFIG = {
  MAX_IMAGE_SIZE: 5 * 1024 * 1024,
  MAX_VIDEO_SIZE: 50 * 1024 * 1024,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'] as const,
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/quicktime', 'video/webm'] as const,
  /** Aligns with Next imageSizes / hero usage; avoids oversized product assets. */
  IMAGE_MAX_EDGE_PX: 2048,
  /** Max width for re-encoded demo/preview video; height scales with aspect ratio. */
  VIDEO_MAX_WIDTH_PX: 1920,
} as const;

export type MediaKind = 'image' | 'video';
