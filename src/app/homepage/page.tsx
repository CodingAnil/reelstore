'use client';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import TickerSection from './components/TickerSection';

const BundleCategories = dynamic(() => import('./components/BundleCategories'), {
  loading: () => <div className="h-96 animate-pulse bg-bg" />,
  ssr: true,
});
const DemoPreview = dynamic(() => import('./components/DemoPreview'), {
  loading: () => <div className="h-96 animate-pulse bg-bg" />,
  ssr: true,
});
const PricingSection = dynamic(() => import('./components/PricingSection'), {
  loading: () => <div className="h-96 animate-pulse bg-bg" />,
  ssr: true,
});

export default function Homepage() {
  useEffect(() => {
    // Scroll reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add('visible');
            const delay = el.dataset.delay;
            if (delay) el.style.transitionDelay = delay;
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-bg text-fg overflow-x-hidden">
      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Hybrid Reels Bundle — 500+ AI Reels',
            description:
              '500+ AI-generated hybrid Instagram reels. No watermark, HD quality, instant download.',
            offers: {
              '@type': 'Offer',
              price: '79',
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '2847',
            },
          }),
        }}
      />

      <Header />
      <main>
        <HeroSection />
        <TickerSection />
        <PricingSection />

        <DemoPreview />
        <BundleCategories />
        {/* Final CTA Strip */}
        <section
          className="py-16 px-4 text-center"
          style={{
            background:
              'linear-gradient(135deg, rgba(139,26,26,0.3), rgba(124,58,237,0.2), rgba(139,26,26,0.3))',
          }}
        >
          <div className="max-w-2xl mx-auto reveal">
            <h2 className="font-display font-900 text-3xl sm:text-4xl text-fg mb-3">
              Upgrade Your Content Strategy Today 🔥
            </h2>
            <p className="text-fg-muted text-base mb-6">
              Get the most complete{' '}
              <span className="text-accent font-700">Creative Assets Pack</span> for only ₹79 today.
            </p>
            <a
              href="/checkout"
              className="btn-cta animate-pulse-cta inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-white font-display font-800 text-xl shadow-cta"
            >
              <span>Get Assets Pack — ₹79</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
            <p className="text-fg-dim text-xs mt-3">🔒 Secure · ⚡ Instant · 🌟 Lifetime Access</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
