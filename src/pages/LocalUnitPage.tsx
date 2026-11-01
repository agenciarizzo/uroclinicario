import React from 'react';
import { PageRoute } from '../types';
import { CLINIC_UNITS, CLINIC_CONTACT, SPECIALTIES } from '../data/clinicData';
import { PageHero } from '../components/PageHero';
import {
  MapPin,
  Clock,
  Phone,
  CalendarCheck,
  Car,
  ShieldCheck,
} from 'lucide-react';

interface LocalUnitPageProps {
  unitType: 'barra' | 'bonsucesso';
  onNavigate: (page: PageRoute, hash?: string) => void;
  onOpenAppointmentModal: (specialty?: string, doctor?: string) => void;
}

export const LocalUnitPage: React.FC<LocalUnitPageProps> = ({
  unitType,
  onNavigate,
  onOpenAppointmentModal,
}) => {
  const unit = unitType === 'barra' ? CLINIC_UNITS[0] : CLINIC_UNITS[1];
  const isBarra = unitType === 'barra';

  return (
    <>
      {/* UNIFIED PAGE HERO */}
      <PageHero
        breadcrumbs={[
          { label: 'Início', page: 'home' },
          { label: 'Unidades', page: 'unidades' },
          { label: unit.name },
        ]}
        eyebrow={`${unit.region} do Rio de Janeiro`}
        title={
          isBarra ? (
            <>
              Urologista na{' '}
              <span className="serif-it nowrap">Barra da Tijuca</span>:{' '}
              <span className="nowrap">Cirurgia Robótica</span> e{'\u00A0'}Próstata.
            </>
          ) : (
            <>
              Urologista em <span className="serif-it nowrap">Bonsucesso</span>:{' '}
              Próstata e <span className="nowrap">Cirurgia a Laser</span>.
            </>
          )
        }
        lead={
          isBarra
            ? 'Consultório de urologia de alto padrão na Av. Ayrton Senna, 2600. Atendimento especializado em cirurgia robótica Da Vinci, uro-oncologia, HoLEP, andrologia e estética peniana para a\u00A0Zona\u00A0Oeste.'
            : 'Clínica de urologia moderna na Rua Cardoso de Morais, 201. Cuidado humanizado, prevenção do câncer de próstata, cálculos renais e cirurgias minimamente invasivas para a Zona Norte e\u00A0Ilha\u00A0do\u00A0Governador.'
        }
        onNavigate={onNavigate}
        primaryCta={{
          label: `Agendar em ${unit.neighborhood}`,
          onClick: () => onOpenAppointmentModal(undefined, undefined),
        }}
        secondaryCta={{
          label: `WhatsApp ${CLINIC_CONTACT.phone}`,
          href: CLINIC_CONTACT.whatsappUrl,
        }}
        trustItems={[
          { value: 'SBU', label: 'Especialistas Titulares' },
          { value: '08h–17h', label: 'Segunda a Sexta' },
          { value: unit.region, label: unit.neighborhood },
        ]}
        media={{
          image: unit.photo,
          alt: `${unit.name} — Urologista em ${unit.neighborhood}`,
          badge: unit.region,
          floatCard: {
            title: unit.name,
            subtitle: unit.address,
            icon: <MapPin className="w-6 h-6 text-[#F2A877]" />,
          },
        }}
      />

      {/* DETALHES DA UNIDADE */}
      <section className="section">
        <div className="wrap split">
          <div>
            <span className="eyebrow">Localização & Acesso</span>
            <h2 className="h-lg" style={{ marginBottom: '1.2rem' }}>
              Clínica de urologia em{' '}
              <span className="serif-it nowrap">{unit.neighborhood}</span> com{' '}
              <span className="nowrap">infraestrutura completa</span>
            </h2>
            <p className="lead" style={{ marginBottom: '1.4rem' }}>
              {isBarra
                ? 'Localizada no conceituado Centro Empresarial Ayrton Senna, nossa unidade conta com ambiente exclusivo, recepção climatizada e sala privativa para pequenos procedimentos e ultrassonografia peniana com Doppler.'
                : 'Em ponto estratégico de Bonsucesso com acesso facilitado pela Linha Vermelha, Linha Amarela e Av. Brasil, oferecendo agilidade no deslocamento para moradores da Zona Norte, Ilha do Governador e Baixada Fluminense.'}
            </p>

            <div
              style={{
                background: 'var(--cloud)',
                padding: '1.6rem',
                borderRadius: '16px',
                marginBottom: '1.8rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
              }}
            >
              <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
                <MapPin className="w-5 h-5 text-[#D9834E] flex-shrink-0" style={{ marginTop: '2px' }} />
                <span>
                  <strong>Endereço:</strong> {unit.fullAddress}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center' }}>
                <Clock className="w-5 h-5 text-[#D9834E] flex-shrink-0" />
                <span>
                  <strong>Atendimento:</strong> {unit.hours}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center' }}>
                <Car className="w-5 h-5 text-[#D9834E] flex-shrink-0" />
                <span>
                  <strong>Estacionamento:</strong>{' '}
                  {isBarra
                    ? 'Rotativo com manobrista no local'
                    : 'Facilidade de estacionamento nas imediações'}
                </span>
              </div>
            </div>

            <h3 style={{ fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '0.6rem' }}>
              Bairros e Regiões Atendidas pela {unit.name}:
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.8rem' }}>
              {unit.coverageAreas.map((area, aIdx) => (
                <span
                  key={aIdx}
                  style={{
                    background: '#fff',
                    border: '1px solid var(--line-cool)',
                    borderRadius: '100px',
                    padding: '0.4em 0.9em',
                    fontSize: '0.82rem',
                    color: 'var(--ink)',
                    fontWeight: 600,
                  }}
                >
                  {area}
                </span>
              ))}
            </div>

            <button
              type="button"
              className="btn btn-salmon"
              onClick={() => onOpenAppointmentModal()}
            >
              <CalendarCheck className="w-4 h-4" /> Marcar Consulta em {unit.neighborhood}
            </button>
          </div>

          <div className="sp-media">
            <div className="fig">
              <img src={unit.photo} alt={`Consultório de Urologia em ${unit.neighborhood}`} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* PROCEDIMENTOS REALIZADOS */}
      <section className="section bg-cloud">
        <div className="wrap">
          <div className="sec-head center" style={{ marginBottom: '3rem' }}>
            <span className="eyebrow center">Serviços Disponíveis</span>
            <h2 className="h-xl">
              Tratamentos e exames urológicos em{' '}
              <span className="serif-it nowrap">{unit.neighborhood}</span>
            </h2>
          </div>

          <div className="other-specs-grid">
            {SPECIALTIES.slice(0, 6).map((spec) => (
              <article
                key={spec.id}
                style={{
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: '18px',
                  padding: '1.8rem',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onClick={() => onNavigate(spec.slug)}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'var(--ink-soft)',
                    color: 'var(--salmon)',
                    display: 'grid',
                    placeItems: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--ink)' }}>
                  {spec.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--slate)', margin: '0 0 1rem', lineHeight: 1.5 }}>
                  {spec.subtitle}
                </p>
                <span style={{ fontSize: '0.82rem', color: 'var(--salmon-deep)', fontWeight: 700 }}>
                  Saiba mais &rarr;
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-band">
            <div className="inner">
              <h2 className="h-xl">
                Seu urologista de confiança em{' '}
                <span className="serif-it nowrap">{unit.neighborhood}</span>
              </h2>
              <p>
                Agende hoje mesmo seu check-up urológico da próstata ou avaliação cirúrgica com nossos{'\u00A0'}médicos{'\u00A0'}especialistas.
              </p>
              <div className="btns">
                <button
                  type="button"
                  className="btn btn-salmon"
                  onClick={() => onOpenAppointmentModal()}
                >
                  <CalendarCheck className="w-4 h-4" /> Agendar Minha Consulta
                </button>
                <a
                  className="btn btn-ghost-light"
                  href={CLINIC_CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="w-4 h-4" /> WhatsApp {CLINIC_CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
