import React, { useState } from 'react';
import { CreativeVisual } from '../components/CreativeVisuals';
import { EnquiryForm } from '../components/EnquiryForm';
import { portfolioProjects, ProjectItem } from '../data/portfolioData';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import {
  ArrowRight,
  Sparkles,
  Target,
  Layers,
  ArrowUpRight,
  Mail,
  MessageCircle,
  Instagram,
  CheckCircle2,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenContactModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenContactModal,
}) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const services = [
    {
      title: 'Branding & Packaging',
      desc: 'Brand identity, logo design and product packaging.',
      visualType: 'branding-packaging' as const,
      hash: 'branding-packaging',
    },
    {
      title: 'Creative Design',
      desc: 'Social media posts, Amazon A+ content, website assets, image editing and photo albums.',
      visualType: 'creative-design' as const,
      hash: 'creative-design',
    },
    {
      title: 'Performance Marketing Creatives',
      desc: 'Ad creatives designed to capture attention and drive conversions.',
      visualType: 'performance-marketing' as const,
      hash: 'performance-marketing',
    },
    {
      title: 'Video Production & Editing',
      desc: 'Promotional videos, reels and product videos.',
      visualType: 'video-production' as const,
      hash: 'video-production',
    },
    {
      title: 'Digital Marketing & Social Media Management',
      desc: 'Social media management, content planning and campaign execution.',
      visualType: 'digital-marketing' as const,
      hash: 'digital-marketing',
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

  const whyReasons = [
    {
      icon: Sparkles,
      title: 'Creative That Stands Out',
      desc: 'Designs that capture attention.',
    },
    {
      icon: Target,
      title: 'Strategy With Purpose',
      desc: 'Every idea has a clear goal.',
    },
    {
      icon: Layers,
      title: 'One Creative Partner',
      desc: 'Multiple creative services under one roof.',
    },
  ];

  // Neutral client partner placeholders
  const clientPlaceholders = [
    { name: 'KAIZEN LABS', tag: 'D2C Consumer' },
    { name: 'AURORA NATURALS', tag: 'Organic Skincare' },
    { name: 'TERRA GRAIN', tag: 'F&B Beverages' },
    { name: 'ELEVATE VENTURES', tag: 'Tech & Mobility' },
    { name: 'VALLEY ROASTERS', tag: 'Specialty Coffee' },
  ];

  return (
    <div className="w-full">
      {/* SECTION 2: HERO BANNER */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#123578] bg-slate-100 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#ED650B]" />
                Creative Agency · Branding · Advertising
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-[#123578] tracking-tight leading-[1.12] text-balance">
                We Build Brands That Move Businesses Forward.
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
                We combine strategy, creative design, branding, and digital
                marketing to help businesses stand out, connect with the right
                audience, and grow.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={onOpenContactModal}
                  className="bg-[#ED650B] hover:bg-[#d95605] active:scale-[0.98] text-white font-semibold text-base px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#ED650B] focus:ring-offset-2"
                >
                  Let's Talk
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('/portfolio')}
                  className="bg-white hover:bg-slate-50 text-[#123578] font-semibold text-base px-7 py-3.5 rounded-xl border-2 border-slate-200 hover:border-[#123578] transition-all duration-150 flex items-center justify-center gap-2"
                >
                  Explore Our Work
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-[#123578]">5+</div>
                  <div className="text-xs text-slate-500 font-medium">Core Creative Capabilities</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-[#123578]">Global</div>
                  <div className="text-xs text-slate-500 font-medium">Serving Worldwide Brands</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-xl sm:text-2xl text-[#123578]">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Bespoke Strategic Delivery</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 w-full">
              <CreativeVisual type="hero-composition" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: TRUSTED BY */}
      <section className="py-12 bg-[#F7F7F5] border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xs font-heading font-bold text-slate-500 uppercase tracking-widest">
            TRUSTED BY
          </h2>
          <p className="text-sm text-slate-600 mt-1 mb-8">
            Brands that trust us to bring their vision to life.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
            {clientPlaceholders.map((client, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-xs border border-slate-200/80 rounded-xl py-4 px-3 flex flex-col items-center justify-center hover:border-slate-300 transition-colors"
              >
                <span className="font-heading font-bold text-xs tracking-wider text-slate-700">
                  {client.name}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {client.tag}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-5">
            Illustrative brand partners & collaborative concepts. Real verified client logos displayed upon mutual NDA clearance.
          </p>
        </div>
      </section>

      {/* SECTION 4: OUR SERVICES */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#123578] tracking-tight">
              Our Services
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
              Creative solutions designed to build brands, capture attention, and support business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate(`/services#${svc.hash}`)}
                className="group cursor-pointer bg-white rounded-2xl border border-slate-200/80 hover:border-[#123578]/40 hover:shadow-xl transition-all duration-200 p-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Service Visual Preview */}
                  <CreativeVisual type={svc.visualType} className="h-44" />
                  <div>
                    <h3 className="font-heading font-bold text-xl text-[#123578] group-hover:text-[#ED650B] transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      {svc.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#123578] group-hover:text-[#ED650B] transition-colors">
                  <span>Explore Capabilities</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => onNavigate('/services')}
              className="bg-[#ED650B] hover:bg-[#d95605] text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-xs transition-all duration-150 inline-flex items-center gap-2"
            >
              Explore Our Services
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: FEATURED WORK ("Selected Work") */}
      <section className="py-20 bg-[#F7F7F5] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#123578] tracking-tight">
                Selected Work
              </h2>
              <p className="text-base text-slate-600 mt-2 max-w-xl">
                A glimpse of the brands we build, the stories we tell, and the impact we create.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/portfolio')}
              className="text-sm font-semibold text-[#123578] hover:text-[#ED650B] inline-flex items-center gap-1.5 transition-colors self-start md:self-auto"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.slice(0, 6).map((proj) => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="cursor-pointer group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-200 flex flex-col"
              >
                <div className="h-56 relative overflow-hidden bg-slate-100">
                  <CreativeVisual type={proj.visualType} className="h-full rounded-none" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-mono text-[#ED650B]">{proj.category}</span>
                      <span>Concept Project</span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#123578] group-hover:text-[#ED650B] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                      {proj.shortDesc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#123578]">
                    <span>View Case Breakdown</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#ED650B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('/portfolio')}
              className="bg-[#123578] hover:bg-[#0c2452] text-white font-semibold text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-xs transition-all duration-150 inline-flex items-center gap-2"
            >
              View All Projects
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 6: WHY GOODFOLK? */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#123578] tracking-tight">
              Why Goodfolk?
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
              More than creative work. We build ideas that move businesses forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyReasons.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F7F7F5] rounded-2xl p-8 border border-slate-200/70 hover:border-slate-300 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-white text-[#ED650B] shadow-xs flex items-center justify-center mb-6">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#123578]">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 mt-2 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7: OUR PROCESS */}
      <section className="py-20 bg-[#F7F7F5] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#123578] tracking-tight">
              From Brief to Delivery
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-3">
              A transparent, disciplined creative process designed for clarity and confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 relative shadow-xs"
              >
                <div className="font-heading font-black text-3xl sm:text-4xl text-[#ED650B]/30 mb-3">
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

      {/* SECTION 8: TESTIMONIALS */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#123578] tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 max-w-2xl mx-auto">
            Building lasting partnerships through creativity, collaboration, and results.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="p-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] font-mono uppercase text-slate-400 mb-3">
                    Partner Feedback Placeholder
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 italic leading-relaxed">
                    “Verified client testimonials will be displayed here following project sign-off and publishing authorization.”
                  </p>
                </div>
                <div className="pt-4 mt-6 border-t border-slate-200/60 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs text-slate-500 font-bold">
                    GF
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-700">Client Partner #{item}</div>
                    <div className="text-[10px] text-slate-400">Emerging Brand Collaboration</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: FINAL CTA */}
      <section className="py-20 bg-[#123578] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ED650B] bg-white/10 px-3 py-1.5 rounded-full">
            Ready to Begin?
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight">
            Ready to Build Something Great?
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? Let's turn your ideas into impactful creative work.
          </p>
          <div className="pt-4">
            <button
              onClick={onOpenContactModal}
              className="bg-[#ED650B] hover:bg-[#d95605] active:scale-[0.98] text-white font-semibold text-base px-9 py-4 rounded-xl shadow-lg transition-all duration-150 inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#ED650B] focus:ring-offset-2"
            >
              Let's Talk
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 10: CONTACT PREVIEW */}
      <section className="py-20 bg-[#F7F7F5] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#123578] tracking-tight">
                  Let's Start a Conversation
                </h2>
                <p className="text-base text-slate-600 mt-3 leading-relaxed">
                  Tell us about your project. We'd love to hear what you have in mind.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <a
                  href="mailto:akshay@goodfolksolution.in"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200/80 hover:border-[#123578] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#123578] text-white flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase">Email Us Directly</div>
                    <div className="text-sm font-medium text-slate-900 font-mono">akshay@goodfolksolution.in</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/919817961412"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200/80 hover:border-emerald-500 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase">WhatsApp Instant Chat</div>
                    <div className="text-sm font-medium text-slate-900 font-mono">+91 9817961412</div>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/goodfolksolution/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200/80 hover:border-pink-500 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase">Follow On Instagram</div>
                    <div className="text-sm font-medium text-slate-900">@goodfolksolution</div>
                  </div>
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/contact')}
                  className="text-xs font-semibold text-[#ED650B] hover:text-[#c45006] inline-flex items-center gap-1.5 transition-colors"
                >
                  Visit Full Contact & FAQ Page
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Functional Enquiry Form */}
            <div className="lg:col-span-7">
              <EnquiryForm
                isCompact={true}
                onNavigateToPrivacy={() => onNavigate('/privacy')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onStartProject={() => onNavigate('/contact')}
      />
    </div>
  );
};
