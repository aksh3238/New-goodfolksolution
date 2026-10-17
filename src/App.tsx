import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const path = window.location.pathname;
    return path || '/';
  });
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    // Extract pathname if path contains hash
    const [pathname, hash] = path.split('#');
    if (window.location.pathname !== pathname) {
      window.history.pushState({}, '', path);
      setCurrentPath(pathname || '/');
      if (!hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (hash) {
      window.history.pushState({}, '', path);
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenContactModal={() => setIsContactModalOpen(true)}
          />
        );
      case '/services':
        return (
          <ServicesPage
            onNavigate={handleNavigate}
            onOpenContactModal={() => setIsContactModalOpen(true)}
          />
        );
      case '/portfolio':
        return (
          <PortfolioPage
            onNavigate={handleNavigate}
            onOpenContactModal={() => setIsContactModalOpen(true)}
          />
        );
      case '/about':
        return (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenContactModal={() => setIsContactModalOpen(true)}
          />
        );
      case '/contact':
        return (
          <ContactPage
            onNavigate={handleNavigate}
            onOpenContactModal={() => setIsContactModalOpen(true)}
          />
        );
      case '/privacy':
        return <PrivacyPolicyPage onNavigate={handleNavigate} />;
      case '/terms':
        return <TermsPage onNavigate={handleNavigate} />;
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenContactModal={() => setIsContactModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#242832] font-sans antialiased">
      {/* Global Header */}
      <Header
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1 w-full">{renderCurrentPage()}</main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Global "Let's Talk" Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
