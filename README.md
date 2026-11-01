# UroClínica Rio — Aplicação React (SPA)

Aplicação React moderna construída com Vite e TypeScript para a **UroClínica Rio**, referência em cirurgia robótica de próstata, HoLEP, uro-oncologia, andrologia e procedimentos urológicos minimamente invasivos no Rio de Janeiro (Barra da Tijuca e Bonsucesso).

## Tecnologias e Arquitetura

- **Framework:** React 19 + TypeScript + Vite
- **Estilização:** Design Tokens da Linha 2026 UroClínica Rio (Slate `#4A5470` / `#56617D`, Pêssego `#F2A877` / `#D9834E`, Periwinkle `#C7CDDB`), tipografia Bricolage Grotesque & Hanken Grotesk, formas orgânicas de blob renal e botões pill.
- **Roteamento:** SPA com suporte a histórico nativo do navegador e URLs amigáveis.
- **Ícones:** Lucide React + SVGs otimizados das marcas oficiais.
- **Integração:** Modal de agendamento ágil com seletor de unidades (Barra da Tijuca, Bonsucesso e Teleconsulta), médicos especialistas, convênios e encaminhamento direto para o WhatsApp oficial `(21) 97621-9403`.
- **SEO & Structured Data:** Schema.org JSON-LD para MedicalClinic, Physician e MedicalProcedure, sincronização de tags `<title>` e `<meta description>`.

## Especialidades e Páginas

1. **Início (`/`):** Apresentação, diferenciais, lista interativa de especialidades, destaque para Cirurgia Robótica Da Vinci, corpo clínico, casos clínicos, convênios, depoimentos e FAQ.
2. **Sobre Nós (`/sobre-nos`):** História, missão, visão, os 5 valores da clínica e biografia detalhada de cada cirurgião titular SBU.
3. **Especialidades Urológicas:**
   - Cirurgia Robótica Da Vinci (`/cirurgia-robotica`)
   - HoLEP · Próstata a Laser (`/holep`)
   - Uro-Oncologia Especializada (`/uro-oncologia`)
   - Andrologia & Saúde Masculina (`/andrologia`)
   - Estética Peniana & Harmonização Genital (`/estetica-peniana`)
   - Ultrassom Peniano com Doppler Colorido (`/ultrassom-peniano-doppler`)
   - Videolaparoscopia Urológica (`/videolaparoscopia`)
   - Urologia Reconstrutora (`/urologia-reconstrutora`)
   - Transplante Renal (`/transplante-renal`)
4. **Unidades (`/unidades`):**
   - Unidade Barra da Tijuca (`/urologista-barra-da-tijuca`) — Av. Ayrton Senna, 2600, Bloco 3, sala 213
   - Unidade Bonsucesso (`/urologista-bonsucesso`) — Rua Cardoso de Morais, 201, sala 503
   - Teleconsulta em Urologia por vídeo
5. **Contato (`/contato`):** Formulário de envio, central de atendimento, telefones e orientações de emergência.
6. **Políticas:** Privacidade, Cookies e Termos de Uso em conformidade com a LGPD e normas do CFM.

## Execução

```bash
# Instalação de dependências
npm install

# Desenvolvimento local
npm run dev

# Build de produção
npm run build
```
