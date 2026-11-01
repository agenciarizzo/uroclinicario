export type PageRoute =
  | 'home'
  | 'sobre'
  | 'cirurgia-robotica'
  | 'holep'
  | 'uro-oncologia'
  | 'andrologia'
  | 'estetica-peniana'
  | 'ultrassom-peniano-doppler'
  | 'videolaparoscopia'
  | 'urologia-reconstrutora'
  | 'transplante-renal'
  | 'unidades'
  | 'urologista-barra-da-tijuca'
  | 'urologista-bonsucesso'
  | 'contato'
  | 'privacidade'
  | 'termos'
  | 'cookies';

export interface Doctor {
  id: string;
  name: string;
  role: string;
  crm: string;
  rqe?: string;
  photo: string;
  initials: string;
  tags: string[];
  bio: string;
  credentials: string[];
  responsavelTecnico?: boolean;
}

export interface SpecialtyItem {
  id: string;
  slug: PageRoute;
  title: string;
  subtitle: string;
  categoryTag: string;
  lead: string;
  description: string;
  heroImage: string;
  benefits: string[];
  indications: string[];
  faqs: { question: string; answer: string }[];
}

export interface UnitInfo {
  id: string;
  name: string;
  slug: PageRoute;
  address: string;
  fullAddress: string;
  postalCode: string;
  neighborhood: string;
  region: string;
  phone: string;
  whatsapp: string;
  hours: string;
  photo: string;
  coverageAreas: string[];
  directions: string[];
}

export interface ClinicalCase {
  id: string;
  tag: string;
  title: string;
  description: string;
  procedure: string;
  recovery: string;
  unit: string;
}
