/* Medição da UroClínica Rio: Google Analytics 4 (G-04JZ3XEL1C) e Google Ads (AW-620455971).
   Regra da casa (rizzo-os docs/SITES_MEDICAO_ADS_META_MAPA.md §7.3, 14/11/2026): aviso de CIÊNCIA, opt-out.
   - O Google mede por padrão (ad_storage, analytics_storage e ad_user_data concedidos; ad_personalization sempre
     negado; url_passthrough e ads_data_redaction ligados), com o aviso "Medimos as visitas…" (Recusar e Ok).
   - O Recusar desliga tudo: quem chega já recusado não carrega o gtag.js, não faz `config` e o `gtag` não enfileira
     nada; quem recusa com a página aberta manda o `consent update` negado e liga o `ga-disable-<id>` de cada G-/AW-.
     O Ok depois de um Recusar solta os `ga-disable` (e carrega o gtag.js se a página não o carregou).
   - GA4: todo evento leva `send_to` no G-, pra não vazar pra tag do Ads. Doctoralia sai como `agenda_doctoralia`,
     sem conversão do Ads. WhatsApp: `agendamento_whatsapp`. Telefone (`tel:`): `click_telefone`.
   - Ads: a conversão do 1º contato da sessão (WhatsApp OU telefone, janela de 30 min, 1 só vez) usa o rótulo da
     ação "Whatsapp Botão" da conta. A repetição sai só no GA4. O clique que troca de página na mesma aba espera
     os 2 pedidos (GA4 e conversão), teto de 800 ms cada.
   Os ids são públicos e ficam aqui (site estático, sem build). Escolha guardada: localStorage `site:consentimento`. */
(function(){
  var GA4_ID = 'G-04JZ3XEL1C';           // Google Analytics 4
  var ADS_ID = 'AW-620455971';           // Google Ads
  var ADS_LABEL = 'zxJzCOn6y70CEKPQ7acC'; // ação "Whatsapp Botão": 1º contato da sessão
  var CHAVE = 'site:consentimento';
  var CHAVE_LEAD = 'site:lead';
  var JANELA = 30 * 60 * 1000;
  var CONCEDIDO = {ad_storage:'granted', analytics_storage:'granted', ad_user_data:'granted', ad_personalization:'denied'};
  var NEGADO = {ad_storage:'denied', analytics_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'};
  var w = window, d = document;
  var memoria = null;   // navegador sem localStorage: a escolha vale só nesta página
  var carregado = false;

  function lerLS(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }
  function gravarLS(k, v){ try { localStorage.setItem(k, v); } catch(e){} }
  function escolha(){
    var v = lerLS(CHAVE);
    if (v === 'aceito' || v === 'recusado') return v;
    return memoria;
  }
  function recusou(){ return escolha() === 'recusado'; }

  function gtag(){ w.dataLayer.push(arguments); }

  function desligar(sim){
    w['ga-disable-' + GA4_ID] = sim;
    w['ga-disable-' + ADS_ID] = sim;
  }

  /* Carrega o gtag.js (uma vez), com o consentimento padrão ANTES de qualquer config. Nunca pra quem recusou. */
  function carregar(){
    if (carregado || recusou()) return;
    carregado = true;
    w.dataLayer = w.dataLayer || [];
    w.gtag = gtag;
    gtag('consent', 'default', CONCEDIDO);
    gtag('set', 'url_passthrough', true);
    gtag('set', 'ads_data_redaction', true);
    gtag('js', new Date());
    gtag('config', GA4_ID);
    gtag('config', ADS_ID);
    var s = d.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    d.head.appendChild(s);
  }

  if (recusou()) { w.gtag = function(){}; }   // chegou recusado: nada carrega, nada vai pra camada
  else carregar();

  /* ---------- eventos ---------- */

  /* Roda `fim` quando um pedido cuja URL `casa` aparece no Resource Timing (inclusive os que já saíram). */
  function observarPedido(casa, fim){
    if (typeof PerformanceObserver === 'undefined') return;
    try {
      var obs = new PerformanceObserver(function(lista){
        var es = lista.getEntries();
        for (var i = 0; i < es.length; i++) {
          if (casa(es[i].name)) { obs.disconnect(); fim(); return; }
        }
      });
      obs.observe({type:'resource', buffered:true});
    } catch(e){}
  }

  /* Evento do GA4 (send_to no G-). Com `pronto`, vai em beacon e `pronto` roda quando o pedido sai, ou no prazo. */
  function evento(nome, dados, pronto){
    if (recusou() || !w.dataLayer) { if (pronto) pronto(); return; }
    var p = {send_to: GA4_ID};
    for (var k in dados) if (dados.hasOwnProperty(k)) p[k] = dados[k];
    if (!pronto) { gtag('event', nome, p); return; }
    p.transport_type = 'beacon';
    var feito = false;
    var fim = function(){ if (!feito) { feito = true; pronto(); } };
    gtag('event', nome, p);
    observarPedido(function(u){ return u.indexOf('/g/collect') > -1 && new RegExp('[?&]en=' + nome + '(&|$)').test(u); }, fim);
    setTimeout(fim, 800);
  }

  /* Conversão do Ads (o `AW-` só recebe isto). */
  function conversao(pronto){
    if (recusou() || !w.dataLayer) { if (pronto) pronto(); return; }
    var p = {send_to: ADS_ID + '/' + ADS_LABEL};
    if (!pronto) { gtag('event', 'conversion', p); return; }
    p.transport_type = 'beacon';
    var feito = false;
    var fim = function(){ if (!feito) { feito = true; pronto(); } };
    gtag('event', 'conversion', p);
    var num = ADS_ID.slice(3);
    observarPedido(function(u){ return new RegExp('/pagead/(1p-)?conversion/' + num + '/').test(u) && u.indexOf(ADS_LABEL) > -1; }, fim);
    setTimeout(fim, 800);
  }

  /* 1º contato da sessão: WhatsApp e telefone compartilham a janela de 30 min (a repetição renova a janela). */
  function primeiroContato(){
    var t = parseInt(lerLS(CHAVE_LEAD), 10) || 0, agora = Date.now();
    var primeiro = !t || agora - t > JANELA;
    gravarLS(CHAVE_LEAD, String(agora));
    return primeiro;
  }

  var TIPOS = {
    whatsapp:   {nome:'agendamento_whatsapp', dados:{event_category:'contato', event_label:'WhatsApp'},   ads:true},
    telefone:   {nome:'click_telefone',       dados:{event_category:'contato', event_label:'Telefone'},   ads:true},
    doctoralia: {nome:'agenda_doctoralia',    dados:{event_category:'contato', event_label:'Doctoralia'}, ads:false}
  };

  /* `a` e `ev`: o link e o clique, quando existem (o formulário chama sem eles). Se o clique troca de página na
     mesma aba, segura a ida até os pedidos saírem (ou 800 ms). */
  function contato(tipo, a, ev){
    if (recusou() || !w.dataLayer) return;
    var cfg = TIPOS[tipo];
    var ads = cfg.ads && primeiroContato();
    var href = a ? a.href : '';
    var mesmaAba = !!(ev && a && href && ev.button === 0 && !ev.defaultPrevented && !ev.ctrlKey && !ev.metaKey && !ev.shiftKey && !ev.altKey &&
                      (!a.target || a.target === '_self'));
    if (!mesmaAba) {
      if (ads) conversao();
      evento(cfg.nome, cfg.dados);
      return;
    }
    ev.preventDefault();
    var faltam = ads ? 2 : 1;
    var seguir = function(){ faltam -= 1; if (faltam === 0) w.location.assign(href); };
    if (ads) conversao(seguir);
    evento(cfg.nome, cfg.dados, seguir);
  }

  /* Formulário de contato (contato.html): o envio abre o WhatsApp. */
  w.uroConversion = function(){ try { contato('whatsapp'); } catch(e){} };

  d.addEventListener('click', function(e){
    try {
      var t = e.target;
      if (!t || !t.closest) return;
      var r = t.closest('[data-cookies-reabrir]');
      if (r) { e.preventDefault(); reabrir(); return; }
      var a = t.closest('a[href]');
      if (!a) return;
      var h = a.getAttribute('href') || '';
      var tipo = /^tel:/i.test(h) ? 'telefone'
        : h.indexOf('doctoralia.com.br') > -1 ? 'doctoralia'
        : (h.indexOf('wa.me') > -1 || h.indexOf('api.whatsapp') > -1 || h.indexOf('whatsapp.com') > -1) ? 'whatsapp'
        : null;
      if (tipo) contato(tipo, a, e);
    } catch(x){}
  });

  /* ---------- aviso de ciência ---------- */

  function escolher(v){
    memoria = v;
    gravarLS(CHAVE, v);
    if (v === 'recusado') {
      if (carregado) { gtag('consent', 'update', NEGADO); desligar(true); }
    } else {
      desligar(false);
      if (carregado) gtag('consent', 'update', CONCEDIDO);
      else carregar();   // chegou recusado e aceitou agora: a medição começa nesta página
    }
    var b = d.getElementById('uro-cookies');
    if (b) b.parentNode.removeChild(b);
  }

  function mostrar(){
    if (d.getElementById('uro-cookies') || !d.body) return;
    if (!d.getElementById('uro-cookies-css')) {
      var st = d.createElement('style');
      st.id = 'uro-cookies-css';
      st.textContent =
        '#uro-cookies{position:fixed;z-index:130;left:12px;right:12px;bottom:96px;background:#fff;color:#4A5470;border:1px solid #C7CDDB;border-radius:14px;padding:14px 16px;box-shadow:0 12px 32px -12px rgba(74,84,112,.45);font:400 14px/1.45 "Hanken Grotesk",system-ui,sans-serif}' +
        '#uro-cookies p{margin:0 0 10px;color:#4E5870}' +
        '#uro-cookies a{color:#D9834E;font-weight:700;text-decoration:underline}' +
        '#uro-cookies .uc-acoes{display:flex;gap:8px;justify-content:flex-end}' +
        '#uro-cookies button{font:700 13px/1 "Hanken Grotesk",system-ui,sans-serif;padding:10px 18px;border-radius:100px;cursor:pointer;border:1px solid #4A5470}' +
        '#uro-cookies .uc-recusar{background:#fff;color:#4A5470}' +
        '#uro-cookies .uc-ok{background:#4A5470;color:#fff}' +
        '@media (min-width:641px){#uro-cookies{left:20px;right:auto;bottom:20px;max-width:440px}}';
      d.head.appendChild(st);
    }
    var b = d.createElement('div');
    b.id = 'uro-cookies';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Aviso de cookies');
    b.innerHTML = '<p>Medimos as visitas para melhorar o atendimento, conforme a LGPD. Saiba mais na <a href="/cookies">política de cookies</a>.</p>' +
      '<div class="uc-acoes"><button type="button" class="uc-recusar">Recusar</button><button type="button" class="uc-ok">Ok</button></div>';
    b.querySelector('.uc-recusar').addEventListener('click', function(){ escolher('recusado'); });
    b.querySelector('.uc-ok').addEventListener('click', function(){ escolher('aceito'); });
    d.body.appendChild(b);
  }

  /* "Rever minha escolha" (cookies.html): apaga a escolha e mostra o aviso de novo. */
  function reabrir(){
    memoria = null;
    try { localStorage.removeItem(CHAVE); } catch(e){}
    mostrar();
  }
  w.uroCookiesReabrir = reabrir;

  function iniciarAviso(){ if (escolha() === null) mostrar(); }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', iniciarAviso);
  else iniciarAviso();
})();
