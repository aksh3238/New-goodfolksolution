import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';

interface TermsPageProps {
  onNavigate: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
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
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-xs font-mono uppercase text-slate-500 font-semibold tracking-wider">
            Terms of Service
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#123578] tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-xs text-slate-400 mt-2 font-mono">
          Last Updated: January 2026 · Goodfolk Solution (goodfolksolution.in)
        </p>

        <div className="mt-8 prose prose-slate max-w-none space-y-6 text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-heading font-bold text-[#123578]">1. Agreement to Terms</h2>
            <p>
              By accessing goodfolksolution.in and engaging Goodfolk Solution for branding, advertising, creative design, video production, or digital marketing services, you agree to be bound by these Terms & Conditions and any mutually executed Statement of Work (SOW).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-heading font-bold text-[#123578]">2. Creative Engagements & Proposals</h2>
            <p>
              All project quotes, milestones, and deliverable lists are outlined in custom proposals. Work commences exclusively upon confirmation of scope and receipt of the agreed advance payment milestone.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-heading font-bold text-[#123578]">3. Intellectual Property Rights</h2>
            <p>
              Upon final settlement of all agreed project dues, all final approved deliverables (such as vector logos, master packaging dielines, and finalized creative files) are transferred to the client. Goodfolk Solution retains the right to display completed, publicly released work in our portfolio, unless a formal non-disclosure agreement prevents publication.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-heading font-bold text-[#123578]">4. Concept Projects Notice</h2>
            <p>
              Select visual works presented on this website are illustrative creative concepts crafted by Goodfolk Solution to demonstrate art direction, technical packaging capability, and design standards. These are clearly marked as “Concept Project”.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-heading font-bold text-[#123578]">5. Contact Information</h2>
            <p>
              Direct all inquiries regarding commercial agreements to:
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
