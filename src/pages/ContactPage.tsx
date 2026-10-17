import React, { useState } from 'react';
import { EnquiryForm } from '../components/EnquiryForm';
import { Mail, MessageCircle, Instagram, ChevronDown, CheckCircle2, Clock } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
  onOpenContactModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  onOpenContactModal: _onOpenContactModal,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const nextSteps = [
    {
      num: '1',
      title: 'We review your enquiry',
      desc: 'Our team examines your brief, deliverables, and brand context to assess fit and scope.',
    },
    {
      num: '2',
      title: 'We clarify requirements',
      desc: 'We schedule a quick discovery call or send targeted clarifying questions via email/WhatsApp.',
    },
    {
      num: '3',
      title: 'We prepare a quotation and timeline',
      desc: 'You receive a detailed scope document with deliverables, milestones, and commercial terms.',
    },
    {
      num: '4',
      title: 'Work begins',
      desc: 'Work begins after scope, deliverables, and payment terms are mutually agreed.',
    },
  ];

  const contactFaqs = [
    {
      q: 'What information should I include in my enquiry?',
      a: 'The more context you can share, the faster we can assist you. Helpful details include: your current brand stage (startup vs established), primary objectives, deliverables needed (e.g., logo, packaging, 5 ad creatives, social management), approximate timeline, and links to any reference aesthetics you admire.',
    },
    {
      q: 'How do you determine project pricing?',
      a: 'We price projects based on the scope, complexity, and number of deliverables required. For example, a single label packaging design involves different creative depth than a full 10-SKU brand architecture rollout. We do not use arbitrary flat rates; every quotation is tailored specifically to your project requirements.',
    },
    {
      q: 'Do you require an advance payment?',
      a: 'Yes. All project engagements require an agreed advance payment milestone before strategic and design work commences, followed by milestone-based or final approval payments as stipulated in the agreed project agreement.',
    },
    {
      q: 'Can I discuss multiple services in one enquiry?',
      a: 'Absolutely. Many of our clients collaborate across branding, digital assets, and performance creatives simultaneously. Simply select your primary need in the dropdown and detail all desired scopes in the Project Details text field.',
    },
    {
      q: 'Do you work with international clients?',
      a: 'Yes, we frequently partner with clients globally. We handle remote discovery sessions, digital asset reviews, and international payment processing seamlessly.',
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="pt-16 pb-16 bg-gradient-to-b from-white to-[#F7F7F5] border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#123578] bg-slate-100 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#ED650B]" />
            Direct Consultation
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-[#123578] tracking-tight">
            Let's Start a Conversation.
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Tell us about your project, your goals and what you need help creating. We'll use the details to understand your requirements and plan the next step.
          </p>
        </div>
      </section>

      {/* Main Grid: Form on Left/Right, Contact Info on other */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Info & What Happens Next */}
            <div className="lg:col-span-5 space-y-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#123578] tracking-tight">
                  Get in Touch
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Have an urgent requirement or prefer a quick direct chat? Reach out directly via our verified channels.
                </p>
              </div>

              {/* Direct Communication Channels */}
              <div className="space-y-4">
                {/* Email */}
                <a
                  href="mailto:akshay@goodfolksolution.in"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#F7F7F5] border border-slate-200 hover:border-[#123578] transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#123578] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Business Email
                    </div>
                    <div className="text-sm font-semibold text-slate-900 font-mono group-hover:text-[#123578] transition-colors">
                      akshay@goodfolksolution.in
                    </div>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919817961412?text=Hi%20Goodfolk%20Solution%2C%20I'd%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#F7F7F5] border border-slate-200 hover:border-emerald-500 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      WhatsApp Direct
                    </div>
                    <div className="text-sm font-semibold text-slate-900 font-mono group-hover:text-emerald-700 transition-colors">
                      +91 9817961412
                    </div>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/goodfolksolution/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#F7F7F5] border border-slate-200 hover:border-pink-500 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Official Instagram
                    </div>
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-pink-700 transition-colors">
                      @goodfolksolution
                    </div>
                  </div>
                </a>
              </div>

              {/* What Happens Next Card */}
              <div className="p-6 rounded-2xl bg-[#123578]/5 border border-[#123578]/10 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold font-heading uppercase text-[#123578] tracking-wider">
                  <Clock className="w-4 h-4 text-[#ED650B]" />
                  What Happens Next?
                </div>
                <div className="space-y-3.5">
                  {nextSteps.map((step) => (
                    <div key={step.num} className="flex items-start gap-3 text-xs sm:text-sm">
                      <span className="w-5 h-5 rounded-full bg-[#123578] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {step.num}
                      </span>
                      <div>
                        <div className="font-semibold text-slate-900">{step.title}</div>
                        <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Full Comprehensive Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="mb-4">
                <h3 className="font-heading font-extrabold text-2xl text-[#123578]">
                  Project Brief & Quotation Request
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill in your requirements below. Fields marked with <span className="text-[#ED650B] font-bold">*</span> are required.
                </p>
              </div>

              <EnquiryForm
                isCompact={false}
                onNavigateToPrivacy={() => onNavigate('/privacy')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-[#F7F7F5] border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#123578] tracking-tight">
              Enquiry & Pricing FAQs
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Common questions about proposals, billing, and project initiation.
            </p>
          </div>

          <div className="space-y-4">
            {contactFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading font-bold text-base text-[#123578] pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#ED650B]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
