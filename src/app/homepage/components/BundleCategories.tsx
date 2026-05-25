'use client';

import React from 'react';
import AppImage from '@/components/ui/AppImage';
import { ASSET_CATEGORIES_STATIC } from '@/app/homepage/data/categoriesData';

const cardGradients = [
  'from-red-950/85',
  'from-violet-950/85',
  'from-amber-950/85',
  'from-slate-950/85',
  'from-emerald-950/85',
  'from-sky-950/85',
  'from-rose-950/85',
  'from-orange-950/85',
  'from-indigo-950/85',
  'from-lime-950/85',
  'from-cyan-950/85',
  'from-fuchsia-950/85',
];

const BundleCategories: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="text-center mb-12 reveal">
        <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-1.5 mb-4">
          <span className="text-accent text-xs font-display font-700 uppercase tracking-widest">
            🎬 What&apos;s Inside
          </span>
        </div>
        <h2 className="font-display font-900 text-3xl sm:text-5xl text-fg tracking-tight mb-4">
          <span className="text-gold">Assets Categories</span>
          <br />
          <span className="text-fg-muted font-400 text-2xl sm:text-3xl">
            All in One Assets Pack
          </span>
        </h2>
        <p className="text-fg-dim text-base sm:text-lg max-w-xl mx-auto">
          From AI creatures to cyberpunk cities — every category of viral content is included.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {ASSET_CATEGORIES_STATIC.map((cat, i) => {
          const gradient = cardGradients[i % cardGradients.length];
          return (
            <article
              key={cat.id}
              className="reveal card-hover group relative rounded-2xl overflow-hidden cursor-default border border-[rgba(201,168,76,0.15)] bg-primary/5 transition-all duration-300 hover:border-[rgba(201,168,76,0.45)] hover:shadow-[0_0_32px_rgba(201,168,76,0.12)]"
              style={{ transitionDelay: `${Math.min(i, 11) * 50}ms` }}
            >
              <div className="relative aspect-[4/3] w-full">
                <AppImage
                  src={cat.imageUrl}
                  alt={`${cat.name} category preview`}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${gradient} via-primary/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300`}
                />
                <div className="absolute inset-0 ring-0 ring-accent/0 group-hover:ring-1 group-hover:ring-accent/30 transition-all duration-300 rounded-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <h3 className="font-display font-800 text-fg text-lg sm:text-xl leading-tight drop-shadow-sm">
                    {cat.name}
                  </h3>
                  <p className="text-fg-dim text-xs sm:text-sm mt-2 leading-snug line-clamp-2 group-hover:text-fg-muted transition-colors duration-300">
                    {cat.shortDescription}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default BundleCategories;
