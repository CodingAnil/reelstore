'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const steps = [
  { icon: '📥', title: 'Click Download', desc: 'Tap the button below to open your Google Drive folder' },
  { icon: '📁', title: 'Open Folder', desc: 'All 500+ reels are organized in category folders' },
  { icon: '💾', title: 'Download All', desc: 'Select all and download to your device' },
  { icon: '📱', title: 'Post on Instagram', desc: 'Upload directly to Instagram Reels & go viral!' },
];

export default function Download() {
  const [confetti, setConfetti] = useState(false);
  const [dots, setDots] = useState(0);

  useEffect(() => {
    setConfetti(true);
    const interval = setInterval(() => {
      setDots((d) => (d + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

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
              You're In! 🔥
            </h1>
            <p className="text-fg-muted text-base sm:text-lg mb-2">
              Your <span className="text-accent font-700">500+ Hybrid Reels Bundle</span> is ready to download
            </p>
            <p className="text-fg-dim text-sm mb-10">
              Access link also sent to your email · Order #RS-{Math.floor(Math.random() * 90000 + 10000)}
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
                <h2 className="font-display font-900 text-2xl text-fg">Hybrid Reels Bundle</h2>
              </div>
              <p className="text-fg-dim text-sm mb-6">500+ AI-generated reels · 6 categories · HD quality</p>

              {/* Download button */}
              <a
                href="https://drive.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full flex items-center justify-center gap-3 px-6 py-5 rounded-2xl text-bg font-display font-900 text-xl mb-4"
              >
                <Icon name="ArrowDownTrayIcon" size={24} className="text-bg" />
                <span>Download from Google Drive</span>
              </a>

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
                { label: 'Bundle', value: 'Hybrid Reels — Digital Aura' },
                { label: 'Reels Included', value: '500+' },
                { label: 'Amount Paid', value: '₹79' },
                { label: 'Access', value: 'Lifetime · Instant' },
                { label: 'Email', value: 'Confirmation sent ✓' },
              ]?.map((row, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-fg-dim">{row?.label}</span>
                  <span className="text-fg font-600">{row?.value}</span>
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
                  navigator.share({ title: 'ReelStore Bundle', text: 'Just got 500+ AI reels for ₹79!', url: window.location?.origin + '/homepage' });
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