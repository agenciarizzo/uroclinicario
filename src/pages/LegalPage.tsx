import React from 'react';
import { PageRoute } from '../types';
import { PageHero } from '../components/PageHero';

interface LegalPageProps {
  pageType: 'privacidade' | 'termos' | 'cookies';
  onNavigate: (page: PageRoute) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ pageType, onNavigate }) => {
  const label =
    pageType === 'privacidade'
      ? 'Política de Privacidade'
      : pageType === 'termos'
      ? 'Termos de Uso'
      : 'Política de Cookies';

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: 'Início', page: 'home' },
          { label },
        ]}
        eyebrow="Transparência & Conformidade"
        title={
          <>
            {pageType === 'privacidade' && (
              <>
                Política de <span className="serif-it">Privacidade</span> —{' '}
                <span className="nowrap">UroClínica Rio</span>.
              </>
            )}
            {pageType === 'termos' && (
              <>
                Termos de <span className="serif-it">Uso</span> —{' '}
                <span className="nowrap">UroClínica Rio</span>.
              </>
            )}
            {pageType === 'cookies' && (
              <>
                Política de <span className="serif-it">Cookies</span> —{' '}
                <span className="nowrap">UroClínica Rio</span>.
              </>
            )}
          </>
        }
        lead={'Em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018) e diretrizes éticas do Conselho Federal de\u00A0Medicina\u00A0(CFM).'}
        onNavigate={onNavigate}
        compact
      />

      <section className="section">
        <div className="wrap" style={{ maxWidth: '860px' }}>
          {pageType === 'privacidade' && (
            <div style={{ lineHeight: 1.7, color: 'var(--ink)' }}>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.8rem' }}>
                1. Coleta e Finalidade dos Dados
              </h2>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--salmon-deep)' }}>
                Atendimento e Agendamento de Pacientes
              </h3>
              <p>
                A <strong>UroClínica Rio</strong> preza pela segurança e confidencialidade de todos os dados pessoais e de saúde fornecidos por nossos pacientes e visitantes do website. Coletamos dados básicos através de nossos formulários de contato e agendamento (nome, telefone, e-mail e unidade pretendida) exclusivamente com a finalidade de estabelecer comunicação e prestar assistência médica.
              </p>

              <h2 style={{ fontSize: '1.6rem', margin: '2rem 0 0.8rem' }}>
                2. Tratamento e Sigilo Médico
              </h2>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--salmon-deep)' }}>
                Proteção pelo Código de Ética Médica
              </h3>
              <p>
                Os dados de saúde informados em consultas ou pré-agendamentos estão resguardados pelo mais rigoroso sigilo médico profissional, conforme preconizado pelo Código de Ética Médica e resoluções do Conselho Federal de Medicina (CFM). Em nenhuma hipótese compartilhamos, vendemos ou comercializamos informações pessoais de pacientes com terceiros.
              </p>

              <h2 style={{ fontSize: '1.6rem', margin: '2rem 0 0.8rem' }}>
                3. Direitos do Titular (LGPD)
              </h2>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--salmon-deep)' }}>
                Acesso, Retificação e Exclusão
              </h3>
              <p>
                O titular dos dados tem o direito de solicitar a qualquer momento a confirmação da existência de tratamento, o acesso aos dados, a correção de dados incompletos ou inexatos, ou a exclusão de suas informações de cadastro de contato, mediante solicitação formal à nossa secretaria através do e-mail <code>contato@uroclinicario.com.br</code>.
              </p>

              <h2 style={{ fontSize: '1.6rem', margin: '2rem 0 0.8rem' }}>
                4. Segurança da Informação
              </h2>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--salmon-deep)' }}>
                Criptografia e Controle de Acesso
              </h3>
              <p>
                Adotamos medidas técnicas e administrativas aptas a proteger os dados pessoais de acessos não autorizados e de situações acidentais ou ilícitas de destruição, perda ou alteração, empregando criptografia SSL/TLS em todas as comunicações.
              </p>
            </div>
          )}

          {pageType === 'termos' && (
            <div style={{ lineHeight: 1.7, color: 'var(--ink)' }}>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.8rem' }}>
                1. Objeto e Caráter Informativo
              </h2>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--salmon-deep)' }}>
                Orientação Educacional em Urologia
              </h3>
              <p>
                As informações, textos, imagens e conteúdos disponibilizados neste website têm caráter exclusivamente informativo e educativo sobre urologia, cirurgia robótica e saúde masculina. <strong>Nenhum conteúdo publicado substitui o exame clínico presencial, o diagnóstico formal ou a conduta orientada por um médico devidamente registrado no CRM.</strong>
              </p>

              <h2 style={{ fontSize: '1.6rem', margin: '2rem 0 0.8rem' }}>
                2. Propriedade Intelectual
              </h2>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--salmon-deep)' }}>
                Direitos Autorais e Marca
              </h3>
              <p>
                Todos os textos, logotipos, marcas, símbolos gráficos e materiais visuais presentes no site são de propriedade da UroClínica Rio ou utilizados sob licença expressa, sendo vedada sua reprodução ou veiculação sem prévia anuência por escrito.
              </p>

              <h2 style={{ fontSize: '1.6rem', margin: '2rem 0 0.8rem' }}>
                3. Responsabilidade Técnica Médica
              </h2>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--salmon-deep)' }}>
                Registro no CRM-RJ e RQE
              </h3>
              <p>
                O website e as práticas médicas da clínica encontram-se sob a responsabilidade técnica do <strong>Dr. Diego Coutinho Perdigão</strong> (CRM-RJ 52 934895 · RQE 32110), em observância às resoluções do CFM que regem a publicidade médica.
              </p>
            </div>
          )}

          {pageType === 'cookies' && (
            <div style={{ lineHeight: 1.7, color: 'var(--ink)' }}>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.8rem' }}>
                1. O que são Cookies?
              </h2>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--salmon-deep)' }}>
                Funcionamento no Navegador
              </h3>
              <p>
                Cookies são pequenos arquivos de texto armazenados no navegador do usuário ao visitar páginas web. Eles ajudam a memorizar preferências de navegação e a analisar métricas agregadas de audiência do site.
              </p>

              <h2 style={{ fontSize: '1.6rem', margin: '2rem 0 0.8rem' }}>
                2. Tipos de Cookies Utilizados
              </h2>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--salmon-deep)' }}>
                Cookies Essenciais e Analíticos
              </h3>
              <p>
                Utilizamos cookies essenciais para o funcionamento seguro da aplicação, bem como ferramentas analíticas de tráfego (como Google Analytics) que coletam estatísticas anônimas sobre número de visitas e páginas mais acessadas, com o objetivo de aprimorar a experiência do usuário.
              </p>

              <h2 style={{ fontSize: '1.6rem', margin: '2rem 0 0.8rem' }}>
                3. Como Gerenciar ou Desativar
              </h2>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--salmon-deep)' }}>
                Controle pelo Usuário
              </h3>
              <p>
                O visitante pode a qualquer momento configurar seu navegador de internet para recusar ou excluir cookies. Para mais esclarecimentos sobre a nossa política de dados, entre em contato através de <code>contato@uroclinicario.com.br</code>.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
