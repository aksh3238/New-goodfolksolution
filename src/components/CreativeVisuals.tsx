import React from 'react';

interface VisualCardProps {
  type:
    | 'hero-composition'
    | 'branding-packaging'
    | 'creative-design'
    | 'performance-marketing'
    | 'video-production'
    | 'digital-marketing'
    | 'portfolio-botanics'
    | 'portfolio-coffee'
    | 'portfolio-skincare'
    | 'portfolio-fintech'
    | 'portfolio-beverage'
    | 'portfolio-apparel';
  className?: string;
  label?: string;
}

export const CreativeVisual: React.FC<VisualCardProps> = ({
  type,
  className = '',
  label,
}) => {
  switch (type) {
    case 'hero-composition':
      return (
        <div
          className={`relative w-full h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#123578]/5 via-[#F7F7F5] to-[#ED650B]/10 border border-slate-200/80 p-6 sm:p-8 flex items-center justify-center shadow-lg ${className}`}
        >
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                'radial-gradient(#123578 0.75px, transparent 0.75px), radial-gradient(#ED650B 0.75px, #F7F7F5 0.75px)',
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0, 12px 12px',
            }}
          />

          {/* Central Editorial Campaign Stage */}
          <div className="relative z-10 w-full max-w-lg aspect-[4/3] flex items-center justify-center">
            {/* Ambient Shadow Ground */}
            <div className="absolute -bottom-6 w-3/4 h-8 bg-black/15 blur-xl rounded-full" />

            {/* Packaging Box 1: Navy Luxury Cylindrical Box */}
            <div className="absolute left-6 bottom-4 w-36 sm:w-44 h-56 sm:h-64 rounded-2xl bg-gradient-to-b from-[#123578] to-[#0c2452] shadow-2xl p-5 text-white flex flex-col justify-between transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#ED650B]">
                  Batch 08
                </span>
                <span className="w-2 h-2 rounded-full bg-[#ED650B]" />
              </div>
              <div className="my-auto space-y-2">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#ED650B]" />
                </div>
                <div className="text-xs font-heading font-extrabold tracking-wider uppercase">
                  Aura Essence
                </div>
                <div className="text-[9px] text-white/60 font-light leading-tight">
                  Botanical restorative serum formulated for modern skin radiance.
                </div>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between text-[8px] text-white/40 font-mono">
                <span>50 ML / 1.7 OZ</span>
                <span>VOL. 98%</span>
              </div>
            </div>

            {/* Packaging Box 2: Premium Minimalist Kraft / White Box */}
            <div className="absolute right-6 top-6 w-40 sm:w-48 h-60 sm:h-72 rounded-2xl bg-white shadow-2xl border border-slate-100 p-6 flex flex-col justify-between transform rotate-4 hover:rotate-1 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div className="w-6 h-6 rounded-lg bg-[#123578] text-white flex items-center justify-center text-[10px] font-bold">
                  GF
                </div>
                <span className="text-[10px] font-semibold text-[#ED650B] uppercase tracking-wider">
                  Organic Origin
                </span>
              </div>
              <div className="space-y-3">
                <div className="h-1 w-12 bg-[#ED650B] rounded-full" />
                <h4 className="font-heading font-bold text-base text-[#123578] leading-tight">
                  Crafted With Purpose
                </h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Clean identity, sustainable materials, and bold typography designed to capture retail attention.
                </p>
              </div>
              <div className="bg-[#F7F7F5] rounded-lg p-2.5 flex items-center justify-between">
                <span className="text-[9px] font-mono text-slate-500">Edition 2026</span>
                <span className="text-[9px] font-semibold text-[#123578]">Goodfolk Solution</span>
              </div>
            </div>

            {/* Overlapping Brand Palette Swatch Card */}
            <div className="absolute -bottom-2 right-12 z-20 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-xl border border-slate-200/80 flex items-center gap-3">
              <div className="flex -space-x-1.5">
                <div className="w-5 h-5 rounded-full bg-[#123578] ring-2 ring-white" />
                <div className="w-5 h-5 rounded-full bg-[#ED650B] ring-2 ring-white" />
                <div className="w-5 h-5 rounded-full bg-[#F7F7F5] border border-slate-200 ring-2 ring-white" />
              </div>
              <span className="text-[11px] font-semibold text-[#123578]">Brand Identity System</span>
            </div>
          </div>
        </div>
      );

    case 'branding-packaging':
      return (
        <div className={`relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-[#F7F7F5] border border-slate-200/70 p-6 flex flex-col justify-between group ${className}`}>
          <div className="flex items-center justify-between z-10">
            <span className="text-xs font-semibold text-[#ED650B] uppercase tracking-wider">
              {label || 'Identity & Packaging'}
            </span>
            <span className="text-[10px] font-mono text-slate-400">Concept System</span>
          </div>

          <div className="relative my-auto flex items-center justify-center gap-4">
            {/* Box mockup */}
            <div className="w-28 h-36 rounded-xl bg-gradient-to-br from-[#123578] to-[#0c2452] shadow-md p-3 text-white flex flex-col justify-between group-hover:-translate-y-1 transition-transform">
              <div className="w-3 h-3 rounded-full bg-[#ED650B]" />
              <div className="text-[10px] font-heading font-bold uppercase leading-tight">
                Verve Craft Cold Brew
              </div>
              <div className="text-[7px] text-white/50 font-mono">250 ML / CANISTER</div>
            </div>

            {/* Business card / stationery mockup */}
            <div className="w-32 h-24 rounded-lg bg-white shadow-md border border-slate-200 p-3 flex flex-col justify-between group-hover:translate-y-1 transition-transform">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ED650B]" />
                <div className="text-[9px] font-bold text-[#123578]">Goodfolk Studio</div>
              </div>
              <div className="space-y-1">
                <div className="w-16 h-1 bg-slate-200 rounded-full" />
                <div className="w-10 h-1 bg-slate-100 rounded-full" />
              </div>
              <div className="text-[8px] text-slate-400 font-mono">goodfolksolution.in</div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 z-10 flex items-center justify-between">
            <span>Visual Guidelines & Dielines</span>
            <span className="font-semibold text-[#123578]">100% Bespoke</span>
          </div>
        </div>
      );

    case 'creative-design':
      return (
        <div className={`relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-[#F7F7F5] border border-slate-200/70 p-6 flex flex-col justify-between group ${className}`}>
          <div className="flex items-center justify-between z-10">
            <span className="text-xs font-semibold text-[#ED650B] uppercase tracking-wider">
              {label || 'Creative Design & Assets'}
            </span>
            <span className="text-[10px] font-mono text-slate-400">Multi-Channel</span>
          </div>

          <div className="relative my-auto flex items-center justify-center gap-3">
            {/* Social Post 1 */}
            <div className="w-28 h-32 rounded-xl bg-white shadow-md border border-slate-200 p-2.5 flex flex-col justify-between group-hover:scale-105 transition-transform">
              <div className="w-full h-16 rounded-lg bg-gradient-to-tr from-[#123578] to-[#2859b8] flex items-center justify-center text-white text-[9px] font-heading font-bold text-center px-2">
                New Summer Collection
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[8px] font-semibold text-[#ED650B]">Amazon A+</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
            </div>

            {/* Social Post 2 */}
            <div className="w-28 h-32 rounded-xl bg-gradient-to-br from-[#242832] to-[#123578] text-white shadow-md p-2.5 flex flex-col justify-between group-hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-mono text-white/60">Story</span>
                <span className="text-[8px] text-[#ED650B]">9:16</span>
              </div>
              <div className="text-[10px] font-bold leading-tight">
                Designed to Stop the Scroll.
              </div>
              <div className="w-full h-1 bg-[#ED650B] rounded-full" />
            </div>
          </div>

          <div className="text-[11px] text-slate-500 z-10 flex items-center justify-between">
            <span>Social · Web Banners · E-commerce</span>
            <span className="font-semibold text-[#123578]">Brand Aligned</span>
          </div>
        </div>
      );

    case 'performance-marketing':
      return (
        <div className={`relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-[#F7F7F5] border border-slate-200/70 p-6 flex flex-col justify-between group ${className}`}>
          <div className="flex items-center justify-between z-10">
            <span className="text-xs font-semibold text-[#ED650B] uppercase tracking-wider">
              {label || 'Performance Ad Creatives'}
            </span>
            <span className="text-[10px] font-mono text-slate-400">High-Converting</span>
          </div>

          <div className="relative my-auto flex items-center justify-center gap-3">
            <div className="w-48 bg-white rounded-xl shadow-md border border-slate-200 p-3 group-hover:scale-102 transition-transform">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-[#123578]" />
                  <span className="text-[9px] font-bold text-slate-800">Paid Ad Concept</span>
                </div>
                <span className="text-[8px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                  Hook Tested
                </span>
              </div>
              <div className="w-full h-14 bg-gradient-to-r from-orange-100 to-amber-50 rounded-lg p-2 flex flex-col justify-center">
                <div className="text-[10px] font-extrabold text-[#123578]">3.4x ROAS Concept</div>
                <div className="text-[8px] text-slate-600">Dynamic visual variations</div>
              </div>
              <div className="mt-2 flex items-center justify-between text-[9px]">
                <span className="text-slate-500">CTA: Shop Now</span>
                <span className="font-bold text-[#ED650B]">Learn More →</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 z-10 flex items-center justify-between">
            <span>Meta & Google Ad Visuals</span>
            <span className="font-semibold text-[#123578]">Strategic Testing</span>
          </div>
        </div>
      );

    case 'video-production':
      return (
        <div className={`relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-[#123578] text-white p-6 flex flex-col justify-between group ${className}`}>
          <div className="flex items-center justify-between z-10">
            <span className="text-xs font-semibold text-[#ED650B] uppercase tracking-wider">
              {label || 'Video & Motion Production'}
            </span>
            <span className="text-[10px] font-mono text-white/60">Cinematic 4K</span>
          </div>

          <div className="relative my-auto flex items-center justify-center">
            <div className="w-52 h-28 rounded-xl bg-black/40 border border-white/20 p-3 flex flex-col justify-between relative overflow-hidden group-hover:border-[#ED650B] transition-colors">
              <div className="flex items-center justify-between text-[9px] font-mono text-white/60">
                <span>REC ● 00:14:22</span>
                <span className="text-[#ED650B]">4K 60FPS</span>
              </div>
              {/* Play Button */}
              <div className="w-10 h-10 rounded-full bg-[#ED650B] text-white flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="flex items-center justify-between text-[8px] text-white/70">
                <span>Storyboarding & Color Grade</span>
                <span>Short-form Reels</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-white/70 z-10 flex items-center justify-between">
            <span>Product Shoots · Reels · Motion</span>
            <span className="font-semibold text-[#ED650B]">High Retention</span>
          </div>
        </div>
      );

    case 'digital-marketing':
      return (
        <div className={`relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-[#F7F7F5] border border-slate-200/70 p-6 flex flex-col justify-between group ${className}`}>
          <div className="flex items-center justify-between z-10">
            <span className="text-xs font-semibold text-[#ED650B] uppercase tracking-wider">
              {label || 'Digital Marketing & Social'}
            </span>
            <span className="text-[10px] font-mono text-slate-400">Content Calendar</span>
          </div>

          <div className="relative my-auto flex items-center justify-center">
            <div className="w-60 bg-white rounded-xl shadow-md border border-slate-200 p-3 space-y-2 group-hover:scale-102 transition-transform">
              <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono">
                <span>30-Day Campaign Blueprint</span>
                <span className="text-[#123578] font-bold">Planned</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                <div className="h-8 rounded bg-blue-50 border border-blue-200 flex items-center justify-center text-[8px] font-bold text-[#123578]">
                  Post
                </div>
                <div className="h-8 rounded bg-orange-50 border border-orange-200 flex items-center justify-center text-[8px] font-bold text-[#ED650B]">
                  Reel
                </div>
                <div className="h-8 rounded bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[8px] font-bold text-emerald-700">
                  Carousel
                </div>
                <div className="h-8 rounded bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-600">
                  Ad
                </div>
              </div>
              <div className="text-[9px] text-slate-600 flex justify-between pt-1">
                <span>Engagement Strategy</span>
                <span className="font-semibold text-[#123578]">Consistent Voice</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 z-10 flex items-center justify-between">
            <span>Management & Campaign Execution</span>
            <span className="font-semibold text-[#123578]">Growth Focused</span>
          </div>
        </div>
      );

    case 'portfolio-botanics':
      return (
        <div className={`relative w-full h-full min-h-[260px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#123578] to-[#1d4aa1] p-6 text-white flex flex-col justify-between group ${className}`}>
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono text-[#ED650B] bg-white/10 px-2.5 py-1 rounded-md">
              Concept Project
            </span>
            <span className="text-[10px] text-white/60">Branding & Packaging</span>
          </div>
          <div className="space-y-1.5 my-auto">
            <h4 className="font-heading font-bold text-xl text-white">Botanica Skincare</h4>
            <p className="text-xs text-white/70 line-clamp-2">
              Sustainable botanical wellness packaging, amber glass bottles, and minimal typography.
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-white/60 pt-2 border-t border-white/10">
            <span>Brand System · 2026</span>
            <span className="text-[#ED650B] font-semibold group-hover:translate-x-1 transition-transform">
              View Concept →
            </span>
          </div>
        </div>
      );

    case 'portfolio-coffee':
      return (
        <div className={`relative w-full h-full min-h-[260px] rounded-2xl overflow-hidden bg-[#242832] p-6 text-white flex flex-col justify-between group ${className}`}>
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono text-[#ED650B] bg-white/10 px-2.5 py-1 rounded-md">
              Concept Project
            </span>
            <span className="text-[10px] text-white/60">Food & Beverage</span>
          </div>
          <div className="space-y-1.5 my-auto">
            <h4 className="font-heading font-bold text-xl text-white">Verve Single-Origin Roasters</h4>
            <p className="text-xs text-white/70 line-clamp-2">
              Artisanal coffee bags, textured metallic foil labels, and narrative aroma profiles.
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-white/60 pt-2 border-t border-white/10">
            <span>Packaging & Brand · 2026</span>
            <span className="text-[#ED650B] font-semibold group-hover:translate-x-1 transition-transform">
              View Concept →
            </span>
          </div>
        </div>
      );

    case 'portfolio-skincare':
      return (
        <div className={`relative w-full h-full min-h-[260px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#F7F7F5] to-slate-200 border border-slate-300 p-6 text-slate-900 flex flex-col justify-between group ${className}`}>
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono text-[#123578] bg-white px-2.5 py-1 rounded-md shadow-xs border border-slate-200">
              Concept Project
            </span>
            <span className="text-[10px] text-slate-500">E-commerce Creative</span>
          </div>
          <div className="space-y-1.5 my-auto">
            <h4 className="font-heading font-bold text-xl text-[#123578]">Lumina Glow Series</h4>
            <p className="text-xs text-slate-600 line-clamp-2">
              Amazon A+ e-commerce creative suite, comparison infographics, and product highlight tiles.
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200">
            <span>A+ Content · Conversion</span>
            <span className="text-[#ED650B] font-semibold group-hover:translate-x-1 transition-transform">
              View Concept →
            </span>
          </div>
        </div>
      );

    case 'portfolio-fintech':
      return (
        <div className={`relative w-full h-full min-h-[260px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#123578] to-[#0a1f47] p-6 text-white flex flex-col justify-between group ${className}`}>
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono text-[#ED650B] bg-white/10 px-2.5 py-1 rounded-md">
              Concept Project
            </span>
            <span className="text-[10px] text-white/60">Digital Advertising</span>
          </div>
          <div className="space-y-1.5 my-auto">
            <h4 className="font-heading font-bold text-xl text-white">Nexa Pay Campaign</h4>
            <p className="text-xs text-white/70 line-clamp-2">
              Paid social user acquisition motion creatives, carousel ad flows, and performance copy.
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-white/60 pt-2 border-t border-white/10">
            <span>Meta Ads · Growth</span>
            <span className="text-[#ED650B] font-semibold group-hover:translate-x-1 transition-transform">
              View Concept →
            </span>
          </div>
        </div>
      );

    case 'portfolio-beverage':
      return (
        <div className={`relative w-full h-full min-h-[260px] rounded-2xl overflow-hidden bg-[#ED650B] p-6 text-white flex flex-col justify-between group ${className}`}>
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono text-white bg-black/20 px-2.5 py-1 rounded-md">
              Concept Project
            </span>
            <span className="text-[10px] text-white/80">Social Media Campaign</span>
          </div>
          <div className="space-y-1.5 my-auto">
            <h4 className="font-heading font-bold text-xl text-white">Zest Sparkling Soda</h4>
            <p className="text-xs text-white/90 line-clamp-2">
              High-energy social media launch campaign, animated Instagram reels, and youth lifestyle content.
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-white/80 pt-2 border-t border-white/20">
            <span>Launch Campaign · Reels</span>
            <span className="text-white font-semibold group-hover:translate-x-1 transition-transform">
              View Concept →
            </span>
          </div>
        </div>
      );

    case 'portfolio-apparel':
      return (
        <div className={`relative w-full h-full min-h-[260px] rounded-2xl overflow-hidden bg-slate-900 p-6 text-white flex flex-col justify-between group ${className}`}>
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono text-[#ED650B] bg-white/10 px-2.5 py-1 rounded-md">
              Concept Project
            </span>
            <span className="text-[10px] text-white/60">Brand Identity</span>
          </div>
          <div className="space-y-1.5 my-auto">
            <h4 className="font-heading font-bold text-xl text-white">Urban Folk Apparel</h4>
            <p className="text-xs text-white/70 line-clamp-2">
              Minimalist streetwear identity, embroidered woven tags, hangtags, and lookbook art direction.
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-white/60 pt-2 border-t border-white/10">
            <span>Brand & Editorial</span>
            <span className="text-[#ED650B] font-semibold group-hover:translate-x-1 transition-transform">
              View Concept →
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
