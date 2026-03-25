'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const instagramUrl = "https://www.instagram.com/ai_creatures_01?igsh=MWphYWdtajBtcWh3ag==";
  const instagramId = "@ai_creatures_01";
  const email = "startputt2533@gmail.com";
  const phone = "+91-9518002533";

  return (
    <div className="min-h-screen bg-bg text-fg overflow-x-hidden">
      <Header />
      <main className="pt-32 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="font-display font-900 text-4xl sm:text-6xl text-gold mb-8 text-center sm:text-left">
          Contact Us
        </h1>
        <p className="text-fg-muted mb-12 text-center sm:text-left max-w-2xl">
          Have questions about our Licensed Creative Assets Pack? Our support team is here to help you 24/7.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 px-2">
          {/* Email Card */}
          <div className="p-8 rounded-3xl bg-secondary/10 border border-accent/20 flex flex-col items-center justify-center text-center group card-hover">
            <div className="bg-accent/10 p-4 rounded-full mb-6 group-hover:bg-accent/20 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-8 h-8 text-accent">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h2 className="text-xl font-800 text-white mb-2">Support Email</h2>
            <a href={`mailto:${email}`} className="text-gold font-700 text-lg hover:underline transition-all">
              {email}
            </a>
          </div>

          {/* Phone Card */}
          <div className="p-8 rounded-3xl bg-secondary/10 border border-accent/20 flex flex-col items-center justify-center text-center group card-hover">
            <div className="bg-accent/10 p-4 rounded-full mb-6 group-hover:bg-accent/20 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-8 h-8 text-accent">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h2 className="text-xl font-800 text-white mb-2">Phone Support</h2>
            <a href={`tel:${phone.replace(/-/g, '')}`} className="text-gold font-700 text-lg hover:underline transition-all">
              {phone}
            </a>
          </div>

          {/* Instagram Card */}
          <div className="p-8 rounded-3xl bg-secondary/10 border border-accent/20 flex flex-col items-center justify-center text-center group card-hover md:col-span-2">
            <div className="bg-accent/10 p-4 rounded-full mb-6 group-hover:bg-accent/20 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-accent">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <h2 className="text-xl font-800 text-white mb-2">Instagram DM</h2>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-gold font-700 text-lg hover:underline transition-all">
              {instagramId}
            </a>
          </div>
        </div>

        {/* Business Entity Info */}
        <div className="p-10 rounded-3xl bg-maroon-gradient border border-accent/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-500">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32 text-accent">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <h3 className="text-2xl font-900 text-accent mb-4">Business Address</h3>
          <p className="text-fg-muted font-600 text-lg mb-2">ReelStore Technologies</p>
          <p className="text-fg-dim text-base max-w-sm mb-6">
            Plot No. 45, Sector 18,<br />
            Gurugram, Haryana 122015,<br />
            India
          </p>
          <p className="text-fg-dim text-sm italic">
            *Please note: Support is primarily provided via email and phone.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
