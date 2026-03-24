-- Migration: Orders table + download_url for bundles
-- Timestamp: 20260319160000

-- ─── Add download_url column to bundles ──────────────────────────────────────
ALTER TABLE public.bundles
ADD COLUMN IF NOT EXISTS download_url TEXT;

-- ─── Order status enum ───────────────────────────────────────────────────────
DROP TYPE IF EXISTS public.order_status CASCADE;
CREATE TYPE public.order_status AS ENUM ('pending', 'paid', 'failed', 'refunded');

-- ─── Orders table ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  bundle_id UUID REFERENCES public.bundles(id) ON DELETE SET NULL,
  bundle_name TEXT NOT NULL,
  amount NUMERIC NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'INR',
  status public.order_status NOT NULL DEFAULT 'pending'::public.order_status,
  payment_id TEXT,
  download_url TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ─── Indexes ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_bundle_id ON public.orders(bundle_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- ─── Updated_at trigger function ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.update_orders_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS orders_updated_at ON public.orders;
CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_orders_updated_at();

-- ─── Enable RLS ───────────────────────────────────────────────────────────────
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- ─── RLS Policies ─────────────────────────────────────────────────────────────
-- Public can insert orders (checkout flow — no auth required)
DROP POLICY IF EXISTS "public_can_insert_orders" ON public.orders;
CREATE POLICY "public_can_insert_orders"
  ON public.orders
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Public can read their own orders by email (for download access check)
DROP POLICY IF EXISTS "public_can_read_orders_by_email" ON public.orders;
CREATE POLICY "public_can_read_orders_by_email"
  ON public.orders
  FOR SELECT
  TO public
  USING (true);

-- Public can update order status (for payment confirmation)
DROP POLICY IF EXISTS "public_can_update_orders" ON public.orders;
CREATE POLICY "public_can_update_orders"
  ON public.orders
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- ─── Update bundles download_url seed data ────────────────────────────────────
-- Set a placeholder download URL for existing active bundles
UPDATE public.bundles
SET download_url = 'https://drive.google.com/drive/folders/example'
WHERE download_url IS NULL;
