'use client';
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { trackDownload } from '@/lib/analytics';
import { orderService, Order } from '@/lib/services/reelstoreService';

const steps = [
  { icon: '📥', title: 'Click Download', desc: 'Tap the button below to open your Google Drive folder' },
  { icon: '📁', title: 'Open Folder', desc: 'All reels are organized in category folders' },
  { icon: '💾', title: 'Download All', desc: 'Select all and download to your device' },
  { icon: '📱', title: 'Post on Instagram', desc: 'Upload directly to Instagram Reels & go viral!' },
];

function DownloadContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('order');

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const verifyAccess = async () => {
      setLoading(true);

      if (!orderId) {
        setAccessDenied(true);
        setLoading(false);
        return;
      }

      const fetchedOrder = await orderService?.getOrderById(orderId);

      if (!fetchedOrder || fetchedOrder?.status !== 'paid') {
        setAccessDenied(true);
        setLoading(false);
        return;
      }

      setOrder(fetchedOrder);
      setLoading(false);
    };

    verifyAccess();
  }, [orderId]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-bg text-fg flex items-center justify-center" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(124,58,237,0.25) 0%, rgba(139,26,26,0.15) 40%, #0D0505 70%)' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-fg-dim text-sm">Verifying your order...</p>
        </div>
      </div>
    );
  }

  // Access denied state
  if (accessDenied) {
    return (
      <div className="min-h-screen bg-bg text-fg flex flex-col items-center justify-center px-4" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(139,26,26,0.3) 0%, #0D0505 70%)' }}>
        <header className="absolute top-0 left-0 right-0 py-5 px-4 sm:px-6 flex items-center max-w-3xl mx-auto w-full">
          <Link href="/homepage" className="flex items-center gap-2">
            <AppLogo size={32} />
            <span className="font-display font-800 text-lg text-accent">ReelStore</span>
          </Link>
        </header>
        <div className="text-center max-w-md mt-20">
          <div className="w-20 h-20 rounded-full bg-red-900/30 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
            <Icon name="LockClosedIcon" size={32} className="text-red-400" />
          </div>
          <h1 className="font-display font-900 text-2xl text-fg mb-3">Access Restricted</h1>
          <p className="text-fg-dim text-sm mb-8">
            This download page is only accessible after a successful purchase. Please complete your order to get access.
          </p>
          <Link
            href="/checkout"
            className="btn-cta inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-display font-800 text-lg shadow-cta"
          >
            <span>Get Access — ₹79</span>
            <Icon name="ArrowRightIcon" size={18} className="text-white" />
          </Link>
          <div className="mt-4">
            <Link href="/homepage" className="text-fg-dim text-sm hover:text-fg transition-colors">
              ← Back to Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-bg text-fg flex flex-col"
      style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(124,58,237,0.25) 0%, rgba(139,26,26,0.15) 40%, #0D0505 70%)' }}
    >
      {/* Header */}
      <header className="py-5 px-4 sm:px-6 flex items-center justify-between max-w-3xl mx-auto w-full">
        <Link href="/homepage" className="flex items-center gap-2">
          <AppLogo size={32} />
          <span className="font-display font-800 text-lg text-accent">ReelStore</span>
        </Link>
        <div className="flex items-center gap-2 text-green-400 text-sm font-700">
          <Icon name="CheckCircleIcon" size={18} className="text-green-400" variant="solid" />
          <span>Payment Successful</span>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10">
        <div className="max-w-2xl w-full text-center">
          {/* Success animation */}
          <div className="mb-8 flex justify-center">
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center animate-scale-in"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(201,168,76,0.2))', border: '2px solid rgba(201,168,76,0.4)', boxShadow: '0 0 60px rgba(124,58,237,0.4)' }}
            >
              <span className="text-5xl">🎉</span>
            </div>
          </div>

          <div className="animate-fade-up">
            <h1 className="font-display font-900 text-3xl sm:text-5xl text-fg mb-3 tracking-tight">
              You&apos;re In! 🔥
            </h1>
            <p className="text-fg-muted text-base sm:text-lg mb-2">
              Your <span className="text-accent font-700">{order?.bundleName}</span> is ready to download
            </p>
            <p className="text-fg-dim text-sm mb-10">
              Access link also sent to {order?.customerEmail} · Order #{order?.orderNumber}
            </p>
          </div>

          {/* Main download CTA */}
          <div
            className="glass rounded-3xl p-8 mb-8 animate-fade-up delay-200 relative overflow-hidden"
            style={{ border: '2px solid rgba(201,168,76,0.4)', boxShadow: '0 0 60px rgba(201,168,76,0.15)' }}
          >
            {/* Glow blob */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 opacity-20 blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, #C9A84C, transparent)' }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-3xl">📦</span>
                <h2 className="font-display font-900 text-2xl text-fg">{order?.bundleName}</h2>
              </div>
              <p className="text-fg-dim text-sm mb-6">HD quality · Instant access · Lifetime download</p>

              {/* Download button */}
              {order?.downloadUrl ? (
                <a
                  href={order?.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full flex items-center justify-center gap-3 px-6 py-5 rounded-2xl text-bg font-display font-900 text-xl mb-4"
                  onClick={() => trackDownload('download_bundle')}
                >
                  <Icon name="ArrowDownTrayIcon" size={24} className="text-bg" />
                  <span>Download from Google Drive</span>
                </a>
              ) : (
                <div className="w-full flex items-center justify-center gap-3 px-6 py-5 rounded-2xl bg-primary/20 border border-accent/20 mb-4">
                  <p className="text-fg-dim text-sm">Download link will be sent to your email shortly.</p>
                </div>
              )}

              <p className="text-fg-dim text-xs">
                🔗 Link is permanent · Access anytime · No expiry
              </p>
            </div>
          </div>

          {/* Order details */}
          <div className="glass rounded-2xl p-5 mb-6 animate-fade-up delay-300 border-gold text-left">
            <h3 className="font-display font-700 text-fg text-base mb-4 flex items-center gap-2">
              <Icon name="DocumentTextIcon" size={18} className="text-accent" />
              Order Summary
            </h3>
            <div className="space-y-2.5 text-sm">
              {[
                { label: 'Order ID', value: order?.orderNumber || '—' },
                { label: 'Bundle', value: order?.bundleName || '—' },
                { label: 'Amount Paid', value: `₹${order?.amount || 0}` },
                { label: 'Customer', value: order?.customerName || '—' },
                { label: 'Email', value: order?.customerEmail || '—' },
                { label: 'Access', value: 'Lifetime · Instant' },
              ]?.map((row, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-fg-dim">{row?.label}</span>
                  <span className="text-fg font-600 text-right max-w-[60%] truncate">{row?.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How to use steps */}
          <div className="animate-fade-up delay-400">
            <h3 className="font-display font-700 text-fg text-lg mb-5 text-center">
              How to Get Started 🚀
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {steps?.map((step, i) => (
                <div key={i} className="glass rounded-2xl p-4 text-center border-gold card-hover">
                  <div className="text-2xl mb-2">{step?.icon}</div>
                  <div className="font-display font-700 text-accent text-xs uppercase tracking-wider mb-1">Step {i + 1}</div>
                  <div className="font-display font-700 text-fg text-sm mb-1">{step?.title}</div>
                  <div className="text-fg-dim text-xs leading-relaxed">{step?.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Share + return */}
          <div className="mt-8 animate-fade-up delay-500 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/homepage"
              className="glass border-gold rounded-xl px-6 py-3 text-fg-muted text-sm font-600 hover:text-fg transition-colors text-center"
            >
              ← Back to Store
            </Link>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: 'ReelStore Bundle', text: 'Just got AI reels for ₹79!', url: window.location?.origin + '/homepage' });
                }
              }}
              className="glass-gold rounded-xl px-6 py-3 text-accent text-sm font-700 hover:bg-accent/20 transition-colors"
            >
              🔗 Share with Friends
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Download() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg text-fg flex items-center justify-center" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(124,58,237,0.25) 0%, rgba(139,26,26,0.15) 40%, #0D0505 70%)' }}>
          <div className="w-10 h-10 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        </div>
      }
    >
      <DownloadContent />
    </Suspense>
  );
}