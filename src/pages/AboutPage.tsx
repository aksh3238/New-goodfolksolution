import React from 'react';
import { ArrowRight, Compass, Eye, Users, Layers, Rocket, Package, ShoppingBag, Building2 } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenContactModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenContactModal,
}) => {
  const principles = [
    {
      number: '01',
      title: 'Clarity Before Creativity',
      desc: 'Every project starts with understanding the problem and the goal.',
      icon: Compass,
    },
    {
      number: '02',
      title: 'Thoughtful Execution',
      desc: 'We pay attention to the details that make a brand feel consistent and considered.',
      icon: Eye,
    },
    {
      number: '03',
      title: 'Collaboration',
      desc: 'We work with clients through clear communication, review and feedback.',
      icon: Users,
    },
    {
      number: '04',
      title: 'Purposeful Design',
      desc: 'Creative decisions should support the brand and its objectives.',
      icon: Layers,
    },
  ];

  const services = [
    { name: 'Branding & Packaging', hash: 'branding-packaging' },
    { name: 'Creative Design', hash: 'creative-design' },
    { name: 'Performance Marketing Creatives', hash: 'performance-marketing' },
    { name: 'Video Production & Editing', hash: 'video-production' },
    { name: 'Digital Marketing & Social Media Management', hash: 'digital-marketing' },
  ];

  const whoWeWorkWith = [
    {
      title: 'Startups & Emerging Brands',
      desc: 'Founders building a distinctive initial identity and market presence from day one.',
      icon: Rocket,
    },
    {
      title: 'Consumer Product Businesses',
      desc: 'Packaged goods (CPG), cosmetics, food, beverage, and wellness brands needing shelf impact.',
      icon: Package,
    },
    {
      title: 'E-commerce Brands',
      desc: 'Direct-to-consumer stores and marketplace sellers requiring high-converting visuals and A+ content.',
      icon: ShoppingBag,
    },
    {
      title: 'Established Businesses',
      desc: 'Companies seeking dedicated creative support to modernize or scale their visual communications.',
      icon: Building2,
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
      <section className="pt-20 pb-20 bg-gradient-to-b from-white via-[#F7F7F5] to-white border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#123578] bg-slate-100 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#ED650B]" />
            About Goodfolk Solution
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-[#123578] tracking-tight leading-tight">
            Good Ideas Deserve Good Folks.
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Goodfolk Solution brings strategy, creativity and thoughtful design together to help brands communicate clearly and grow with purpose.
          </p>
        </div>
      </section>

      {/* Our Story & Approach */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Our Story */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ED650B]">
                Origin & Ethos
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#123578] mt-1">
                Our Story
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                Goodfolk Solution was built around a simple belief: thoughtful creative work can make a meaningful difference to a business. We bring branding, design and digital communication together to help businesses express their identity and connect with their audience.
              </p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Our Approach */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ED650B]">
                Methodology
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#123578] mt-1">
                Our Approach
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                We begin by understanding the business, the audience and the objective. From there, we develop creative solutions that are relevant, consistent and purposeful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Principles */}
      <section className="py-20 bg-[#F7F7F5] border-t border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#123578] tracking-tight">
              Our Principles
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Four foundational standards that guide every concept, layout, and deliverable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#ED650B] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-400 mb-1">
                      {p.number}
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#123578] mb-2">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#123578] tracking-tight">
              What We Do
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Five complementary creative disciplines under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((svc, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(`/services#${svc.hash}`)}
                className="group p-5 rounded-2xl bg-[#F7F7F5] hover:bg-slate-100/80 border border-slate-200/70 text-left transition-all flex items-center justify-between"
              >
                <span className="font-heading font-bold text-sm text-[#123578] group-hover:text-[#ED650B] transition-colors">
                  {svc.name}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#ED650B] group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="py-20 bg-[#F7F7F5] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#123578] tracking-tight">
              Who We Work With
            </h2>
            <p className="text-base text-slate-600 mt-2">
              We partner with businesses at various stages of growth that value thoughtful creative execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoWeWorkWith.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#123578]/5 text-[#123578] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#123578]" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#123578] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#123578] tracking-tight">
              From Brief to Delivery
            </h2>
            <p className="text-base text-slate-600 mt-2">
              Brief → Create → Review & Approve → Deliver & Pay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#F7F7F5] rounded-2xl p-6 border border-slate-200/80 shadow-xs"
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

      {/* Final CTA */}
      <section className="py-20 bg-[#123578] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight">
            Let's Build Something Meaningful.
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? Let's discuss your brand, your goals, and how we can support your journey.
          </p>
          <div className="pt-4">
            <button
              onClick={onOpenContactModal}
              className="bg-[#ED650B] hover:bg-[#d95605] active:scale-[0.98] text-white font-semibold text-base px-9 py-4 rounded-xl shadow-lg transition-all duration-150 inline-flex items-center gap-2"
            >
              Talk to Our Team
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
