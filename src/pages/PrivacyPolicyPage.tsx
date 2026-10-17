import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#123578] hover:text-[#ED650B] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#123578] flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <span className="text-xs font-mono uppercase text-slate-500 font-semibold tracking-wider">
            Legal & Compliance
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#123578] tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400 mt-2 font-mono">
          Last Updated: January 2026 · Goodfolk Solution (goodfolksolution.in)
        </p>

        <div className="mt-8 prose prose-slate max-w-none space-y-6 text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-heading font-bold text-[#123578]">1. Introduction</h2>
            <p>
              Goodfolk Solution (“we,” “our,” or “us”) operates the website <strong>goodfolksolution.in</strong>. This Privacy Policy informs you of our policies regarding the collection, use, and disclosure of personal data when you visit our website, submit project briefs, or communicate with our creative agency.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-heading font-bold text-[#123578]">2. Information We Collect</h2>
            <p>
              When you submit an enquiry form or contact us via WhatsApp, email, or Instagram, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your full name and professional title</li>
              <li>Business email address</li>
              <li>Company or brand name</li>
              <li>Mobile phone number (including country code)</li>
              <li>Project scope, budget parameters, and creative specifications</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-heading font-bold text-[#123578]">3. How We Use Your Information</h2>
            <p>
              We use your submitted information exclusively to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Review and respond to your project enquiry</li>
              <li>Prepare tailored proposals, scopes of work, and quotations</li>
              <li>Coordinate communication during active creative projects</li>
              <li>Comply with statutory and accounting requirements</li>
            </ul>
            <p>
              We never sell, rent, or trade your personal information to third parties for marketing purposes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-heading font-bold text-[#123578]">4. Confidentiality of Client Concepts</h2>
            <p>
              We treat all submitted briefs, unreleased brand ideas, product concepts, and business documents as strictly confidential. Non-disclosure agreements (NDAs) are available upon request prior to detailed creative sharing.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-heading font-bold text-[#123578]">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to request data deletion, contact us at:
            </p>
            <p className="font-mono text-xs text-[#123578]">
              Email: akshay@goodfolksolution.in<br />
              WhatsApp: +91 9817961412
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
