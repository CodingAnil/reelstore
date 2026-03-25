import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-accent/10 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo + Links */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <AppLogo size={28} />
            <span className="font-display font-700 text-sm text-accent">ReelStore</span>
          </div>
          <nav className="flex items-center gap-5">
            <Link
              href="/homepage"
              className="text-fg-dim text-sm font-medium hover:text-fg transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-fg-dim text-sm font-medium hover:text-fg transition-colors"
            >
              About
            </Link>
            <Link
              href="/admin-dashboard"
              className="text-fg-dim text-sm font-medium hover:text-fg transition-colors"
            >
              Admin
            </Link>
          </nav>
        </div>

        {/* Copyright & Legal */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-2 text-fg-dim text-[11px] sm:text-xs">
          <span>© 2026 ReelStore</span>
          <span className="hidden sm:inline text-accent/30">·</span>
          <Link href="/contact" className="hover:text-fg transition-colors">Contact</Link>
          <span className="text-accent/30">·</span>
          <Link href="/privacy" className="hover:text-fg transition-colors">Privacy</Link>
          <span className="text-accent/30">·</span>
          <Link href="/terms" className="hover:text-fg transition-colors">Terms</Link>
          <span className="text-accent/30">·</span>
          <Link href="/refund" className="hover:text-fg transition-colors">Refund</Link>
          <span className="text-accent/30">·</span>
          <Link href="/delivery" className="hover:text-fg transition-colors">Delivery</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
