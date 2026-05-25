-- ============================================================
-- ReelStore: media_uploads — audit trail for R2 uploads (compression pipeline)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.media_uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  storage_key text NOT NULL,
  content_type text NOT NULL,
  original_filename text,
  byte_size integer NOT NULL,
  original_byte_size integer NOT NULL,
  kind text NOT NULL CHECK (kind IN ('image', 'video')),
  compression jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS media_uploads_created_at_idx ON public.media_uploads (created_at DESC);

ALTER TABLE public.media_uploads ENABLE ROW LEVEL SECURITY;

-- Storefront / admin can read (URLs are public on R2 anyway)
CREATE POLICY "public_read_media_uploads"
ON public.media_uploads
FOR SELECT
TO public
USING (true);

-- Upload API uses anon key (same as admin CRUD pattern)
CREATE POLICY "anon_insert_media_uploads"
ON public.media_uploads
FOR INSERT
TO anon
WITH CHECK (true);
