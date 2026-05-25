'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { trackViewItem, trackCTAClick } from '@/lib/analytics';
import { bundleService, Bundle } from '@/lib/services/reelstoreService';

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const HeroSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 5, minutes: 47, seconds: 23 });
  const [buyers, setBuyers] = useState(2847);
  const [featuredBundle, setFeaturedBundle] = useState<Bundle | null>(null);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) return { hours, minutes, seconds: seconds - 1 };
        if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
        return { hours: 5, minutes: 47, seconds: 23 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBuyers((prev) => prev + Math.floor(Math.random() * 3));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bundleService.getFeaturedBundle().then((bundle) => {
      setFeaturedBundle(bundle);
      setLoading(false);
      if (bundle) {
        trackViewItem({ itemId: bundle.id, itemName: bundle.name, price: bundle.offerPrice, currency: 'INR' });
      }
    });
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  const bundle = featuredBundle;
  const displayName = bundle?.name || 'Licensed Creative Assets Pack';
  const displayTitle = bundle?.title || '30,000+ Creative Assets Bundle Deal';
  const displayShortDesc = bundle?.shortDescription || 'Professional Digital Marketing Content Kit. All assets are either AI-generated or licensed for redistribution. No copyrighted material included.';
  const displayOfferPrice = bundle?.offerPrice ?? 79;
  const displayOriginalPrice = bundle?.originalPrice ?? 1499;
  const displayReelsCount = bundle?.reelsCount ?? 500;
  const displayFeatures = bundle?.features?.length
    ? bundle.features
    : [
        '30,000+ Professional Creative Assets',
        'Licensed for Personal & Social Media Use',
        'Instant Download Link & Lifetime Access',
        'HD Quality — 100% AI-Generated & Licensed',
        'All Content is Licensed for Redistribution',
        'Multi-Category Content Marketing Kit',
        'New Assets Added Every Month — Free',
      ];
  const discountPct = displayOriginalPrice > 0
    ? Math.round(((displayOriginalPrice - displayOfferPrice) / displayOriginalPrice) * 100)
    : 95;

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden noise-overlay"
      style={{ background: 'radial-gradient(ellipse 100% 70% at 50% 0%, rgba(139,26,26,0.7) 0%, rgba(13,5,5,0.98) 65%, #0D0505 100%)' }}>

      {/* Atmospheric blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]" style={{ background: 'radial-gradient(circle, #8B1A1A 0%, transparent 70%)' }} />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]" style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-[30%] w-[600px] h-[300px] rounded-full opacity-10 blur-[150px]" style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }} />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16 w-full">
        {/* Top badge */}
        <div className="flex justify-center mb-6 animate-fade-up">
          <div className="glass-gold rounded-full px-4 py-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-accent text-xs font-display font-700 uppercase tracking-widest">
              🔥 {buyers.toLocaleString('en-IN')}+ Creators Already Got It
            </span>
          </div>
        </div>

        {/* Main headline */}
        <div className="text-center mb-6 animate-fade-up delay-100">
          <h1 className="font-display font-900 text-4xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tight mb-4">
            <span className="text-fg">Licensed Creative</span>
            <br />
            <span className="shimmer-text">Assets Pack</span>
          </h1>
          <p className="text-fg-muted text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mt-4">
            {displayShortDesc}
          </p>
        </div>

        {/* Countdown timer */}
        <div className="flex justify-center mb-8 animate-fade-up delay-200">
          <div className="glass border-gold rounded-2xl px-6 py-4 flex items-center gap-4">
            <span className="text-fg-dim text-xs uppercase tracking-widest font-700">⏰ Offer Ends In</span>
            <div className="flex items-center gap-2">
              {[
                { value: pad(timeLeft.hours), label: 'HRS' },
                { value: pad(timeLeft.minutes), label: 'MIN' },
                { value: pad(timeLeft.seconds), label: 'SEC' },
              ].map((item, i) => (
                <React.Fragment key={item.label}>
                  {i > 0 && <span className="text-accent font-display font-900 text-2xl">:</span>}
                  <div className="flex flex-col items-center">
                    <span className="font-display font-900 text-2xl sm:text-3xl text-accent tabular-nums leading-none">{item.value}</span>
                    <span className="text-fg-dim text-[9px] uppercase tracking-widest font-700 mt-0.5">{item.label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Main content: product + features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Product box mockup */}
          <div className="relative flex justify-center animate-slide-left delay-300">
            <div className="product-box animate-float relative">
              <div
                className="relative w-[280px] sm:w-[340px] rounded-2xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #2D0A0A 0%, #5C1A1A 30%, #8B1A1A 60%, #5C1A1A 80%, #2D0A0A 100%)', border: '2px solid rgba(201,168,76,0.5)', boxShadow: '0 0 60px rgba(139,26,26,0.6), 0 0 120px rgba(201,168,76,0.15), inset 0 1px 0 rgba(201,168,76,0.3)' }}>
                <div className="px-6 pt-5 pb-3 text-center">
                  <div className="font-display font-900 text-2xl text-accent tracking-widest uppercase">ASSETS PACK</div>
                </div>
                {/* Product mockup or phone mockups */}
                {bundle?.mockupImageUrl ? (
                  <div className="px-4 mb-3">
                    <AppImage src={bundle.mockupImageUrl} alt={`${bundle.name} product mockup`} width={300} height={200} priority={true} className="w-full object-cover rounded-xl" />
                  </div>
                ) : (
                  <div className="px-4 flex gap-2 justify-center mb-3">
                    {[
                      { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe', alt: 'AI creature reel preview' },
                      { src: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee', alt: 'AI robot reel preview' },
                      { src: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e', alt: 'AI fantasy reel preview' },
                    ].map((item, i) => (
                      <div key={i} className="phone-mockup flex-1" style={{ aspectRatio: '9/16', transform: i === 1 ? 'scale(1.08)' : i === 0 ? 'rotate(-3deg)' : 'rotate(3deg)', zIndex: i === 1 ? 2 : 1 }}>
                        <AppImage src={item.src} alt={item.alt} width={120} height={213} priority={true} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                <div className="px-4 pb-5 text-center">
                  <div className="font-display font-900 text-xl text-accent tracking-widest uppercase mb-1">HYBRID REELS</div>
                  <div className="font-display font-700 text-lg" style={{ color: '#E8C96A', fontStyle: 'italic', textShadow: '0 0 20px rgba(201,168,76,0.5)' }}>Digital Aura</div>
                </div>
                <div className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)', borderRight: '1px solid rgba(201,168,76,0.2)' }}>
                  <span className="font-display font-900 text-accent text-xs tracking-widest" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>LICENSED ASSETS</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 sm:right-0 animate-float-delayed">
              <div className="glass-gold rounded-xl px-3 py-2 text-center shadow-gold">
                <div className="font-display font-900 text-accent text-lg leading-none">HD</div>
                <div className="text-fg-dim text-[10px] uppercase tracking-wider">Quality</div>
              </div>
            </div>
            <div className="absolute bottom-8 -left-4 sm:-left-8 animate-float">
              <div className="glass-gold rounded-xl px-3 py-2 shadow-gold">
                <div className="font-display font-900 text-green-400 text-sm leading-none">✓ No Watermark</div>
                <div className="text-fg-dim text-[10px] mt-0.5">Ready to Post</div>
              </div>
            </div>
          </div>

          {/* Right: Features + CTA */}
          <div className="animate-slide-right delay-300">
            <div className="space-y-3 mb-8">
              {displayFeatures.map((text, i) => (
                <div key={i} className="flex items-start gap-3 glass rounded-xl px-4 py-3 border-gold card-hover" style={{ animationDelay: `${300 + i * 80}ms` }}>
                  <span className="text-lg flex-shrink-0 mt-0.5">✅</span>
                  <span className="font-display font-600 text-fg text-sm sm:text-base">{text}</span>
                </div>
              ))}
            </div>

            {/* Price + CTA */}
            <div className="glass rounded-2xl p-6 border-gold-strong glow-gold">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-display font-900 text-4xl sm:text-5xl text-fg">₹{displayOfferPrice}</span>
                <span className="price-strike font-display font-700 text-2xl text-fg-dim">₹{displayOriginalPrice}</span>
                <span className="badge-fire text-white ml-1">{discountPct}% OFF</span>
              </div>
              <p className="text-fg-dim text-sm mb-5">One-time payment · Instant access · No subscription</p>
              <Link
                href="/checkout"
                className="btn-cta animate-pulse-cta w-full flex items-center justify-between px-6 py-4 rounded-2xl text-white font-display font-800 text-lg shadow-cta"
                onClick={() => bundle && trackCTAClick(`Get it now — ₹${displayOfferPrice}`, 'Hero Section')}
              >
                <span>Get it now — ₹{displayOfferPrice} only</span>
                <Icon name="ArrowRightIcon" size={22} className="text-white" />
              </Link>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-1.5 text-fg-dim text-xs">
                  <Icon name="ShieldCheckIcon" size={14} className="text-green-400" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-1.5 text-fg-dim text-xs">
                  <Icon name="BoltIcon" size={14} className="text-accent" />
                  <span>Instant Download</span>
                </div>
                <div className="flex items-center gap-1.5 text-fg-dim text-xs">
                  <Icon name="StarIcon" size={14} className="text-accent" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #0D0505)' }} />
    </section>
  );
};

export default HeroSection;