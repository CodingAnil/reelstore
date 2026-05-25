import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const R2_ENDPOINT = process.env.R2_ENDPOINT;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || '';
const R2_PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN;

const s3Client = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT || '',
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID || '',
    secretAccessKey: R2_SECRET_ACCESS_KEY || '',
  },
});

export interface MediaMetadata {
  url: string;
  key: string;
  type: string;
  name: string;
  size: number;
  originalName?: string;
  originalSize?: number;
  optimized?: boolean;
  compressionDetail?: string;
  dbRecordId?: string;
}

/**
 * Reusable utility for Cloudflare R2 uploads.
 * Use this service only on the server.
 */
export async function uploadToR2(
  file: Buffer,
  fileName: string,
  contentType: string
): Promise<MediaMetadata> {
  if (!R2_ENDPOINT || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME || !R2_PUBLIC_DOMAIN) {
    throw new Error('R2_CONFIG_MISSING: Environment variables are not configured properly.');
  }

  const timestamp = Date.now();
  const safeName = fileName.replace(/[^a-zA-Z0-9.\-\_]/g, '_');
  const key = `media/${timestamp}-${safeName}`;

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: contentType,
  });

  try {
    await s3Client.send(command);
    
    const baseUrl = R2_PUBLIC_DOMAIN.replace(/\/$/, '');
    const publicUrl = `${baseUrl}/${key}`;

    return {
      url: publicUrl,
      key,
      type: contentType,
      name: fileName,
      size: file.length,
    };
  } catch (error) {
    console.error('R2 Cloudflare Upload Failure:', error);
    throw new Error('CLOUD_FLARE_R2_UPLOAD_ERROR');
  }
}

/**
 * Removes an object from R2 (used when DB persistence fails after upload).
 */
export async function deleteFromR2(key: string): Promise<void> {
  if (!R2_ENDPOINT || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
    throw new Error('R2_CONFIG_MISSING: Environment variables are not configured properly.');
  }

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    })
  );
}
