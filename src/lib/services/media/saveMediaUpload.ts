import { createClient } from '@supabase/supabase-js';
import type { MediaKind } from './mediaUploadConfig';

export type MediaUploadRow = {
  url: string;
  storage_key: string;
  content_type: string;
  original_filename: string;
  byte_size: number;
  original_byte_size: number;
  kind: MediaKind;
  compression: Record<string, unknown>;
};

/**
 * Persists a completed R2 upload to Supabase (anon role, same pattern as admin dashboard).
 */
export async function saveMediaUploadRecord(row: MediaUploadRow): Promise<{ id: string }> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('SUPABASE_CONFIG_MISSING');
  }

  const supabase = createClient(url, key);
  const { data, error } = await supabase.from('media_uploads').insert(row).select('id').single();

  if (error) {
    throw new Error(`DB_MEDIA_SAVE_FAILED:${error.code || 'unknown'}`);
  }
  if (!data?.id) {
    throw new Error('DB_MEDIA_SAVE_FAILED:no_id');
  }

  return { id: data.id as string };
}
