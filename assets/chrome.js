/* UroClínica Rio — shared chrome (header + footer) injected per page */
(function(){
  var page = document.body.getAttribute('data-page') || '';
  var WA = 'https://wa.me/5521976219403?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20na%20Uro%20Cl%C3%ADnica%20Rio.';
  /* linha 2026 — logos reais extraídos das artes (public/ur_*.png) */

  var ico = {
    pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.95.51 3.78 1.4 5.37L2 22l4.85-1.27a9.9 9.9 0 0 0 5.19 1.48h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.06 8.06 0 0 1 2.37 5.72c0 4.46-3.63 8.09-8.1 8.09a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.06.8.82-2.98-.19-.31a8.06 8.06 0 0 1-1.24-4.29c0-4.46 3.63-8.09 8.11-8.09zm-4.48 4.3c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.34.99 2.5c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.32-.76-1.8-.18-.42-.36-.36-.5-.37l-.42-.01z"/></svg>',
    ig:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>',
    yt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.5A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C4.7 19 12 19 12 19s7.3 0 8.8-.5a2.5 2.5 0 0 0 1.8-1.8C23 15.2 23 12 23 12zM9.8 15.3V8.7l6 3.3-6 3.3z"/></svg>',
    arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    chev:'<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"/></svg>',
    robot:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="5" y="7" width="14" height="11" rx="3"/><path d="M12 7V4M9 12h.01M15 12h.01M9 15.5h6"/><path d="M3 12h2M19 12h2"/></svg>',
    onco:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 21c-4-2.5-7-5.8-7-10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 19 11c0 1.6-.4 3-1.1 4.2"/><circle cx="17" cy="17" r="3.2"/></svg>',
    andro:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="10" cy="14" r="5"/><path d="M14 10l5-5M15 5h4v4"/></svg>',
    laps:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 9l9-5 9 5-9 5-9-5z"/><path d="M3 9v6l9 5 9-5V9"/></svg>',
    recon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 7h7v10H4zM13 7h7v10h-7"/><path d="M11 12h2"/></svg>'
  };

  var specs=[
    ['Cirurgia Robótica','Precisão minimamente invasiva','cirurgia-robotica.html',ico.robot],
    ['Uro-Oncologia','Tratamento de tumores urológicos','index.html#especialidades',ico.onco],
    ['Andrologia','Saúde sexual e reprodutiva masculina','index.html#especialidades',ico.andro],
    ['Videolaparoscopia','Cirurgia minimamente invasiva','index.html#especialidades',ico.laps],
    ['Urologia Reconstrutora','Restauração funcional e estética','index.html#especialidades',ico.recon]
  ];
  var specDrop = specs.map(function(s){
    return '<a href="'+s[2]+'"><span class="di">'+s[3]+'</span><span>'+s[0]+'<small>'+s[1]+'</small></span></a>';
  }).join('');

  function active(p){ return page===p ? ' is-active':''; }

  var header =
  '<div class="topbar"><div class="wrap">'+
    '<div class="tb-left">'+
      '<span class="tb-item">'+ico.pin+'Barra da Tijuca</span>'+
      '<span class="tb-item">'+ico.pin+'Bonsucesso</span>'+
    '</div>'+
    '<div class="tb-right">'+
      '<a class="tb-item" href="'+WA+'" target="_blank">'+ico.wa+'(21) 97621-9403</a>'+
      '<span class="tb-socials">'+
        '<a href="https://www.instagram.com/uroclinicario" target="_blank" aria-label="Instagram">'+ico.ig+'</a>'+
        '<a href="https://www.youtube.com/channel/UCRfb5Zu4s-a0pc3beEqX-UQ" target="_blank" aria-label="YouTube">'+ico.yt+'</a>'+
      '</span>'+
    '</div>'+
  '</div></div>'+
  '<header class="site-header"><div class="wrap"><div class="bar">'+
    '<a class="brand" href="index.html" aria-label="UroClínica Rio — urologista no Rio de Janeiro"><img class="logo-lockup" src="assets/ur_lockup_dark.png" alt="UroClínica Rio — urologista no Rio de Janeiro"></a>'+
    '<nav class="nav">'+
      '<div class="nav-item"><a class="nav-link'+active('home')+'" href="index.html">Início</a></div>'+
      '<div class="nav-item"><a class="nav-link'+active('sobre')+'" href="sobre.html">Sobre nós'+ico.chev+'</a>'+
        '<div class="dropdown">'+
          '<a href="sobre.html"><span class="di">'+ico.onco+'</span><span>A clínica<small>Nossa história e valores</small></span></a>'+
          '<a href="sobre.html#corpo"><span class="di">'+ico.andro+'</span><span>Corpo clínico<small>Conheça os especialistas</small></span></a>'+
        '</div></div>'+
      '<div class="nav-item"><a class="nav-link'+active('esp')+'" href="cirurgia-robotica.html">Especialidades'+ico.chev+'</a>'+
        '<div class="dropdown">'+specDrop+'</div></div>'+
      '<div class="nav-item"><a class="nav-link'+active('unidades')+'" href="unidades.html">Unidades</a></div>'+
      '<div class="nav-item"><a class="nav-link'+active('contato')+'" href="contato.html">Contato</a></div>'+
    '</nav>'+
    '<div class="header-cta">'+
      '<a class="btn btn-salmon btn-sm" href="'+WA+'" target="_blank">'+ico.wa+'Agendar consulta</a>'+
      '<button class="burger" aria-label="Menu"><span></span><span></span><span></span></button>'+
    '</div>'+
  '</div></div></header>'+
  '<div class="mobile-menu">'+
    '<a href="index.html">Início</a>'+
    '<a href="sobre.html">Sobre nós</a>'+
    '<div class="sub"><a href="sobre.html#corpo">Corpo clínico</a></div>'+
    '<a href="cirurgia-robotica.html">Especialidades</a>'+
    '<div class="sub">'+specs.map(function(s){return '<a href="'+s[2]+'">'+s[0]+'</a>';}).join('')+'</div>'+
    '<a href="unidades.html">Unidades</a>'+
    '<a href="contato.html">Contato</a>'+
    '<div class="mm-cta"><a class="btn btn-salmon" href="'+WA+'" target="_blank">'+ico.wa+'Agendar pelo WhatsApp</a></div>'+
  '</div>';

  var units=[
    ['Unidade Barra da Tijuca','Av. Ayrton Senna, 2600, Bloco 3, sala 213 · Barra da Tijuca · RJ'],
    ['Unidade Bonsucesso','Rua Cardoso de Morais, 201, sala 503 · Bonsucesso · RJ']
  ];
  var footer =
  '<footer class="site-footer"><div class="wrap">'+
    '<div class="footer-top">'+
      '<div>'+
        '<a class="brand brand--light" href="index.html" style="margin-bottom:1.4rem"><img class="logo-sym" src="assets/ur_symbol_light.png" alt=""><img class="f-white" src="assets/ur_logo_light.png" alt="UroClínica Rio"></a>'+
        '<p>Excelência urológica com conforto e confiança. Cirurgia robótica, uro-oncologia e cuidado humanizado no Rio de Janeiro.</p>'+
        '<div class="f-socials">'+
          '<a href="https://www.instagram.com/uroclinicario" target="_blank" aria-label="Instagram">'+ico.ig+'</a>'+
          '<a href="https://www.youtube.com/channel/UCRfb5Zu4s-a0pc3beEqX-UQ" target="_blank" aria-label="YouTube">'+ico.yt+'</a>'+
          '<a href="'+WA+'" target="_blank" aria-label="WhatsApp">'+ico.wa+'</a>'+
        '</div>'+
      '</div>'+
      '<div><h4>Navegação</h4><ul class="f-list">'+
        '<li><a href="index.html">Início</a></li>'+
        '<li><a href="sobre.html">Sobre nós</a></li>'+
        '<li><a href="sobre.html#corpo">Corpo clínico</a></li>'+
        '<li><a href="unidades.html">Unidades</a></li>'+
        '<li><a href="contato.html">Contato</a></li>'+
      '</ul></div>'+
      '<div><h4>Especialidades</h4><ul class="f-list">'+
        specs.map(function(s){return '<li><a href="'+s[2]+'">'+s[0]+'</a></li>';}).join('')+
        '<li><a href="index.html#especialidades">Transplante Renal</a></li>'+
      '</ul></div>'+
      '<div><h4>Unidades</h4>'+
        units.map(function(u){return '<div class="f-unit"><strong>'+u[0].replace('Unidade ','')+'</strong><span>'+u[1]+'</span></div>';}).join('')+
        '<div class="rt-seal"><strong>Responsável Técnico</strong>Dr. Diego Coutinho Perdigão · CRM-RJ 52 934895 · RQE 32110</div>'+
      '</div>'+
    '</div>'+
    '<div class="footer-bottom">'+
      '<p class="fb-legal">© 2026 Uroclínica Rio. Todos os direitos reservados. As informações deste site têm caráter informativo e educacional e não substituem a consulta médica.</p>'+
      '<div class="fb-links"><a href="#">Privacidade</a><a href="#">Cookies</a><a href="#">Termos</a></div>'+
    '</div>'+
  '</div></footer>'+
  '<a class="wa-float" href="'+WA+'" target="_blank" aria-label="WhatsApp">'+ico.wa+'</a>';

  var hSlot=document.getElementById('site-header');
  var fSlot=document.getElementById('site-footer');
  if(hSlot) hSlot.outerHTML=header;
  if(fSlot) fSlot.outerHTML=footer;

  /* ---------- site-wide structured data (SEO) ---------- */
  var BASE='https://uroclinicario.com.br';
  function loc(name,street,cep,lat,lng){
    return {"@type":"MedicalClinic","name":"UroClínica Rio — "+name,"parentOrganization":{"@id":BASE+"/#clinic"},
      "image":BASE+"/assets/og-uroclinica.jpg","telephone":"+552197621-9403","url":BASE+"/unidades",
      "address":{"@type":"PostalAddress","streetAddress":street,"addressLocality":"Rio de Janeiro","addressRegion":"RJ","postalCode":cep,"addressCountry":"BR"},
      "geo":{"@type":"GeoCoordinates","latitude":lat,"longitude":lng},
      "areaServed":{"@type":"City","name":"Rio de Janeiro"},"medicalSpecialty":"Urologic"};
  }
  function phys(name,crm,desc){
    var o={"@type":"Physician","name":name,"medicalSpecialty":"Urologic","worksFor":{"@id":BASE+"/#clinic"},
      "areaServed":{"@type":"City","name":"Rio de Janeiro"},"identifier":crm,"description":desc};
    return o;
  }
  var ld={
    "@context":"https://schema.org",
    "@graph":[
      {"@type":["MedicalClinic","MedicalBusiness"],"@id":BASE+"/#clinic","name":"UroClínica Rio",
        "url":BASE+"/","logo":BASE+"/assets/og-uroclinica.jpg","image":BASE+"/assets/og-uroclinica.jpg",
        "description":"Clínica de urologia no Rio de Janeiro especializada em cirurgia robótica, uro-oncologia, andrologia, videolaparoscopia e urologia reconstrutora.",
        "telephone":"+552197621-9403","priceRange":"$$","medicalSpecialty":"Urologic",
        "areaServed":{"@type":"City","name":"Rio de Janeiro"},
        "sameAs":["https://www.instagram.com/uroclinicario","https://www.youtube.com/channel/UCRfb5Zu4s-a0pc3beEqX-UQ"],
        "address":{"@type":"PostalAddress","streetAddress":"Av. Ayrton Senna, 2600, Bloco 3, sala 213","addressLocality":"Rio de Janeiro","addressRegion":"RJ","postalCode":"22775-003","addressCountry":"BR"},
        "availableService":[
          {"@type":"MedicalProcedure","name":"Cirurgia Robótica Urológica no Rio de Janeiro"},
          {"@type":"MedicalProcedure","name":"Tratamento de Câncer de Próstata"},
          {"@type":"MedicalProcedure","name":"Tratamento de Câncer de Rim"},
          {"@type":"MedicalProcedure","name":"Tratamento de Câncer de Bexiga"},
          {"@type":"MedicalProcedure","name":"Uro-Oncologia"},
          {"@type":"MedicalProcedure","name":"Andrologia — Disfunção Erétil"},
          {"@type":"MedicalProcedure","name":"Videolaparoscopia Urológica"},
          {"@type":"MedicalProcedure","name":"Urologia Reconstrutora"},
          {"@type":"MedicalProcedure","name":"Vasectomia e Reversão de Vasectomia"},
          {"@type":"MedicalProcedure","name":"Tratamento de Cálculo Renal"},
          {"@type":"MedicalProcedure","name":"HoLEP e Rezum — Tratamento da Próstata"},
          {"@type":"MedicalProcedure","name":"Transplante Renal"}
        ],
        "location":[
          loc("Barra da Tijuca","Av. Ayrton Senna, 2600, Bloco 3, sala 213 — Barra da Tijuca","22775-003",-22.9905,-43.3657),
          loc("Bonsucesso","Rua Cardoso de Morais, 201, sala 503 — Bonsucesso","21032-900",-22.8622,-43.2573)
        ],
        "employee":[
          phys("Dr. Diego Coutinho Perdigão","CRM-RJ 52 934895 · RQE 32110","Urologista no Rio de Janeiro — uro-oncologia e cirurgia robótica."),
          phys("Dr. Pedro Boechat","CRM-RJ 52 906174","Urologista no Rio de Janeiro — uro-oncologia e cirurgia robótica."),
          phys("Dr. João Boechat","CRM-RJ 52 1050079","Urologista no Rio de Janeiro — urologia reconstrutora e cirurgia genital.")
        ]
      }
    ]
  };
  var s=document.createElement('script'); s.type='application/ld+json'; s.text=JSON.stringify(ld);
  document.head.appendChild(s);
})();
