import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { QuickAppointmentModal } from './components/QuickAppointmentModal';
import { SEOHead } from './components/SEOHead';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SpecialtyPage } from './pages/SpecialtyPage';
import { UnitsPage } from './pages/UnitsPage';
import { LocalUnitPage } from './pages/LocalUnitPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';

function getRouteFromPath(path: string): PageRoute {
  const clean = path.replace(/^\//, '').replace(/\.html$/, '');
  if (!clean || clean === 'index') return 'home';
  if (clean === 'sobre' || clean === 'sobre-nos') return 'sobre';
  if (clean === 'cirurgia-robotica' || clean === 'cirurgia-robotica-urologica') return 'cirurgia-robotica';
  if (clean === 'holep') return 'holep';
  if (clean === 'uro-oncologia') return 'uro-oncologia';
  if (clean === 'andrologia') return 'andrologia';
  if (clean === 'estetica-peniana') return 'estetica-peniana';
  if (clean === 'ultrassom-peniano-doppler') return 'ultrassom-peniano-doppler';
  if (clean === 'videolaparoscopia') return 'videolaparoscopia';
  if (clean === 'urologia-reconstrutora') return 'urologia-reconstrutora';
  if (clean === 'transplante-renal') return 'transplante-renal';
  if (clean === 'unidades') return 'unidades';
  if (clean === 'urologista-barra-da-tijuca') return 'urologista-barra-da-tijuca';
  if (clean === 'urologista-bonsucesso') return 'urologista-bonsucesso';
  if (clean === 'contato' || clean === 'entre-em-contato') return 'contato';
  if (clean === 'privacidade' || clean === 'politica-de-privacidade') return 'privacidade';
  if (clean === 'termos' || clean === 'termos-de-uso') return 'termos';
  if (clean === 'cookies' || clean === 'politica-de-cookies') return 'cookies';
  return 'home';
}

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => {
    return getRouteFromPath(window.location.pathname);
  });

  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [modalSpecialty, setModalSpecialty] = useState<string | undefined>();
  const [modalDoctor, setModalDoctor] = useState<string | undefined>();

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getRouteFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page: PageRoute, hash?: string) => {
    setCurrentPage(page);
    const targetUrl = page === 'home' ? '/' : `/${page}${hash ? `#${hash}` : ''}`;
    window.history.pushState(null, '', targetUrl);

    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openAppointmentModal = (specialty?: string, doctor?: string) => {
    setModalSpecialty(specialty);
    setModalDoctor(doctor);
    setIsAppointmentModalOpen(true);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenAppointmentModal={openAppointmentModal}
          />
        );
      case 'sobre':
        return (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenAppointmentModal={openAppointmentModal}
          />
        );
      case 'cirurgia-robotica':
      case 'holep':
      case 'uro-oncologia':
      case 'andrologia':
      case 'estetica-peniana':
      case 'ultrassom-peniano-doppler':
      case 'videolaparoscopia':
      case 'urologia-reconstrutora':
      case 'transplante-renal':
        return (
          <SpecialtyPage
            specialtySlug={currentPage}
            onNavigate={handleNavigate}
            onOpenAppointmentModal={openAppointmentModal}
          />
        );
      case 'unidades':
        return (
          <UnitsPage
            onNavigate={handleNavigate}
            onOpenAppointmentModal={openAppointmentModal}
          />
        );
      case 'urologista-barra-da-tijuca':
        return (
          <LocalUnitPage
            unitType="barra"
            onNavigate={handleNavigate}
            onOpenAppointmentModal={openAppointmentModal}
          />
        );
      case 'urologista-bonsucesso':
        return (
          <LocalUnitPage
            unitType="bonsucesso"
            onNavigate={handleNavigate}
            onOpenAppointmentModal={openAppointmentModal}
          />
        );
      case 'contato':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'privacidade':
        return <LegalPage pageType="privacidade" onNavigate={handleNavigate} />;
      case 'termos':
        return <LegalPage pageType="termos" onNavigate={handleNavigate} />;
      case 'cookies':
        return <LegalPage pageType="cookies" onNavigate={handleNavigate} />;
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenAppointmentModal={openAppointmentModal}
          />
        );
    }
  };

  return (
    <div className="site-wrapper">
      <SEOHead page={currentPage} />

      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAppointmentModal={() => openAppointmentModal()}
      />

      <main className="main-content">
        <div key={currentPage} className="page-transition">
          {renderCurrentPage()}
        </div>
      </main>

      <Footer onNavigate={handleNavigate} />

      <WhatsAppFloat />

      <QuickAppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        preselectedSpecialty={modalSpecialty}
        preselectedDoctor={modalDoctor}
      />
    </div>
  );
};

export default App;
