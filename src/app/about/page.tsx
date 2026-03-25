'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg text-fg overflow-x-hidden">
      <Header />
      <main className="pt-32 pb-20 px-4 sm:px-6 max-w-4xl mx-auto text-center sm:text-left">
        <h1 className="font-display font-900 text-4xl sm:text-6xl text-gold mb-8">
          About ReelStore Technologies
        </h1>
        <p className="text-fg-muted mb-12 text-lg max-w-2xl">
          Empowering digital creators with premium, licensed creative assets for social media marketing.
        </p>

        <section className="space-y-16">
          <div className="p-8 rounded-3xl bg-secondary/10 border border-accent/20">
            <h2 className="text-accent text-3xl font-900 mb-6">Who We Are</h2>
            <p className="text-fg-dim text-lg leading-relaxed mb-6">
              <span className="text-gold font-700">ReelStore is owned and operated by ANIL.</span> We provide digital content bundles and licensed asset packs for creators and modern marketers.
            </p>
            <p className="text-fg-dim text-lg leading-relaxed mb-6">
              ReelStore Technologies is a premier provider of high-quality digital assets designed for social media enthusiasts. Founded in 2026, we specialize in creating and licensing unique, AI-enhanced visual content that helps brands grow their digital footprint.
            </p>
            <p className="text-fg-dim text-lg leading-relaxed italic">
              "Our goal is to bridge the gap between complex AI generation and ready-to-use marketing assets."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-secondary/10 border border-accent/20">
              <h3 className="text-gold text-2xl font-900 mb-4 tracking-tight">Our Standards</h3>
              <ul className="space-y-3 text-fg-dim">
                <li className="flex gap-2"><span>✅</span> 100% Original AI-Generated Content</li>
                <li className="flex gap-2"><span>✅</span> Full Commercial Redistribution License</li>
                <li className="flex gap-2"><span>✅</span> Rigorous Copyright-Check Filtering</li>
                <li className="flex gap-2"><span>✅</span> Professional HD Quality Standards</li>
              </ul>
            </div>
            
            <div className="p-8 rounded-3xl bg-secondary/10 border border-accent/20">
              <h3 className="text-gold text-2xl font-900 mb-4 tracking-tight">Support Entity</h3>
              <p className="text-fg-dim text-sm mb-4">
                We operate as a digital content distribution platform, ensuring every asset sold our platform is verified for safe commercial usage by individual creators and agencies.
              </p>
              <div className="flex flex-col text-xs text-fg-muted uppercase tracking-widest gap-1">
                <span>Registration: Registered Digital Business</span>
                <span>Support Level: 24/7 Priority Email</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-maroon-gradient border border-accent/20 relative overflow-hidden">
             <div className="relative z-10">
              <h2 className="text-white text-3xl font-900 mb-6 font-display">Transparency & Ethics</h2>
              <p className="text-fg-dim text-lg leading-relaxed">
                At ReelStore, transparency is our core value. We ensure that all our "Creative Assets Packs" are clearly labeled regarding their AI-origin and licensing terms. We work closely with payment partners like Razorpay to maintain the highest standards of financial integrity and customer satisfaction.
              </p>
             </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
