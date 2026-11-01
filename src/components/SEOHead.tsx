import React, { useEffect } from 'react';
import { PageRoute } from '../types';
import { SPECIALTIES, FAQ_HOME } from '../data/clinicData';

interface SEOHeadProps {
  page: PageRoute;
  customTitle?: string;
  customDesc?: string;
  faqs?: { question: string; answer: string }[];
}

const SEO_MAP: Record<PageRoute, { title: string; desc: string }> = {
  home: {
    title: 'Urologista no Rio de Janeiro | Médico Especialista em Próstata e Cirurgia Robótica — UroClínica Rio',
    desc: 'Urologista e médico especialista em próstata no Rio de Janeiro: cirurgia robótica de próstata, uro-oncologia, andrologia e estética peniana. Agende sua consulta na Barra da Tijuca ou Bonsucesso.',
  },
  sobre: {
    title: 'Sobre a UroClínica Rio | Corpo Clínico e Especialistas em Urologia',
    desc: 'Conheça a história, tecnologia e o corpo clínico da UroClínica Rio. Cirurgiões certificados internacionalmente com atendimento humanizado na Barra da Tijuca e Bonsucesso.',
  },
  'cirurgia-robotica': {
    title: 'Cirurgia Robótica Urológica no Rio de Janeiro | UroClínica Rio',
    desc: 'Cirurgia robótica Da Vinci para próstata e rim no Rio de Janeiro. Procedimento minimamente invasivo com alta precisão, preservação funcional e rápida recuperação.',
  },
  holep: {
    title: 'HoLEP no Rio de Janeiro | Enucleação da Próstata a Laser sem Cortes',
    desc: 'Tratamento definitivo da próstata aumentada (HPB) com Holmium Laser HoLEP no Rio de Janeiro. Sem cortes, alta hospitalar rápida e alívio imediato.',
  },
  'uro-oncologia': {
    title: 'Uro-Oncologista no Rio de Janeiro | Tratamento de Câncer Urológico',
    desc: 'Tratamento especializado de câncer de próstata, rim e bexiga no Rio de Janeiro com biópsia por fusão, cirurgia robótica e suporte multidisciplinar.',
  },
  andrologia: {
    title: 'Andrologista no Rio de Janeiro | Saúde Sexual Masculina e Disfunção Erétil',
    desc: 'Tratamento especializado para disfunção erétil, ejaculação precoce, reposição de testosterona, doença de Peyronie e próteses penianas no Rio de Janeiro.',
  },
  'estetica-peniana': {
    title: 'Estética Peniana no Rio de Janeiro | Harmonização Genital Masculina',
    desc: 'Procedimentos seguros de estética e harmonização peniana no Rio de Janeiro. Ganho de calibre e simetria com biomateriais absorvíveis autorizados pela ANVISA.',
  },
  'ultrassom-peniano-doppler': {
    title: 'Ultrassom Peniano com Doppler no Rio de Janeiro | Exame Vascular',
    desc: 'Ecodoppler peniano colorido com fármaco-indução no Rio de Janeiro para diagnóstico de disfunção erétil, fuga venosa e placa de Peyronie.',
  },
  videolaparoscopia: {
    title: 'Videolaparoscopia Urológica no Rio de Janeiro | Cirurgia Minimamente Invasiva',
    desc: 'Cirurgia laparoscópica urológica para rim, adrenal e reconstrução no Rio de Janeiro. Menos dor pós-operatória e recuperação acelerada.',
  },
  'urologia-reconstrutora': {
    title: 'Urologia Reconstrutora no Rio de Janeiro | Uretroplastia com Mucosa Oral',
    desc: 'Tratamento cirúrgico avançado de estenose de uretra e reconstrução genital no Rio de Janeiro por cirurgiões com formação internacional.',
  },
  'transplante-renal': {
    title: 'Transplante Renal no Rio de Janeiro | Doador Vivo e Falecido',
    desc: 'Equipe especializada em transplante de rim no Rio de Janeiro. Nefrectomia por videolaparoscopia do doador e assistência completa ao receptor.',
  },
  unidades: {
    title: 'Unidades de Atendimento | Barra da Tijuca e Bonsucesso — UroClínica Rio',
    desc: 'Endereços e horários das unidades da UroClínica Rio: Av. Ayrton Senna na Barra da Tijuca e Rua Cardoso de Morais em Bonsucesso. Atendimento também por teleconsulta.',
  },
  'urologista-barra-da-tijuca': {
    title: 'Urologista na Barra da Tijuca | Cirurgia Robótica e Próstata — UroClínica Rio',
    desc: 'Consultório urológico completo na Av. Ayrton Senna, 2600 — Barra da Tijuca. Atendendo Barra, Recreio, Jacarepaguá e Zona Oeste.',
  },
  'urologista-bonsucesso': {
    title: 'Urologista em Bonsucesso RJ | Próstata, Cálculos e Cirurgia Minimamente Invasiva',
    desc: 'Urologista em Bonsucesso na Rua Cardoso de Morais, 201. Atendendo Zona Norte, Ilha do Governador, Olaria, Ramos e Baixada Fluminense.',
  },
  contato: {
    title: 'Contato e Agendamento | UroClínica Rio no Rio de Janeiro',
    desc: 'Agende sua consulta urológica presencial ou por teleconsulta na UroClínica Rio. Telefone e WhatsApp: (21) 97621-9403.',
  },
  privacidade: {
    title: 'Política de Privacidade | UroClínica Rio',
    desc: 'Nossa política de proteção de dados e privacidade em conformidade com a LGPD.',
  },
  termos: {
    title: 'Termos de Uso | UroClínica Rio',
    desc: 'Termos e condições de utilização do site da UroClínica Rio.',
  },
  cookies: {
    title: 'Política de Cookies | UroClínica Rio',
    desc: 'Informações sobre os cookies e armazenamento de dados em nosso site.',
  },
};

export const SEOHead: React.FC<SEOHeadProps> = ({ page, customTitle, customDesc, faqs }) => {
  const meta = SEO_MAP[page] || SEO_MAP.home;
  const title = customTitle || meta.title;
  const desc = customDesc || meta.desc;

  // Determine FAQ items for schema
  let activeFaqs = faqs;
  if (!activeFaqs) {
    const specialtyMatch = SPECIALTIES.find((s) => s.slug === page);
    if (specialtyMatch && specialtyMatch.faqs) {
      activeFaqs = specialtyMatch.faqs;
    } else if (page === 'home') {
      activeFaqs = FAQ_HOME;
    }
  }

  useEffect(() => {
    // 1. Title
    document.title = title;

    // 2. Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('content', desc);
      document.head.appendChild(metaDesc);
    }

    // 3. OpenGraph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', desc);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      const pagePath = page === 'home' ? '' : page;
      ogUrl.setAttribute('content', `https://uroclinicario.com.br/${pagePath}`);
    }

    // 4. Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const pagePath = page === 'home' ? '' : page;
      canonical.setAttribute('href', `https://uroclinicario.com.br/${pagePath}`);
    }

    // 5. JSON-LD FAQPage Schema Markup
    const FAQ_SCRIPT_ID = 'seo-faq-schema';
    const existingScript = document.getElementById(FAQ_SCRIPT_ID);

    if (activeFaqs && activeFaqs.length > 0) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: activeFaqs.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      };

      if (existingScript) {
        existingScript.textContent = JSON.stringify(faqSchema);
      } else {
        const script = document.createElement('script');
        script.id = FAQ_SCRIPT_ID;
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(faqSchema);
        document.head.appendChild(script);
      }
    } else if (existingScript) {
      existingScript.remove();
    }

    return () => {
      // Clean up FAQ script on unmount if appropriate
    };
  }, [title, desc, page, activeFaqs]);

  return null;
};
