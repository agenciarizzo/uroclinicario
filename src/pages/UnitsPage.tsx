import React from 'react';
import { PageRoute } from '../types';
import { CLINIC_UNITS, CLINIC_CONTACT } from '../data/clinicData';
import { PageHero } from '../components/PageHero';
import {
  MapPin,
  Clock,
  Phone,
  CalendarCheck,
  CheckCircle2,
  Video,
} from 'lucide-react';

interface UnitsPageProps {
  onNavigate: (page: PageRoute, hash?: string) => void;
  onOpenAppointmentModal: (specialty?: string, doctor?: string) => void;
}

export const UnitsPage: React.FC<UnitsPageProps> = ({
  onNavigate,
  onOpenAppointmentModal,
}) => {
  return (
    <>
      {/* UNIFIED PAGE HERO */}
      <PageHero
        breadcrumbs={[
          { label: 'Início', page: 'home' },
          { label: 'Unidades' },
        ]}
        eyebrow="Nossas Unidades no Rio de Janeiro"
        title={
          <>
            Urologista na{' '}
            <span className="serif-it nowrap">Barra da Tijuca</span> e{'\u00A0'}em{' '}
            <span className="serif-it nowrap">Bonsucesso</span>.
          </>
        }
        lead={'Duas unidades estrategicamente localizadas na Zona Oeste e Zona Norte do Rio de Janeiro, oferecendo consultórios climatizados, salas de exames privativas e máxima\u00A0comodidade.'}
        onNavigate={onNavigate}
        primaryCta={{
          label: 'Agendar Consulta',
          onClick: () => onOpenAppointmentModal(),
        }}
        secondaryCta={{
          label: 'Falar no WhatsApp',
          href: CLINIC_CONTACT.whatsappUrl,
        }}
        trustItems={[
          { value: 'Barra', label: 'Av. Ayrton Senna, 2600' },
          { value: 'Bonsucesso', label: 'Cardoso de Morais, 201' },
          { value: 'Online', label: 'Teleconsulta por Vídeo' },
        ]}
        media={{
          image: '/assets/uroclinica-recepcao.jpg',
          alt: 'Recepção e estrutura das unidades da UroClínica Rio',
          badge: 'Zona Oeste & Zona Norte',
          floatCard: {
            title: '2 Unidades + Telemedicina',
            subtitle: 'Estacionamento, acessibilidade e fácil acesso',
            icon: <MapPin className="w-6 h-6 text-[#F2A877]" />,
          },
        }}
      />

      {/* UNIDADES CARDS */}
      <section className="section">
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {CLINIC_UNITS.map((unit, idx) => (
            <article
              key={unit.id}
              id={unit.id}
              className="unit-showcase-card"
            >
              <div style={{ padding: 'clamp(28px, 4vw, 44px)', order: idx % 2 === 0 ? 1 : 2 }}>
                <span
                  style={{
                    color: 'var(--salmon-deep)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.4rem',
                  }}
                >
                  {unit.region} do Rio de Janeiro
                </span>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--ink)' }}>
                  {unit.name} — Urologista em {unit.neighborhood}
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.6rem' }}>
                  <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <MapPin className="w-5 h-5 text-[#D9834E] flex-shrink-0" style={{ marginTop: '2px' }} />
                    <span style={{ fontSize: '0.95rem', color: 'var(--ink)' }}>
                      <strong>Endereço:</strong> {unit.fullAddress}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                    <Clock className="w-5 h-5 text-[#D9834E] flex-shrink-0" />
                    <span style={{ fontSize: '0.95rem', color: 'var(--ink)' }}>
                      <strong>Horário de Atendimento:</strong> {unit.hours}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                    <Phone className="w-5 h-5 text-[#D9834E] flex-shrink-0" />
                    <span style={{ fontSize: '0.95rem', color: 'var(--ink)' }}>
                      <strong>Telefone & WhatsApp:</strong> {unit.phone}
                    </span>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.08rem', color: 'var(--ink)', marginBottom: '0.6rem' }}>
                  Infraestrutura e Acessibilidade em {unit.neighborhood}:
                </h3>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 1.6rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.45rem',
                  }}
                >
                  {unit.directions.map((d, dIdx) => (
                    <li
                      key={dIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.6rem',
                        fontSize: '0.9rem',
                        color: 'var(--slate)',
                      }}
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-[#D9834E] flex-shrink-0"
                        style={{ marginTop: '2px' }}
                      />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn btn-salmon btn-sm"
                    onClick={() => onOpenAppointmentModal(undefined, undefined)}
                  >
                    <CalendarCheck className="w-4 h-4" /> Agendar nesta Unidade
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => onNavigate(unit.slug)}
                  >
                    Ver página de {unit.neighborhood}
                  </button>
                </div>
              </div>

              <div style={{ order: idx % 2 === 0 ? 2 : 1 }}>
                <img
                  src={unit.photo}
                  alt={`${unit.name} — UroClínica Rio`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '320px' }}
                  loading="lazy"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TELECONSULTA */}
      <section className="section bg-cloud">
        <div className="wrap split">
          <div>
            <span className="eyebrow">Atendimento Sem Fronteiras</span>
            <h2 className="h-lg" style={{ marginBottom: '1.2rem' }}>
              Teleconsulta em Urologia:{' '}
              <span className="serif-it">segunda opinião e{'\u00A0'}acompanhamento</span>
            </h2>
            <p className="lead">
              Para pacientes de outras cidades, estados ou do exterior, ou para quem
              necessita de uma segunda opinião médica sobre câncer de próstata ou
              cirurgia robótica, realizamos consultas por videoconferência com emissão
              de receitas e pedidos de exames digitais válidos em{'\u00A0'}todo{'\u00A0'}o{'\u00A0'}Brasil.
            </p>
            <h3 style={{ fontSize: '1.12rem', margin: '1.2rem 0 0.7rem', color: 'var(--ink)' }}>
              Diferenciais da Consulta Urológica Online:
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
              }}
            >
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <CheckCircle2 className="w-5 h-5 text-[#D9834E]" />
                <span>Avaliação e segunda opinião sobre laudos de biópsia e ressonâncias</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <CheckCircle2 className="w-5 h-5 text-[#D9834E]" />
                <span>Prescrição médica digital com assinatura ICP-Brasil</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <CheckCircle2 className="w-5 h-5 text-[#D9834E]" />
                <span>Planejamento pré-operatório para cirurgias robóticas no Rio de Janeiro</span>
              </li>
            </ul>

            <button
              type="button"
              className="btn btn-salmon"
              onClick={() => onOpenAppointmentModal('Teleconsulta em Urologia')}
            >
              <Video className="w-4 h-4" /> Agendar Teleconsulta
            </button>
          </div>

          <div className="sp-media">
            <div className="fig">
              <img
                src="/assets/consulta-urologia.jpg"
                alt="Teleconsulta com Urologista da UroClínica Rio"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
