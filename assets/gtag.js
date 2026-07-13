/* Google tags — UroClínica Rio
   GA4 (Analytics):  G-04JZ3XEL1C
   Google Ads:       AW-620455971
   One gtag library, both configs. Fires an event on every
   "Agendar / WhatsApp" action so it can be marked as a
   conversion in GA4 (and in Google Ads once a label is added). */
(function(){
  var GA4_ID = 'G-04JZ3XEL1C';   // Google Analytics 4
  var ADS_ID = 'AW-620455971';   // Google Ads
  // Quando tiver o rótulo de conversão do Google Ads, preencha abaixo
  // (ex.: 'AbCdEf…') para também registrar a conversão no Ads:
  var ADS_CONVERSION_LABEL = '';  // ← rótulo da conversão de agendamento (Google Ads)

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA4_ID);
  gtag('config', ADS_ID);

  // Disparado em cliques de WhatsApp e no envio do formulário de contato.
  window.uroConversion = function(){
    try {
      gtag('event', 'agendamento_whatsapp', { event_category: 'contato', event_label: 'WhatsApp' });
      if (ADS_CONVERSION_LABEL) {
        gtag('event', 'conversion', { send_to: ADS_ID + '/' + ADS_CONVERSION_LABEL });
      }
    } catch(e){}
  };
})();
