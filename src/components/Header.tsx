import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { CLINIC_CONTACT, SPECIALTIES } from '../data/clinicData';
import {
  MapPin,
  ChevronDown,
  Phone,
  CalendarCheck,
} from 'lucide-react';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.5A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C4.7 19 12 19 12 19s7.3 0 8.8-.5a2.5 2.5 0 0 0 1.8-1.8C23 15.2 23 12 23 12zM9.8 15.3V8.7l6 3.3-6 3.3z" />
  </svg>
);

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute, hash?: string) => void;
  onOpenAppointmentModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenAppointmentModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (
    e: React.MouseEvent,
    page: PageRoute,
    hash?: string
  ) => {
    e.preventDefault();
    onNavigate(page, hash);
    setMobileMenuOpen(false);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isSpecialtyPage = [
    'cirurgia-robotica',
    'holep',
    'uro-oncologia',
    'andrologia',
    'estetica-peniana',
    'ultrassom-peniano-doppler',
    'videolaparoscopia',
    'urologia-reconstrutora',
    'transplante-renal',
  ].includes(currentPage);

  const isUnitPage = [
    'unidades',
    'urologista-barra-da-tijuca',
    'urologista-bonsucesso',
  ].includes(currentPage);

  return (
    <>
      {/* Topbar Institucional & Local SEO */}
      <div className="topbar" role="region" aria-label="Informações de Unidades e Contato Rápido">
        <div className="wrap">
          <div className="tb-left">
            <a
              href="/urologista-barra-da-tijuca"
              className={`tb-item ${currentPage === 'urologista-barra-da-tijuca' ? 'tb-item--active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'urologista-barra-da-tijuca')}
              title="Urologista na Barra da Tijuca — Av. Ayrton Senna, 2600"
            >
              <MapPin className="w-3.5 h-3.5 text-[#F2A877]" />
              <span>Barra da Tijuca</span>
            </a>
            <a
              href="/urologista-bonsucesso"
              className={`tb-item ${currentPage === 'urologista-bonsucesso' ? 'tb-item--active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'urologista-bonsucesso')}
              title="Urologista em Bonsucesso — Rua Cardoso de Morais, 201"
            >
              <MapPin className="w-3.5 h-3.5 text-[#F2A877]" />
              <span>Bonsucesso</span>
            </a>
            <span className="tb-divider" aria-hidden="true">·</span>
            <span className="tb-tagline">
              Cirurgia Robótica, Próstata & Uro-Oncologia no RJ
            </span>
          </div>

          <div className="tb-right">
            <a
              className="tb-item tb-phone"
              href={CLINIC_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Agendar pelo WhatsApp ${CLINIC_CONTACT.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#F2A877]" />
              <span>{CLINIC_CONTACT.phone}</span>
            </a>
            <div className="tb-socials">
              <a
                href={CLINIC_CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da UroClínica Rio"
              >
                <InstagramIcon />
              </a>
              <a
                href={CLINIC_CONTACT.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube da UroClínica Rio"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className={`site-header ${isScrolled ? 'shrink' : ''}`}>
        <div className="wrap">
          <div className="bar">
            {/* Brand Logo */}
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, 'home')}
              className="brand"
              aria-label="UroClínica Rio — Urologista e Cirurgia Robótica no Rio de Janeiro"
            >
              <img
                className="logo-lockup"
                src="/assets/ur_lockup_dark.png"
                alt="UroClínica Rio — Urologista no Rio de Janeiro"
                width="180"
                height="46"
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="nav" aria-label="Menu Principal">
              <div className="nav-item">
                <a
                  href="/"
                  className={`nav-link ${currentPage === 'home' ? 'is-active' : ''}`}
                  aria-current={currentPage === 'home' ? 'page' : undefined}
                  onClick={(e) => handleLinkClick(e, 'home')}
                >
                  Início
                </a>
              </div>

              {/* Sobre nós dropdown */}
              <div className="nav-item">
                <a
                  href="/sobre"
                  className={`nav-link ${currentPage === 'sobre' ? 'is-active' : ''}`}
                  aria-current={currentPage === 'sobre' ? 'page' : undefined}
                  onClick={(e) => handleLinkClick(e, 'sobre')}
                >
                  Sobre nós <ChevronDown className="chev" aria-hidden="true" />
                </a>
                <div className="dropdown" role="menu">
                  <a
                    href="/sobre"
                    role="menuitem"
                    onClick={(e) => handleLinkClick(e, 'sobre')}
                  >
                    <span className="di di-num" aria-hidden="true">
                      01
                    </span>
                    <span>
                      A Clínica
                      <small>Nossa história, estrutura e valores</small>
                    </span>
                  </a>
                  <a
                    href="/sobre#corpo-clinico"
                    role="menuitem"
                    onClick={(e) => handleLinkClick(e, 'sobre', 'corpo-clinico')}
                  >
                    <span className="di di-num" aria-hidden="true">
                      02
                    </span>
                    <span>
                      Corpo Clínico
                      <small>Urologistas Titulares SBU</small>
                    </span>
                  </a>
                </div>
              </div>

              {/* Especialidades dropdown */}
              <div className="nav-item">
                <a
                  href="/cirurgia-robotica"
                  className={`nav-link ${isSpecialtyPage ? 'is-active' : ''}`}
                  aria-current={isSpecialtyPage ? 'page' : undefined}
                  onClick={(e) => handleLinkClick(e, 'cirurgia-robotica')}
                >
                  Especialidades <ChevronDown className="chev" aria-hidden="true" />
                </a>
                <div className="dropdown dropdown--wide" role="menu">
                  {SPECIALTIES.map((spec, idx) => (
                    <a
                      key={spec.id}
                      href={`/${spec.slug}`}
                      role="menuitem"
                      className={currentPage === spec.slug ? 'is-sub-active' : ''}
                      onClick={(e) => handleLinkClick(e, spec.slug)}
                    >
                      <span className="di di-num" aria-hidden="true">
                        0{idx + 1}
                      </span>
                      <span>
                        {spec.title}
                        <small>{spec.subtitle}</small>
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Unidades dropdown */}
              <div className="nav-item">
                <a
                  href="/unidades"
                  className={`nav-link ${isUnitPage ? 'is-active' : ''}`}
                  aria-current={isUnitPage ? 'page' : undefined}
                  onClick={(e) => handleLinkClick(e, 'unidades')}
                >
                  Unidades <ChevronDown className="chev" aria-hidden="true" />
                </a>
                <div className="dropdown" role="menu">
                  <a
                    href="/urologista-barra-da-tijuca"
                    role="menuitem"
                    className={currentPage === 'urologista-barra-da-tijuca' ? 'is-sub-active' : ''}
                    onClick={(e) => handleLinkClick(e, 'urologista-barra-da-tijuca')}
                  >
                    <span className="di">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <span>
                      Barra da Tijuca
                      <small>Zona Oeste · Av. Ayrton Senna, 2600</small>
                    </span>
                  </a>
                  <a
                    href="/urologista-bonsucesso"
                    role="menuitem"
                    className={currentPage === 'urologista-bonsucesso' ? 'is-sub-active' : ''}
                    onClick={(e) => handleLinkClick(e, 'urologista-bonsucesso')}
                  >
                    <span className="di">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <span>
                      Bonsucesso
                      <small>Zona Norte · Rua Cardoso de Morais, 201</small>
                    </span>
                  </a>
                  <a
                    href="/unidades"
                    role="menuitem"
                    className={currentPage === 'unidades' ? 'is-sub-active' : ''}
                    onClick={(e) => handleLinkClick(e, 'unidades')}
                  >
                    <span className="di">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <span>
                      Todas as Unidades & Teleconsulta
                      <small>Endereços, horários e atendimento online</small>
                    </span>
                  </a>
                </div>
              </div>

              <div className="nav-item">
                <a
                  href="/contato"
                  className={`nav-link ${currentPage === 'contato' ? 'is-active' : ''}`}
                  aria-current={currentPage === 'contato' ? 'page' : undefined}
                  onClick={(e) => handleLinkClick(e, 'contato')}
                >
                  Contato
                </a>
              </div>
            </nav>

            {/* Header Right Actions */}
            <div className="header-cta">
              <div className="hd-socials">
                <a
                  href={CLINIC_CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram da UroClínica Rio"
                >
                  <InstagramIcon />
                </a>
                <a
                  href={CLINIC_CONTACT.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube da UroClínica Rio"
                >
                  <YoutubeIcon />
                </a>
              </div>

              <button
                type="button"
                className="btn btn-salmon btn-sm header-book-btn"
                onClick={onOpenAppointmentModal}
              >
                <CalendarCheck className="w-4 h-4" /> Agendar consulta
              </button>

              <button
                type="button"
                className={`burger ${mobileMenuOpen ? 'open' : ''}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Fechar Menu' : 'Abrir Menu'}
                aria-expanded={mobileMenuOpen}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <nav aria-label="Menu Mobile">
          <a href="/" onClick={(e) => handleLinkClick(e, 'home')}>
            Início
          </a>

          <a href="/sobre" onClick={(e) => handleLinkClick(e, 'sobre')}>
            Sobre nós
          </a>
          <div className="sub">
            <a href="/sobre#corpo-clinico" onClick={(e) => handleLinkClick(e, 'sobre', 'corpo-clinico')}>
              › Corpo clínico de especialistas
            </a>
          </div>

          <a href="/cirurgia-robotica" onClick={(e) => handleLinkClick(e, 'cirurgia-robotica')}>
            Especialidades
          </a>
          <div className="sub">
            {SPECIALTIES.map((s) => (
              <a
                key={s.id}
                href={`/${s.slug}`}
                onClick={(e) => handleLinkClick(e, s.slug)}
              >
                › {s.title}
              </a>
            ))}
          </div>

          <a href="/unidades" onClick={(e) => handleLinkClick(e, 'unidades')}>
            Unidades
          </a>
          <div className="sub">
            <a
              href="/urologista-barra-da-tijuca"
              onClick={(e) => handleLinkClick(e, 'urologista-barra-da-tijuca')}
            >
              › Urologista na Barra da Tijuca
            </a>
            <a
              href="/urologista-bonsucesso"
              onClick={(e) => handleLinkClick(e, 'urologista-bonsucesso')}
            >
              › Urologista em Bonsucesso
            </a>
          </div>

          <a href="/contato" onClick={(e) => handleLinkClick(e, 'contato')}>
            Contato & Localização
          </a>
        </nav>

        <div className="mm-cta">
          <button
            type="button"
            className="btn btn-salmon"
            style={{ width: '100%' }}
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAppointmentModal();
            }}
          >
            <CalendarCheck className="w-4 h-4" /> Agendar Consulta Online
          </button>
          <a
            className="btn btn-ghost"
            style={{ width: '100%' }}
            href={CLINIC_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Phone className="w-4 h-4" /> WhatsApp {CLINIC_CONTACT.phone}
          </a>
        </div>
      </div>
    </>
  );
};
