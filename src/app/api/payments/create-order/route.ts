import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import crypto from 'crypto';

// ─── Generate unique order_id (max 45 chars) ──────────────────────────────────
function generateCashfreeOrderId(): string {
  // Use a shorter prefix to ensure we stay under 45 characters
  return `RS-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
}

// ─── POST /api/payments/create-order ─────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      bundleId,
      bundleName,
      amount,
      downloadUrl,
    } = body;

    // ── Basic validation ──────────────────────────────────────────────────────
    if (!customerEmail || !customerPhone || !amount || !bundleId) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const orderId = generateCashfreeOrderId();
    console.log(process.env.CASHFREE_ENV, 'process.env.CASHFREE_ENV');
    const isProd = process.env.CASHFREE_ENV === 'PRODUCTION';
    const baseUrl = isProd
      ? 'https://api.cashfree.com/pg/orders'
      : 'https://sandbox.cashfree.com/pg/orders';

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL;

    // ── Create Cashfree order via REST API (safer than SDK in some envs) ────────
    const requestBody = {
      order_amount: Number(amount),
      order_currency: 'INR',
      customer_details: {
        customer_id: customerEmail.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50),
        customer_phone: customerPhone,
        customer_email: customerEmail,
        customer_name: customerName || 'Customer',
      },
      order_meta: {
        return_url: `${origin}/checkout?order_id={order_id}`,
        notify_url: `${origin}/api/payments/webhook`,
      },
      order_note: `Bundle: ${bundleName}`,
      order_id: orderId,
    };

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': process.env.CASHFREE_CLIENT_ID || '',
        'x-client-secret': process.env.CASHFREE_CLIENT_SECRET || '',
        'x-api-version': '2023-08-01',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Cashfree order creation error:', data);
      return NextResponse.json(
        { error: data.message || 'Failed to create Cashfree order.' },
        { status: response.status }
      );
    }

    const { payment_session_id } = data;

    // ── Persist pending order in Supabase ─────────────────────────────────────
    const supabase = await createClient();
    const { data: dbOrder, error: dbError } = await supabase
      .from('orders')
      .insert({
        order_number: orderId, // Our internal/Cashfree order ID
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        bundle_id: bundleId,
        bundle_name: bundleName,
        amount: Number(amount),
        currency: 'INR',
        status: 'pending',
        cashfree_order_id: orderId,
        cashfree_payment_session_id: payment_session_id,
        download_url: downloadUrl || null,
      })
      .select()
      .single();

    if (dbError || !dbOrder) {
      console.error('Supabase error creating order record:', dbError?.message);
      return NextResponse.json({ error: 'Failed to save order in database.' }, { status: 500 });
    }

    return NextResponse.json({
      payment_session_id: payment_session_id,
      order_id: orderId,
      internal_id: dbOrder.id,
      environment: isProd ? 'production' : 'sandbox',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('api/payments/create-order error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
