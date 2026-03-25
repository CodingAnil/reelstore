'use client';
import React, { useEffect, useRef, useState } from 'react';
import { categoryService, Category } from '@/lib/services/reelstoreService';

// Fallback colors for category cards
const cardColors = [
  'from-red-900/80',
  'from-blue-900/80',
  'from-purple-900/80',
  'from-orange-900/80',
  'from-green-900/80',
  'from-cyan-900/80',
  'from-pink-900/80',
  'from-indigo-900/80',
];

// Fallback images for categories without images
const fallbackImages = [
  'https://img.rocket.new/generatedImages/rocket_gen_img_1857071c7-1766557986386.png',
  'https://img.rocket.new/generatedImages/rocket_gen_img_1d2a5df5e-1772104062718.png',
  'https://img.rocket.new/generatedImages/rocket_gen_img_17d9f8575-1767889563313.png',
  'https://img.rocket.new/generatedImages/rocket_gen_img_1aceaff56-1772149425437.png',
  'https://images.unsplash.com/photo-1560742457-750888333fdc',
  'https://img.rocket.new/generatedImages/rocket_gen_img_17b14c53b-1772868427810.png',
];

const BundleCategories: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService.getActiveCategories().then((data) => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const reveals = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [categories]);

  // Bento grid spans based on index
  const getSpan = (i: number, total: number) => {
    if (i === 0) return 'col-span-6 md:col-span-4 row-span-2';
    if (total <= 3) return 'col-span-6 md:col-span-4';
    if (i === total - 1 && total % 2 !== 0) return 'col-span-12 md:col-span-4';
    return 'col-span-6 md:col-span-4';
  };

  const getAspectRatio = (i: number) => (i === 0 ? '3/4' : '4/3');

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 reveal">
        <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-1.5 mb-4">
          <span className="text-accent text-xs font-display font-700 uppercase tracking-widest">🎬 What&apos;s Inside</span>
        </div>
        <h2 className="font-display font-900 text-3xl sm:text-5xl text-fg tracking-tight mb-4">
          <span className="text-gold">{loading ? '...' : `${categories.length} Assets Categories`}</span>
          <br />
          <span className="text-fg-muted font-400 text-2xl sm:text-3xl">All in One Assets Pack</span>
        </h2>
        <p className="text-fg-dim text-base sm:text-lg max-w-xl mx-auto">
          From AI creatures to cyberpunk cities — every category of viral content is included.
        </p>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="grid grid-cols-12 gap-3 sm:gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`${i === 0 ? 'col-span-6 md:col-span-4 row-span-2' : 'col-span-6 md:col-span-4'} rounded-2xl bg-primary/10 animate-pulse`} style={{ aspectRatio: i === 0 ? '3/4' : '4/3' }} />
          ))}
        </div>
      )}

      {/* Bento Grid */}
      {!loading && categories.length > 0 && (
        <div className="grid grid-cols-12 gap-3 sm:gap-4">
          {categories.map((cat, i) => {
            const color = cardColors[i % cardColors.length];
            const imgSrc = fallbackImages[i % fallbackImages.length];
            return (
              <div
                key={cat.id}
                className={`${getSpan(i, categories.length)} reveal card-hover relative rounded-2xl overflow-hidden cursor-pointer group`}
                style={{ aspectRatio: getAspectRatio(i), transitionDelay: `${i * 80}ms`, border: '1px solid rgba(201,168,76,0.15)' }}
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <img src={imgSrc} alt={`${cat.name} category preview`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${color} to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300`} />
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="font-display font-800 text-fg text-base sm:text-lg leading-tight">{cat.name}</div>
                  <div className="text-accent text-xs font-700 uppercase tracking-widest mt-1">{cat.reelsCount}+ Reels</div>
                  {cat.description && (
                    <div className="text-fg-dim text-xs mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{cat.description}</div>
                  )}
                </div>
                {/* Hover play indicator */}
                {cat.demoVideoUrl && (
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href={cat.demoVideoUrl} target="_blank" rel="noopener noreferrer" className="glass-gold rounded-full w-8 h-8 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-accent">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Empty state */}
      {!loading && categories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-fg-dim text-base">Categories coming soon...</p>
        </div>
      )}
    </section>
  );
};

export default BundleCategories;