'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DeliveryPage() {
  const email = "startputt2533@gmail.com";
  const phone = "9518002533";

  return (
    <div className="min-h-screen bg-bg text-fg overflow-x-hidden">
      <Header />
      <main className="pt-32 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="font-display font-900 text-4xl sm:text-6xl text-gold mb-8 text-center sm:text-left">
          Delivery Policy
        </h1>
        <p className="text-fg-muted mb-12 italic">Last Updated: March 25, 2026</p>

        <section className="space-y-10 prose prose-invert prose-gold max-w-none">
          <div>
            <h2 className="text-accent text-2xl font-800 mb-4">1. Digital Delivery Only</h2>
            <p className="text-fg-dim leading-relaxed">
              At ReelStore, <span className="text-white font-bold underline">there is NO PHYSICAL SHIPPING</span> of any products. All "Creative Assets Packs" are delivered strictly through electronic means.
              <br /><br />
              This ensures that our customers have secure, instant access to our digital content worldwide.
            </p>
          </div>

          <div>
            <h2 className="text-accent text-2xl font-800 mb-4">2. Immediate Fulfillment</h2>
            <p className="text-fg-dim leading-relaxed">
              Upon successful payment and verification through our secure payment gateway (Razorpay), a download link or access portal details will be delivered to your registered email address <span className="text-white font-bold tracking-widest uppercase">INSTANTLY</span>.
              <br /><br />
              While most orders are fulfilled within seconds, in some cases it may take up to 4 hours to appear in your Inbox. Please check your junk/spam folder as well.
            </p>
          </div>

          <div>
            <h2 className="text-accent text-2xl font-800 mb-4">3. Non-Delivery Clause</h2>
            <p className="text-fg-dim leading-relaxed">
              If you have not received your download link within 6 hours of payment, please contact us at <span className="text-white font-bold">{email}</span> or Phone: <span className="text-white font-bold">{phone}</span> with your Transaction ID, and we will manually resend the assets immediately.
            </p>
          </div>

          <div>
            <h2 className="text-accent text-2xl font-800 mb-4 font-bold text-accent italic">4. Accessibility & Compatibility</h2>
            <p className="text-fg-dim leading-relaxed">
              Downloads are provided in standard formats (e.g., MP4/MOV) and compressed directories. You are responsible for having appropriate software (e.g., WinRAR, 7-zip) to access the assets on your device.
              <br /><br />
              The link remains active for <span className="text-white">Lifetime Access</span> unless otherwise specified at the time of purchase.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
