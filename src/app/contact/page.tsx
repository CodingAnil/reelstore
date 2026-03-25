'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const instagramUrl = "https://www.instagram.com/ai_creatures_01?igsh=MWphYWdtajBtcWh3ag==";
  const instagramId = "@ai_creatures_01";

  return (
    <div className="min-h-screen bg-bg text-fg overflow-x-hidden">
      <Header />
      <main className="pt-32 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="font-display font-900 text-4xl sm:text-6xl text-gold mb-8 text-center">
          Contact Us
        </h1>
        <p className="text-fg-muted mb-12 text-center max-w-xl mx-auto">
          For all inquiries, support, and business requests, please reach out to us directly on Instagram.
        </p>

        <div className="flex flex-col items-center">
          {/* Instagram Profile Card */}
          <div className="w-full max-w-md p-10 rounded-[2.5rem] bg-maroon-gradient border border-accent/20 text-center relative overflow-hidden group glow-gold">
            {/* Background elements */}
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-40 h-40 text-accent">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-accent/30 scale-110">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-accent">
                   <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <h2 className="text-3xl font-900 text-white mb-2">{instagramId}</h2>
              <p className="text-fg-dim mb-8">Click below to message us directly on Instagram</p>
              
              <a 
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-bg font-display font-800 text-lg shadow-xl"
              >
                <span>Message on Instagram</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>

              <div className="mt-10 pt-10 border-t border-accent/10">
                <p className="text-fg-muted text-xs font-700 uppercase tracking-widest mb-6">Scan to Follow</p>
                <div className="bg-white/95 p-6 rounded-3xl inline-block shadow-2xl pulse-glow">
                  {/* Placeholder for QR - instructions for user below */}
                  <img 
                    src="/instagram-qr.png" 
                    alt="Instagram QR Code" 
                    className="w-48 h-48 mx-auto"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(instagramUrl);
                    }}
                  />
                  <p className="text-bg text-[10px] font-900 mt-3 tracking-tighter">AI_CREATURES_01</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-fg-dim text-sm italic">
            *Please ensure you follow our account first so we can see your direct messages.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
