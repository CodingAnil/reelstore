'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RefundPage() {
  const email = "startputt2533@gmail.com";
  const phone = "9518002533";

  return (
    <div className="min-h-screen bg-bg text-fg overflow-x-hidden">
      <Header />
      <main className="pt-32 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="font-display font-900 text-4xl sm:text-6xl text-gold mb-8 text-center sm:text-left">
          Refund & Cancellation
        </h1>
        <p className="text-fg-muted mb-12 italic">Last Updated: March 25, 2026</p>

        <section className="space-y-10 prose prose-invert prose-gold max-w-none">
          <div>
            <h2 className="text-accent text-2xl font-800 mb-4">1. Digital Goods Non-Refundability</h2>
            <p className="text-fg-dim leading-relaxed">
              At ReelStore, we offer intangible and irrevocable digital goods ("Creative Assets Pack"). As such, we <span className="text-white font-bold underline text-lg">DO NOT OFFER REFUNDS</span> once the order is finalized and the product access link is delivered.
              <br /><br />
              By purchasing, you acknowledge and agree that you will not be entitled to any refund or cancellation under any circumstances.
            </p>
          </div>

          <div>
            <h2 className="text-accent text-2xl font-800 mb-4">2. Duplicate Payments</h2>
            <p className="text-fg-dim leading-relaxed">
              If a customer accidentally pays twice for the same account and can provide proof of two separate transaction IDs, we will process a refund for the duplicate transaction within 5-7 business days.
            </p>
          </div>

          <div>
            <h2 className="text-accent text-2xl font-800 mb-4">3. Cancellation Policy</h2>
            <p className="text-fg-dim leading-relaxed">
              Since our assets are delivered instantly, we do not support any cancellation requests after the transaction has been successfully processed by our payment gateway.
            </p>
          </div>

          <div>
            <h2 className="text-accent text-2xl font-800 mb-4">4. Support & Queries</h2>
            <p className="text-fg-dim leading-relaxed">
              If you observe any issues with the delivered assets, please contact us within 24 hours of purchase. Our team will assist in troubleshooting the access link or resending the assets.
              <br /><br />
              <strong>Contact Email:</strong> <span className="text-white">{email}</span><br />
              <strong>Contact Phone:</strong> <span className="text-white">{phone}</span>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
