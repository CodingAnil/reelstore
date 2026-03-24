-- ============================================================
-- Fix: Add anon-role write policies for bundles, categories, orders
-- The admin dashboard uses hardcoded credentials (not Supabase auth),
-- so it operates under the anon role. The existing policies only allow
-- authenticated role to write, blocking all admin CRUD operations.
-- ============================================================

-- ─── BUNDLES ──────────────────────────────────────────────────────────────────

-- Drop existing policies and recreate with anon access
DROP POLICY IF EXISTS "public_read_active_bundles" ON public.bundles;
DROP POLICY IF EXISTS "authenticated_manage_bundles" ON public.bundles;
DROP POLICY IF EXISTS "anon_manage_bundles" ON public.bundles;
DROP POLICY IF EXISTS "anon_read_all_bundles" ON public.bundles;

-- Public (anon) can read active bundles (for storefront)
CREATE POLICY "public_read_active_bundles"
ON public.bundles
FOR SELECT
TO public
USING (true);

-- Anon role can insert/update/delete (admin uses anon key with hardcoded auth)
CREATE POLICY "anon_manage_bundles"
ON public.bundles
FOR ALL
TO anon
USING (true)
WITH CHECK (true);

-- Authenticated role can also manage bundles
CREATE POLICY "authenticated_manage_bundles"
ON public.bundles
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ─── CATEGORIES ───────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "public_read_active_categories" ON public.categories;
DROP POLICY IF EXISTS "authenticated_manage_categories" ON public.categories;
DROP POLICY IF EXISTS "anon_manage_categories" ON public.categories;

-- Public (anon) can read all categories
CREATE POLICY "public_read_active_categories"
ON public.categories
FOR SELECT
TO public
USING (true);

-- Anon role can insert/update/delete
CREATE POLICY "anon_manage_categories"
ON public.categories
FOR ALL
TO anon
USING (true)
WITH CHECK (true);

-- Authenticated role can also manage categories
CREATE POLICY "authenticated_manage_categories"
ON public.categories
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ─── ORDERS ───────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "anon_create_orders" ON public.orders;
DROP POLICY IF EXISTS "anon_read_own_orders" ON public.orders;
DROP POLICY IF EXISTS "authenticated_manage_orders" ON public.orders;
DROP POLICY IF EXISTS "anon_manage_orders" ON public.orders;
DROP POLICY IF EXISTS "public_create_orders" ON public.orders;

-- Anon can do all operations on orders (checkout + admin)
CREATE POLICY "anon_manage_orders"
ON public.orders
FOR ALL
TO anon
USING (true)
WITH CHECK (true);

-- Authenticated role can also manage orders
CREATE POLICY "authenticated_manage_orders"
ON public.orders
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
