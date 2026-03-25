import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// ─── POST /api/payment/cancel ─────────────────────────────────────────────────
// Called when user dismisses the Razorpay modal without paying
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'orderId is required.' }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from('orders')
      .update({ status: 'failed' })
      .eq('id', orderId)
      .eq('status', 'pending'); // Only cancel if still pending

    if (error) {
      console.error('DB error cancelling order:', error.message);
      return NextResponse.json({ error: 'Failed to cancel order.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('cancel error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
