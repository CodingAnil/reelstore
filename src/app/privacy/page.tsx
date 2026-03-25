'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg text-fg overflow-x-hidden">
      <Header />
      <main className="pt-32 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="font-display font-900 text-4xl sm:text-6xl text-gold mb-8 text-center sm:text-left">
          Privacy Policy
        </h1>
        <p className="text-fg-muted mb-12">Last Updated: March 25, 2026</p>

        <section className="space-y-10 prose prose-invert prose-gold max-w-none">
          <div>
            <h2 className="text-accent text-2xl font-800 mb-4">1. Information We Collect</h2>
            <p className="text-fg-dim leading-relaxed">
              We collect information that you provide directly to us when you make a purchase. This
              includes:
            </p>
            <ul className="list-disc pl-5 text-fg-dim space-y-2 mt-4">
              <li>Contact information (email address and phone number).</li>
              <li>Billing details (name and payment transaction ID).</li>
              <li>Order history and download logs.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-accent text-2xl font-800 mb-4">2. How We Use Your Data</h2>
            <p className="text-fg-dim leading-relaxed">
              We use the collected data for the following purposes:
            </p>
            <ul className="list-disc pl-5 text-fg-dim space-y-2 mt-4">
              <li>To deliver the digital assets to your email after purchase.</li>
              <li>To provide customer support and troubleshoot access issues.</li>
              <li>To comply with legal and financial obligations (tax and audit).</li>
              <li>To notify you of updates or new bundles if you have opted in.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-accent text-2xl font-800 mb-4">
              3. Data Sharing with Third Parties
            </h2>
            <p className="text-fg-dim leading-relaxed">
              We do not sell your personal information. We share your data only with service
              providers strictly necessary for our business operations:
            </p>
            <ul className="list-disc pl-5 text-fg-dim space-y-2 mt-4">
              <li>
                <strong>Razorpay:</strong> Our payment processing partner handles all
                payment-related data securely.
              </li>
              <li>
                <strong>Supabase:</strong> Used for database storage and authentication.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-accent text-2xl font-800 mb-4">4. Cookies and Tracking</h2>
            <p className="text-fg-dim leading-relaxed">
              We use essential cookies to manage your login session and anonymous analytics (via
              Google Analytics) to improve our website experience. You can disable cookies in your
              browser settings, but some features may not function correctly.
            </p>
          </div>

          <div>
            <h2 className="text-accent text-2xl font-800 mb-4">5. Your Rights</h2>
            <p className="text-fg-dim leading-relaxed">
              You have the right to request access to the data we hold about you or request its
              deletion. For any such requests, please DM us on Instagram at{' '}
              <a href="https://www.instagram.com/ai_creatures_01?igsh=MWphYWdtajBtcWh3ag==" className="text-gold hover:underline">@ai_creatures_01</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
