/* UroClínica Rio — shared interactions */
(function(){
  // sticky header shrink
  var header = document.querySelector('.site-header');
  if(header){
    var onScroll = function(){
      if(window.scrollY > 24) header.classList.add('shrink');
      else header.classList.remove('shrink');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
  }

  // mobile menu
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.mobile-menu');
  if(burger && menu){
    burger.addEventListener('click', function(){
      var open = menu.classList.toggle('open');
      burger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        menu.classList.remove('open');
        burger.classList.remove('open');
        document.body.style.overflow='';
      });
    });
  }

  // scroll reveal — content visible by default; hide only what's below the fold, reveal on scroll
  var reveals = document.querySelectorAll('[data-reveal]');
  if('IntersectionObserver' in window && reveals.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.remove('pre'); io.unobserve(e.target); }
      });
    }, {threshold:.1, rootMargin:'0px 0px -6% 0px'});
    reveals.forEach(function(el){
      var r = el.getBoundingClientRect();
      if(r.top > window.innerHeight*0.88){ el.classList.add('pre'); io.observe(el); }
    });
    setTimeout(function(){ reveals.forEach(function(el){ el.classList.remove('pre'); }); }, 1800);
  }

  // count-up stats
  var stats = document.querySelectorAll('[data-count]');
  if('IntersectionObserver' in window && stats.length){
    var so = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        var el = e.target, target = parseFloat(el.getAttribute('data-count')),
            dur = 1400, start = null, suffix = el.getAttribute('data-suffix')||'';
        function step(ts){
          if(!start) start = ts;
          var p = Math.min((ts-start)/dur,1);
          var eased = 1-Math.pow(1-p,3);
          var val = target*eased;
          el.textContent = (target%1===0 ? Math.round(val) : val.toFixed(1)) + suffix;
          if(p<1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        so.unobserve(el);
      });
    },{threshold:.5});
    stats.forEach(function(el){ so.observe(el); });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click', function(){
      var item = q.closest('.faq-item');
      var a = item.querySelector('.faq-a');
      var open = item.classList.toggle('open');
      a.style.maxHeight = open ? (a.scrollHeight + 'px') : '0px';
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  // Google Ads conversion on any WhatsApp / agendamento click
  document.addEventListener('click', function(e){
    if(!e.target.closest) return;
    var a = e.target.closest('a[href*="wa.me"], a[href*="api.whatsapp"], a[href*="whatsapp.com"], a[href*="doctoralia.com.br"]');
    if(a && typeof window.uroConversion === 'function') window.uroConversion();
  });
})();
