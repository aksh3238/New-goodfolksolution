import React, { useState, useRef, useEffect } from 'react';
import { GoodfolkLogo } from './GoodfolkLogo';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenContactModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenContactModal,
}) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const servicesDropdownTimer = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceLinks = [
    {
      title: 'Branding & Packaging',
      desc: 'Brand identity, visual systems, and bespoke packaging.',
      hash: 'branding-packaging',
    },
    {
      title: 'Creative Design',
      desc: 'Social creatives, Amazon A+, web assets, and editorial.',
      hash: 'creative-design',
    },
    {
      title: 'Performance Marketing Creatives',
      desc: 'High-converting ad visuals and campaign variations.',
      hash: 'performance-marketing',
    },
    {
      title: 'Video Production & Editing',
      desc: 'Reels, promo films, product reels, and storytelling.',
      hash: 'video-production',
    },
    {
      title: 'Digital Marketing & Social Media Management',
      desc: 'Organic growth, content planning, and calendar execution.',
      hash: 'digital-marketing',
    },
  ];

  const handleMouseEnter = () => {
    if (servicesDropdownTimer.current) {
      clearTimeout(servicesDropdownTimer.current);
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    servicesDropdownTimer.current = window.setTimeout(() => {
      setIsServicesOpen(false);
    }, 180);
  };

  const navigateTo = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  const navigateToService = (hash: string) => {
    navigateTo(`/services#${hash}`);
    setIsServicesOpen(false);
    setIsMobileMenuOpen(false);
    // Smooth scroll to element if on services page
    setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const isLinkActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100 py-3'
          : 'bg-white border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => navigateTo('/')}
            className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ED650B] rounded-lg"
            aria-label="Goodfolk Solution Home"
          >
            <GoodfolkLogo size="md" />
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 lg:gap-8 text-[15px] font-medium text-[#242832]"
          >
            <button
              onClick={() => navigateTo('/')}
              className={`relative py-1 whitespace-nowrap transition-colors hover:text-[#123578] focus:outline-none ${
                isLinkActive('/')
                  ? 'text-[#123578] font-semibold'
                  : 'text-slate-600'
              }`}
            >
              Home
              {isLinkActive('/') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ED650B] rounded-full" />
              )}
            </button>

            {/* Services with Desktop Hover Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => navigateTo('/services')}
                onFocus={() => setIsServicesOpen(true)}
                className={`flex items-center gap-1.5 py-1 whitespace-nowrap transition-colors hover:text-[#123578] focus:outline-none ${
                  isLinkActive('/services')
                    ? 'text-[#123578] font-semibold'
                    : 'text-slate-600'
                }`}
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
              >
                Services
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isServicesOpen ? 'rotate-180 text-[#ED650B]' : 'text-slate-400'
                  }`}
                />
                {isLinkActive('/services') && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ED650B] rounded-full" />
                )}
              </button>

              {/* Dropdown Menu */}
              {isServicesOpen && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-96 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  role="menu"
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-3 space-y-1">
                    <div className="px-3 pt-2 pb-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Our Core Capabilities
                    </div>
                    {serviceLinks.map((service) => (
                      <button
                        key={service.hash}
                        onClick={() => navigateToService(service.hash)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors group flex flex-col focus:outline-none focus:bg-slate-50"
                        role="menuitem"
                      >
                        <span className="font-heading font-semibold text-sm text-slate-900 group-hover:text-[#123578] transition-colors flex items-center justify-between">
                          {service.title}
                          <ArrowRight className="w-3.5 h-3.5 text-transparent group-hover:text-[#ED650B] transition-all transform group-hover:translate-x-0.5" />
                        </span>
                        <span className="text-xs text-slate-500 mt-0.5 leading-snug">
                          {service.desc}
                        </span>
                      </button>
                    ))}
                    <div className="pt-2 border-t border-slate-100 px-3 pb-1">
                      <button
                        onClick={() => navigateTo('/services')}
                        className="text-xs font-semibold text-[#ED650B] hover:text-[#c45006] flex items-center gap-1 transition-colors"
                      >
                        View All Services & Process
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('/portfolio')}
              className={`relative py-1 whitespace-nowrap transition-colors hover:text-[#123578] focus:outline-none ${
                isLinkActive('/portfolio')
                  ? 'text-[#123578] font-semibold'
                  : 'text-slate-600'
              }`}
            >
              Portfolio
              {isLinkActive('/portfolio') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ED650B] rounded-full" />
              )}
            </button>

            <button
              onClick={() => navigateTo('/about')}
              className={`relative py-1 whitespace-nowrap transition-colors hover:text-[#123578] focus:outline-none ${
                isLinkActive('/about')
                  ? 'text-[#123578] font-semibold'
                  : 'text-slate-600'
              }`}
            >
              About Us
              {isLinkActive('/about') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ED650B] rounded-full" />
              )}
            </button>

            <button
              onClick={() => navigateTo('/contact')}
              className={`relative py-1 whitespace-nowrap transition-colors hover:text-[#123578] focus:outline-none ${
                isLinkActive('/contact')
                  ? 'text-[#123578] font-semibold'
                  : 'text-slate-600'
              }`}
            >
              Contact
              {isLinkActive('/contact') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ED650B] rounded-full" />
              )}
            </button>
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenContactModal}
              className="bg-[#ED650B] hover:bg-[#d95605] active:scale-[0.98] text-white font-medium text-sm sm:text-[15px] px-5 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all duration-150 whitespace-nowrap shrink-0 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#ED650B] focus:ring-offset-2"
            >
              Let's Talk
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-[#123578] hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#ED650B]"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-5 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 font-heading font-medium text-base text-slate-800">
            <button
              onClick={() => navigateTo('/')}
              className={`text-left py-2 px-3 rounded-lg transition-colors ${
                isLinkActive('/')
                  ? 'bg-slate-100 text-[#123578] font-bold'
                  : 'hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            {/* Mobile Services Accordion */}
            <div>
              <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-50 text-left">
                <button
                  onClick={() => navigateTo('/services')}
                  className={`text-left flex-1 font-medium ${
                    isLinkActive('/services') ? 'text-[#123578] font-bold' : ''
                  }`}
                >
                  Services
                </button>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="p-1 text-slate-400"
                  aria-label="Toggle services list"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isServicesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {isServicesOpen && (
                <div className="pl-4 pr-2 py-1 space-y-1 text-sm border-l-2 border-slate-100 ml-3 mt-1">
                  {serviceLinks.map((s) => (
                    <button
                      key={s.hash}
                      onClick={() => navigateToService(s.hash)}
                      className="block w-full text-left py-1.5 px-2 text-slate-600 hover:text-[#123578]"
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('/portfolio')}
              className={`text-left py-2 px-3 rounded-lg transition-colors ${
                isLinkActive('/portfolio')
                  ? 'bg-slate-100 text-[#123578] font-bold'
                  : 'hover:bg-slate-50'
              }`}
            >
              Portfolio
            </button>

            <button
              onClick={() => navigateTo('/about')}
              className={`text-left py-2 px-3 rounded-lg transition-colors ${
                isLinkActive('/about')
                  ? 'bg-slate-100 text-[#123578] font-bold'
                  : 'hover:bg-slate-50'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => navigateTo('/contact')}
              className={`text-left py-2 px-3 rounded-lg transition-colors ${
                isLinkActive('/contact')
                  ? 'bg-slate-100 text-[#123578] font-bold'
                  : 'hover:bg-slate-50'
              }`}
            >
              Contact
            </button>

            <div className="pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenContactModal();
                }}
                className="w-full bg-[#ED650B] hover:bg-[#d95605] text-white py-3 rounded-xl font-medium text-center shadow-xs"
              >
                Let's Talk
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
