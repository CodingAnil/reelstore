'use client';
import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const categories = [
{
  title: 'AI Creatures',
  count: '120+ Reels',
  img: "https://img.rocket.new/generatedImages/rocket_gen_img_1857071c7-1766557986386.png",
  alt: 'AI generated creature reel',
  color: 'from-red-900/80',
  span: 'col-span-6 md:col-span-4 row-span-2',
  size: 'large'
},
{
  title: 'Sci-Fi & Robots',
  count: '90+ Reels',
  img: "https://img.rocket.new/generatedImages/rocket_gen_img_1d2a5df5e-1772104062718.png",
  alt: 'Sci-fi robot reel preview',
  color: 'from-blue-900/80',
  span: 'col-span-6 md:col-span-4',
  size: 'medium'
},
{
  title: 'Fantasy Worlds',
  count: '80+ Reels',
  img: "https://img.rocket.new/generatedImages/rocket_gen_img_17d9f8575-1767889563313.png",
  alt: 'Fantasy world reel preview',
  color: 'from-purple-900/80',
  span: 'col-span-6 md:col-span-4',
  size: 'medium'
},
{
  title: 'Action & Heroes',
  count: '100+ Reels',
  img: "https://img.rocket.new/generatedImages/rocket_gen_img_1aceaff56-1772149425437.png",
  alt: 'Action hero reel preview',
  color: 'from-orange-900/80',
  span: 'col-span-12 md:col-span-4',
  size: 'medium'
},
{
  title: 'Nature & Landscapes',
  count: '70+ Reels',
  img: "https://images.unsplash.com/photo-1560742457-750888333fdc",
  alt: 'Nature landscape reel',
  color: 'from-green-900/80',
  span: 'col-span-6 md:col-span-4',
  size: 'medium'
},
{
  title: 'Urban & Cyberpunk',
  count: '60+ Reels',
  img: "https://img.rocket.new/generatedImages/rocket_gen_img_17b14c53b-1772868427810.png",
  alt: 'Cyberpunk urban reel preview',
  color: 'from-cyan-900/80',
  span: 'col-span-6 md:col-span-4',
  size: 'medium'
}];


const BundleCategories: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 reveal">
        <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-1.5 mb-4">
          <span className="text-accent text-xs font-display font-700 uppercase tracking-widest">🎬 What's Inside</span>
        </div>
        <h2 className="font-display font-900 text-3xl sm:text-5xl text-fg tracking-tight mb-4">
          <span className="text-gold">6 Epic Categories</span>
          <br />
          <span className="text-fg-muted font-400 text-2xl sm:text-3xl">All in One Bundle</span>
        </h2>
        <p className="text-fg-dim text-base sm:text-lg max-w-xl mx-auto">
          From AI creatures to cyberpunk cities — every category of viral content is included.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-3 sm:gap-4">
        {categories.map((cat, i) =>
        <div
          key={i}
          className={`${cat.span} reveal card-hover relative rounded-2xl overflow-hidden cursor-pointer group`}
          style={{
            aspectRatio: cat.size === 'large' ? '3/4' : '4/3',
            transitionDelay: `${i * 80}ms`,
            border: '1px solid rgba(201,168,76,0.15)'
          }}>
          
            <AppImage
            src={cat.img}
            alt={cat.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110" />
          
            {/* Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300`} />
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="font-display font-800 text-fg text-base sm:text-lg leading-tight">{cat.title}</div>
              <div className="text-accent text-xs font-700 uppercase tracking-widest mt-1">{cat.count}</div>
            </div>
            {/* Hover play indicator */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="glass-gold rounded-full w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-accent">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>);

};

export default BundleCategories;