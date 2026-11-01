import React, { useState } from 'react';
import { PageRoute } from '../types';
import { CLINIC_CONTACT, CLINIC_UNITS } from '../data/clinicData';
import { PageHero } from '../components/PageHero';
import {
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageRoute, hash?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [unit, setUnit] = useState('Barra da Tijuca');
  const [subject, setSubject] = useState('Agendamento de Consulta');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `Olá! Mensagem enviada pelo site da UroClínica Rio:
*Nome:* ${name}
*Telefone:* ${phone}
*Email:* ${email || 'Não informado'}
*Unidade de interesse:* ${unit}
*Assunto:* ${subject}
*Mensagem:* ${message || 'Solicitação de agendamento / informações'}`;

    const waUrl = `https://wa.me/5521976219403?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <>
      {/* UNIFIED PAGE HERO */}
      <PageHero
        breadcrumbs={[
          { label: 'Início', page: 'home' },
          { label: 'Contato' },
        ]}
        eyebrow="Canais de Atendimento"
        title={
          <>
            Agende sua Consulta com Urologista no{' '}
            <span className="serif-it nowrap">Rio de Janeiro</span>.
          </>
        }
        lead={'Marque seu atendimento presencial na Barra da Tijuca ou em Bonsucesso, tire dúvidas sobre cirurgias robóticas ou consulte cobertura\u00A0de\u00A0convênios.'}
        onNavigate={onNavigate}
        secondaryCta={{
          label: `WhatsApp ${CLINIC_CONTACT.phone}`,
          href: CLINIC_CONTACT.whatsappUrl,
        }}
        trustItems={[
          { value: '(21) 97621-9403', label: 'Central WhatsApp & Telefone' },
          { value: '08h às 17h', label: 'Segunda a Sexta-feira' },
        ]}
      />

      {/* FORM & INFO SECTION */}
      <section className="section">
        <div className="wrap split">
          {/* Contact Information */}
          <div>
            <span className="eyebrow">Fale Conosco</span>
            <h2 className="h-lg" style={{ marginBottom: '1.2rem' }}>
              Central de <span className="serif-it nowrap">Agendamento e Unidades</span>
            </h2>
            <p className="lead" style={{ marginBottom: '2rem' }}>
              Nossa equipe de recepção médica está pronta para orientar sobre o médico
              mais indicado para o seu caso e verificar os{'\u00A0'}horários{'\u00A0'}disponíveis.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', marginBottom: '2.5rem' }}>
              <article
                style={{
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: '16px',
                  padding: '1.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.2rem',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'var(--ink-soft)',
                    color: 'var(--salmon)',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: '0.82rem',
                      textTransform: 'uppercase',
                      color: 'var(--slate)',
                      fontWeight: 700,
                      letterSpacing: '.06em',
                      marginBottom: '0.2rem',
                    }}
                  >
                    Telefone & WhatsApp Oficial
                  </h3>
                  <a
                    href={CLINIC_CONTACT.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'block', fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink)' }}
                  >
                    (21) 97621-9403
                  </a>
                  <span style={{ fontSize: '0.84rem', color: 'var(--slate)' }}>
                    Atendimento de Segunda a Sexta: 08:00 às 17:00
                  </span>
                </div>
              </article>

              {CLINIC_UNITS.map((u) => (
                <article
                  key={u.id}
                  style={{
                    background: 'var(--cloud)',
                    border: '1px solid var(--line)',
                    borderRadius: '16px',
                    padding: '1.4rem',
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                    <MapPin className="w-5 h-5 text-[#D9834E] flex-shrink-0" style={{ marginTop: '2px' }} />
                    <div>
                      <h3 style={{ fontSize: '1.08rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>
                        {u.name}
                      </h3>
                      <span style={{ fontSize: '0.9rem', color: 'var(--slate)', display: 'block', margin: '0.2rem 0' }}>
                        {u.fullAddress}
                      </span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--salmon-deep)', fontWeight: 600 }}>
                        {u.hours}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Aviso de emergência */}
            <div className="urgency-notice">
              <AlertCircle className="w-5 h-5 text-[#D9834E] flex-shrink-0" style={{ marginTop: '2px' }} />
              <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--ink)', lineHeight: 1.55 }}>
                <strong>Orientação para quadros agudos:</strong> Em caso de febre alta associada a dor lombar intensa, sangramento urinário volumoso ou retenção urinária aguda, dirija-se diretamente à emergência hospitalar de sua{'\u00A0'}preferência.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div
              style={{
                background: '#fff',
                border: '1px solid var(--line)',
                borderRadius: '24px',
                padding: 'clamp(28px, 4vw, 40px)',
                boxShadow: '0 20px 45px -20px rgba(74,84,112,.3)',
              }}
            >
              {!submitted ? (
                <>
                  <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'var(--ink)' }}>
                    Solicite seu Agendamento Online
                  </h2>
                  <p style={{ fontSize: '0.92rem', color: 'var(--slate)', marginBottom: '1.8rem' }}>
                    Preencha os dados abaixo para falar diretamente com nossa recepção via WhatsApp.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Nome Completo *</label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                      <div className="form-group">
                        <label>WhatsApp / Telefone *</label>
                        <input
                          type="tel"
                          required
                          className="form-control"
                          placeholder="(21) 90000-0000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label>E-mail (opcional)</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="seu@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                      <div className="form-group">
                        <label>Unidade de Interesse</label>
                        <select
                          className="form-control"
                          value={unit}
                          onChange={(e) => setUnit(e.target.value)}
                        >
                          <option value="Barra da Tijuca">Barra da Tijuca</option>
                          <option value="Bonsucesso">Bonsucesso</option>
                          <option value="Teleconsulta">Teleconsulta (Vídeo)</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Assunto / Especialidade</label>
                        <select
                          className="form-control"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        >
                          <option value="Agendamento de Consulta">Agendamento de Consulta</option>
                          <option value="Cirurgia Robótica">Cirurgia Robótica</option>
                          <option value="HoLEP Laser Próstata">HoLEP Laser Próstata</option>
                          <option value="Uro-Oncologia">Uro-Oncologia</option>
                          <option value="Andrologia / Disfunção Erétil">Andrologia / Disfunção Erétil</option>
                          <option value="Estética Peniana">Estética Peniana</option>
                          <option value="Dúvidas sobre Convênios">Dúvidas sobre Convênios</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Como podemos ajudar? (Mensagem)</label>
                      <textarea
                        rows={4}
                        className="form-control"
                        placeholder="Conte brevemente o motivo do contato, dúvidas ou horários preferidos..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-salmon"
                      style={{ width: '100%', fontSize: '0.92rem' }}
                    >
                      <MessageCircle className="w-5 h-5" /> Enviar Mensagem via WhatsApp
                    </button>
                  </form>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'rgba(37, 211, 102, 0.15)',
                      color: '#25D366',
                      display: 'grid',
                      placeItems: 'center',
                      margin: '0 auto 1.4rem',
                    }}
                  >
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', marginBottom: '0.6rem', color: 'var(--ink)' }}>
                    Mensagem Transmitida!
                  </h2>
                  <p style={{ color: 'var(--slate)', maxWidth: '44ch', margin: '0 auto 1.8rem', lineHeight: 1.6 }}>
                    Sua solicitação foi conectada ao WhatsApp da UroClínica Rio. Nossa recepção retornará com brevidade para confirmar os detalhes.
                  </p>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setSubmitted(false)}
                  >
                    Enviar Outra Mensagem
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
