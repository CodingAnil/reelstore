'use client';
import React, { useState, useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const demos = [
{
  id: 1,
  title: 'Godzilla vs Dragon',
  category: 'AI Creatures',
  views: '2.4M',
  thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
  alt: 'Godzilla vs Dragon AI reel thumbnail',
  duration: '0:15'
},
{
  id: 2,
  title: 'Iron Mech Battle',
  category: 'Sci-Fi',
  views: '1.8M',
  thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
  alt: 'Iron mech battle AI reel thumbnail',
  duration: '0:12'
},
{
  id: 3,
  title: 'Ancient Forest Spirit',
  category: 'Fantasy',
  views: '3.1M',
  thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  alt: 'Ancient forest spirit fantasy reel',
  duration: '0:18'
},
{
  id: 4,
  title: 'Cyberpunk City Chase',
  category: 'Urban',
  views: '1.2M',
  thumbnail: "https://images.unsplash.com/photo-1519608487953-e999c86e7455",
  alt: 'Cyberpunk city chase reel',
  duration: '0:14'
},
{
  id: 5,
  title: 'Dragon Fire Storm',
  category: 'Fantasy',
  views: '4.7M',
  thumbnail: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e",
  alt: 'Dragon fire storm fantasy reel',
  duration: '0:16'
},
{
  id: 6,
  title: 'Space Titan War',
  category: 'Sci-Fi',
  views: '2.9M',
  thumbnail: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
  alt: 'Space titan war sci-fi reel',
  duration: '0:13'
}];


const DemoPreview: React.FC = () => {
  const [playing, setPlaying] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Using the shared scroll reveal observer from the parent page

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6" style={{ background: 'linear-gradient(to bottom, #0D0505, #120404, #0D0505)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-1.5 mb-4">
            <span className="text-accent text-xs font-display font-700 uppercase tracking-widest">▶ Demo Previews</span>
          </div>
          <h2 className="font-display font-900 text-3xl sm:text-5xl text-fg tracking-tight mb-3">
            Watch Before You Buy
          </h2>
          <p className="text-fg-dim text-base max-w-lg mx-auto">
            These are actual assets from our collection. What you see is what you get.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {demos.map((demo, i) =>
          <div
            key={demo.id}
            className="reveal relative rounded-2xl overflow-hidden cursor-pointer group card-hover"
            style={{
              aspectRatio: '9/16',
              border: '1px solid rgba(201,168,76,0.15)',
              transitionDelay: `${i * 60}ms`
            }}
            onClick={() => setPlaying(playing === demo.id ? null : demo.id)}>
            
              <AppImage
              src={demo.thumbnail}
              alt={demo.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105" />
            

              {/* Overlay */}
              <div className="video-overlay">
                {/* Play button */}
                <div className={`play-btn transition-all duration-300 ${playing === demo.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {playing === demo.id ?
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg> :

                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                }
                </div>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="font-display font-700 text-fg text-xs sm:text-sm leading-tight">{demo.title}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-accent text-[10px] font-700 uppercase tracking-wider">{demo.category}</span>
                  <span className="text-fg-dim text-[10px]">👁 {demo.views}</span>
                </div>
              </div>

              {/* Duration badge */}
              <div className="absolute top-3 right-3 glass rounded-full px-2 py-0.5">
                <span className="text-fg text-[10px] font-700">{demo.duration}</span>
              </div>

              {/* "Demo" badge */}
              <div className="absolute top-3 left-3">
                <span className="badge-fire text-white text-[9px]">DEMO</span>
              </div>
            </div>
          )}
        </div>

        {/* CTA below */}
        <div className="text-center mt-10 reveal">
          <p className="text-fg-muted text-sm mb-4">
            These are just 6 out of <span className="text-accent font-700">30,000+ assets</span> in the pack
          </p>
          <a
            href="/checkout"
            className="btn-cta inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-display font-800 text-lg shadow-cta">
            
            <span>Get Full Assets Pack for ₹79</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>);

};

export default DemoPreview;