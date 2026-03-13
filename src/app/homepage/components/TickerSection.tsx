'use client';
import React from 'react';

const items = [
  '🔥 500+ AI Reels',
  '⚡ Instant Download',
  '✅ No Watermark',
  '🎬 HD Quality',
  '📱 Instagram Ready',
  '🌟 Non-Copyrighted',
  '💎 Lifetime Access',
  '🚀 Post-Ready Content',
  '🎯 Viral-Ready Reels',
  '🔥 500+ AI Reels',
  '⚡ Instant Download',
  '✅ No Watermark',
  '🎬 HD Quality',
  '📱 Instagram Ready',
  '🌟 Non-Copyrighted',
  '💎 Lifetime Access',
  '🚀 Post-Ready Content',
  '🎯 Viral-Ready Reels',
];

const TickerSection: React.FC = () => {
  return (
    <div
      className="py-4 overflow-hidden border-y"
      style={{ borderColor: 'rgba(201,168,76,0.2)', background: 'rgba(139,26,26,0.15)' }}
    >
      <div className="ticker-wrap">
        <div className="inline-flex animate-ticker">
          {items.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-6 text-accent font-display font-700 text-sm uppercase tracking-widest whitespace-nowrap">
              {item}
              <span className="text-primary-light opacity-60">◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TickerSection;