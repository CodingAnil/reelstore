-- Migration: Add Razorpay payment fields to orders table
-- Timestamp: 20260324000000

-- ─── Add Razorpay-specific columns ───────────────────────────────────────────
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS razorpay_order_id  TEXT,
  ADD COLUMN IF NOT EXISTS razorpay_payment_id TEXT,
  ADD COLUMN IF NOT EXISTS razorpay_signature  TEXT;

-- ─── Indexes for lookup by Razorpay IDs ──────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_orders_razorpay_order_id
  ON public.orders(razorpay_order_id);

CREATE INDEX IF NOT EXISTS idx_orders_razorpay_payment_id
  ON public.orders(razorpay_payment_id);
