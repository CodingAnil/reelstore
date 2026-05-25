import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { uploadToR2, deleteFromR2, type MediaMetadata } from '@/lib/services/r2';
import { validateMediaFile } from '@/lib/services/media/validateMediaFile';
import { compressImage } from '@/lib/services/media/compressImage';
import { compressVideo } from '@/lib/services/media/compressVideo';
import { saveMediaUploadRecord } from '@/lib/services/media/saveMediaUpload';
import { logMediaUpload } from '@/lib/services/media/mediaUploadLogger';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const reqId = randomUUID();

  logMediaUpload('upload_request_started', { reqId });

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'NO_FILE_UPLOADED' }, { status: 400 });
    }

    const validated = validateMediaFile(file);
    if ('error' in validated) {
      const body: Record<string, unknown> = { error: validated.error };
      if (validated.allowed) body.allowed = [...validated.allowed];
      return NextResponse.json(body, { status: validated.status });
    }

    logMediaUpload('original_file_accepted', {
      reqId,
      kind: validated.kind,
      mime: validated.mime,
      sizeBytes: validated.size,
      nameLength: validated.name.length,
    });

    const originalBuffer = Buffer.from(await file.arrayBuffer());

    logMediaUpload('compression_started', { reqId, kind: validated.kind });

    let prepared: {
      buffer: Buffer;
      contentType: string;
      fileName: string;
      originalSize: number;
      compressedSize: number;
      optimized: boolean;
      detail: string;
    };

    try {
      if (validated.kind === 'image') {
        const r = await compressImage(originalBuffer, validated.name, validated.mime);
        prepared = {
          buffer: r.buffer,
          contentType: r.contentType,
          fileName: r.outputFileName,
          originalSize: r.originalSize,
          compressedSize: r.compressedSize,
          optimized: r.optimized,
          detail: r.detail,
        };
      } else {
        const r = await compressVideo(originalBuffer, validated.name, validated.mime);
        prepared = {
          buffer: r.buffer,
          contentType: r.contentType,
          fileName: r.outputFileName,
          originalSize: r.originalSize,
          compressedSize: r.compressedSize,
          optimized: r.optimized,
          detail: r.detail,
        };
      }
    } catch (compressionError) {
      const message =
        compressionError instanceof Error ? compressionError.message : 'UNKNOWN';
      logMediaUpload('compression_failed', { reqId, message });

      if (message === 'VIDEO_ENCODER_NOT_AVAILABLE') {
        return NextResponse.json({ error: 'COMPRESSION_UNAVAILABLE' }, { status: 503 });
      }

      return NextResponse.json({ error: 'COMPRESSION_FAILED' }, { status: 422 });
    }

    logMediaUpload('compression_completed', {
      reqId,
      optimized: prepared.optimized,
      detail: prepared.detail,
      originalBytes: prepared.originalSize,
      compressedBytes: prepared.compressedSize,
      ...(prepared.originalSize > 0
        ? {
            pctOfOriginal:
              Math.round((prepared.compressedSize / prepared.originalSize) * 1000) / 10,
          }
        : {}),
    });

    logMediaUpload('r2_upload_started', { reqId, byteLength: prepared.buffer.length });

    let uploadResult: Awaited<ReturnType<typeof uploadToR2>>;
    try {
      uploadResult = await uploadToR2(prepared.buffer, prepared.fileName, prepared.contentType);
    } catch {
      logMediaUpload('r2_upload_failed', { reqId });
      return NextResponse.json({ error: 'CLOUD_FLARE_R2_UPLOAD_ERROR' }, { status: 500 });
    }

    logMediaUpload('r2_upload_succeeded', {
      reqId,
      keyTail: uploadResult.key.split('/').pop() ?? '',
    });

    let dbRecordId: string;
    try {
      const row = await saveMediaUploadRecord({
        url: uploadResult.url,
        storage_key: uploadResult.key,
        content_type: uploadResult.type,
        original_filename: validated.name,
        byte_size: uploadResult.size,
        original_byte_size: validated.size,
        kind: validated.kind,
        compression: {
          optimized: prepared.optimized,
          detail: prepared.detail,
          outputFilename: prepared.fileName,
        },
      });
      dbRecordId = row.id;
      logMediaUpload('db_save_succeeded', { reqId, recordId: dbRecordId });
    } catch (dbErr) {
      const dbMessage = dbErr instanceof Error ? dbErr.message : 'UNKNOWN';
      logMediaUpload('db_save_failed', { reqId, message: dbMessage });

      try {
        await deleteFromR2(uploadResult.key);
        logMediaUpload('r2_rollback_succeeded', {
          reqId,
          keyTail: uploadResult.key.split('/').pop() ?? '',
        });
      } catch (rollbackErr) {
        logMediaUpload('r2_rollback_failed', {
          reqId,
          message: rollbackErr instanceof Error ? rollbackErr.message : 'UNKNOWN',
          keyTail: uploadResult.key.split('/').pop() ?? '',
        });
      }

      return NextResponse.json({ error: 'DB_SAVE_FAILED' }, { status: 500 });
    }

    const metadata: MediaMetadata = {
      ...uploadResult,
      originalName: validated.name,
      originalSize: validated.size,
      optimized: prepared.optimized,
      compressionDetail: prepared.detail,
      dbRecordId,
    };

    return NextResponse.json({ success: true, metadata });
  } catch (error) {
    console.error('API Media Upload Error:', error);
    const message = error instanceof Error ? error.message : 'UPLOAD_SERVER_ERROR';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
