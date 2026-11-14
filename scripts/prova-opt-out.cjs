// Prova da medição do lote 4 (rizzo-os docs/SITES_MEDICAO_ADS_META_MAPA.md §7.3 e §7.11.4), a 390 px.
// Uso:
//   ANTES  (produção atual, só coleta os eventos GA4 de cada caminho de contato):
//     node scripts/prova-opt-out.cjs - https://uroclinicario.com.br provas/eventos-antes.json
//   DEPOIS (o diretório do site servido no domínio real, rota interceptada; roda os 10 casos e compara com o ANTES):
//     node scripts/prova-opt-out.cjs . https://uroclinicario.com.br provas/eventos-antes.json
// Todo pedido ao Google (menos o gtag.js em si), ao WhatsApp e ao Doctoralia é respondido com 204: nada chega na conta
// e ninguém recebe mensagem. O `tel:` não gera pedido nenhum. Sai com código 1 se algum caso reprovar.
const {chromium} = require('playwright');
const fs = require('fs');
const path = require('path');

const DIR = process.argv[2] === '-' ? null : path.resolve(process.argv[2] || '.');
const BASE = (process.argv[3] || '').replace(/\/$/, '');
const ANTES_JSON = process.argv[4] ? path.resolve(process.argv[4]) : null;
if (!/^https:\/\//.test(BASE)) {
  console.error('uso: node scripts/prova-opt-out.cjs <diretório | -> https://<domínio> [eventos-antes.json]');
  process.exit(2);
}
const AW = 'AW-620455971';
const ROTULO = 'zxJzCOn6y70CEKPQ7acC';
const tipos = {html: 'text/html', js: 'application/javascript', css: 'text/css', svg: 'image/svg+xml', webp: 'image/webp', jpg: 'image/jpeg', png: 'image/png', woff2: 'font/woff2', mp4: 'video/mp4', json: 'application/json', xml: 'application/xml', txt: 'text/plain', ico: 'image/x-icon', avif: 'image/avif', zip: 'application/zip'};
const GOOGLE = /googletagmanager\.com|google-analytics\.com|analytics\.google\.com|googleadservices\.com|doubleclick\.net|google\.com(\.br)?\/(?!maps)|googlesyndication\.com/;
const SAIDAS = /^https:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com|www\.doctoralia\.com\.br)\//;
const AUTOMATICOS = /^(page_view|user_engagement|scroll|first_visit|session_start)$/;
const WA_URL = 'https://wa.me/5521976219403?text=teste';

// rotas limpas do vercel.json (rewrites) pra servir o site no domínio real
const rewrites = {};
if (DIR) {
  try {
    for (const r of JSON.parse(fs.readFileSync(path.join(DIR, 'vercel.json'), 'utf8')).rewrites || []) rewrites[r.source] = r.destination;
  } catch {}
}

async function contexto(b, escolha) {
  const ctx = await b.newContext({viewport: {width: 390, height: 844}});
  const linha = [];
  if (DIR) {
    await ctx.route(`${BASE}/**`, async (route) => {
      const u = new URL(route.request().url());
      let p = decodeURIComponent(u.pathname);
      if (rewrites[p]) p = rewrites[p];
      else if (p === '/') p = '/index.html';
      else if (!path.extname(p) && fs.existsSync(path.join(DIR, p + '.html'))) p += '.html';
      const f = path.join(DIR, p);
      if (!f.startsWith(DIR) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) return route.fulfill({status: 404, body: 'nao'});
      route.fulfill({status: 200, body: fs.readFileSync(f), contentType: tipos[f.split('.').pop()] || 'application/octet-stream'});
    });
  }
  await ctx.route(GOOGLE, (route) => {
    const r = route.request();
    const u = `${r.url()} ${r.postData() || ''}`;
    if (/googletagmanager\.com\/gtag\/js/.test(r.url())) {
      linha.push(`etiqueta ${new URL(r.url()).searchParams.get('id')}`);
      return route.continue();
    }
    const gcs = /[?&\s]gcs=([^&\s]+)/.exec(u)?.[1] ?? '-';
    const conv = /pagead\/(1p-)?conversion\/(\d+)/.exec(u)?.[2];
    if (conv) linha.push(`ads AW-${conv}/${/[?&]label=([^&\s]+)/.exec(u)?.[1] ?? ''} ${gcs}`);
    else {
      const tid = /[?&]tid=([^&\s]+)/.exec(u)?.[1] ?? '';
      const ens = [...u.matchAll(/(?:^|[?&\s])en=([^&\s]+)/g)].map((m) => m[1]);
      for (const en of ens.length ? ens : ['?']) linha.push(`hit ${tid} ${en} ${gcs}`);
    }
    route.fulfill({status: 204, body: ''});
  });
  await ctx.route(SAIDAS, (route) => {
    linha.push(`saida ${new URL(route.request().url()).hostname}`);
    route.fulfill({status: 204, body: ''});
  });
  if (escolha) {
    await ctx.addInitScript((e) => {
      try {
        localStorage.setItem('site:consentimento', e);
      } catch {}
    }, escolha);
  }
  return {ctx, linha};
}

const casos = [];
const caso = (nome, ok, info) => {
  casos.push(ok);
  console.log(`${ok ? '✅' : '❌'} ${nome.padEnd(66)} ${JSON.stringify(info)}`);
};
const googleNa = (hs) => hs.filter((h) => !/^saida /.test(h));
const GA4 = (hs, en) => hs.some((h) => new RegExp(`^hit G-04JZ3XEL1C ${en} `).test(h));
const ADS = (hs) => hs.filter((h) => h.startsWith(`ads ${AW}/${ROTULO} G111`));
const wait = (p, ms) => p.waitForTimeout(ms);

// os caminhos de contato da página: todo link wa.me / api.whatsapp / doctoralia / tel
const SEL_CONTATO = 'a[href*="wa.me"], a[href*="api.whatsapp"], a[href*="whatsapp.com"], a[href*="doctoralia.com.br"], a[href^="tel:"]';

async function eventosPorCaminho(b, pagina) {
  // lista dos links (a partir de um contexto com a rota do site)
  const {ctx: cl} = await contexto(b, null);
  const pl = await cl.newPage();
  await pl.goto(`${BASE}${pagina}`, {waitUntil: 'load'});
  await wait(pl, 1500);
  const links = await pl.$$eval(SEL_CONTATO, (as) => as.map((a, i) => ({i, href: a.getAttribute('href'), txt: (a.getAttribute('aria-label') || a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 28)})));
  await cl.close();
  const saida = {};
  const fila = links.slice();
  const rodar = async (l) => {
    const {ctx, linha} = await contexto(b, null);
    const p = await ctx.newPage();
    await p.goto(`${BASE}${pagina}`, {waitUntil: 'load'});
    await wait(p, 3500);
    const i = linha.length;
    await p.evaluate(({idx, sel}) => document.querySelectorAll(sel)[idx].click(), {idx: l.i, sel: SEL_CONTATO});
    await wait(p, 6500);
    const dep = linha.slice(i);
    const evs = [...new Set(dep.filter((h) => /^hit G-04JZ3XEL1C /.test(h)).map((h) => h.split(' ')[2]).filter((e) => !AUTOMATICOS.test(e)))].sort();
    const chave = `${pagina} #${l.i} ${l.txt} → ${(l.href || '').replace(/\?.*/, '').slice(0, 56)}`;
    saida[chave] = {eventos: evs, ads: ADS(dep).length > 0, doctoralia: /doctoralia/.test(l.href || '')};
    await ctx.close();
  };
  while (fila.length) await Promise.all(fila.splice(0, 4).map(rodar));
  return saida;
}

(async () => {
  const b = await chromium.launch();

  // ---- casos 1 a 9 (só no build local) ----
  if (DIR) {
    // 1 e 2: o aviso e a carga sem tocar nele
    {
      const {ctx, linha} = await contexto(b, null);
      const p = await ctx.newPage();
      await p.goto(`${BASE}/`, {waitUntil: 'load'});
      await wait(p, 4000);
      const aviso = await p.evaluate(() => document.querySelector('[aria-label="Aviso de cookies"]')?.innerText.replace(/\s+/g, ' ') ?? null);
      caso('1. aviso na tela (texto da DM, Recusar e Ok)', !!aviso && /Medimos as visitas para melhorar o atendimento, conforme a LGPD\. Saiba mais na política de cookies\./.test(aviso) && /Recusar/.test(aviso) && /\bOk\b/.test(aviso), {aviso});
      // o aviso não pode impedir o clique do WhatsApp flutuante
      const livre = await p.evaluate(() => {
        const f = document.querySelector('.wa-float').getBoundingClientRect();
        const el = document.elementFromPoint(f.left + f.width / 2, f.top + f.height / 2);
        return !!el && !!el.closest('.wa-float');
      });
      caso('1b. aviso não cobre o botão flutuante do WhatsApp a 390 px', livre, {livre});
      const carga = [...linha];
      caso('2. carga sem tocar no aviso: page_view com gcs=G111', carga.some((h) => /^hit G-04JZ3XEL1C page_view G111$/.test(h)), {carga});
      let i = linha.length;
      await p.locator('a.wa-float').click();
      await wait(p, 6500);
      const c1 = linha.slice(i);
      caso('3. 1º clique no WhatsApp: conversion do Ads (AW/rótulo, G111) + GA4', ADS(c1).length === 1 && GA4(c1, 'agendamento_whatsapp') && c1.includes('saida wa.me'), {c1});
      i = linha.length;
      await p.locator('a.wa-float').click();
      await wait(p, 6500);
      const c2 = linha.slice(i);
      caso('4. repetição na mesma sessão: sem hit do Ads, GA4 sai', ADS(c2).length === 0 && !c2.some((h) => /^ads /.test(h)) && GA4(c2, 'agendamento_whatsapp'), {c2});
      // 5b: telefone logo depois do WhatsApp compartilha a janela de 30 min
      await p.evaluate(() => {
        const a = document.createElement('a');
        a.href = 'tel:+5521976219403';
        a.id = 'tel-prova';
        a.textContent = 'ligar';
        a.style.cssText = 'position:fixed;top:140px;left:20px;z-index:99999;background:#fff;padding:10px';
        document.body.appendChild(a);
      });
      i = linha.length;
      await p.locator('#tel-prova').click();
      await wait(p, 6500);
      const c5b = linha.slice(i);
      caso('5b. telefone depois do WhatsApp (mesma janela): sem Ads, GA4 click_telefone', ADS(c5b).length === 0 && GA4(c5b, 'click_telefone'), {c5b});
      await ctx.close();
    }
    // 5: telefone como 1º contato de uma sessão nova
    {
      const {ctx, linha} = await contexto(b, null);
      const p = await ctx.newPage();
      await p.goto(`${BASE}/`, {waitUntil: 'load'});
      await wait(p, 3500);
      await p.evaluate(() => {
        const a = document.createElement('a');
        a.href = 'tel:+5521976219403';
        a.id = 'tel-prova';
        a.textContent = 'ligar';
        a.style.cssText = 'position:fixed;top:140px;left:20px;z-index:99999;background:#fff;padding:10px';
        document.body.appendChild(a);
      });
      const i = linha.length;
      await p.locator('#tel-prova').click();
      await wait(p, 6500);
      const c = linha.slice(i);
      caso('5. 1º clique no telefone (sessão nova): conversion do Ads + GA4 click_telefone', ADS(c).length === 1 && GA4(c, 'click_telefone'), {c});
      // depois o WhatsApp na mesma janela não repete a conversão
      const j = linha.length;
      await p.locator('a.wa-float').click();
      await wait(p, 6500);
      const cw = linha.slice(j);
      caso('5c. WhatsApp depois do telefone (mesma janela): sem Ads, GA4 sai', ADS(cw).length === 0 && GA4(cw, 'agendamento_whatsapp'), {cw});
      await ctx.close();
    }
    // 5d: Doctoralia = agenda_doctoralia, sem Ads e sem gastar a janela do 1º contato
    {
      const {ctx, linha} = await contexto(b, null);
      const p = await ctx.newPage();
      await p.goto(`${BASE}/`, {waitUntil: 'load'});
      await wait(p, 3500);
      let i = linha.length;
      await p.evaluate(() => document.querySelector('a[href*="doctoralia.com.br"]').click());
      await wait(p, 6500);
      const d1 = linha.slice(i);
      caso('5d. Doctoralia: GA4 agenda_doctoralia, sem Ads, sem agendamento_whatsapp', GA4(d1, 'agenda_doctoralia') && !GA4(d1, 'agendamento_whatsapp') && !d1.some((h) => /^ads /.test(h)), {d1});
      i = linha.length;
      await p.locator('a.wa-float').click();
      await wait(p, 6500);
      const d2 = linha.slice(i);
      caso('5e. WhatsApp depois do Doctoralia ainda é o 1º contato (Ads sai)', ADS(d2).length === 1, {d2});
      await ctx.close();
    }
    // 6: clique apressado (logo no DOMContentLoaded, antes de a etiqueta do Ads carregar)
    {
      const {ctx, linha} = await contexto(b, null);
      const p = await ctx.newPage();
      await p.goto(`${BASE}/`, {waitUntil: 'domcontentloaded'});
      await p.evaluate(() => document.querySelector('a.wa-float').click());
      await wait(p, 7000);
      caso('6. clique apressado (no DOMContentLoaded): conversion do Ads sai', ADS(linha).length === 1 && GA4(linha, 'agendamento_whatsapp'), {linha});
      await ctx.close();
    }
    // 6b: link na MESMA aba (sem target): a ida espera os 2 pedidos
    {
      const {ctx, linha} = await contexto(b, null);
      const p = await ctx.newPage();
      await p.goto(`${BASE}/`, {waitUntil: 'domcontentloaded'});
      await p.evaluate((u) => {
        const a = document.createElement('a');
        a.href = u;
        a.id = 'wa-mesma-aba';
        a.textContent = 'whats';
        a.style.cssText = 'position:fixed;top:140px;left:20px;z-index:99999;background:#fff;padding:10px';
        document.body.appendChild(a);
        a.click();
      }, WA_URL);
      await wait(p, 5000);
      caso('6b. clique na mesma aba: Ads + GA4 saem antes de trocar de página', ADS(linha).length === 1 && GA4(linha, 'agendamento_whatsapp') && linha.includes('saida wa.me'), {linha, url: p.url().slice(0, 40)});
      await ctx.close();
    }
    // 7: Recusar (de verdade, pelo botão) e recarregar: 0 pedido ao Google
    {
      const {ctx, linha} = await contexto(b, null);
      const p = await ctx.newPage();
      await p.goto(`${BASE}/`, {waitUntil: 'load'});
      await wait(p, 2500);
      await p.getByRole('button', {name: 'Recusar'}).click();
      await wait(p, 1500);
      const i = linha.length;
      await p.reload({waitUntil: 'load'});
      await wait(p, 4000);
      await p.locator('a.wa-float').click();
      await wait(p, 4000);
      const depois = linha.slice(i);
      const camada = await p.evaluate(() => typeof window.dataLayer);
      const aviso = await p.evaluate(() => !!document.getElementById('uro-cookies'));
      caso('7. Recusar e recarregar: 0 pedido ao Google (nem o gtag.js), WhatsApp abre', googleNa(depois).length === 0 && depois.includes('saida wa.me') && camada === 'undefined' && !aviso, {depois, dataLayer: camada, avisoDeNovo: aviso});
      await ctx.close();
    }
    // 7b: chega recusado (escolha guardada)
    {
      const {ctx, linha} = await contexto(b, 'recusado');
      const p = await ctx.newPage();
      await p.goto(`${BASE}/`, {waitUntil: 'load'});
      await wait(p, 3500);
      await p.locator('a.wa-float').click();
      await wait(p, 3500);
      await p.evaluate(() => document.querySelector('a[href*="doctoralia.com.br"]').click());
      await wait(p, 3500);
      const camada = await p.evaluate(() => typeof window.dataLayer);
      caso('7b. escolha guardada "recusado": 0 pedido ao Google, dataLayer inexistente', googleNa(linha).length === 0 && camada === 'undefined', {linha, dataLayer: camada});
      await ctx.close();
    }
    // 8: recusa com a página aberta
    {
      const {ctx, linha} = await contexto(b, null);
      const p = await ctx.newPage();
      await p.goto(`${BASE}/`, {waitUntil: 'load'});
      await wait(p, 4500);
      await p.getByRole('button', {name: 'Recusar'}).click();
      await wait(p, 300);
      const i = linha.length;
      await p.mouse.wheel(0, 1200);
      await wait(p, 1000);
      await p.locator('a.wa-float').click();
      await p.evaluate(() => document.querySelector('a[href*="doctoralia.com.br"]').click());
      await wait(p, 7000);
      const depois = linha.slice(i);
      caso('8. Recusar com a página aberta: 0 hit depois (conversão inclusive)', googleNa(depois).length === 0 && depois.includes('saida wa.me'), {depois});
      await ctx.close();
    }
    // 8b: Ok depois de um Recusar religa
    {
      const {ctx, linha} = await contexto(b, 'recusado');
      const p = await ctx.newPage();
      await p.goto(`${BASE}/cookies`, {waitUntil: 'load'});
      await wait(p, 1500);
      const antes = linha.length;
      await p.locator('[data-cookies-reabrir]').first().click();
      await p.getByRole('button', {name: 'Ok'}).click();
      await wait(p, 3500);
      await p.locator('a.wa-float').click();
      await wait(p, 6500);
      const depois = linha.slice(antes);
      caso('8b. Rever a escolha + Ok depois de recusar: gtag.js carrega e o contato conta', depois.some((h) => h === 'etiqueta G-04JZ3XEL1C') && GA4(depois, 'agendamento_whatsapp') && ADS(depois).length === 1, {depois});
      await ctx.close();
    }
    // 9: vazamento pro AW-: nenhum evento do GA4 indo pra tag do Ads (as 3 jornadas acima + um clique de cada tipo)
    {
      const {ctx, linha} = await contexto(b, null);
      const p = await ctx.newPage();
      await p.goto(`${BASE}/`, {waitUntil: 'load'});
      await wait(p, 3500);
      await p.locator('a.wa-float').click();
      await p.evaluate(() => document.querySelector('a[href*="doctoralia.com.br"]').click());
      await wait(p, 7000);
      // o que chega no lado do Ads: hits com tid AW- e os pedidos sem tid (rmkt/measurement do Ads); o gtag antigo mandava
      // o `en=agendamento_whatsapp` também pra lá
      const aw = linha.filter((h) => new RegExp(`^hit (${AW})? `).test(h));
      const vaza = aw.filter((h) => /agendamento_whatsapp|agenda_doctoralia|click_telefone/.test(h));
      caso('9. nenhum en=<evento do GA4> indo pro AW- (vazamento)', vaza.length === 0, {hitsAW: aw, vaza});
      await ctx.close();
    }
  }

  // ---- 10: eventos GA4 por caminho de contato ----
  const eventos = {};
  for (const pg of ['/', '/entre-em-contato']) Object.assign(eventos, await eventosPorCaminho(b, pg));
  // o formulário (envio, com todas as saídas interceptadas)
  {
    const {ctx, linha} = await contexto(b, null);
    const p = await ctx.newPage();
    await p.goto(`${BASE}/entre-em-contato`, {waitUntil: 'load'});
    await wait(p, 3500);
    await p.fill('input[name=nome]', 'Teste');
    await p.fill('input[name=tel]', '21999999999');
    await p.fill('textarea[name=msg]', 'Teste de medição');
    const i = linha.length;
    await p.locator('#contactForm button[type=submit]').click();
    await wait(p, 6500);
    const dep = linha.slice(i);
    eventos['/entre-em-contato formulário (envio)'] = {eventos: [...new Set(dep.filter((h) => /^hit G-04JZ3XEL1C /.test(h)).map((h) => h.split(' ')[2]).filter((e) => !AUTOMATICOS.test(e)))].sort(), ads: ADS(dep).length > 0, doctoralia: false};
    await ctx.close();
  }
  await b.close();

  if (!DIR) {
    fs.writeFileSync(ANTES_JSON, JSON.stringify(eventos, null, 2));
    console.log(`ANTES (produção) gravado em ${ANTES_JSON}`);
    for (const [k, v] of Object.entries(eventos)) console.log(`  ${k}\n      GA4: ${v.eventos.join(', ') || '(nenhum)'} | Ads: ${v.ads ? 'sim' : 'não'}`);
    return;
  }
  // DEPOIS × ANTES (o único renome permitido: Doctoralia agendamento_whatsapp → agenda_doctoralia)
  const antes = ANTES_JSON && fs.existsSync(ANTES_JSON) ? JSON.parse(fs.readFileSync(ANTES_JSON, 'utf8')) : null;
  console.log('\n10. nada deixou de contar: eventos GA4 ANTES (produção) × DEPOIS (build local)');
  let ok10 = !!antes;
  const chaves = new Set([...Object.keys(antes || {}), ...Object.keys(eventos)]);
  for (const k of chaves) {
    const a = antes?.[k];
    const d = eventos[k];
    const esperado = a ? a.eventos.map((e) => (a.doctoralia && e === 'agendamento_whatsapp' ? 'agenda_doctoralia' : e)).sort() : null;
    const bate = !!a && !!d && JSON.stringify(esperado) === JSON.stringify(d.eventos);
    if (!bate) ok10 = false;
    console.log(`  ${bate ? '✅' : '❌'} ${k}\n      ANTES: ${a ? a.eventos.join(', ') || '(nenhum)' : '(caminho não existia)'} | DEPOIS: ${d ? d.eventos.join(', ') || '(nenhum)' : '(sumiu)'} | Ads depois: ${d?.ads ? 'sim (1º contato)' : 'não'}${a?.doctoralia ? ' | renome Doctoralia' : ''}`);
  }
  caso('10. todo evento GA4 que saía continua saindo (salvo o renome do Doctoralia)', ok10, {caminhos: chaves.size});

  const falhas = casos.filter((ok) => !ok).length;
  console.log(falhas ? `\n❌ ${falhas} caso(s) reprovado(s)` : `\n✅ medição: ${casos.length}/${casos.length} casos`);
  process.exit(falhas ? 1 : 0);
})();
