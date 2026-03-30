-- Migration: Add Cashfree payment fields to orders table
-- Timestamp: 20260330110000

-- ─── Add Cashfree-specific columns ───────────────────────────────────────────
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS cashfree_order_id  TEXT,
  ADD COLUMN IF NOT EXISTS cashfree_payment_session_id TEXT;

-- ─── Indexes for lookup by Cashfree IDs ──────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_orders_cashfree_order_id
  ON public.orders(cashfree_order_id);
