'use client';
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { trackBeginCheckout, trackFormSubmit, trackPurchase } from '@/lib/analytics';
import { bundleService, orderService, Bundle } from '@/lib/services/reelstoreService';

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const bundleId = searchParams.get('bundle');

  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'payment'>('form');
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [bundleLoading, setBundleLoading] = useState(true);
  const [pendingOrderId, setPendingOrderId] = useState<string | null>(null);
  const [orderError, setOrderError] = useState('');

  useEffect(() => {
    const loadBundle = async () => {
      setBundleLoading(true);
      let loaded: Bundle | null = null;
      if (bundleId) {
        loaded = await bundleService.getBundleById(bundleId);
      }
      if (!loaded) {
        // Fall back to featured bundle
        loaded = await bundleService.getFeaturedBundle();
      }
      setBundle(loaded);
      setBundleLoading(false);
    };
    loadBundle();
  }, [bundleId]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email required';
    if (!form.phone.trim() || form.phone.length < 10) newErrors.phone = 'Valid 10-digit phone required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !bundle) return;
    setLoading(true);
    setOrderError('');
    trackFormSubmit('checkout-form');

    // Create a pending order in Supabase
    const order = await orderService.createOrder({
      customerName: form.name,
      customerEmail: form.email,
      customerPhone: form.phone,
      bundleId: bundle.id,
      bundleName: bundle.name,
      amount: bundle.offerPrice,
      downloadUrl: bundle.downloadUrl || '',
    });

    if (!order) {
      setOrderError('Failed to create order. Please try again.');
      setLoading(false);
      return;
    }

    setPendingOrderId(order.id);
    setLoading(false);
    setStep('payment');
  };

  const handlePayment = async () => {
    if (!pendingOrderId || !bundle) return;
    setLoading(true);
    trackBeginCheckout({ value: bundle.offerPrice, currency: 'INR' });

    // Mark order as paid in Supabase
    const paidOrder = await orderService.markOrderPaid(pendingOrderId);

    if (!paidOrder) {
      setOrderError('Payment confirmation failed. Please contact support.');
      setLoading(false);
      return;
    }

    trackPurchase({
      transactionId: paidOrder.orderNumber,
      value: paidOrder.amount,
      currency: 'INR',
    });

    setLoading(false);
    // Redirect to download page with order info
    window.location.href = `/download?order=${paidOrder.id}`;
  };

  const discount = bundle ? Math.round(((bundle.originalPrice - bundle.offerPrice) / bundle.originalPrice) * 100) : 95;

  return (
    <div className="min-h-screen bg-bg text-fg" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,26,26,0.4) 0%, #0D0505 60%)' }}>
      {/* Header */}
      <header className="py-5 px-4 sm:px-6 border-b border-accent/10 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/homepage" className="flex items-center gap-2">
          <AppLogo size={32} />
          <span className="font-display font-800 text-lg text-accent hidden sm:block">ReelStore</span>
        </Link>
        <div className="flex items-center gap-2 text-fg-dim text-sm">
          <Icon name="LockClosedIcon" size={14} className="text-green-400" />
          <span>Secure Checkout</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Form */}
          <div>
            <h1 className="font-display font-900 text-2xl sm:text-3xl text-fg mb-2">Complete Your Order</h1>
            <p className="text-fg-dim text-sm mb-8">Fill in your details to get instant access</p>

            {orderError && (
              <div className="mb-4 bg-red-900/30 border border-red-500/30 rounded-xl px-4 py-3">
                <p className="text-red-400 text-sm">{orderError}</p>
              </div>
            )}

            {step === 'form' ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-fg-muted text-sm font-600 mb-1.5 font-display">Full Name</label>
                  <input
                    type="text"
                    placeholder="Priya Sharma"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-dark w-full rounded-xl px-4 py-3.5 text-fg text-sm"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-fg-muted text-sm font-600 mb-1.5 font-display">Email Address</label>
                  <input
                    type="email"
                    placeholder="priya@gmail.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-dark w-full rounded-xl px-4 py-3.5 text-fg text-sm"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  <p className="text-fg-dim text-xs mt-1">Download link will be sent to this email</p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-fg-muted text-sm font-600 mb-1.5 font-display">Phone Number</label>
                  <div className="flex gap-2">
                    <div className="input-dark rounded-xl px-3 py-3.5 text-fg-dim text-sm flex items-center gap-1 flex-shrink-0">
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                      className="input-dark flex-1 rounded-xl px-4 py-3.5 text-fg text-sm"
                    />
                  </div>
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-3 py-4">
                  {[
                    { icon: '🔒', text: 'Secure SSL' },
                    { icon: '⚡', text: 'Instant Access' },
                    { icon: '💳', text: 'Safe Payment' },
                  ].map((badge, i) => (
                    <div key={i} className="glass rounded-xl p-3 text-center border-gold">
                      <div className="text-xl mb-1">{badge.icon}</div>
                      <div className="text-fg-dim text-xs font-600">{badge.text}</div>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading || bundleLoading || !bundle}
                  className="btn-cta w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-white font-display font-800 text-lg shadow-cta disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <>
                      <span>Proceed to Payment</span>
                      <Icon name="ArrowRightIcon" size={20} className="text-white" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Payment Step */
              <div className="animate-fade-scale">
                <div className="glass rounded-2xl p-6 border-gold mb-6">
                  <h3 className="font-display font-800 text-fg text-lg mb-4">Payment Details</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-fg-muted text-xs font-600 mb-1.5 uppercase tracking-wider">Card Number</label>
                      <div className="input-dark rounded-xl px-4 py-3.5 flex items-center justify-between">
                        <span className="text-fg-dim text-sm">4242 4242 4242 4242</span>
                        <div className="flex gap-1">
                          <div className="w-8 h-5 bg-white/20 rounded text-[8px] flex items-center justify-center text-white font-700">VISA</div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-fg-muted text-xs font-600 mb-1.5 uppercase tracking-wider">Expiry</label>
                        <div className="input-dark rounded-xl px-4 py-3.5">
                          <span className="text-fg-dim text-sm">MM / YY</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-fg-muted text-xs font-600 mb-1.5 uppercase tracking-wider">CVV</label>
                        <div className="input-dark rounded-xl px-4 py-3.5">
                          <span className="text-fg-dim text-sm">•••</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-primary/10 border border-primary/30">
                    <p className="text-fg-dim text-xs text-center">
                      💡 Demo UI — Connect Stripe/Razorpay API for live payments.
                    </p>
                  </div>
                </div>

                {/* UPI Option */}
                <div className="glass rounded-2xl p-4 border-gold mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center">
                      <span className="text-sm">📱</span>
                    </div>
                    <div>
                      <div className="font-display font-700 text-fg text-sm">Pay via UPI</div>
                      <div className="text-fg-dim text-xs">PhonePe, GPay, Paytm, UPI ID</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="btn-cta w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-white font-display font-800 text-xl shadow-cta disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Processing Payment...
                    </span>
                  ) : (
                    <>
                      <Icon name="LockClosedIcon" size={18} className="text-white" />
                      <span>Pay ₹{bundle?.offerPrice ?? 79} Securely</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setStep('form')}
                  className="w-full mt-3 text-fg-dim text-sm text-center hover:text-fg transition-colors"
                >
                  ← Back to details
                </button>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:sticky lg:top-8">
            <div
              className="glass rounded-3xl p-6 relative overflow-hidden"
              style={{ border: '1px solid rgba(201,168,76,0.3)', boxShadow: '0 0 40px rgba(201,168,76,0.1)' }}
            >
              {bundleLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-40 bg-primary/20 rounded-2xl" />
                  <div className="h-6 bg-primary/20 rounded-lg w-3/4" />
                  <div className="h-4 bg-primary/20 rounded-lg w-1/2" />
                  <div className="h-16 bg-primary/20 rounded-xl" />
                </div>
              ) : bundle ? (
                <>
                  {/* Product image */}
                  {bundle.thumbnailUrl && (
                    <div className="relative rounded-2xl overflow-hidden mb-6" style={{ aspectRatio: '16/9' }}>
                      <AppImage
                        src={bundle.thumbnailUrl}
                        alt={`${bundle.name} product preview`}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-card/90 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="badge-fire text-white">{bundle.reelsCount}+ REELS</span>
                      </div>
                    </div>
                  )}

                  <h2 className="font-display font-900 text-xl text-fg mb-1">{bundle.name}</h2>
                  <p className="text-fg-dim text-sm mb-6">{bundle.shortDescription || bundle.category}</p>

                  {/* Price breakdown */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-accent/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-fg-muted">Original Price</span>
                      <span className="price-strike text-fg-dim font-700">₹{bundle.originalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-400 font-700">Discount ({discount}% OFF)</span>
                      <span className="text-green-400 font-700">-₹{(bundle.originalPrice - bundle.offerPrice).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline mb-6">
                    <span className="font-display font-800 text-fg text-lg">Total</span>
                    <div className="text-right">
                      <span className="font-display font-900 text-3xl text-fg">₹{bundle.offerPrice}</span>
                      <div className="text-green-400 text-xs font-700">One-time · No subscription</div>
                    </div>
                  </div>

                  {/* Includes list */}
                  <div className="space-y-2">
                    {bundle.features?.length > 0
                      ? bundle.features.slice(0, 5).map((f, i) => (
                          <div key={i} className="text-fg-muted text-sm flex items-center gap-2">
                            <span className="text-green-400">✅</span>
                            <span>{f}</span>
                          </div>
                        ))
                      : ['Instant Google Drive Access', 'HD Quality No Watermark', 'Lifetime Access', 'Email Confirmation'].map((item, i) => (
                          <div key={i} className="text-fg-muted text-sm">✅ {item}</div>
                        ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-fg-dim text-sm">Bundle not found. Please go back and try again.</p>
                </div>
              )}

              {/* Trust */}
              <div className="mt-6 pt-6 border-t border-accent/10 flex items-center justify-center gap-3">
                <Icon name="ShieldCheckIcon" size={16} className="text-green-400" />
                <span className="text-fg-dim text-xs">256-bit SSL Encrypted · Secure Payment</span>
              </div>
            </div>

            {/* Testimonial snippet */}
            <div className="glass rounded-2xl p-4 mt-4 border-gold">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-accent">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-fg-muted text-xs leading-relaxed">
                &ldquo;Bought it, downloaded in 2 minutes, posted 5 reels the same day. 2 of them crossed 50K views!&rdquo;
              </p>
              <p className="text-accent text-xs font-700 mt-2">— Rohan Verma, @rohan.creates</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Checkout() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg text-fg flex items-center justify-center" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139,26,26,0.4) 0%, #0D0505 60%)' }}>
          <div className="w-10 h-10 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
