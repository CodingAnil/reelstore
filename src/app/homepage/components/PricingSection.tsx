'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { bundleService, Bundle } from '@/lib/services/reelstoreService';

const testimonials = [
  { name: 'Priya Sharma', handle: '@priyacreates_', avatar: 'PS', rating: 5, text: 'Bought this for ₹79 and my Instagram blew up! 3 reels went viral in a week. Best investment ever.', followers: '45K followers' },
  { name: 'Arjun Mehta', handle: '@arjundigital', avatar: 'AM', rating: 5, text: 'Seriously impressive quality. No watermark, HD, and the variety is insane. Worth every rupee.', followers: '12K followers' },
  { name: 'Kavya Reddy', handle: '@kavya.reels', avatar: 'KR', rating: 5, text: 'I was skeptical at ₹79 but WOW. Downloaded instantly, posted 10 reels, got 100K views combined.', followers: '28K followers' },
];

const PricingSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bundleService.getActiveBundles().then((data) => {
      setBundles(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [bundles]);

  const calcDiscount = (original: number, offer: number) =>
    original > 0 ? Math.round(((original - offer) / original) * 100) : 0;

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-1.5 mb-4">
            <span className="text-accent text-xs font-display font-700 uppercase tracking-widest">💰 Limited Offer</span>
          </div>
          <h2 className="font-display font-900 text-3xl sm:text-5xl text-fg tracking-tight mb-3">
            Grab It Before
            <br />
            <span className="shimmer-text">Price Goes Up</span>
          </h2>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="glass rounded-3xl p-8 animate-pulse" style={{ border: '2px solid rgba(201,168,76,0.2)' }}>
              <div className="h-8 bg-primary/20 rounded-xl mb-4 w-3/4" />
              <div className="h-16 bg-primary/20 rounded-xl mb-6 w-1/2" />
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => <div key={i} className="h-6 bg-primary/20 rounded-lg" />)}
              </div>
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => <div key={i} className="glass rounded-2xl p-5 animate-pulse h-28" style={{ border: '1px solid rgba(201,168,76,0.1)' }} />)}
            </div>
          </div>
        )}

        {/* Dynamic bundle cards */}
        {!loading && bundles.length > 0 && (
          <div className="space-y-12">
            {bundles.map((bundle, bundleIdx) => {
              const discount = calcDiscount(bundle.originalPrice, bundle.offerPrice);
              return (
                <div key={bundle.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  {/* Pricing Card */}
                  <div
                    className={`${bundleIdx % 2 === 0 ? 'reveal-left' : 'reveal-right'} glass rounded-3xl p-8 relative overflow-hidden`}
                    style={{ border: '2px solid rgba(201,168,76,0.4)', boxShadow: '0 0 60px rgba(201,168,76,0.15), 0 0 120px rgba(139,26,26,0.2)' }}
                  >
                    {bundle.isFeatured && (
                      <div className="absolute top-4 right-4">
                        <span className="badge-fire text-white">BEST VALUE</span>
                      </div>
                    )}
                    {/* Thumbnail */}
                    {bundle.thumbnailUrl && (
                      <div className="relative rounded-2xl overflow-hidden mb-5" style={{ aspectRatio: '16/9' }}>
                        <AppImage src={bundle.thumbnailUrl} alt={`${bundle.name} bundle preview`} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-card/60 to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <span className="badge-fire text-white">{bundle.reelsCount}+ REELS</span>
                        </div>
                      </div>
                    )}
                    <div className="mb-6">
                      <h3 className="font-display font-900 text-2xl text-fg mb-1">{bundle.name || 'Creative Assets Pack'}</h3>
                      <p className="text-fg-dim text-sm">{bundle.shortDescription || 'Professional Digital Marketing Content Kit'}</p>
                    </div>
                    {/* Price display */}
                    <div className="flex items-baseline gap-3 mb-6">
                      <span className="font-display font-900 text-6xl text-fg">₹{bundle.offerPrice}</span>
                      <div className="flex flex-col">
                        <span className="price-strike font-display font-700 text-2xl text-fg-dim">₹{bundle.originalPrice}</span>
                        <span className="text-green-400 text-xs font-700 uppercase tracking-wider mt-0.5">Save ₹{bundle.originalPrice - bundle.offerPrice}</span>
                      </div>
                      {discount > 0 && <span className="badge-fire text-white ml-1">{discount}% OFF</span>}
                    </div>
                    {/* Features */}
                    {bundle.features?.length > 0 && (
                      <div className="space-y-2.5 mb-8">
                        {bundle.features.map((item, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="w-3 h-3 text-green-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-fg text-sm font-500">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <Link href="/checkout" className="btn-cta animate-pulse-cta w-full flex items-center justify-between px-6 py-4 rounded-2xl text-white font-display font-800 text-xl shadow-cta">
                      <span>Buy Now — ₹{bundle.offerPrice}</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </Link>
                    <p className="text-center text-fg-dim text-xs mt-3">🔒 Secure payment · ⚡ Instant access · 🌟 No subscription</p>
                  </div>

                  {/* Testimonials (only for first bundle) or bundle info for others */}
                  {bundleIdx === 0 ? (
                    <div className="reveal-right space-y-4">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-accent">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                        <span className="font-display font-700 text-fg text-sm">4.9/5 from 2,800+ buyers</span>
                      </div>
                      {testimonials.map((t, i) => (
                        <div key={i} className="glass rounded-2xl p-5 border-gold card-hover" style={{ transitionDelay: `${i * 100}ms` }}>
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-display font-800 text-sm text-fg" style={{ background: 'linear-gradient(135deg, #8B1A1A, #C9A84C)' }}>{t.avatar}</div>
                            <div>
                              <div className="font-display font-700 text-fg text-sm">{t.name}</div>
                              <div className="text-fg-dim text-xs">{t.handle} · {t.followers}</div>
                            </div>
                            <div className="ml-auto flex">
                              {[...Array(t.rating)].map((_, j) => (
                                <svg key={j} viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-accent">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-fg-muted text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={`${bundleIdx % 2 === 0 ? 'reveal-right' : 'reveal-left'} glass rounded-3xl p-8`} style={{ border: '1px solid rgba(201,168,76,0.2)' }}>
                      <div className="mb-6">
                        <div className="inline-flex items-center gap-2 glass-gold rounded-full px-3 py-1 mb-4">
                          <span className="text-accent text-xs font-700 uppercase tracking-widest">🎬 {bundle.category}</span>
                        </div>
                        <h4 className="font-display font-900 text-xl text-fg mb-2">{bundle.title}</h4>
                        <p className="text-fg-muted text-sm leading-relaxed">{bundle.fullDescription || bundle.shortDescription}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {[
                          { label: 'Total Reels', value: `${bundle.reelsCount}+` },
                          { label: 'Quality', value: 'HD' },
                          { label: 'Watermark', value: 'None' },
                          { label: 'Access', value: 'Lifetime' },
                        ].map((stat, i) => (
                          <div key={i} className="bg-primary/10 border border-primary/20 rounded-xl p-3 text-center">
                            <div className="font-display font-800 text-accent text-lg">{stat.value}</div>
                            <div className="text-fg-dim text-xs">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                        <p className="text-green-400 text-sm font-600">✅ Instant download after purchase · No subscription required</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Fallback if no bundles */}
        {!loading && bundles.length === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="reveal-left glass rounded-3xl p-8 relative overflow-hidden" style={{ border: '2px solid rgba(201,168,76,0.4)', boxShadow: '0 0 60px rgba(201,168,76,0.15), 0 0 120px rgba(139,26,26,0.2)' }}>
              <div className="absolute top-4 right-4"><span className="badge-fire text-white">BEST VALUE</span></div>
              <div className="mb-6">
                <h3 className="font-display font-900 text-2xl text-fg mb-1">Creative Assets Pack</h3>
                <p className="text-fg-dim text-sm">Professional Digital Marketing Content Kit</p>
              </div>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-display font-900 text-6xl text-fg">₹79</span>
                <div className="flex flex-col">
                  <span className="price-strike font-display font-700 text-2xl text-fg-dim">₹1,499</span>
                  <span className="text-green-400 text-xs font-700 uppercase tracking-wider mt-0.5">Save ₹1,420</span>
                </div>
              </div>
              <Link href="/checkout" className="btn-cta animate-pulse-cta w-full flex items-center justify-between px-6 py-4 rounded-2xl text-white font-display font-800 text-xl shadow-cta">
                <span>Buy Now — ₹79</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <p className="text-center text-fg-dim text-xs mt-3">🔒 Secure payment · ⚡ Instant access · 🌟 No subscription</p>
            </div>
            <div className="reveal-right space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex">{[...Array(5)].map((_, i) => (<svg key={i} viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-accent"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>))}</div>
                <span className="font-display font-700 text-fg text-sm">4.9/5 from 2,800+ buyers</span>
              </div>
              {testimonials.map((t, i) => (
                <div key={i} className="glass rounded-2xl p-5 border-gold card-hover" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-display font-800 text-sm text-fg" style={{ background: 'linear-gradient(135deg, #8B1A1A, #C9A84C)' }}>{t.avatar}</div>
                    <div>
                      <div className="font-display font-700 text-fg text-sm">{t.name}</div>
                      <div className="text-fg-dim text-xs">{t.handle} · {t.followers}</div>
                    </div>
                  </div>
                  <p className="text-fg-muted text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingSection;