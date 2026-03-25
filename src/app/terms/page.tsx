'use client';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  const email = "startputt2533@gmail.com";
  const phone = "9518002533";

  return (
    <div className="min-h-screen bg-bg text-fg overflow-x-hidden">
      <Header />
      <main className="pt-32 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="font-display font-900 text-4xl sm:text-6xl text-gold mb-8 text-center sm:text-left">
          Terms & Conditions
        </h1>
        <p className="text-fg-muted mb-12 italic">Please read these terms carefully before using ReelStore services. By purchasing, you agree to these legal terms.</p>

        <section className="space-y-10 prose prose-invert prose-gold max-w-none">
          <div>
            <h2 className="text-accent text-2xl font-800 mb-4">1. Licensing & Intellectual Property</h2>
            <p className="text-fg-dim leading-relaxed">
              When you purchase a "Licensed Creative Assets Pack", ReelStore certifies that <span className="text-white font-bold">all content is either AI-generated or licensed for redistribution</span>. We guarantee that no copyrighted material is included in our products that would violate 3rd party IP rights.
              <br /><br />
              <strong>Rights Granted:</strong> We grant you a personal and commercial license to use, edit, and post these assets on social media channels.
              <br /><br />
              <strong>Restrictions:</strong> You may not resell the raw files as a separate bundle or claim yourself as the creator of the AI algorithms used.
            </p>
          </div>

          <div>
            <h2 className="text-accent text-2xl font-800 mb-4 font-bold text-red-400">2. Refund & Cancellation Policy</h2>
            <p className="text-fg-dim leading-relaxed">
              Due to the nature of digital goods, all sales are final. Since our products are delivered instantly via digital download/access link, <span className="text-white font-bold underline">we do not offer refunds or cancellations</span> once the purchase is complete.
              <br /><br />
              If you experience technical issues or accidental duplicate payments, please contact us within 24 hours of purchase at <span className="text-white">{email}</span>.
            </p>
          </div>

          <div>
            <h2 className="text-accent text-2xl font-800 mb-4">3. Delivery Policy</h2>
            <p className="text-fg-dim leading-relaxed">
              A download link or access to the assets will be provided to your email immediately upon successful payment verification. There is no physical shipping involved.
            </p>
          </div>

          <div>
            <h2 className="text-accent text-2xl font-800 mb-4">4. Limitation of Liability</h2>
            <p className="text-fg-dim leading-relaxed">
              ReelStore provides content "as-is" following rigorous licensing checks. However, we are not liable for any secondary account issues resulting from improper social media usage patterns.
            </p>
          </div>

          <div>
            <h2 className="text-accent text-2xl font-800 mb-4">5. Governing Law</h2>
            <p className="text-fg-dim leading-relaxed">
              These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in <span className="text-white">Gurugram, Haryana</span>.
            </p>
          </div>

          <div>
            <h2 className="text-accent text-2xl font-800 mb-4">6. Contact Information</h2>
            <p className="text-fg-dim leading-relaxed">
              For any legal queries, please reach out to us at <span className="text-white">{email}</span> or Phone: <span className="text-white">{phone}</span>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
