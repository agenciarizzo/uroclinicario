import React from 'react';
import { PageRoute } from '../types';
import { CLINIC_CONTACT, SPECIALTIES, CLINIC_UNITS } from '../data/clinicData';
import { Phone } from 'lucide-react';

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

interface FooterProps {
  onNavigate: (page: PageRoute, hash?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageRoute, hash?: string) => {
    onNavigate(page, hash);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          {/* Brand Col */}
          <div>
            <div
              className="brand brand--light"
              style={{ marginBottom: '1.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.85rem' }}
              onClick={() => handleNav('home')}
            >
              <img
                className="logo-sym"
                src="/assets/ur_symbol_light.png"
                alt="Símbolo UroClínica Rio"
                style={{ height: '42px', width: 'auto' }}
              />
              <img
                className="f-white"
                src="/assets/ur_logo_light.png"
                alt="UroClínica Rio"
                style={{ height: '24px', width: 'auto' }}
              />
            </div>
            <p>
              Excelência urológica com conforto e confiança. Cirurgia robótica,
              uro-oncologia e cuidado humanizado no Rio de Janeiro, com unidades na Barra
              da Tijuca e em Bonsucesso.
            </p>
            <div className="f-socials">
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
              <a
                href={CLINIC_CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da UroClínica Rio"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Col */}
          <div>
            <h4>Navegação</h4>
            <ul className="f-list">
              <li>
                <button type="button" onClick={() => handleNav('home')}>
                  Início
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('sobre')}>
                  Sobre a clínica
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('sobre', 'corpo-clinico')}>
                  Corpo clínico
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('unidades')}>
                  Unidades & Estrutura
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('contato')}>
                  Contato & Agendamento
                </button>
              </li>
            </ul>
          </div>

          {/* Specialties Col */}
          <div>
            <h4>Especialidades</h4>
            <ul className="f-list">
              {SPECIALTIES.map((spec) => (
                <li key={spec.id}>
                  <button type="button" onClick={() => handleNav(spec.slug)}>
                    {spec.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Units Col */}
          <div>
            <h4>Unidades</h4>
            {CLINIC_UNITS.map((unit) => (
              <div key={unit.id} className="f-unit">
                <strong>
                  <button
                    type="button"
                    style={{ color: '#fff', fontWeight: 'bold' }}
                    onClick={() => handleNav(unit.slug)}
                  >
                    {unit.name.replace('Unidade ', '')}
                  </button>
                </strong>
                <span>{unit.address} · {unit.neighborhood} · RJ</span>
              </div>
            ))}

            <div className="rt-seal">
              <strong>Responsável Técnico</strong>
              {CLINIC_CONTACT.rt}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="fb-legal" style={{ margin: 0 }}>
            © 2026 Uroclínica Rio. Todos os direitos reservados. As informações deste site têm caráter informativo e educacional e não substituem a consulta médica.
          </p>
          <div className="fb-links">
            <button type="button" onClick={() => handleNav('privacidade')}>
              Privacidade
            </button>
            <button type="button" onClick={() => handleNav('cookies')}>
              Cookies
            </button>
            <button type="button" onClick={() => handleNav('termos')}>
              Termos de Uso
            </button>
          </div>
        </div>
      </div>

      {/* Developer Credit */}
      <div
        className="rizzo-credit"
        style={{
          background: '#050a10',
          borderTop: '1px solid rgba(255,255,255,.05)',
          padding: '1.2rem 0',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '.2em',
            color: '#64748b',
            fontWeight: 300,
            display: 'flex',
            alignItems: 'center',
            gap: '.5rem',
          }}
        >
          Desenvolvido por
          <a
            className="rizzo-credit-link"
            href="https://agenciarizzo.com.br/"
            target="_blank"
            rel="noreferrer"
            aria-label="Site da Agência Rizzo"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '.375rem',
              textDecoration: 'none',
              fontFamily: 'serif',
              textTransform: 'lowercase',
              letterSpacing: 'normal',
              fontSize: '14px',
            }}
          >
            <span style={{ color: '#fff', fontWeight: 700, letterSpacing: '-.01em' }}>agência</span>
            <span style={{ color: '#FFCC00', fontWeight: 900, letterSpacing: '-.03em' }}>|</span>
            <span style={{ color: '#fff', fontWeight: 700, letterSpacing: '-.01em' }}>rizzo</span>
          </a>
        </p>
      </div>
    </footer>
  );
};
