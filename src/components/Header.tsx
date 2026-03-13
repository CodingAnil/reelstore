'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-bg/95 backdrop-blur-xl border-b border-accent/10 shadow-maroon'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/homepage" className="flex items-center gap-2 group">
          <AppLogo size={32} />
          <span className="font-display font-800 text-lg tracking-tight text-gold shimmer-text hidden sm:block">
            ReelStore
          </span>
        </Link>

        {/* CTA */}
        <Link
          href="/checkout"
          className="btn-cta animate-pulse-cta px-5 py-2.5 rounded-full text-white font-display font-700 text-sm tracking-wide"
        >
          Get Bundle ₹79
        </Link>
      </div>
    </header>
  );
};

export default Header;