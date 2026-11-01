import React, { useState } from 'react';
import { PageRoute } from '../types';
import {
  DOCTORS,
  SPECIALTIES,
  CONVENIOS,
  CLINICAL_CASES,
  FAQ_HOME,
  CLINIC_CONTACT,
} from '../data/clinicData';
import { PageHero } from '../components/PageHero';
import {
  CalendarCheck,
  ArrowRight,
  ShieldCheck,
  Award,
  Check,
  Plus,
  Phone,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageRoute, hash?: string) => void;
  onOpenAppointmentModal: (specialty?: string, doctor?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenAppointmentModal,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <>
      {/* UNIFIED HERO SECTION */}
      <PageHero
        eyebrow="Urologia de Referência no Rio de Janeiro"
        title={
          <>
            Urologista no <span className="serif-it nowrap">Rio de Janeiro</span>:{' '}
            <span className="nowrap">Cirurgia Robótica</span> e{'\u00A0'}Próstata.
          </>
        }
        lead={'Médicos especialistas em cirurgia robótica de próstata, HoLEP a laser, uro-oncologia e saúde sexual masculina. Precisão cirúrgica de ponta com acolhimento humano na Barra da Tijuca e em\u00A0Bonsucesso.'}
        onNavigate={onNavigate}
        primaryCta={{
          label: 'Agendar Consulta',
          onClick: () => onOpenAppointmentModal(),
        }}
        secondaryCta={{
          label: 'Conhecer a Clínica',
          onClick: () => onNavigate('sobre'),
        }}
        trustItems={[
          { value: '+15', label: 'Anos de experiência' },
          { value: '100%', label: 'Cirurgiões Titulares SBU' },
          { value: '2', label: 'Unidades: Barra & Bonsucesso' },
        ]}
        media={{
          image: '/assets/corpo-clinico-rio.jpg',
          alt: 'Corpo Clínico de Urologistas da UroClínica Rio de Janeiro',
          badge: 'Centro Robótico',
          floatCard: {
            title: 'Cirurgia Robótica Da Vinci',
            subtitle: 'Padrão ouro em recuperação e preservação funcional',
            icon: <ShieldCheck className="w-6 h-6 text-[#F2A877]" />,
          },
        }}
      />

      {/* MARQUEE RIBBON */}
      <div className="marquee" aria-hidden="true">
        <div className="track">
          <span>Cirurgia Robótica Da Vinci</span>
          <span>HoLEP · Próstata a Laser</span>
          <span>Uro-Oncologia Especializada</span>
          <span>Andrologia & Saúde Masculina</span>
          <span>Estética Peniana</span>
          <span>Ultrassom Doppler</span>
          <span>Urologia Reconstrutora</span>
          <span>Unidade Barra da Tijuca</span>
          <span>Unidade Bonsucesso</span>
          <span>Cirurgia Robótica Da Vinci</span>
          <span>HoLEP · Próstata a Laser</span>
          <span>Uro-Oncologia Especializada</span>
        </div>
      </div>

      {/* DIFERENCIAIS */}
      <section className="section bg-cloud">
        <div className="wrap">
          <div className="sec-head center" style={{ marginBottom: '3rem' }}>
            <span className="eyebrow center">Por que escolher a UroClínica Rio</span>
            <h2 className="h-xl">
              Cuidado urológico unindo{' '}
              <span className="serif-it">tecnologia robótica e{'\u00A0'}ética</span>
            </h2>
          </div>

          <div className="diff-grid">
            <article className="diff">
              <div className="di di-num" aria-hidden="true">
                01
              </div>
              <h3>Cirurgia Robótica <span className="nowrap">Da Vinci</span></h3>
              <p>
                Procedimentos minimamente invasivos para próstata e rim com visão 3D
                ampliada em 10x e preservação milimétrica de{'\u00A0'}estruturas{'\u00A0'}vitais.
              </p>
            </article>

            <article className="diff">
              <div className="di di-num" aria-hidden="true">
                02
              </div>
              <h3>Urologistas com <span className="nowrap">Formação Internacional</span></h3>
              <p>
                Cirurgiões titulares da SBU com fellowships na França, Estados Unidos,
                Índia e Sérvia, atuando na vanguarda da{'\u00A0'}urologia{'\u00A0'}mundial.
              </p>
            </article>

            <article className="diff">
              <div className="di di-num" aria-hidden="true">
                03
              </div>
              <h3>Unidades na <span className="nowrap">Barra e Bonsucesso</span></h3>
              <p>
                Consultórios modernos na Zona Oeste (Av. Ayrton Senna) e na Zona Norte
                (Rua Cardoso de Morais), com fácil acesso, estacionamento e{'\u00A0'}conforto.
              </p>
            </article>

            <article className="diff">
              <div className="di di-num" aria-hidden="true">
                04
              </div>
              <h3>Atendimento <span className="nowrap">Urológico Humanizado</span></h3>
              <p>
                Tempo dedicado para ouvir cada paciente, esclarecer diagnósticos sem
                pressa e oferecer acompanhamento próximo no pré e{'\u00A0'}pós-operatório.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ESPECIALIDADES */}
      <section className="section">
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
            <div className="sec-head">
              <span className="eyebrow">Áreas de Atuação</span>
              <h2 className="h-xl">
                Especialidades Urológicas e{' '}
                <span className="serif-it nowrap">Tratamentos Avançados</span>
              </h2>
            </div>
            <a
              href="/cirurgia-robotica"
              className="link-arrow"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('cirurgia-robotica');
              }}
            >
              Ver todas em detalhe <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          <div className="esp-list">
            {SPECIALTIES.map((spec, idx) => (
              <article
                key={spec.id}
                className="esp-row"
                onClick={() => onNavigate(spec.slug)}
              >
                <div className="num" aria-hidden="true">0{idx + 1}</div>
                <div className="esp-main">
                  <div className="esp-thumb">
                    <img src={spec.heroImage} alt={`${spec.title} no Rio de Janeiro`} loading="lazy" />
                  </div>
                  <div>
                    <h3>{spec.title}</h3>
                    <p>{spec.subtitle} — {spec.lead.slice(0, 115)}...</p>
                  </div>
                </div>
                <div className="esp-go" aria-hidden="true">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE SPLIT */}
      <section className="section bg-cloud">
        <div className="wrap split">
          <div className="sp-media">
            <div className="fig">
              <img
                src="/assets/equipe-uroclinica.jpg"
                alt="Equipe de Urologistas da UroClínica Rio de Janeiro"
                loading="lazy"
              />
            </div>
          </div>
          <div>
            <span className="eyebrow">Sobre a UroClínica Rio</span>
            <h2 className="h-lg" style={{ marginBottom: '1.2rem' }}>
              Clínica de urologia de referência com{' '}
              <span className="serif-it nowrap">inovação cirúrgica</span>
            </h2>
            <p className="lead">
              A UroClínica Rio nasceu do propósito de oferecer medicina urológica de
              padrão mundial no Rio{'\u00A0'}de{'\u00A0'}Janeiro. Reunimos cirurgiões altamente
              qualificados para diagnosticar e tratar doenças da próstata, rins,
              bexiga e saúde sexual masculina com segurança e{'\u00A0'}tranquilidade.
            </p>
            <div className="values">
              <div className="value">
                <div className="vk">
                  <ShieldCheck className="w-4 h-4 text-[#F2A877]" />
                </div>
                <div>
                  <h3 className="value-h3">Rigor Técnico e Ética Médica</h3>
                  <span>Decisões clínicas fundamentadas nas mais sólidas diretrizes internacionais.</span>
                </div>
              </div>
              <div className="value">
                <div className="vk">
                  <Award className="w-4 h-4 text-[#F2A877]" />
                </div>
                <div>
                  <h3 className="value-h3">Equipe Multidisciplinar Titular SBU</h3>
                  <span>Uro-oncologistas, cirurgiões robóticos e andrologistas dedicados.</span>
                </div>
              </div>
            </div>

            <div className="stats-row">
              <div className="stat">
                <b>98%</b>
                <span>Satisfação dos pacientes</span>
              </div>
              <div className="stat">
                <b>24h</b>
                <span>Média de alta hospitalar robótica</span>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <button
                type="button"
                className="btn btn-salmon"
                onClick={() => onNavigate('sobre')}
              >
                Conheça nossa trajetória
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CIRURGIA ROBÓTICA SPOTLIGHT */}
      <section className="section bg-ink robo">
        <div className="wrap split">
          <div>
            <span className="eyebrow" style={{ color: 'var(--salmon)' }}>
              Padrão Ouro Internacional
            </span>
            <h2 className="h-lg" style={{ color: '#fff', marginBottom: '1.2rem' }}>
              Cirurgia Robótica de Próstata e Rim:{' '}
              <span className="serif-it nowrap">precisão milimétrica</span>
            </h2>
            <p className="lead">
              A plataforma robótica Da{'\u00A0'}Vinci permite ao cirurgião realizar dissecções com
              visão tridimensional ampliada em 10 vezes e pinças articuladas com 7
              graus de liberdade, filtrando{'\u00A0'}tremores{'\u00A0'}involuntários.
            </p>

            <ul className="robo-list">
              <li>
                <div className="ck">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="robo-item-h3">Preservação Funcional da Continência e Ereção</h3>
                  <span>Maior índice de manutenção da potência sexual e controle urinário precoce.</span>
                </div>
              </li>
              <li>
                <div className="ck">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="robo-item-h3">Procedimento Minimamente Invasivo</h3>
                  <span>Pequenas incisões, mínimo sangramento, menos dor e cicatrizes discretas.</span>
                </div>
              </li>
              <li>
                <div className="ck">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="robo-item-h3">Recuperação Hospitalar Acelerada</h3>
                  <span>Alta hospitalar habitualmente em 24 a 48 horas e breve retorno à rotina.</span>
                </div>
              </li>
            </ul>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn btn-salmon"
                onClick={() => onOpenAppointmentModal('Cirurgia Robótica Urológica')}
              >
                <CalendarCheck className="w-4 h-4" /> Avaliação para Cirurgia Robótica
              </button>
              <button
                type="button"
                className="btn btn-ghost-light"
                onClick={() => onNavigate('cirurgia-robotica')}
              >
                Entender o Procedimento
              </button>
            </div>
          </div>

          <div className="sp-media">
            <div className="fig">
              <img
                src="/assets/cirurgia-robotica-davinci.jpg"
                alt="Cirurgia Robótica Da Vinci para Próstata e Rim no Rio de Janeiro"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CORPO CLÍNICO */}
      <section className="section" id="corpo-clinico">
        <div className="wrap">
          <div className="sec-head center" style={{ marginBottom: '3rem' }}>
            <span className="eyebrow center">Corpo Clínico</span>
            <h2 className="h-xl">
              Urologistas especialistas de{' '}
              <span className="serif-it nowrap">reconhecimento nacional</span>
            </h2>
            <p className="lead" style={{ margin: '1rem auto 0' }}>
              Nossos médicos urologistas atuam nos principais hospitais do Rio{'\u00A0'}de{'\u00A0'}Janeiro
              com certificações das mais respeitadas{'\u00A0'}instituições{'\u00A0'}internacionais.
            </p>
          </div>

          <div className="docs-grid">
            {DOCTORS.map((doc) => (
              <article key={doc.id} className="doc">
                <div className="doc-photo">
                  <img src={doc.photo} alt={`${doc.name} — ${doc.role}`} loading="lazy" />
                  {doc.responsavelTecnico && (
                    <span className="ribbon">Resp. Técnico</span>
                  )}
                </div>
                <div className="doc-body">
                  <h3>{doc.name}</h3>
                  <div className="role">{doc.role}</div>
                  <div className="doc-meta-line">
                    {doc.tags.slice(0, 3).map((tag, tIdx) => (
                      <React.Fragment key={tIdx}>
                        {tIdx > 0 && <span className="meta-dot" aria-hidden="true">·</span>}
                        <span>{tag}</span>
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="crm">{doc.crm}</div>
                  <button
                    type="button"
                    className="doc-book"
                    onClick={() => onOpenAppointmentModal(undefined, doc.name)}
                  >
                    <CalendarCheck className="w-4 h-4" /> Agendar com {doc.name.split(' ')[1]}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CASOS CLÍNICOS / SUCESSO */}
      <section className="section bg-cloud">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow center">Resultados Clínicos</span>
            <h2 className="h-xl">
              Casos clínicos em{' '}
              <span className="serif-it">cirurgia urológica e{'\u00A0'}próstata</span>
            </h2>
            <p className="lead" style={{ margin: '0.8rem auto 0' }}>
              Exemplos reais de pacientes que realizaram tratamentos minimamente invasivos na{'\u00A0'}UroClínica{'\u00A0'}Rio.
            </p>
          </div>

          <div className="cases-grid">
            {CLINICAL_CASES.map((cs) => (
              <article key={cs.id} className="case">
                <span className="case-kicker">{cs.tag}</span>
                <h3>{cs.title}</h3>
                <p>{cs.description}</p>
                <div className="case-meta">
                  <div className="cm">
                    <span>Procedimento Realizado</span>
                    <b>{cs.procedure}</b>
                  </div>
                  <div className="cm">
                    <span>Evolução Clínica</span>
                    <b>{cs.recovery}</b>
                  </div>
                  <div className="cm">
                    <span>Unidade</span>
                    <b>{cs.unit}</b>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="cases-note">
            * Casos anonimizados em conformidade com as diretrizes do CFM e sigilo médico. Cada organismo reage de maneira individual e os resultados dependem da avaliação de cada quadro.
          </p>
        </div>
      </section>

      {/* CONVÊNIOS */}
      <section className="section">
        <div className="wrap center">
          <span className="eyebrow center">Facilidades e Cobertura</span>
          <h2 className="h-lg" style={{ marginBottom: '1.2rem' }}>
            Convênios Médicos e <span className="serif-it">Planos de Saúde Atendidos</span>
          </h2>
          <p className="lead" style={{ maxWidth: '58ch', margin: '0 auto 2.4rem' }}>
            Atendemos pacientes conveniados e particulares nas unidades Barra da Tijuca e Bonsucesso, com auxílio completo para reembolso médico.
          </p>

          <div className="conv-grid">
            {CONVENIOS.map((conv, i) => (
              <div key={i} className="conv">
                <h3>{conv}</h3>
              </div>
            ))}
          </div>

          <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--slate)' }}>
            Não encontrou seu plano de saúde?{' '}
            <a
              href={CLINIC_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--salmon-deep)', fontWeight: 700 }}
            >
              Consulte nossa secretaria no WhatsApp para verificar cobertura
            </a>
          </p>
        </div>
      </section>

      {/* QUOTE */}
      <section className="section bg-cloud">
        <div className="wrap">
          <div className="quote">
            <span className="qmark" aria-hidden="true">“</span>
            <p>
              A urologia moderna não trata apenas exames ou patologias cirúrgicas; ela
              cuida da dignidade, da autonomia e da tranquilidade de cada paciente e de
              sua família.
            </p>
            <div className="qby">
              Corpo Clínico UroClínica Rio · Barra da Tijuca & Bonsucesso
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head center" style={{ marginBottom: '3rem' }}>
            <span className="eyebrow center">Tire suas dúvidas</span>
            <h2 className="h-xl">
              Perguntas frequentes sobre{' '}
              <span className="serif-it">Urologista no <span className="nowrap">Rio de Janeiro</span></span>
            </h2>
          </div>

          <div className="faq">
            {FAQ_HOME.map((item, idx) => (
              <div
                key={idx}
                className={`faq-item ${openFaqIndex === idx ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-q"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={openFaqIndex === idx}
                >
                  <h3 className="faq-h3">{item.question}</h3>
                  <div className="fi" aria-hidden="true">
                    <Plus className="w-4 h-4" />
                  </div>
                </button>
                <div className="faq-a">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="cta-band">
            <div className="inner">
              <span className="eyebrow" style={{ color: 'var(--salmon)' }}>
                Agendamento Simplificado
              </span>
              <h2 className="h-xl">
                Agende sua consulta com{' '}
                <span className="serif-it nowrap">urologista especialista</span> no{' '}
                <span className="nowrap">Rio de Janeiro</span>
              </h2>
              <p>
                Atendimento presencial na Barra{'\u00A0'}da{'\u00A0'}Tijuca e em Bonsucesso, ou
                teleconsulta por vídeo com{'\u00A0'}toda{'\u00A0'}comodidade.
              </p>
              <div className="btns">
                <button
                  type="button"
                  className="btn btn-salmon"
                  onClick={() => onOpenAppointmentModal()}
                >
                  <CalendarCheck className="w-4 h-4" /> Marcar Consulta Agora
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
