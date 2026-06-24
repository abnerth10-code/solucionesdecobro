(() => {
  const GA_MEASUREMENT_ID = 'G-49P7XY0Z7W';
  const CONSENT_KEY = 'sdc_cookie_consent';
  const isBlogArticle = window.location.pathname.includes('/blog/');
  const privacyHref = isBlogArticle ? '../privacidad.html' : 'privacidad.html';

  const getConsent = () => {
    try { return window.localStorage.getItem(CONSENT_KEY); }
    catch (error) { return null; }
  };

  const setConsent = (value) => {
    try { window.localStorage.setItem(CONSENT_KEY, value); }
    catch (error) { /* El sitio sigue funcionando aunque el navegador bloquee localStorage. */ }
  };

  const hasAnalyticsConsent = () => getConsent() === 'accepted';

  const loadAnalytics = () => {
    if (!hasAnalyticsConsent() || window.__solucionesCobroAnalyticsLoaded) return;

    window.__solucionesCobroAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };

    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(gaScript);

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_path: window.location.pathname + window.location.search
    });
  };

  if (hasAnalyticsConsent()) loadAnalytics();

  const trackEvent = (eventName, params = {}) => {
    if (!hasAnalyticsConsent() || typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, {
      ...params,
      page_location: window.location.href,
      page_title: document.title
    });
  };

  if (window.location.pathname.includes('privacidad')) {
    document.body.classList.add('privacy-page');
  }

  const polishStyle = document.createElement('style');
  polishStyle.textContent = `
    :root{--navy:#071d36;--blue:#0073e6;--sky:#19aeea;--yellow:#ffd23f;--line:#cfe4f7;--muted:#53687f;--soft:#f5f9fc;}
    .brand-logo{width:142px!important;height:90px!important;object-fit:contain!important;}
    .hero-compact{padding-top:40px!important;padding-bottom:44px!important;}
    .hero-compact .hero-inner{gap:36px!important;align-items:center;}
    .hero-compact h1{letter-spacing:0!important;}
    .hero-compact .actions{gap:14px!important;}
    .photo-card{overflow:hidden;background:#fff!important;}
    .photo-card>img{width:100%;height:100%;min-height:420px;object-fit:cover;display:block;border-radius:inherit;}
    .hero-photo-card{box-shadow:0 24px 58px rgba(7,29,54,.14)!important;}
    .hero-photo-card .note-card{background:rgba(7,29,54,.54)!important;backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.2);box-shadow:0 16px 34px rgba(7,29,54,.22);}
    .hero-photo-card .note-card strong{color:var(--yellow)!important;}

    .sales-impact{display:grid;grid-template-columns:1.25fr .75fr;gap:24px;align-items:stretch;margin:0 0 46px;}
    .impact-copy,.impact-metric{border:1px solid var(--line);border-radius:26px;background:#fff;box-shadow:0 18px 44px rgba(7,29,54,.08);}
    .impact-copy{padding:34px;background:linear-gradient(135deg,#fff,#f4fbff 62%,#fff8df);}
    .impact-copy h2{font-size:clamp(30px,3.5vw,50px);margin:0 0 14px;line-height:1.04;}
    .impact-copy p{font-size:19px;line-height:1.62;color:#42576f;margin:0;}
    .impact-analogy{position:relative;padding-left:18px;border-left:4px solid var(--yellow);}
    .impact-metric{position:relative;overflow:hidden;padding:30px;display:flex;flex-direction:column;justify-content:center;background:radial-gradient(circle at 78% 14%,rgba(255,210,63,.52),transparent 34%),linear-gradient(145deg,#071d36,#075fb8);color:#fff;}
    .impact-metric:before{content:"";position:absolute;right:-44px;bottom:-62px;width:190px;height:190px;border-radius:999px;background:rgba(25,174,234,.34);filter:blur(5px);}
    .impact-metric span{font-size:13px;text-transform:uppercase;letter-spacing:.14em;font-weight:900;color:#dff4ff;}
    .metric-number{display:flex;align-items:flex-end;gap:12px;margin:12px 0;position:relative;z-index:1;}
    .metric-number strong{font-size:clamp(54px,6vw,80px);line-height:.9;color:var(--yellow);}
    .metric-number em{font-style:normal;font-weight:900;color:#fff;font-size:20px;line-height:1.6;text-transform:uppercase;}
    .impact-metric small{font-size:15px;line-height:1.45;color:#e7f4ff;position:relative;z-index:1;}

    .media-feature-grid{align-items:stretch;}
    .media-card{position:relative;overflow:hidden;min-height:344px;padding:30px!important;display:flex;flex-direction:column;justify-content:flex-end;color:#fff!important;background:#071d36!important;border-color:rgba(255,255,255,.18)!important;box-shadow:0 22px 50px rgba(7,29,54,.16)!important;transition:transform .22s ease,box-shadow .22s ease;}
    .media-card:before{content:"";position:absolute;inset:0;background-size:cover;background-position:center;filter:saturate(1.06);transform:scale(1.03);transition:transform .35s ease,filter .35s ease;}
    .media-card:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,29,54,.18),rgba(7,29,54,.44) 42%,rgba(7,29,54,.9));}
    .media-card:hover{transform:translateY(-5px);box-shadow:0 26px 60px rgba(7,29,54,.2)!important;}
    .media-card:hover:before{transform:scale(1.08);filter:saturate(1.1) blur(.8px);}
    .media-card h3,.media-card p,.media-card .icon{position:relative;z-index:1;}
    .media-card h3{color:#fff!important;font-size:25px;}
    .media-card p{color:#eaf6ff!important;font-size:17px;line-height:1.55;margin-bottom:0;}
    .media-card .icon{width:64px;height:64px;font-size:0;color:#fff;box-shadow:0 14px 30px rgba(7,29,54,.26);margin-bottom:auto;display:grid;place-items:center;}
    .media-card .icon:before,.advice-list .icon:before{content:"";display:block;width:28px;height:28px;border:3px solid currentColor;border-radius:7px;}
    .icon-info:before{border:none!important;width:12px!important;height:34px!important;border-radius:8px!important;background:currentColor!important;box-shadow:14px 10px 0 currentColor,-14px 18px 0 currentColor;}
    .icon-compare:before{border:none!important;width:34px!important;height:12px!important;border-radius:999px!important;background:currentColor!important;box-shadow:0 -12px 0 rgba(255,255,255,.72),0 12px 0 rgba(255,255,255,.72);}
    .icon-growth:before{border:none!important;width:28px!important;height:28px!important;border-top:4px solid currentColor!important;border-right:4px solid currentColor!important;border-radius:0!important;}
    .icon-check:before{border:none!important;width:28px!important;height:16px!important;border-left:5px solid currentColor!important;border-bottom:5px solid currentColor!important;border-radius:0!important;transform:rotate(-45deg);}
    .icon-data:before{border:none!important;width:30px!important;height:30px!important;background:linear-gradient(135deg,currentColor 0 28%,transparent 28% 42%,currentColor 42% 64%,transparent 64% 78%,currentColor 78% 100%);border-radius:7px!important;}
    .icon-star:before{border:none!important;width:28px!important;height:28px!important;background:currentColor!important;clip-path:polygon(50% 0,61% 34%,98% 35%,68% 56%,79% 91%,50% 70%,21% 91%,32% 56%,2% 35%,39% 34%);}
    .media-hardware:before{background-image:url('assets/hero/catalogo-terminales.png');background-position:center 48%;}
    .media-info:before{background-image:url('assets/hero/asesoria-personalizada.png');background-position:center;}
    .media-compare:before{background-image:url('assets/hero/comparativa-soluciones.png');background-position:center;}
    .media-growth:before{background-image:url('assets/hero/diagnostico-cobro.png');background-position:center;}
    .icon-terminal{background:linear-gradient(135deg,#0073e6,#19aeea)!important;}
    .icon-info,.icon-check{background:linear-gradient(135deg,#18a058,#25D366)!important;}
    .icon-compare,.icon-data{background:linear-gradient(135deg,#1A1F71,#0073e6)!important;}
    .icon-growth,.icon-star{background:linear-gradient(135deg,#ffd23f,#f59e0b)!important;color:#071d36!important;}

    .advisory-band{background:linear-gradient(135deg,#06182e,#064f9d 68%,#0875d1)!important;color:#fff!important;}
    .advice-split{align-items:center;gap:44px;}
    .advisory-band h2,.advisory-band h3{color:#fff!important;}
    .advisory-band .lead,.advice-list p{color:#dcecff!important;}
    .advice-photo{margin:24px 0 0;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,.26);box-shadow:0 22px 50px rgba(0,0,0,.22);background:#fff;}
    .advice-photo img{width:100%;height:300px;object-fit:cover;display:block;}
    .advice-list .list-item{background:rgba(255,255,255,.16)!important;border-color:rgba(255,255,255,.28)!important;backdrop-filter:blur(10px);box-shadow:0 16px 34px rgba(0,0,0,.12);}
    .advice-list .icon{font-size:0!important;display:grid;place-items:center;}

    .diagnostic-with-image{grid-template-columns:.82fr 1.18fr!important;}
    .diagnostic-visual{margin:22px 0 0;border-radius:22px;overflow:hidden;border:1px solid rgba(7,29,54,.12);box-shadow:0 22px 42px rgba(7,29,54,.12);}
    .diagnostic-visual img{width:100%;height:260px;object-fit:cover;display:block;}
    .diagnostic-stepper form{position:relative;}
    .diagnostic-stepper .diagnostic-progress{position:sticky;top:96px;z-index:10;background:rgba(255,255,255,.95);backdrop-filter:blur(10px);}
    .step-mode{display:block;min-height:360px;}
    .step-mode .q-card{display:none;max-width:720px;margin:0 auto;padding:28px;animation:questionIn .28s ease both;}
    .step-mode .q-card.active{display:block;}
    .step-mode .q-title{font-size:24px;line-height:1.25;margin-bottom:20px;}
    .step-mode .option span{padding:16px 18px;font-size:18px;}
    .diagnostic-nav{display:flex;gap:12px;justify-content:center;margin-top:18px;}
    .diagnostic-nav .btn[disabled]{opacity:.45;cursor:not-allowed;}
    #diagnosticSubmit{display:none!important;}
    .result.show{animation:resultIn .32s ease both;}
    .result-tags span:first-child{background:#fff8dc;color:#071d36;border-color:#ffd23f;}
    @keyframes questionIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    @keyframes resultIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}

    .payment-band{background:linear-gradient(135deg,#fff,#f3fbff 68%,#fff8dd)!important;padding-top:58px!important;}
    .payment-section h2{max-width:840px;margin-bottom:22px!important;}
    .payment-cloud{grid-template-columns:repeat(auto-fit,minmax(138px,1fr))!important;gap:18px!important;}
    .payment-cloud .logo-tile{min-height:122px;border-color:#cfe4f7;box-shadow:0 12px 28px rgba(7,29,54,.06);background:#fff;}
    .payment-cloud .logo-tile .brand-mask{width:108px!important;height:62px!important;}
    .payment-cloud .logo-tile img{max-width:124px!important;max-height:66px!important;width:auto;height:auto;object-fit:contain;}

    .final-cta{background:linear-gradient(135deg,#071d36,#075fb8)!important;color:#fff!important;padding:68px 0!important;}
    .final-grid{display:grid;grid-template-columns:1fr .82fr;gap:34px;align-items:center;}
    .final-cta h2,.final-cta h3{color:#fff!important;}
    .final-cta p{color:#dcecff!important;}
    .final-card{border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.12);border-radius:24px;padding:28px;box-shadow:0 22px 48px rgba(0,0,0,.16);backdrop-filter:blur(10px);}
    .final-card .channels{display:grid;gap:12px;margin-top:18px;}
    .compact-notice{padding:34px 0!important;background:#f5f9fc!important;}
    .compact-notice h2{font-size:24px!important;margin-bottom:8px!important;}
    .compact-notice p{font-size:15px!important;line-height:1.6!important;max-width:980px;}

    .terminal-hero{background:linear-gradient(135deg,#eaf8ff,#fff 60%,#fff8dd)!important;}
    .terminal-hero-grid{display:grid;grid-template-columns:.92fr 1.08fr;gap:34px;align-items:center;}
    .terminal-hero-visual,.compare-hero-visual{border-radius:28px;overflow:hidden;border:1px solid #cfe4f7;background:#fff;box-shadow:0 24px 60px rgba(7,29,54,.12);}
    .terminal-hero-visual img{display:block;width:100%;height:460px;object-fit:cover;}
    .compare-hero-inner{grid-template-columns:.95fr 1.05fr!important;align-items:center;}
    .compare-hero-visual img{display:block;width:100%;height:440px;object-fit:cover;}
    .article-hero-image img,.article-image img{height:auto!important;max-height:none!important;object-fit:contain!important;background:#fff;}

    .top-link{width:58px!important;height:58px!important;border-radius:18px!important;background:linear-gradient(135deg,#071d36,#006ce0)!important;color:#fff!important;border:1px solid rgba(255,255,255,.22)!important;box-shadow:0 18px 42px rgba(7,29,54,.28)!important;font-size:0!important;display:grid!important;place-items:center!important;transition:transform .2s ease,box-shadow .2s ease,background .2s ease!important;}
    .top-link:before{content:"";width:16px;height:16px;border-left:3px solid currentColor;border-top:3px solid currentColor;transform:rotate(45deg) translate(2px,2px);}
    .top-link:hover{transform:translateY(-4px)!important;box-shadow:0 24px 54px rgba(7,29,54,.34)!important;background:linear-gradient(135deg,#005fc1,#19aeea)!important;}
    body.privacy-page .header{position:relative!important;top:auto!important;}

    .cookie-banner{position:fixed;left:20px;right:20px;bottom:20px;z-index:9999;display:grid;grid-template-columns:1fr auto auto;gap:16px;align-items:center;max-width:1120px;margin:auto;padding:18px 20px;border:1px solid #cfe4f7;border-radius:18px;background:rgba(255,255,255,.96);box-shadow:0 24px 60px rgba(7,29,54,.18);backdrop-filter:blur(14px);}
    .cookie-banner strong{display:block;color:#071d36;font-size:18px;margin-bottom:4px;}
    .cookie-banner p{margin:0;color:#53687f;line-height:1.45;font-size:15px;}
    .cookie-banner a{font-weight:900;color:#0073e6;text-decoration:none;white-space:nowrap;}
    .cookie-actions{display:flex;gap:10px;}
    .cookie-actions .btn{height:46px;padding:0 18px;font-size:15px;}

    @media(max-width:900px){
      .sales-impact{grid-template-columns:1fr;}
      .media-feature-grid{grid-template-columns:1fr 1fr!important;}
      .diagnostic-with-image,.terminal-hero-grid,.compare-hero-inner,.final-grid{grid-template-columns:1fr!important;}
      .terminal-hero-visual img,.compare-hero-visual img{height:auto;max-height:520px;object-fit:contain;}
    }
    @media(max-width:680px){
      .header{transition:box-shadow .32s ease,background .32s ease!important;}
      .nav{padding:10px 16px 12px!important;gap:8px!important;transition:min-height .34s ease,padding .34s ease,gap .34s ease!important;}
      .brand{gap:10px!important;align-items:center!important;transition:max-height .34s ease,opacity .25s ease,transform .34s ease,margin .34s ease!important;}
      .brand-logo{width:70px!important;height:44px!important;object-fit:contain!important;}
      .brand-name{font-size:23px!important;line-height:1.02!important;}
      .brand-name small{font-size:13px!important;margin-top:3px!important;}
      .menu{display:flex!important;flex-wrap:nowrap!important;justify-content:flex-start!important;gap:13px!important;margin-top:6px!important;overflow-x:auto!important;max-width:100%!important;scrollbar-width:none!important;transition:max-height .34s ease,opacity .25s ease,transform .34s ease,margin .34s ease!important;}
      .menu::-webkit-scrollbar{display:none;}
      .menu a{font-size:15px!important;padding:5px 0!important;white-space:nowrap!important;}
      .header-actions{margin-top:8px!important;transition:margin .34s ease!important;display:grid!important;grid-template-columns:minmax(150px,1fr) auto!important;align-items:center!important;gap:8px!important;}
      .header-actions>.btn{height:46px!important;min-height:46px!important;padding:0 14px!important;font-size:15px!important;line-height:1.05!important;}
      .mobile-social{display:flex!important;gap:6px!important;justify-content:flex-end!important;}
      .mini-social{width:42px!important;height:42px!important;border-radius:9px!important;}
      .mini-social .brand-mask{width:22px!important;height:22px!important;}
      .header.compact{box-shadow:0 10px 28px rgba(7,29,54,.12)!important;background:rgba(255,255,255,.98)!important;}
      .header.compact .nav{padding:8px 14px!important;min-height:auto!important;gap:0!important;}
      .header.compact .brand,.header.compact .menu{max-height:0!important;opacity:0!important;transform:translateY(-10px)!important;margin:0!important;overflow:hidden!important;pointer-events:none!important;}
      .header.compact .header-actions{margin-top:0!important;}
      .header.compact .header-actions>.btn{height:44px!important;min-height:44px!important;}
      .header.compact .mini-social{width:40px!important;height:40px!important;}
      .hero-compact{padding-top:24px!important;padding-bottom:30px!important;}
      .hero-compact h1{font-size:clamp(39px,11.2vw,50px)!important;line-height:1.04!important;margin-bottom:16px!important;}
      .hero-compact .lead{font-size:18px!important;line-height:1.46!important;margin-bottom:18px!important;}
      .hero-compact .actions{display:grid!important;grid-template-columns:1fr!important;gap:10px!important;}
      .hero-compact .actions .btn{height:52px!important;min-height:52px!important;font-size:17px!important;}
      .hero-compact .actions .btn-primary[href*="mpago"]{display:none!important;}
      .photo-card>img{min-height:300px;}
      .hero-photo-card .note-card{font-size:15px!important;line-height:1.45!important;}
      .sales-impact{margin-bottom:34px;}
      .impact-copy,.impact-metric{border-radius:20px;padding:22px;}
      .impact-copy h2{font-size:31px!important;}
      .impact-copy p{font-size:16px;line-height:1.58;}
      .metric-number{gap:8px;}
      .metric-number strong{font-size:54px;}
      .metric-number em{font-size:16px;}
      .media-feature-grid{grid-template-columns:1fr!important;}
      .media-card{min-height:286px;border-radius:18px!important;padding:24px!important;}
      .media-card .icon{width:58px;height:58px;}
      .advisory-band{padding-top:44px!important;padding-bottom:48px!important;}
      .advice-photo img,.diagnostic-visual img{height:auto;}
      .advice-list .list-item{padding:18px!important;}
      .diagnostic-stepper .diagnostic-progress{top:70px;}
      .step-mode{min-height:390px;}
      .step-mode .q-card{padding:22px;}
      .step-mode .q-title{font-size:21px;}
      .step-mode .option span{font-size:16px;}
      .diagnostic-nav{display:grid;grid-template-columns:1fr;}
      .payment-band{padding-top:42px!important;}
      .payment-section h2{font-size:34px!important;line-height:1.12!important;}
      .payment-cloud{grid-template-columns:repeat(2,1fr)!important;gap:12px!important;}
      .payment-cloud .logo-tile{min-height:104px;}
      .payment-cloud .logo-tile img{max-width:108px!important;max-height:60px!important;}
      .final-cta{padding:50px 0!important;}
      .final-card{padding:22px;}
      .top-link{width:54px!important;height:54px!important;right:14px!important;bottom:86px!important;border-radius:16px!important;}
      .cookie-banner{grid-template-columns:1fr;left:12px;right:12px;bottom:12px;padding:16px;}
      .cookie-actions{display:grid;grid-template-columns:1fr 1fr;}
      .cookie-banner a{white-space:normal;}
    }
  `;
  document.head.appendChild(polishStyle);

  const injectPrivacyLinks = () => {
    const footers = Array.from(document.querySelectorAll('footer, .footer'));
    footers.forEach((footer) => {
      if (footer.querySelector(`a[href="${privacyHref}"]`)) return;
      const link = document.createElement('a');
      link.href = privacyHref;
      link.textContent = 'Privacidad';
      link.style.marginLeft = '14px';
      link.style.fontWeight = '900';
      const target = footer.querySelector('.footer-links, .links, nav') || footer;
      target.appendChild(link);
    });
  };

  const injectCookieBanner = () => {
    if (getConsent()) return;

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Aviso de cookies');
    banner.innerHTML = `
      <div>
        <strong>Ayudanos a mejorar la pagina</strong>
        <p>Usamos datos anonimos de navegacion para saber que informacion resulta mas util. Puedes aceptar o seguir solo con lo necesario.</p>
      </div>
      <div class="cookie-actions">
        <button class="btn btn-white" type="button" data-cookie-action="rejected">Solo necesarias</button>
        <button class="btn btn-primary" type="button" data-cookie-action="accepted">Aceptar</button>
      </div>
      <a href="${privacyHref}">Aviso de privacidad</a>
    `;
    document.body.appendChild(banner);

    banner.addEventListener('click', (event) => {
      const button = event.target.closest('[data-cookie-action]');
      if (!button) return;
      const value = button.getAttribute('data-cookie-action');
      setConsent(value);
      if (value === 'accepted') loadAnalytics();
      banner.remove();
    });
  };

  const initPrivacy = () => {
    injectPrivacyLinks();
    injectCookieBanner();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPrivacy);
  else initPrivacy();

  const header = document.querySelector('.header');
  if (header && !document.body.classList.contains('privacy-page')) {
    const compactItems = [header.querySelector('.brand'), header.querySelector('.menu')].filter(Boolean);
    const setCompact = (compact) => {
      header.classList.toggle('compact', compact);
      compactItems.forEach((item) => item.setAttribute('aria-hidden', compact ? 'true' : 'false'));
    };

    const compactHeader = () => {
      const isMobile = window.matchMedia('(max-width: 680px)').matches;
      if (!isMobile) {
        setCompact(false);
        return;
      }
      setCompact(Math.max(window.scrollY, 0) > 8);
    };

    window.addEventListener('scroll', compactHeader, { passive: true });
    window.addEventListener('resize', compactHeader);
    compactHeader();
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href') || '';
    const text = (link.textContent || link.getAttribute('aria-label') || '').trim().slice(0, 80);
    const url = new URL(link.href, window.location.href);
    const payload = { link_text: text, link_url: url.href };

    if (href.includes('mpago.li')) trackEvent('click_comprar_terminal', payload);
    else if (url.hostname.includes('wa.me')) trackEvent('click_whatsapp', payload);
    else if (url.hostname.includes('facebook.com')) trackEvent('click_facebook', payload);
    else if (url.hostname.includes('instagram.com')) trackEvent('click_instagram', payload);
    else if (href.includes('#diagnostico')) trackEvent('click_diagnostico', payload);
    else if (href.includes('compara.html')) trackEvent('click_comparativa', payload);
    else if (href.includes('terminales.html')) trackEvent('click_terminales', payload);
    else if (href.includes('blog')) trackEvent('click_blog', payload);
    else if (href.includes('privacidad.html')) trackEvent('click_privacidad', payload);
  });

  const form = document.getElementById('diagnosticForm');
  const progress = document.getElementById('diagnosticProgress');
  if (!form || !progress) return;

  const questionCards = Array.from(form.querySelectorAll('.q-card'));
  const requiredNames = Array.from(new Set(questionCards.flatMap((card) => Array.from(card.querySelectorAll('input[type="radio"]')).map((input) => input.name))));
  const total = requiredNames.length;
  let currentStep = 0;
  let progressText;
  let progressPercent;
  let progressFill;
  let progressSteps = [];
  let hasShownResult = false;
  let lastTrackedResult = '';

  const buildProgress = () => {
    progress.innerHTML = `
      <div class="progress-label">
        <span id="progressText">0 de ${total} respuestas</span>
        <span class="progress-percent" id="progressPercent">0%</span>
      </div>
      <div class="progress-track" aria-hidden="true"><span id="progressFill"></span></div>
      <div class="progress-steps" id="progressSteps" aria-hidden="true">${requiredNames.map(() => '<span></span>').join('')}</div>
    `;
    progressText = document.getElementById('progressText');
    progressPercent = document.getElementById('progressPercent');
    progressFill = document.getElementById('progressFill');
    progressSteps = Array.from(document.querySelectorAll('#progressSteps span'));
  };

  const showStep = (index) => {
    currentStep = Math.max(0, Math.min(index, questionCards.length - 1));
    questionCards.forEach((card, cardIndex) => {
      card.classList.toggle('active', cardIndex === currentStep);
      card.classList.toggle('answered-past', cardIndex < currentStep && Boolean(card.querySelector('input:checked')));
    });
    const back = document.getElementById('diagnosticBack');
    if (back) back.disabled = currentStep === 0;
  };

  const answeredCount = () => requiredNames.filter((name) => form.querySelector(`input[name="${name}"]:checked`)).length;

  const renderProgress = () => {
    if (!progressFill || !progressFill.isConnected) buildProgress();
    const answered = answeredCount();
    const percent = Math.round((answered / total) * 100);

    progressText.textContent = `${answered} de ${total} respuestas`;
    progressPercent.textContent = `${percent}%`;
    progressFill.style.width = `${percent}%`;
    progressSteps.forEach((step, index) => step.classList.toggle('done', index < answered));
    questionCards.forEach((card) => card.classList.toggle('is-answered', Boolean(card.querySelector('input:checked'))));
  };

  const profileResult = (data) => {
    const score = { rapida: 0, hibrida: 0, banca: 0 };

    if (data.formalidad === 'informal') score.rapida += 6;
    if (data.formalidad === 'fisica') { score.rapida += 2; score.hibrida += 2; }
    if (data.formalidad === 'moral') { score.banca += 4; score.hibrida += 3; }
    if (data.volumen === 'bajo') score.rapida += 4;
    if (data.volumen === 'medio') { score.rapida += 2; score.hibrida += 3; }
    if (data.volumen === 'alto') { score.banca += 5; score.hibrida += 3; }
    if (data.estabilidad === 'variable') score.rapida += 3;
    if (data.estabilidad === 'estable') { score.banca += 3; score.hibrida += 2; }
    if (data.liquidez === 'inmediata') score.rapida += 4;
    if (data.liquidez === 'normal') { score.banca += 1; score.hibrida += 1; }
    if (data.margen === 'bajo') score.banca += 3;
    if (data.margen === 'medio') score.hibrida += 2;
    if (data.margen === 'alto') { score.rapida += 1; score.hibrida += 1; }
    if (data.msi === 'interesa') score.hibrida += 3;
    if (data.msi === 'frecuente') score.banca += 4;
    if (data.operacion === 'movil' || data.operacion === 'online') score.rapida += 3;
    if (data.operacion === 'mostrador') { score.hibrida += 1; score.banca += 1; }
    if (data.preferencia === 'simple') score.rapida += 4;
    if (data.preferencia === 'costo') { score.banca += 4; score.hibrida += 2; }

    const winner = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
    const buyLink = 'https://mpago.li/2j1nqHG';
    const compareLink = isBlogArticle ? '../compara.html#matriz' : 'compara.html#matriz';

    return {
      rapida: {
        key: 'terminal_moderna',
        title: 'Recomendacion: terminal moderna',
        text: 'Empieza por Mercado Pago Point; despues compara Clip y NetPay. Es la ruta mas agil si buscas menos tramites, movilidad e inicio rapido.',
        tags: ['Mercado Pago Point', 'Clip', 'NetPay', 'Inicio rapido'],
        ctaText: 'Comprar terminal',
        ctaHref: buyLink,
        ctaClass: 'btn btn-primary'
      },
      hibrida: {
        key: 'modelo_hibrido',
        title: 'Recomendacion: modelo hibrido',
        text: 'Revisa opciones como Getnet o Konfio. Puede servir si ya vendes mas, quieres formalidad y buscas condiciones intermedias.',
        tags: ['Getnet', 'Konfio', 'Negocio en crecimiento', 'Contrato claro'],
        ctaText: 'Ver opciones del mercado',
        ctaHref: compareLink,
        ctaClass: 'btn btn-primary'
      },
      banca: {
        key: 'tpv_bancaria',
        title: 'Recomendacion: TPV bancaria',
        text: 'Compara BBVA, Banorte y Citibanamex. Puede convenirte si tienes RFC, cuenta, ventas constantes y buscas negociar condiciones.',
        tags: ['BBVA TPV', 'Banorte TPV', 'Citibanamex', 'Volumen estable'],
        ctaText: 'Ver comparativa bancaria',
        ctaHref: compareLink,
        ctaClass: 'btn btn-primary'
      }
    }[winner];
  };

  const showRecommendation = () => {
    renderProgress();
    const missingIndex = requiredNames.findIndex((name) => !form.querySelector(`input[name="${name}"]:checked`));
    if (missingIndex >= 0) {
      showStep(missingIndex);
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const result = profileResult(data);
    const res = document.getElementById('diagnosticResult');
    const title = document.getElementById('resultTitle');
    const text = document.getElementById('resultText');
    const tags = document.getElementById('resultTags');
    const cta = document.getElementById('resultWhatsapp');

    title.textContent = result.title;
    text.textContent = result.text;
    tags.innerHTML = result.tags.map((tag) => `<span>${tag}</span>`).join('');
    cta.textContent = result.ctaText;
    cta.href = result.ctaHref;
    cta.className = result.ctaClass;
    res.classList.add('show');

    if (lastTrackedResult !== result.key) {
      lastTrackedResult = result.key;
      trackEvent('diagnostico_resultado', { recommendation: result.key, recommendation_title: result.title });
    }

    if (!hasShownResult) {
      hasShownResult = true;
      setTimeout(() => res.scrollIntoView({ behavior: 'smooth', block: 'center' }), 220);
    }
  };

  buildProgress();
  showStep(0);
  renderProgress();

  form.addEventListener('change', (event) => {
    if (!event.target.matches('input[type="radio"]')) return;
    hasShownResult = false;
    const card = event.target.closest('.q-card');
    const index = questionCards.indexOf(card);

    trackEvent('diagnostico_respuesta', {
      question: event.target.name,
      answer: event.target.value,
      answered_count: answeredCount()
    });

    window.requestAnimationFrame(() => {
      renderProgress();
      if (answeredCount() === total) {
        showRecommendation();
        return;
      }
      if (index >= 0 && index < questionCards.length - 1) {
        setTimeout(() => {
          showStep(index + 1);
          renderProgress();
        }, 180);
      }
    });
  });

  const back = document.getElementById('diagnosticBack');
  if (back) back.addEventListener('click', () => {
    showStep(currentStep - 1);
    renderProgress();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    showRecommendation();
  });
})();
