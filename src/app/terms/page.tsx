'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg text-fg overflow-x-hidden">
      <Header />
      <main className="pt-32 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="font-display font-900 text-4xl sm:text-6xl text-gold mb-8 text-center sm:text-left">
          Terms & Conditions
        </h1>
        <p className="text-fg-muted mb-12 italic">
          Please read these terms carefully before using ReelStore services. By purchasing, you
          agree to these legal terms.
        </p>

        <section className="space-y-10 prose prose-invert prose-gold max-w-none">
          <div>
            <h2 className="text-accent text-2xl font-800 mb-4">1. License for Digital Content</h2>
            <p className="text-fg-dim leading-relaxed">
              When you purchase a ReelStore bundle, we grant you a personal, non-exclusive,
              non-transferable license to download and use the content for your social media
              channels or personal projects.
              <br />
              <br />
              <strong>Restrictions:</strong> You may not resell, redistribute, or sub-license the
              raw video files or AI generated content. You also may not claim the reels as your own
              original creations to be sold as stock footage.
            </p>
          </div>

          <div>
            <h2 className="text-accent text-2xl font-800 mb-4 font-bold text-red-400">
              2. Refund & Cancellation Policy
            </h2>
            <p className="text-fg-dim leading-relaxed">
              Due to the nature of digital goods, all sales are final. Since our products are
              delivered instantly via digital download,{' '}
              <span className="text-white font-bold underline">
                we do not offer refunds or cancellations
              </span>{' '}
              once the purchase is complete.
              <br />
              <br />
              If you experience technical issues or accidental duplicate payments, please contact us
              within 24 hours of purchase.
            </p>
          </div>

          <div>
            <h2 className="text-accent text-2xl font-800 mb-4">3. Limitation of Liability</h2>
            <p className="text-fg-dim leading-relaxed">
              ReelStore provides content "as-is" without any warranties. We are not responsible for
              any copyright claims or account bans resulting from the use of the reels on
              third-party platforms like Instagram or YouTube.
            </p>
          </div>

          <div>
            <h2 className="text-accent text-2xl font-800 mb-4">4. Intellectual Property</h2>
            <p className="text-fg-dim leading-relaxed">
              All branding, designs, and content on this site (unless specified otherwise) are the
              property of ReelStore. You may not copy or mirror any part of our website or branding
              for your own projects.
            </p>
          </div>

          {/* <div>
            <h2 className="text-accent text-2xl font-800 mb-4">5. Governing Law</h2>
            <p className="text-fg-dim leading-relaxed">
              These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in <span className="text-white">Bangalore, Karnataka</span>.
            </p>
          </div> */}

          <div>
            <h2 className="text-accent text-2xl font-800 mb-4">5. Contact Information</h2>
            <p className="text-fg-dim leading-relaxed">
              For any legal or support queries, please reach out to us at{' '}
              <a href="https://www.instagram.com/ai_creatures_01?igsh=MWphYWdtajBtcWh3ag==" className="text-gold hover:underline">@ai_creatures_01</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
