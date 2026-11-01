import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, MessageCircle } from 'lucide-react';
import { CLINIC_CONTACT, SPECIALTIES } from '../data/clinicData';

interface QuickAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedSpecialty?: string;
  preselectedDoctor?: string;
}

export const QuickAppointmentModal: React.FC<QuickAppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedSpecialty = '',
  preselectedDoctor = '',
}) => {
  const [unit, setUnit] = useState<'Barra da Tijuca' | 'Bonsucesso' | 'Teleconsulta'>('Barra da Tijuca');
  const [specialty, setSpecialty] = useState(preselectedSpecialty || 'Cirurgia Robótica Urológica');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [period, setPeriod] = useState('Manhã');
  const [healthInsurance, setHealthInsurance] = useState('Particular / Outro');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = `Olá! Gostaria de agendar uma consulta na UroClínica Rio.
*Nome:* ${name || 'Não informado'}
*Telefone:* ${phone || 'Não informado'}
*Unidade de preferência:* ${unit}
*Especialidade / Motivo:* ${specialty}${preselectedDoctor ? ` (Médico de interesse: ${preselectedDoctor})` : ''}
*Convênio / Modalidade:* ${healthInsurance}
*Período preferido:* ${period}`;

    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/5521976219403?text=${encoded}`;

    // Open WhatsApp
    window.open(waUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div style={{ marginBottom: '1.4rem' }}>
              <span className="eyebrow" style={{ marginBottom: '0.4rem' }}>
                Agendamento Rápido
              </span>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--ink)' }}>
                Marque sua consulta na <span className="serif-it">UroClínica Rio</span>
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--slate)', margin: '0.4rem 0 0' }}>
                Escolha a unidade mais conveniente ou agende teleconsulta por vídeo.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Unit selector buttons */}
              <div className="form-group">
                <label>Selecione a Unidade:</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {(['Barra da Tijuca', 'Bonsucesso', 'Teleconsulta'] as const).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setUnit(u)}
                      style={{
                        padding: '0.65rem 0.5rem',
                        borderRadius: '10px',
                        border: unit === u ? '2px solid var(--salmon-deep)' : '1px solid var(--line)',
                        background: unit === u ? 'var(--sand)' : '#fff',
                        fontWeight: unit === u ? 700 : 500,
                        fontSize: '0.82rem',
                        color: unit === u ? 'var(--salmon-deep)' : 'var(--ink)',
                        textAlign: 'center',
                        transition: 'all 0.2s',
                      }}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specialty selector */}
              <div className="form-group">
                <label>Especialidade ou Procedimento:</label>
                <select
                  className="form-control"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                >
                  <option value="Consulta Urológica Geral">Consulta Urológica Geral / Avaliação Preventiva</option>
                  {SPECIALTIES.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Check-up Preventivo da Próstata">Check-up Preventivo da Próstata</option>
                  <option value="Tratamento de Cálculo Renal">Tratamento de Cálculo Renal / Cólica</option>
                  <option value="Vasectomia ou Reversão">Vasectomia ou Reversão de Vasectomia</option>
                </select>
              </div>

              {/* Patient Name */}
              <div className="form-group">
                <label>Seu Nome Completo:</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Silva"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Patient Phone */}
              <div className="form-group">
                <label>WhatsApp / Celular com DDD:</label>
                <input
                  type="tel"
                  required
                  placeholder="Ex: (21) 98765-4321"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* Insurance */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <div className="form-group">
                  <label>Convênio / Plano:</label>
                  <select
                    className="form-control"
                    value={healthInsurance}
                    onChange={(e) => setHealthInsurance(e.target.value)}
                  >
                    <option value="Particular">Particular (com recibo para reembolso)</option>
                    <option value="Petrobras">Petrobras (AMS)</option>
                    <option value="Prevent Senior">Prevent Senior</option>
                    <option value="Porto Saúde">Porto Saúde</option>
                    <option value="FioSaúde">FioSaúde</option>
                    <option value="Caurj">Caurj</option>
                    <option value="Camarj">Camarj</option>
                    <option value="Fundação Saúde Itaú">Fundação Saúde Itaú</option>
                    <option value="Nuclep">Nuclep</option>
                    <option value="Ambep">Ambep</option>
                    <option value="Outro plano / Consultar">Outro convênio (consultar)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Preferência de Horário:</label>
                  <select
                    className="form-control"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                  >
                    <option value="Manhã (08h às 12h)">Manhã (08h às 12h)</option>
                    <option value="Tarde (13h às 17h)">Tarde (13h às 17h)</option>
                    <option value="Qualquer horário">Qualquer horário</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '1.4rem' }}>
                <button
                  type="submit"
                  className="btn btn-salmon"
                  style={{ width: '100%', fontSize: '0.9rem' }}
                >
                  <MessageCircle className="w-5 h-5" /> Enviar e Iniciar no WhatsApp
                </button>
              </div>

              <p
                style={{
                  textAlign: 'center',
                  fontSize: '0.78rem',
                  color: 'var(--slate-light)',
                  marginTop: '0.8rem',
                  marginBottom: 0,
                }}
              >
                Atendimento humanizado de segunda a sexta, das 08h às 17h.
              </p>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(37, 211, 102, 0.15)',
                color: '#25D366',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 1.2rem',
              }}
            >
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'var(--ink)' }}>
              Agendamento Encaminhado!
            </h3>
            <p style={{ color: 'var(--slate)', maxWidth: '44ch', margin: '0 auto 1.5rem' }}>
              Nossa equipe de recepção da UroClínica Rio recebeu sua solicitação e responderá no seu WhatsApp para confirmar o horário exato.
            </p>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
            >
              Concluir
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
