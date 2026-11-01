import React from 'react';
import { PageRoute } from '../types';
import { DOCTORS } from '../data/clinicData';
import { PageHero } from '../components/PageHero';
import {
  Award,
  Compass,
  CalendarCheck,
  CheckCircle2,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageRoute, hash?: string) => void;
  onOpenAppointmentModal: (specialty?: string, doctor?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenAppointmentModal,
}) => {
  return (
    <>
      {/* UNIFIED PAGE HERO */}
      <PageHero
        breadcrumbs={[
          { label: 'Início', page: 'home' },
          { label: 'Sobre nós' },
        ]}
        eyebrow="Sobre a UroClínica Rio"
        title={
          <>
            Clínica de Urologia no{' '}
            <span className="serif-it nowrap">Rio de Janeiro</span>:{' '}
            excelência e <span className="nowrap">propósito humano</span>.
          </>
        }
        lead={'Unimos alta tecnologia cirúrgica robótica e minimamente invasiva a um olhar acolhedor, ético e atencioso nas unidades Barra da Tijuca e\u00A0Bonsucesso.'}
        onNavigate={onNavigate}
        primaryCta={{
          label: 'Agendar Consulta',
          onClick: () => onOpenAppointmentModal(),
        }}
        secondaryCta={{
          label: 'Ver Nossas Unidades',
          onClick: () => onNavigate('unidades'),
        }}
        trustItems={[
          { value: '100%', label: 'Urologistas Titulares SBU' },
          { value: '2', label: 'Unidades no Rio de Janeiro' },
          { value: 'Da Vinci', label: 'Certificação Internacional' },
        ]}
        media={{
          image: '/assets/corpo-clinico-neutro.jpg',
          alt: 'Corpo Clínico de Urologistas da UroClínica Rio',
          badge: 'Corpo Clínico SBU',
          floatCard: {
            title: 'Excelência Médica',
            subtitle: 'Cirurgiões com formação na França, EUA e Índia',
            icon: <Award className="w-6 h-6 text-[#F2A877]" />,
          },
        }}
      />

      {/* HISTÓRIA & PROPÓSITO */}
      <section className="section">
        <div className="wrap split">
          <div>
            <span className="eyebrow">Nossa Trajetória</span>
            <h2 className="h-lg" style={{ marginBottom: '1.2rem' }}>
              Pioneirismo em cirurgia urológica e{' '}
              <span className="serif-it nowrap">tratamento da próstata</span>
            </h2>
            <p className="lead">
              A UroClínica Rio foi concebida por médicos urologistas com extensa
              formação hospitalar e acadêmica, movidos pelo ideal de trazer ao{' '}
              <span className="nowrap">Rio de Janeiro</span> os tratamentos urológicos
              mais avançados{'\u00A0'}do{'\u00A0'}mundo.
            </p>
            <h3 style={{ fontSize: '1.22rem', margin: '1.4rem 0 0.5rem', color: 'var(--ink)' }}>
              Tecnologia Robótica Aliada à Escuta Atenta
            </h3>
            <p style={{ color: 'var(--slate)', lineHeight: 1.65 }}>
              Desde o início, nossa filosofia estabeleceu que tecnologia sem empatia é
              incompleta. Por isso, investimos nas plataformas cirúrgicas mais modernas
              — como o robô Da Vinci e o laser HoLEP — mantendo sempre o tempo de
              consulta generoso, a escuta atenta e o respeito irrestrito à individualidade
              do paciente.
            </p>
            <h3 style={{ fontSize: '1.22rem', margin: '1.4rem 0 0.5rem', color: 'var(--ink)' }}>
              Presença na Zona Oeste e Zona Norte do Rio
            </h3>
            <p style={{ color: 'var(--slate)', lineHeight: 1.65 }}>
              Com unidades na Barra da Tijuca e em Bonsucesso, cobrimos com facilidade
              a Zona Oeste e a Zona Norte do Rio, oferecendo consultas, exames
              especializados (como ecodoppler peniano) e acompanhamento cirúrgico nos
              hospitais mais renomados do estado.
            </p>
          </div>

          <div className="sp-media">
            <div className="fig">
              <img
                src="/assets/equipe-uroclinica.jpg"
                alt="Equipe de Urologistas da UroClínica Rio de Janeiro"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MISSÃO, VISÃO & VALORES */}
      <section className="section bg-cloud">
        <div className="wrap">
          <div className="sec-head center" style={{ marginBottom: '3rem' }}>
            <span className="eyebrow center">Princípios Fundamentais</span>
            <h2 className="h-xl">
              Missão, Visão e{' '}
              <span className="serif-it nowrap">Valores Médicos</span>
            </h2>
          </div>

          <div className="mv-grid" style={{ marginBottom: '3rem' }}>
            <article
              style={{
                background: '#fff',
                padding: '2.5rem',
                borderRadius: '20px',
                border: '1px solid var(--line)',
                boxShadow: '0 10px 30px rgba(74,84,112,.06)',
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  background: 'var(--ink-soft)',
                  color: 'var(--salmon)',
                  display: 'grid',
                  placeItems: 'center',
                  marginBottom: '1.2rem',
                }}
              >
                <Compass className="w-6 h-6" />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.6rem' }}>Nossa Missão</h3>
              <p style={{ color: 'var(--slate)', margin: 0, lineHeight: 1.6 }}>
                Proporcionar assistência urológica de excelência absoluta, integrando
                o que há de mais moderno em cirurgia robótica e procedimentos minimamente
                invasivos a um atendimento médico humano, ético e resolutivo.
              </p>
            </article>

            <article
              style={{
                background: '#fff',
                padding: '2.5rem',
                borderRadius: '20px',
                border: '1px solid var(--line)',
                boxShadow: '0 10px 30px rgba(74,84,112,.06)',
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  background: 'var(--ink-soft)',
                  color: 'var(--salmon)',
                  display: 'grid',
                  placeItems: 'center',
                  marginBottom: '1.2rem',
                }}
              >
                <Award className="w-6 h-6" />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.6rem' }}>Nossa Visão</h3>
              <p style={{ color: 'var(--slate)', margin: 0, lineHeight: 1.6 }}>
                Consolidar-se como a maior referência em cirurgia robótica,
                uro-oncologia e saúde masculina no Rio{'\u00A0'}de{'\u00A0'}Janeiro, reconhecida pelos
                pacientes e pela comunidade médica pela precisão e{'\u00A0'}acolhimento.
              </p>
            </article>
          </div>

          {/* 5 Valores com numeração editorial */}
          <div className="vcards-grid">
            {[
              {
                title: 'Humanização',
                desc: 'Acolhimento empático, escuta atenta e respeito às dores e ansiedades.',
              },
              {
                title: 'Excelência',
                desc: 'Rigor cirúrgico, formação contínua e certificações internacionais.',
              },
              {
                title: 'Ética Médica',
                desc: 'Transparência nas indicações, sigilo estrito e foco no bem do paciente.',
              },
              {
                title: 'Inovação',
                desc: 'Robô Da Vinci, lasers de ponta e biópsias com fusão de imagem.',
              },
              {
                title: 'Compromisso',
                desc: 'Presença e suporte médico constante antes, durante e após tratamentos.',
              },
            ].map((v, i) => (
              <article
                key={i}
                style={{
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: '16px',
                  padding: '1.5rem 1.2rem',
                  textAlign: 'center',
                }}
              >
                <div
                  className="di di-num"
                  aria-hidden="true"
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    margin: '0 auto 1rem',
                  }}
                >
                  0{i + 1}
                </div>
                <h3 style={{ fontSize: '1.08rem', color: 'var(--ink)', marginBottom: '0.4rem' }}>
                  {v.title}
                </h3>
                <span style={{ fontSize: '0.84rem', color: 'var(--slate)', lineHeight: 1.45, display: 'block' }}>
                  {v.desc}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CORPO CLÍNICO DETALHADO */}
      <section className="section" id="corpo-clinico">
        <div className="wrap">
          <div className="sec-head center" style={{ marginBottom: '3.5rem' }}>
            <span className="eyebrow center">Especialistas Titulares SBU</span>
            <h2 className="h-xl">
              Corpo Clínico de{' '}
              <span className="serif-it">Urologistas no <span className="nowrap">Rio de Janeiro</span></span>
            </h2>
            <p className="lead" style={{ margin: '1rem auto 0' }}>
              Conheça os médicos cirurgiões que lideram os atendimentos e cirurgias na{'\u00A0'}UroClínica{'\u00A0'}Rio.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {DOCTORS.map((doc, idx) => (
              <article
                key={doc.id}
                className="doctor-profile-card"
              >
                <div className={idx % 2 === 0 ? 'dp-media' : 'dp-media dp-media--right'}>
                  <div
                    style={{
                      aspectRatio: '1/1',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      position: 'relative',
                      boxShadow: '0 15px 30px rgba(74,84,112,.2)',
                    }}
                  >
                    <img
                      src={doc.photo}
                      alt={`${doc.name} — ${doc.role}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    {doc.responsavelTecnico && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '14px',
                          left: '14px',
                          background: 'var(--salmon)',
                          color: 'var(--ink)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.4em 0.8em',
                          borderRadius: '100px',
                          letterSpacing: '.06em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Responsável Técnico
                      </span>
                    )}
                  </div>
                </div>

                <div className="dp-body">
                  <span
                    style={{
                      color: 'var(--salmon-deep)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      letterSpacing: '.08em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '0.3rem',
                    }}
                  >
                    {doc.role}
                  </span>
                  <h3 style={{ fontSize: '1.8rem', color: 'var(--ink)', marginBottom: '0.4rem' }}>
                    {doc.name}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--slate-light)', marginBottom: '1.2rem' }}>
                    {doc.crm} {doc.rqe ? `· RQE ${doc.rqe}` : ''}
                  </div>

                  <p style={{ color: 'var(--slate)', lineHeight: 1.6, marginBottom: '1.4rem' }}>
                    {doc.bio}
                  </p>

                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.6rem', color: 'var(--ink)' }}>
                    Qualificações e Títulos:
                  </h4>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '0 0 1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.45rem',
                    }}
                  >
                    {doc.credentials.map((cred, cIdx) => (
                      <li
                        key={cIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.6rem',
                          fontSize: '0.9rem',
                          color: 'var(--ink)',
                        }}
                      >
                        <CheckCircle2
                          className="w-4 h-4 text-[#D9834E] flex-shrink-0"
                          style={{ marginTop: '2px' }}
                        />
                        <span>{cred}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className="btn btn-salmon btn-sm"
                    onClick={() => onOpenAppointmentModal(undefined, doc.name)}
                  >
                    <CalendarCheck className="w-4 h-4" /> Agendar consulta com {doc.name.split(' ')[1]}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ESTRUTURA & FOTOS */}
      <section className="section bg-cloud">
        <div className="wrap">
          <div className="sec-head center" style={{ marginBottom: '3rem' }}>
            <span className="eyebrow center">Nossa Estrutura Clínica</span>
            <h2 className="h-xl">
              Consultórios planejados para{' '}
              <span className="serif-it nowrap">conforto e privacidade</span>
            </h2>
          </div>

          <div className="other-specs-grid">
            <article style={{ borderRadius: '18px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(74,84,112,.15)', background: '#fff' }}>
              <img
                src="/assets/uroclinica-recepcao.jpg"
                alt="Recepção acolhedora da UroClínica Rio"
                style={{ width: '100%', height: '260px', objectFit: 'cover' }}
                loading="lazy"
              />
              <div style={{ padding: '1.4rem' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>
                  Recepção Acolhedora na Barra e Bonsucesso
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--slate)', margin: 0 }}>
                  Atendimento discreto e ambiente climatizado para seu conforto desde a chegada.
                </p>
              </div>
            </article>

            <article style={{ borderRadius: '18px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(74,84,112,.15)', background: '#fff' }}>
              <img
                src="/assets/uroclinica-consultorio.jpg"
                alt="Consultório urológico privativo na UroClínica Rio"
                style={{ width: '100%', height: '260px', objectFit: 'cover' }}
                loading="lazy"
              />
              <div style={{ padding: '1.4rem' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>
                  Consultórios Urológicos Privativos
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--slate)', margin: 0 }}>
                  Espaços planejados para consultas sem pressa e absoluto sigilo médico.
                </p>
              </div>
            </article>

            <article style={{ borderRadius: '18px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(74,84,112,.15)', background: '#fff' }}>
              <img
                src="/assets/uroclinica-sala-procedimentos.jpg"
                alt="Sala de procedimentos e exames Doppler na UroClínica Rio"
                style={{ width: '100%', height: '260px', objectFit: 'cover' }}
                loading="lazy"
              />
              <div style={{ padding: '1.4rem' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>
                  Sala de Exames e Procedimentos
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--slate)', margin: 0 }}>
                  Equipada para ultrassonografia peniana com Doppler e procedimentos ambulatoriais.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="wrap">
          <div className="cta-band">
            <div className="inner">
              <h2 className="h-xl">
                Venha conhecer a <span className="serif-it">UroClínica Rio</span>
              </h2>
              <p>
                Escolha entre nossas unidades na Barra da Tijuca ou em Bonsucesso e
                agende seu atendimento com nossos médicos especialistas.
              </p>
              <div className="btns">
                <button
                  type="button"
                  className="btn btn-salmon"
                  onClick={() => onOpenAppointmentModal()}
                >
                  <CalendarCheck className="w-4 h-4" /> Agendar Minha Consulta
                </button>
                <button
                  type="button"
                  className="btn btn-ghost-light"
                  onClick={() => onNavigate('unidades')}
                >
                  Ver Endereços e Como Chegar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
