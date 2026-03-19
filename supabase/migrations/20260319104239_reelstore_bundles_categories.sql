-- ============================================================
-- ReelStore: Bundles & Categories Dynamic Management
-- ============================================================

-- 1. ENUM TYPES
DROP TYPE IF EXISTS public.bundle_status CASCADE;
CREATE TYPE public.bundle_status AS ENUM ('draft', 'active', 'inactive');

DROP TYPE IF EXISTS public.category_status CASCADE;
CREATE TYPE public.category_status AS ENUM ('active', 'inactive');

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    reels_count INTEGER NOT NULL DEFAULT 0,
    demo_video_url TEXT,
    description TEXT,
    status public.category_status DEFAULT 'active'::public.category_status,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. BUNDLES TABLE
CREATE TABLE IF NOT EXISTS public.bundles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    short_description TEXT,
    full_description TEXT,
    thumbnail_url TEXT,
    mockup_image_url TEXT,
    original_price NUMERIC(10,2) NOT NULL DEFAULT 0,
    offer_price NUMERIC(10,2) NOT NULL DEFAULT 0,
    reels_count INTEGER NOT NULL DEFAULT 0,
    category TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    status public.bundle_status DEFAULT 'draft'::public.bundle_status,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. INDEXES
CREATE INDEX IF NOT EXISTS idx_bundles_status ON public.bundles(status);
CREATE INDEX IF NOT EXISTS idx_bundles_is_featured ON public.bundles(is_featured);
CREATE INDEX IF NOT EXISTS idx_bundles_created_at ON public.bundles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_categories_status ON public.categories(status);

-- 5. UPDATED_AT TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 6. TRIGGERS
DROP TRIGGER IF EXISTS bundles_updated_at ON public.bundles;
CREATE TRIGGER bundles_updated_at
    BEFORE UPDATE ON public.bundles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS categories_updated_at ON public.categories;
CREATE TRIGGER categories_updated_at
    BEFORE UPDATE ON public.categories
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 7. ENABLE RLS
ALTER TABLE public.bundles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- 8. RLS POLICIES

-- Bundles: public can read active bundles
DROP POLICY IF EXISTS "public_read_active_bundles" ON public.bundles;
CREATE POLICY "public_read_active_bundles"
ON public.bundles
FOR SELECT
TO public
USING (status = 'active'::public.bundle_status);

-- Bundles: authenticated users (admin) can do everything
DROP POLICY IF EXISTS "authenticated_manage_bundles" ON public.bundles;
CREATE POLICY "authenticated_manage_bundles"
ON public.bundles
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Categories: public can read active categories
DROP POLICY IF EXISTS "public_read_active_categories" ON public.categories;
CREATE POLICY "public_read_active_categories"
ON public.categories
FOR SELECT
TO public
USING (status = 'active'::public.category_status);

-- Categories: authenticated users (admin) can do everything
DROP POLICY IF EXISTS "authenticated_manage_categories" ON public.categories;
CREATE POLICY "authenticated_manage_categories"
ON public.categories
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 9. MOCK DATA
DO $$
DECLARE
    bundle1_id UUID := gen_random_uuid();
    bundle2_id UUID := gen_random_uuid();
    bundle3_id UUID := gen_random_uuid();
BEGIN
    -- Insert categories
    INSERT INTO public.categories (id, name, reels_count, description, status) VALUES
        (gen_random_uuid(), 'AI Creatures', 120, 'Stunning AI-generated creature reels — dragons, monsters, mythical beings. Perfect for viral content.', 'active'::public.category_status),
        (gen_random_uuid(), 'Sci-Fi & Robots', 90, 'Futuristic robots, spaceships, and sci-fi landscapes. Ideal for tech and gaming audiences.', 'active'::public.category_status),
        (gen_random_uuid(), 'Fantasy Worlds', 80, 'Magical kingdoms, enchanted forests, and epic fantasy scenes. Great for storytelling creators.', 'active'::public.category_status),
        (gen_random_uuid(), 'Action & Heroes', 100, 'High-energy action sequences and superhero moments. Perfect for motivational content.', 'active'::public.category_status),
        (gen_random_uuid(), 'Nature & Landscapes', 70, 'Breathtaking nature scenes, mountains, oceans, and sunsets. Ideal for travel and lifestyle.', 'active'::public.category_status),
        (gen_random_uuid(), 'Urban & Cyberpunk', 60, 'Neon-lit cities, cyberpunk streets, and urban nightscapes. Great for fashion and lifestyle brands.', 'active'::public.category_status)
    ON CONFLICT (id) DO NOTHING;

    -- Insert bundles
    INSERT INTO public.bundles (
        id, name, title, short_description, full_description,
        thumbnail_url, mockup_image_url,
        original_price, offer_price, reels_count, category,
        features, status, is_featured
    ) VALUES
    (
        bundle1_id,
        'Hybrid Reels Bundle',
        '500+ AI Hybrid Reels — Complete Bundle',
        'The ultimate collection of AI-generated hybrid Instagram reels. No watermark, HD quality, instant download.',
        'Get access to 500+ premium AI-generated hybrid reels across 6 epic categories. Every reel is HD quality, watermark-free, and ready to post on Instagram. Includes creatures, sci-fi, fantasy, action, nature, and cyberpunk themes. One-time payment, lifetime access.',
        'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://img.rocket.new/generatedImages/rocket_gen_img_158fd849c-1772149426782.png',
        1499.00,
        79.00,
        500,
        'All Categories',
        jsonb_build_array(
            '500+ AI Hybrid Readymade Reel Videos',
            'No Logo & No Watermark — Post-Ready',
            'Instant Download Link & Lifetime Access',
            'HD Quality — 100% Non-Copyrighted',
            'Ready to Post on Instagram & Reels',
            'Creatures, Fantasy, Sci-Fi & More Categories',
            'New Reels Added Every Month — Free'
        ),
        'active'::public.bundle_status,
        true
    ),
    (
        bundle2_id,
        'Creature Pack Vol.2',
        '150+ AI Creature Reels — Exclusive Pack',
        'Exclusive collection of AI creature reels — dragons, monsters, and mythical beings.',
        'Dive deep into the world of AI creatures with 150+ exclusive reels. Perfect for creators who want to stand out with unique, eye-catching content. All reels are HD, watermark-free, and ready to post.',
        'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://img.rocket.new/generatedImages/rocket_gen_img_1857071c7-1766557986386.png',
        799.00,
        49.00,
        150,
        'AI Creatures',
        jsonb_build_array(
            '150+ AI Creature Reel Videos',
            'Dragons, Monsters & Mythical Beings',
            'No Watermark — Post-Ready',
            'HD Quality — Non-Copyrighted',
            'Instant Download & Lifetime Access'
        ),
        'active'::public.bundle_status,
        false
    ),
    (
        bundle3_id,
        'Sci-Fi Mega Pack',
        '200+ Sci-Fi & Robot Reels — Mega Pack',
        'Futuristic robots, spaceships, and sci-fi landscapes for tech-savvy creators.',
        'The ultimate sci-fi content pack with 200+ reels featuring robots, spaceships, futuristic cities, and more. Perfect for tech, gaming, and innovation-focused Instagram accounts.',
        'https://images.pexels.com/photos/3621344/pexels-photo-3621344.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://img.rocket.new/generatedImages/rocket_gen_img_1d2a5df5e-1772104062718.png',
        999.00,
        59.00,
        200,
        'Sci-Fi & Robots',
        jsonb_build_array(
            '200+ Sci-Fi & Robot Reel Videos',
            'Spaceships, Robots & Futuristic Cities',
            'No Watermark — Post-Ready',
            'HD Quality — Non-Copyrighted',
            'Instant Download & Lifetime Access'
        ),
        'draft'::public.bundle_status,
        false
    )
    ON CONFLICT (id) DO NOTHING;

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Mock data insertion failed: %', SQLERRM;
END $$;
