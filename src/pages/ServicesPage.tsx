import React, { useState } from 'react';
import { CreativeVisual } from '../components/CreativeVisuals';
import { Check, ChevronDown, ArrowRight, MessageSquare } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
  onOpenContactModal: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onOpenContactModal,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const detailedServices = [
    {
      id: 'branding-packaging',
      number: '01',
      title: 'Branding & Packaging',
      tagline: 'Distinctive brand identity systems and tactile product packaging.',
      description:
        'We help new and growing brands establish an unmistakable visual signature. From research and wordmark architecture to label design and production-ready packaging dielines, we ensure every consumer touchpoint reinforces quality.',
      capabilities: [
        'Brand identity and visual systems',
        'Logo design and brand applications',
        'Product packaging and label design',
        'Brand consistency across touchpoints',
        'Color palette, typography standards, and brand style guides',
        'Dieline setup and print-ready production files',
      ],
      visualType: 'branding-packaging' as const,
    },
    {
      id: 'creative-design',
      number: '02',
      title: 'Creative Design',
      tagline: 'Multi-format digital and print assets tailored for conversion and engagement.',
      description:
        'High-impact visual creative across every consumer channel. We craft digital assets that elevate your e-commerce storefront, stop feeds on social channels, and maintain crisp brand authority.',
      capabilities: [
        'Social media posts and campaign assets',
        'Amazon A+ content and e-commerce creatives',
        'Website banners and digital assets',
        'Image editing and photo albums',
        'Digital and print design requirements',
        'Editorial lookbooks and presentation decks',
      ],
      visualType: 'creative-design' as const,
    },
    {
      id: 'performance-marketing',
      number: '03',
      title: 'Performance Marketing Creatives',
      tagline: 'Direct-response ad creative designed to capture attention and lower CAC.',
      description:
        'Creative designed specifically for paid channels (Meta, Google, YouTube). We focus on thumb-stopping hooks, clear value props, and multiple visual variations designed for rapid creative testing.',
      capabilities: [
        'Paid advertising creatives',
        'Campaign concepts and visual variations',
        'Product-focused ad layouts',
        'Creative adaptations for different placements (1:1, 9:16, 16:9)',
        'Hook, headline, and body copy coordination',
        'Ad iteration frameworks based on click data',
      ],
      visualType: 'performance-marketing' as const,
    },
    {
      id: 'video-production',
      number: '04',
      title: 'Video Production & Editing',
      tagline: 'Cinematic promotional videos, reels, and product storytelling.',
      description:
        'Motion brings brands to life. We direct, produce, and edit high-retention video content for social reels, brand stories, product showcases, and paid video campaigns.',
      capabilities: [
        'Promotional videos',
        'Reels and short-form content',
        'Product videos and studio captures',
        'Editing, motion elements, and campaign adaptations',
        'Sound design, color grading, and subtitle styling',
        'Storyboarding and narrative pacing',
      ],
      visualType: 'video-production' as const,
    },
    {
      id: 'digital-marketing',
      number: '05',
      title: 'Digital Marketing & Social Media Management',
      tagline: 'Strategic content planning and disciplined social media execution.',
      description:
        'A cohesive social media strategy requires consistent storytelling. We manage content calendars, design custom feed graphics, write engaging copy, and coordinate multi-channel publishing.',
      capabilities: [
        'Content planning and monthly creative calendars',
        'Social media management and publishing coordination',
        'Creative calendar development',
        'Campaign execution and coordination',
        'Audience engagement and tone-of-voice alignment',
        'Performance insights and monthly strategy reviews',
      ],
      visualType: 'digital-marketing' as const,
    },
  ];

  const faqs = [
    {
      q: 'What services does Goodfolk Solution offer?',
      a: 'We specialize in five core creative disciplines: (1) Branding & Packaging, (2) Creative Design for digital & e-commerce, (3) Performance Marketing Creatives, (4) Video Production & Editing, and (5) Digital Marketing & Social Media Management.',
    },
    {
      q: 'Can I hire Goodfolk for a single project?',
      a: 'Yes. We frequently partner on discrete, focused scopes such as a complete brand identity, a single product packaging rollout, an Amazon A+ content suite, or an advertising campaign creative sprint.',
    },
    {
      q: 'Do you work with businesses outside India?',
      a: 'Absolutely. While based in India, Goodfolk Solution collaborates with startups, consumer brands, and businesses across the US, UK, UAE, Singapore, and Europe. All briefings and approvals are handled seamlessly via structured video calls and async collaboration.',
    },
    {
      q: 'How do project timelines work?',
      a: 'Timelines depend directly on scope. A focused creative sprint or ad batch typically takes 1–2 weeks, while a comprehensive brand identity or multi-SKU packaging system requires 3–6 weeks. We provide a milestone-based timeline in your initial proposal before work commences.',
    },
    {
      q: 'How are quotations and payments handled?',
      a: 'Every quotation is customized to your exact requirements and deliverables. Standard projects operate on milestone-based payments (an agreed initial advance before kickoff, followed by milestone and final delivery payments upon your approval).',
    },
    {
      q: 'Can you provide multiple creative services for one brand?',
      a: 'Yes! One of our greatest strengths is serving as a unified creative partner. We can develop your brand identity and packaging, then translate it directly into your website assets, social media feed, video reels, and performance ad campaigns under one cohesive aesthetic.',
    },
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Brief',
      desc: 'We understand your goals, requirements, and vision.',
    },
    {
      number: '02',
      title: 'Create',
      desc: 'Our team turns your brief into creative solutions.',
    },
    {
      number: '03',
      title: 'Review & Approve',
      desc: 'You review the work and share your feedback for final approval.',
    },
    {
      number: '04',
      title: 'Deliver & Pay',
      desc: 'We deliver the approved final files, with payment completed as per agreed terms.',
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-b from-white to-[#F7F7F5] border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#123578] bg-slate-100 px-3 py-1.5 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-[#ED650B]" />
            Complete Creative Capabilities
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-[#123578] tracking-tight max-w-4xl mx-auto leading-tight">
            Creative Solutions for Ambitious Brands.
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mt-6 max-w-2xl mx-auto leading-relaxed">
            From brand identity to digital campaigns, we create thoughtful creative solutions that help businesses stand out and grow.
          </p>
        </div>
      </section>

      {/* 5 Detailed Service Sections */}
      <section className="py-20 divide-y divide-slate-100">
        {detailedServices.map((svc, idx) => (
          <div
            id={svc.id}
            key={svc.id}
            className={`py-20 scroll-mt-24 ${idx % 2 === 1 ? 'bg-[#F7F7F5]' : 'bg-white'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Details Column */}
                <div
                  className={`lg:col-span-7 space-y-6 ${
                    idx % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-heading font-bold text-sm text-[#ED650B] bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100">
                      Service {svc.number}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Goodfolk Solution</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#123578] tracking-tight">
                    {svc.title}
                  </h2>

                  <p className="text-base sm:text-lg font-medium text-slate-700 leading-snug">
                    {svc.tagline}
                  </p>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {svc.description}
                  </p>

                  <div className="pt-2">
                    <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-[#123578] mb-3">
                      Key Deliverables & Scopes
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {svc.capabilities.map((cap, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                        >
                          <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <button
                      onClick={onOpenContactModal}
                      className="bg-[#ED650B] hover:bg-[#d95605] text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-xs transition-all duration-150 inline-flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Discuss Your Project
                    </button>
                    <button
                      onClick={() => onNavigate('/contact')}
                      className="text-xs sm:text-sm font-semibold text-[#123578] hover:text-[#ED650B] inline-flex items-center gap-1.5 transition-colors py-2"
                    >
                      Send Detailed Enquiry
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Visual Column */}
                <div
                  className={`lg:col-span-5 ${
                    idx % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <CreativeVisual type={svc.visualType} className="h-72 sm:h-80 shadow-md" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* PROCESS SECTION */}
      <section className="py-20 bg-[#F7F7F5] border-t border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#123578] tracking-tight">
              From Brief to Delivery
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-3">
              Clear stages, transparent feedback, and reliable handover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs"
              >
                <div className="font-heading font-black text-3xl text-[#ED650B]/30 mb-3">
                  {step.number}
                </div>
                <h3 className="font-heading font-bold text-lg text-[#123578] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#123578] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Everything you need to know about working with Goodfolk Solution.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-colors"
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

      {/* Final CTA */}
      <section className="py-20 bg-[#123578] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight">
            Ready to Build Something Great?
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? Let's turn your ideas into impactful creative work.
          </p>
          <div className="pt-4">
            <button
              onClick={onOpenContactModal}
              className="bg-[#ED650B] hover:bg-[#d95605] active:scale-[0.98] text-white font-semibold text-base px-9 py-4 rounded-xl shadow-lg transition-all duration-150 inline-flex items-center gap-2"
            >
              Let's Talk
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
