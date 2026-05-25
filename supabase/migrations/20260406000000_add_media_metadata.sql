-- ============================================================
-- ReelStore: Media Metadata Migration
-- ============================================================

-- Add media_metadata column to bundles
ALTER TABLE public.bundles 
ADD COLUMN IF NOT EXISTS media_metadata JSONB DEFAULT '{}'::jsonb;

-- Add media_metadata column to categories
ALTER TABLE public.categories 
ADD COLUMN IF NOT EXISTS media_metadata JSONB DEFAULT '{}'::jsonb;

-- Update RLS policies (optional, but good to ensure accessibility)
-- Assuming authenticated users (admin) can already do everything.
