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
        <div className="flex flex-col items-center sm:items-end gap-3 text-fg-dim text-[11px] sm:text-xs">
          <div className="text-center sm:text-right">
            <div className="font-700 text-fg">© 2026 ReelStore. All rights reserved.</div>
            <div className="text-accent/80 font-800 tracking-wider text-[10px] uppercase mt-1">
              Owned & operated by ANIL
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-2">
            <Link href="/contact" className="hover:text-fg transition-colors">
              Contact
            </Link>
            <span className="text-accent/30">·</span>
            <Link href="/privacy" className="hover:text-fg transition-colors">
              Privacy
            </Link>
            <span className="text-accent/30">·</span>
            <Link href="/terms" className="hover:text-fg transition-colors">
              Terms
            </Link>
            <span className="text-accent/30">·</span>
            <Link href="/refund" className="hover:text-fg transition-colors">
              Refund
            </Link>
            <span className="text-accent/30">·</span>
            <Link href="/delivery" className="hover:text-fg transition-colors">
              Delivery
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
