import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/lib/supabase/server';

// ─── Verify Razorpay HMAC signature ──────────────────────────────────────────
function verifyRazorpaySignature(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string,
): boolean {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) return false;

  const body = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(body)
    .digest('hex');

  return expectedSignature === razorpaySignature;
}

// ─── POST /api/payment/verify ─────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      orderId,             // Internal DB order ID
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = body;

    // ── Validate input ────────────────────────────────────────────────────────
    if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json({ error: 'Missing payment verification fields.' }, { status: 400 });
    }

    // ── Verify signature on the backend ──────────────────────────────────────
    const isValid = verifyRazorpaySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);

    if (!isValid) {
      // Mark order as failed on signature mismatch
      const supabase = await createClient();
      await supabase
        .from('orders')
        .update({ status: 'failed' })
        .eq('id', orderId);

      return NextResponse.json({ error: 'Payment verification failed. Invalid signature.' }, { status: 400 });
    }

    // ── Update order to paid with all Razorpay details ────────────────────────
    const supabase = await createClient();
    const { data: order, error: dbError } = await supabase
      .from('orders')
      .update({
        status: 'paid',
        payment_id: razorpayPaymentId,
        razorpay_order_id: razorpayOrderId,
        razorpay_payment_id: razorpayPaymentId,
        razorpay_signature: razorpaySignature,
      })
      .eq('id', orderId)
      .select()
      .single();

    if (dbError || !order) {
      console.error('DB error updating order to paid:', dbError?.message);
      return NextResponse.json({ error: 'Failed to update payment status.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('verify error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
