import React, { Suspense } from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/index.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import Script from 'next/script';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://reelstore.vercel.app'),
  title: 'ReelStore — 500+ AI Hybrid Reels Bundle at ₹79',
  description: 'Buy 500+ ready-made AI hybrid Instagram reels for just ₹79. No watermark, HD quality, instant download. Perfect for content creators and businesses.',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        {children}
      </body>
    </html>
  );
}