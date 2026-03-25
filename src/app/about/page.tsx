'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg text-fg overflow-x-hidden">
      <Header />
      <main className="pt-32 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="font-display font-900 text-4xl sm:text-6xl text-gold mb-8 text-center sm:text-left">
          About ReelStore
        </h1>
        <p className="text-fg-muted mb-12 text-center sm:text-left">
          Fueling the next generation of social media creators with premium AI-powered video content.
        </p>

        <section className="space-y-16">
          <div className="p-8 rounded-3xl bg-secondary/10 border border-accent/20">
            <h2 className="text-accent text-3xl font-900 mb-6">Our Mission</h2>
            <p className="text-fg-dim text-lg leading-relaxed mb-6">
              In a world where attention is the new currency, ReelStore aims to simplify content creation by providing high-quality, viral-ready AI hybrid reels. Our content is curated specifically for creator economy growth.
            </p>
            <p className="text-fg-dim text-lg leading-relaxed">
              We empower influencers, marketers, and businesses to build massive audiences without spending hours on video production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
            <div className="space-y-4">
              <div className="text-gold text-4xl font-900">5,000+</div>
              <p className="text-fg-muted font-800 uppercase tracking-widest text-sm">Customers Served</p>
            </div>
            <div className="space-y-4">
              <div className="text-gold text-4xl font-900">100+</div>
              <p className="text-fg-muted font-800 uppercase tracking-widest text-sm">Categories Added</p>
            </div>
            <div className="space-y-4">
              <div className="text-gold text-4xl font-900">₹79</div>
              <p className="text-fg-muted font-800 uppercase tracking-widest text-sm">Most Affordable Bundle</p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-maroon-gradient border border-accent/20 relative overflow-hidden">
            <h2 className="text-white text-3xl font-900 mb-6 font-display">Why Choose Us?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              <div className="flex gap-4">
                <div className="text-accent text-2xl font-900">01</div>
                <div className="space-y-1">
                  <h4 className="text-gold font-800 text-lg uppercase tracking-tight">No Watermarks</h4>
                  <p className="text-fg-dim text-sm">All our reels are high-definition and completely watermark-free for professional look.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-accent text-2xl font-900">02</div>
                <div className="space-y-1">
                  <h4 className="text-gold font-800 text-lg uppercase tracking-tight">Instant Download</h4>
                  <p className="text-fg-dim text-sm">No waiting. Get access to your downloads immediately after payment.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-accent text-2xl font-900">03</div>
                <div className="space-y-1">
                  <h4 className="text-gold font-800 text-lg uppercase tracking-tight">AI Curated</h4>
                  <p className="text-fg-dim text-sm">Each reel is generated using state-of-the-art AI tools for maximum engagement.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-accent text-2xl font-900">04</div>
                <div className="space-y-1">
                  <h4 className="text-gold font-800 text-lg uppercase tracking-tight">Secure Payments</h4>
                  <p className="text-fg-dim text-sm">We partner with leading payment gateways like Razorpay for secure transactions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
