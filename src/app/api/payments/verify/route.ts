import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// ─── POST /api/payments/verify ───────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId } = body; // This is the Cashfree order_id

    if (!orderId) {
      return NextResponse.json({ error: 'Missing orderId.' }, { status: 400 });
    }

    const isProd = process.env.CASHFREE_ENV === 'PRODUCTION';
    const baseUrl = isProd 
      ? `https://api.cashfree.com/pg/orders/${orderId}` 
      : `https://sandbox.cashfree.com/pg/orders/${orderId}`;

    // ── Get Cashfree order status ─────────────────────────────────────────────
    const orderResponse = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'x-client-id': process.env.CASHFREE_CLIENT_ID || '',
        'x-client-secret': process.env.CASHFREE_CLIENT_SECRET || '',
        'x-api-version': '2023-08-01',
      },
    });

    const orderData = await orderResponse.json();

    if (!orderResponse.ok) {
        console.error('Cashfree order lookup error:', orderData);
        return NextResponse.json({ error: orderData.message || 'Failed to fetch order status.' }, { status: orderResponse.status });
    }

    const { order_status } = orderData;

    // ── If PAID, get payment details for logging ─────────────────────────────
    let paymentId = null;
    if (order_status === 'PAID') {
        const paymentsUrl = `${baseUrl}/payments`;
        const paymentResponse = await fetch(paymentsUrl, {
            method: 'GET',
            headers: {
                'x-client-id': process.env.CASHFREE_CLIENT_ID || '',
                'x-client-secret': process.env.CASHFREE_CLIENT_SECRET || '',
                'x-api-version': '2023-08-01',
            },
        });
        const paymentsData = await paymentResponse.json();
        if (paymentResponse.ok && Array.isArray(paymentsData) && paymentsData.length > 0) {
            // Find the successful payment
            const successPayment = paymentsData.find(p => p.payment_status === 'SUCCESS');
            if (successPayment) {
                paymentId = successPayment.cf_payment_id;
            }
        }
    }

    // ── Update order in Supabase ──────────────────────────────────────────────
    const supabase = await createClient();
    
    let finalStatus = 'pending';
    if (order_status === 'PAID') {
        finalStatus = 'paid';
    } else if (order_status === 'EXPIRED' || order_status === 'CANCELLED') {
        finalStatus = 'failed';
    }

    const updateData: any = { status: finalStatus };
    if (paymentId) updateData.payment_id = String(paymentId);

    const { data: updatedOrder, error: dbError } = await supabase
      .from('orders')
      .update(updateData)
      .eq('cashfree_order_id', orderId)
      .select()
      .single();

    if (dbError || !updatedOrder) {
        console.error('Supabase error updating order record:', dbError?.message);
        return NextResponse.json({ error: 'Failed to update order status in database.' }, { status: 500 });
    }

    return NextResponse.json({ 
        success: finalStatus === 'paid', 
        status: finalStatus, 
        orderId: updatedOrder.id,
        downloadUrl: updatedOrder.download_url
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('api/payments/verify error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
