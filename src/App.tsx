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
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { ClientPaymentPage } from './pages/ClientPaymentPage';
import { adminAuth } from './services/adminService';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const path = window.location.pathname;
    return path || '/';
  });
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => adminAuth.isAuthenticated());

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      setIsAdminLoggedIn(adminAuth.isAuthenticated());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
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

  const handleAdminLogout = async () => {
    adminAuth.clearToken();
    setIsAdminLoggedIn(false);
    handleNavigate('/admin');
  };

  // Dedicated Admin routing: keeps all admin pages private and separate from public website
  if (currentPath.startsWith('/admin')) {
    if (!isAdminLoggedIn) {
      return (
        <AdminLoginPage
          onLoginSuccess={() => {
            setIsAdminLoggedIn(true);
            handleNavigate('/admin');
          }}
          onNavigateHome={() => handleNavigate('/')}
        />
      );
    }
    return (
      <AdminDashboardPage
        onLogout={handleAdminLogout}
        onNavigateHome={() => handleNavigate('/')}
      />
    );
  }

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
      case '/pay':
      case '/payment':
        return <ClientPaymentPage onNavigateHome={() => handleNavigate('/')} />;
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
      {/* Global Header for Public Website */}
      <Header
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1 w-full">{renderCurrentPage()}</main>

      {/* Global Footer for Public Website */}
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
