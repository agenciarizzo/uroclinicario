import React, { useState } from 'react';
import { PageRoute } from '../types';
import { SPECIALTIES, CLINIC_CONTACT } from '../data/clinicData';
import { PageHero } from '../components/PageHero';
import {
  CalendarCheck,
  CheckCircle2,
  Phone,
  Plus,
  ShieldCheck,
  Award,
} from 'lucide-react';

interface SpecialtyPageProps {
  specialtySlug: PageRoute;
  onNavigate: (page: PageRoute, hash?: string) => void;
  onOpenAppointmentModal: (specialty?: string, doctor?: string) => void;
}

export const SpecialtyPage: React.FC<SpecialtyPageProps> = ({
  specialtySlug,
  onNavigate,
  onOpenAppointmentModal,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const specialty = SPECIALTIES.find((s) => s.slug === specialtySlug) || SPECIALTIES[0];

  // Find other specialties for quick navigation
  const otherSpecialties = SPECIALTIES.filter((s) => s.slug !== specialtySlug).slice(0, 3);

  const renderHeroTitle = () => {
    if (specialty.title.includes('Robótica')) {
      return (
        <>
          Cirurgia Robótica Urológica no{' '}
          <span className="serif-it nowrap">Rio de Janeiro</span>.
        </>
      );
    }
    if (specialty.title.includes('HoLEP')) {
      return (
        <>
          HoLEP no <span className="serif-it nowrap">Rio de Janeiro</span>:{' '}
          Cirurgia de <span className="nowrap">Próstata a Laser</span>.
        </>
      );
    }
    if (specialty.title.includes('Uro-Oncologia')) {
      return (
        <>
          Uro-Oncologista no <span className="serif-it nowrap">Rio de Janeiro</span>:{' '}
          Próstata, <span className="nowrap">Rim e Bexiga</span>.
        </>
      );
    }
    if (specialty.title.includes('Andrologia')) {
      return (
        <>
          Andrologista no <span className="serif-it nowrap">Rio de Janeiro</span>:{' '}
          Saúde <span className="nowrap">Sexual Masculina</span>.
        </>
      );
    }
    if (specialty.title.includes('Estética')) {
      return (
        <>
          Estética Peniana no <span className="serif-it nowrap">Rio de Janeiro</span>:{' '}
          <span className="nowrap">Harmonização Genital</span>.
        </>
      );
    }
    if (specialty.title.includes('Ultrassom')) {
      return (
        <>
          Ultrassom Peniano com Doppler no{' '}
          <span className="serif-it nowrap">Rio de Janeiro</span>.
        </>
      );
    }
    if (specialty.title.includes('Videolaparoscopia')) {
      return (
        <>
          Videolaparoscopia Urológica no{' '}
          <span className="serif-it nowrap">Rio de Janeiro</span>.
        </>
      );
    }
    if (specialty.title.includes('Reconstrutora')) {
      return (
        <>
          Urologia Reconstrutora no{' '}
          <span className="serif-it nowrap">Rio de Janeiro</span>:{'\u00A0'}Uretroplastia.
        </>
      );
    }
    return (
      <>
        {specialty.title} no <span className="serif-it nowrap">Rio de Janeiro</span>.
      </>
    );
  };

  return (
    <>
      {/* UNIFIED PAGE HERO */}
      <PageHero
        breadcrumbs={[
          { label: 'Início', page: 'home' },
          { label: 'Especialidades', page: 'cirurgia-robotica' },
          { label: specialty.title },
        ]}
        eyebrow={specialty.categoryTag}
        title={renderHeroTitle()}
        lead={specialty.lead}
        onNavigate={onNavigate}
        primaryCta={{
          label: 'Agendar Consulta Especializada',
          onClick: () => onOpenAppointmentModal(specialty.title),
        }}
        secondaryCta={{
          label: 'Dúvidas pelo WhatsApp',
          href: `https://wa.me/5521976219403?text=${encodeURIComponent(
            `Olá! Gostaria de saber mais sobre ${specialty.title} na UroClínica Rio.`
          )}`,
        }}
        trustItems={[
          { value: 'SBU', label: 'Especialistas Titulares' },
          { value: '2', label: 'Unidades: Barra & Bonsucesso' },
          { value: '100%', label: 'Atendimento Individualizado' },
        ]}
        media={{
          image: specialty.heroImage,
          alt: `${specialty.title} no Rio de Janeiro — UroClínica Rio`,
          badge: specialty.categoryTag,
          floatCard: {
            title: specialty.title,
            subtitle: specialty.subtitle,
            icon: <Award className="w-6 h-6 text-[#F2A877]" />,
          },
        }}
      />

      {/* OVERVIEW & INDICATIONS */}
      <section className="section">
        <div className="wrap split">
          <div>
            <span className="eyebrow">Entenda o Procedimento</span>
            <h2 className="h-lg" style={{ marginBottom: '1.2rem' }}>
              Como funciona: <span className="serif-it">{specialty.subtitle}</span>
            </h2>
            <p className="lead" style={{ marginBottom: '1.2rem' }}>
              {specialty.description}
            </p>

            <h3 style={{ fontSize: '1.3rem', margin: '2rem 0 1rem', color: 'var(--ink)' }}>
              Principais Indicações Clínicas para {specialty.title}
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
              }}
            >
              {specialty.indications.map((ind, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.8rem',
                    fontSize: '0.98rem',
                    color: 'var(--ink)',
                  }}
                >
                  <CheckCircle2
                    className="w-5 h-5 text-[#D9834E] flex-shrink-0"
                    style={{ marginTop: '2px' }}
                  />
                  <span>{ind}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="sp-media">
            <div className="fig">
              <img
                src={specialty.heroImage}
                alt={`Especialista em ${specialty.title} na Barra da Tijuca e Bonsucesso`}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS COM NUMERAÇÃO EDITORIAL */}
      <section className="section bg-cloud">
        <div className="wrap">
          <div className="sec-head center" style={{ marginBottom: '3rem' }}>
            <span className="eyebrow center">Vantagens & Segurança</span>
            <h2 className="h-xl">
              Benefícios de realizar{' '}
              <span className="serif-it">{specialty.title}</span> na{' '}
              <span className="nowrap">UroClínica Rio</span>
            </h2>
          </div>

          <div className="benefits-grid">
            {specialty.benefits.map((benefit, i) => {
              const benefitTitles = [
                'Mínimo Trauma e Segurança',
                'Recuperação Acelerada',
                'Pós-operatório Confortável',
                'Preservação Funcional',
                'Resultados Duradouros',
              ];
              return (
                <article key={i} className="benefit-card">
                  <div className="di di-num" aria-hidden="true">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="benefit-title">
                      {benefitTitles[i] || `Padrão de Excelência 0${i + 1}`}
                    </h3>
                    <p className="benefit-desc">{benefit}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* JORNADA DO PACIENTE & GALERIA CIRÚRGICA REAL */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: '2.8rem' }}>
            <span className="eyebrow">Protocolo de Atendimento</span>
            <h2 className="h-xl">
              Como funciona a jornada de{' '}
              <span className="serif-it">{specialty.title}</span>
            </h2>
          </div>

          <div className="journey-grid">
            <article className="journey-step">
              <span className="journey-num">01. Avaliação Especializada</span>
              <h3>Consulta Detalhada & Diagnóstico</h3>
              <p>
                Análise criteriosa de exames de imagem, histórico clínico e sintomas nas unidades Barra{'\u00A0'}da{'\u00A0'}Tijuca ou Bonsucesso, definindo a indicação precisa sem pressa.
              </p>
            </article>

            <article className="journey-step">
              <span className="journey-num">02. Alta Tecnologia</span>
              <h3>Procedimento Minimamente Invasivo</h3>
              <p>
                Realização nos melhores centros cirúrgicos do Rio{'\u00A0'}de{'\u00A0'}Janeiro (Rede{'\u00A0'}D&apos;Or, Copa{'\u00A0'}Star e Samaritano) ou em sala de procedimentos dedicada na clínica.
              </p>
            </article>

            <article className="journey-step">
              <span className="journey-num">03. Pós-operatório Próximo</span>
              <h3>Recuperação Rápida & Suporte</h3>
              <p>
                Acompanhamento direto com a equipe médica titular para retorno breve à rotina, priorizando continência, função sexual e qualidade{'\u00A0'}de{'\u00A0'}vida.
              </p>
            </article>
          </div>

          {specialtySlug === 'holep' && (
            <div className="surgical-gallery">
              <figure className="sg-item">
                <img
                  src="/assets/holep-laser-holmio-megapulse.jpg"
                  alt="Plataforma Laser Holmium Megapulse para cirurgia HoLEP de próstata"
                  loading="lazy"
                />
                <figcaption>Laser Holmium Megapulse de alta potência</figcaption>
              </figure>
              <figure className="sg-item">
                <img
                  src="/assets/holep-equipe-cirurgica-uroclinica.jpg"
                  alt="Equipe cirúrgica da UroClínica Rio em procedimento HoLEP"
                  loading="lazy"
                />
                <figcaption>Equipe cirúrgica titular em enucleação prostática</figcaption>
              </figure>
              <figure className="sg-item">
                <img
                  src="/assets/holep-procedimento-equipe.jpg"
                  alt="Procedimento endoscópico HoLEP sem cortes abdominais"
                  loading="lazy"
                />
                <figcaption>Técnica 100% endoscópica com alta em 24 horas</figcaption>
              </figure>
            </div>
          )}

          {specialtySlug !== 'holep' && (
            <div className="surgical-gallery">
              <figure className="sg-item">
                <img
                  src="/assets/centro-cirurgico.jpg"
                  alt="Centro cirúrgico de alta complexidade — UroClínica Rio"
                  loading="lazy"
                />
                <figcaption>Atuação nos principais hospitais do Rio de Janeiro</figcaption>
              </figure>
              <figure className="sg-item">
                <img
                  src="/assets/uroclinica-consultorio-2.jpg"
                  alt="Consultório urológico na Barra da Tijuca e Bonsucesso"
                  loading="lazy"
                />
                <figcaption>Consultórios privativos na Barra e em Bonsucesso</figcaption>
              </figure>
              <figure className="sg-item">
                <img
                  src="/assets/uroclinica-sala-procedimentos.jpg"
                  alt="Sala de exames e procedimentos urológicos da UroClínica Rio"
                  loading="lazy"
                />
                <figcaption>Infraestrutura equipada para diagnóstico e acompanhamento</figcaption>
              </figure>
            </div>
          )}
        </div>
      </section>

      {/* FAQ DA ESPECIALIDADE */}
      {specialty.faqs && specialty.faqs.length > 0 && (
        <section className="section bg-cloud">
          <div className="wrap">
            <div className="sec-head center" style={{ marginBottom: '3rem' }}>
              <span className="eyebrow center">Perguntas Comuns</span>
              <h2 className="h-xl">
                Dúvidas frequentes sobre{' '}
                <span className="serif-it">{specialty.title} <span className="nowrap">no RJ</span></span>
              </h2>
            </div>

            <div className="faq">
              {specialty.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`faq-item ${openFaq === idx ? 'open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-q"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    aria-expanded={openFaq === idx}
                  >
                    <h3 className="faq-h3">{faq.question}</h3>
                    <div className="fi" aria-hidden="true">
                      <Plus className="w-4 h-4" />
                    </div>
                  </button>
                  <div className="faq-a">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* OUTRAS ESPECIALIDADES */}
      <section className="section bg-cloud">
        <div className="wrap">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '2.5rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <span className="eyebrow">Continue Navegando</span>
              <h2 className="h-lg">
                Outras especialidades urológicas{' '}
                <span className="serif-it nowrap">no Rio de Janeiro</span>
              </h2>
            </div>
          </div>

          <div className="other-specs-grid">
            {otherSpecialties.map((item) => (
              <article
                key={item.id}
                style={{
                  background: '#fff',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: '1px solid var(--line)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onClick={() => onNavigate(item.slug)}
              >
                <div style={{ height: '170px', overflow: 'hidden' }}>
                  <img
                    src={item.heroImage}
                    alt={`${item.title} no Rio de Janeiro`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
                <div style={{ padding: '1.4rem' }}>
                  <span
                    style={{
                      fontSize: '0.74rem',
                      color: 'var(--salmon-deep)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.categoryTag}
                  </span>
                  <h3 style={{ fontSize: '1.18rem', margin: '0.3rem 0 0.5rem', color: 'var(--ink)' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--slate)', margin: 0 }}>
                    {item.subtitle}
                  </p>
                </div>
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
                Agende sua avaliação de{' '}
                <span className="serif-it">{specialty.title}</span>
              </h2>
              <p>
                Converse com nossa equipe na Barra{'\u00A0'}da{'\u00A0'}Tijuca ou Bonsucesso e receba um diagnóstico preciso com a segurança dos melhores hospitais do{'\u00A0'}Rio{'\u00A0'}de{'\u00A0'}Janeiro.
              </p>
              <div className="btns">
                <button
                  type="button"
                  className="btn btn-salmon"
                  onClick={() => onOpenAppointmentModal(specialty.title)}
                >
                  <CalendarCheck className="w-4 h-4" /> Marcar Consulta
                </button>
                <a
                  className="btn btn-ghost-light"
                  href={`https://wa.me/5521976219403?text=${encodeURIComponent(
                    `Olá! Gostaria de agendar uma consulta para ${specialty.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="w-4 h-4" /> Falar com Atendente
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
