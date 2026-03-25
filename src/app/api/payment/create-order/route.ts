import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createClient } from '@/lib/supabase/server';

// ─── Razorpay instance (server-side only) ────────────────────────────────────
function getRazorpay() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error('Razorpay credentials are not configured.');
  }

  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

// ─── Generate order number ────────────────────────────────────────────────────
function generateOrderNumber(): string {
  return `RS-${Date.now().toString().slice(-8)}`;
}

// ─── POST /api/payment/create-order ──────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, customerEmail, customerPhone, bundleId, bundleName, amount, downloadUrl } = body;

    // ── Basic validation ──────────────────────────────────────────────────────
    if (!customerName || !customerEmail || !customerPhone || !bundleId || !bundleName || !amount) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    if (Number(amount) <= 0) {
      return NextResponse.json({ error: 'Invalid amount.' }, { status: 400 });
    }

    // ── Create Razorpay order (amount in paise) ───────────────────────────────
    const razorpay = getRazorpay();
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(Number(amount) * 100), // Convert ₹ to paise
      currency: 'INR',
      receipt: generateOrderNumber(),
      notes: {
        bundleId,
        bundleName,
        customerEmail,
        customerName,
      },
    });

    // ── Persist pending order in Supabase ─────────────────────────────────────
    const supabase = await createClient();
    const { data: order, error: dbError } = await supabase
      .from('orders')
      .insert({
        order_number: razorpayOrder.receipt as string,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        bundle_id: bundleId,
        bundle_name: bundleName,
        amount: Number(amount),
        currency: 'INR',
        status: 'pending',
        razorpay_order_id: razorpayOrder.id,
        download_url: downloadUrl || null,
      })
      .select()
      .single();

    if (dbError || !order) {
      console.error('DB error creating order:', dbError?.message);
      return NextResponse.json({ error: 'Failed to create order record.' }, { status: 500 });
    }

    // ── Respond with data needed by Razorpay Checkout ────────────────────────
    return NextResponse.json({
      orderId: order.id,               // Internal DB order ID
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,    // In paise
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('create-order error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
