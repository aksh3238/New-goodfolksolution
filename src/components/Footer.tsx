import React from 'react';
import { GoodfolkLogo } from './GoodfolkLogo';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenContactModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenContactModal,
}) => {
  const navigateTo = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToService = (hash: string) => {
    onNavigate(`/services#${hash}`);
    setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="bg-[#123578] text-white pt-16 pb-12 border-t border-[#123578]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand Column (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <GoodfolkLogo variant="dark" size="lg" />
            <p className="text-white/80 text-base max-w-sm leading-relaxed mt-4">
              We build brands that move businesses forward.
            </p>
            <p className="text-sm text-white/60 max-w-sm leading-relaxed">
              A creative advertising, branding, design and digital marketing
              agency based in India, collaborating with forward-thinking
              businesses worldwide.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-white/60">
              <MapPin className="w-3.5 h-3.5 text-[#ED650B]" />
              <span>India · Serving Brands Globally</span>
            </div>
          </div>

          {/* Column 2: EXPLORE */}
          <div>
            <h3 className="font-heading font-semibold text-xs text-[#ED650B] uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-3 text-sm text-white/80 font-medium">
              <li>
                <button
                  onClick={() => navigateTo('/')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/about')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/portfolio')}
                  className="hover:text-white transition-colors"
                >
                  Our Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: SERVICES */}
          <div>
            <h3 className="font-heading font-semibold text-xs text-[#ED650B] uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <button
                  onClick={() => navigateToService('branding-packaging')}
                  className="hover:text-white transition-colors text-left"
                >
                  Branding & Packaging
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToService('creative-design')}
                  className="hover:text-white transition-colors text-left"
                >
                  Creative Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToService('performance-marketing')}
                  className="hover:text-white transition-colors text-left"
                >
                  Performance Marketing Creatives
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToService('video-production')}
                  className="hover:text-white transition-colors text-left"
                >
                  Video Production & Editing
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToService('digital-marketing')}
                  className="hover:text-white transition-colors text-left"
                >
                  Digital Marketing & Social Media Management
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: CONNECT & QUICK TALK */}
          <div>
            <h3 className="font-heading font-semibold text-xs text-[#ED650B] uppercase tracking-wider mb-4">
              Connect
            </h3>
            <ul className="space-y-3 text-sm text-white/80 font-medium mb-6">
              <li>
                <a
                  href="https://www.instagram.com/goodfolksolution/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors group"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[#ED650B] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:akshay@goodfolksolution.in"
                  className="hover:text-white flex items-center gap-1.5 transition-colors group"
                >
                  <span>Email</span>
                  <Mail className="w-3.5 h-3.5 text-white/40 group-hover:text-[#ED650B] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919817961412"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors group"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[#ED650B] transition-colors" />
                </a>
              </li>
            </ul>

            <button
              onClick={onOpenContactModal}
              className="w-full bg-[#ED650B] hover:bg-[#d95605] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-150 text-center shadow-xs"
            >
              Let's Talk
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            &copy; 2026 Goodfolk Solution. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateTo('/privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={() => navigateTo('/terms')}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
