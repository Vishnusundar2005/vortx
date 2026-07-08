import { SectionTitle } from '@/components/marketing/SectionTitle';

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24 pb-16 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <SectionTitle title="Privacy Policy" alignment="left" />
        
        <div className="prose prose-invert prose-zinc max-w-none">
          <p className="text-zinc-400">Last updated: July 8, 2026</p>
          
          <h3 className="text-white font-bold mt-8 mb-4">1. Information We Collect</h3>
          <p className="text-zinc-400">
            When you book a session at VORTX Studios, we collect your name, email address, phone number, and booking purpose. This information is necessary to process your booking and communicate with you via WhatsApp regarding your session.
          </p>
          
          <h3 className="text-white font-bold mt-8 mb-4">2. How We Use Your Information</h3>
          <p className="text-zinc-400">
            We use your personal data to:
          </p>
          <ul className="text-zinc-400 list-disc pl-6 space-y-2 mt-2">
            <li>Process and manage your studio booking.</li>
            <li>Send you booking confirmations and updates via WhatsApp.</li>
            <li>Respond to your customer service requests and support needs.</li>
          </ul>

          <h3 className="text-white font-bold mt-8 mb-4">3. Data Sharing and Security</h3>
          <p className="text-zinc-400">
            We do not sell, trade, or rent your personal identification information to others. We employ industry-standard security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information stored on our platform.
          </p>
          
          <h3 className="text-white font-bold mt-8 mb-4">4. Contacting Us</h3>
          <p className="text-zinc-400">
            If you have any questions about this Privacy Policy, please contact us at hello@vortxstudios.com.
          </p>
        </div>
      </div>
    </div>
  );
}
