import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/lib/supabase/server';

function verifyCashfreeWebhookSignature(
  signature: string,
  rawBody: string,
  timestamp: string,
  clientSecret: string
): boolean {
  if (!signature || !timestamp || !clientSecret) return false;

  const data = timestamp + rawBody;
  const expectedSignature = crypto
    .createHmac('sha256', clientSecret)
    .update(data)
    .digest('base64');

  return expectedSignature === signature;
}

// ─── POST /api/payments/webhook ──────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-webhook-signature') || '';
    const timestamp = req.headers.get('x-webhook-timestamp') || '';
    const clientSecret = process.env.CASHFREE_CLIENT_SECRET || '';

    // ── Verify Signature ──────────────────────────────────────────────────────
    const isValid = verifyCashfreeWebhookSignature(signature, rawBody, timestamp, clientSecret);

    if (!isValid && process.env.NODE_ENV === 'production') {
      console.warn('Invalid Cashfree webhook signature.');
      return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const { type, data: eventData } = payload;
    const { order, payment } = eventData || {};
    const orderId = order?.order_id;
    const paymentId = payment?.cf_payment_id;
    const paymentStatus = payment?.payment_status;

    if (!orderId) {
      return NextResponse.json({ error: 'Missing order_id in payload.' }, { status: 400 });
    }

    const supabase = await createClient();

    // ── Update Order Status Based on Event Type ──────────────────────────────
    if (type === 'PAYMENT_SUCCESS_WEBHOOK' && paymentStatus === 'SUCCESS') {
      await supabase
        .from('orders')
        .update({
          status: 'paid',
          payment_id: String(paymentId),
        })
        .eq('cashfree_order_id', orderId);

      console.info(`Webhook: Payment SUCCESS for order ${orderId}`);
    } else if (type === 'PAYMENT_FAILED_WEBHOOK') {
      await supabase
        .from('orders')
        .update({ status: 'failed' })
        .eq('cashfree_order_id', orderId);

      console.info(`Webhook: Payment FAILED for order ${orderId}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('api/payments/webhook error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
