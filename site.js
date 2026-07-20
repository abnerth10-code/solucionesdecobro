(() => {
  const GA_MEASUREMENT_ID = 'G-49P7XY0Z7W';
  const CONSENT_KEY = 'sdc_cookie_consent';
  const isBlogArticle = window.location.pathname.includes('/blog/');
  const assetPrefix = isBlogArticle ? '../' : '';
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

  const visualPolish = document.createElement('style');
  visualPolish.textContent = `
    :root{--navy:#071d36;--blue:#0073e6;--sky:#19aeea;--yellow:#ffd23f;--cream:#fff8df;--line:#cfe4f7;--muted:#53687f;--soft:#f5f9fc;}
    body{color:var(--navy);}

    .header{background:rgba(255,255,255,.98)!important;border-bottom:1px solid #d7e7f5!important;box-shadow:0 10px 30px rgba(7,29,54,.04);}
    .nav{grid-template-columns:minmax(390px,1fr) auto auto!important;gap:16px!important;}
    .header .brand{gap:12px!important;align-items:center!important;}
    .header .brand-logo{width:54px!important;height:54px!important;object-fit:contain!important;border-radius:14px!important;background:#fff!important;box-shadow:0 10px 24px rgba(7,29,54,.08)!important;}
    .header .brand-name{font-size:28px!important;line-height:1.02!important;letter-spacing:.005em!important;color:var(--navy)!important;}
    .header .brand-name small{font-size:15px!important;line-height:1.1!important;margin-top:4px!important;color:#697b8e!important;}
    .menu{gap:6px!important;}
    .menu a{font-size:16px!important;font-weight:900!important;color:#25384d!important;padding-inline:5px!important;}
    .menu a:hover{color:var(--blue)!important;}
    .header-actions>.btn{height:52px!important;padding:0 22px!important;font-size:16px!important;border-radius:999px!important;}
    .mini-social{border-color:#d7e7f5!important;background:#fff!important;box-shadow:0 8px 18px rgba(7,29,54,.05)!important;}

    .hero-compact{padding-top:38px!important;padding-bottom:34px!important;background:radial-gradient(circle at 88% 12%,rgba(255,210,63,.08),transparent 29%),radial-gradient(circle at 8% 88%,rgba(0,115,230,.05),transparent 32%),#fff!important;}
    .hero-compact .hero-inner{grid-template-columns:.9fr 1.1fr!important;gap:42px!important;align-items:center!important;}
    .hero-compact h1{font-size:clamp(48px,5.6vw,82px)!important;line-height:1.02!important;letter-spacing:-.01em!important;margin-bottom:18px!important;background:none!important;-webkit-background-clip:initial!important;background-clip:initial!important;color:#0758b5!important;}
    .hero-compact .lead{font-size:clamp(20px,2vw,27px)!important;line-height:1.46!important;max-width:760px!important;color:#31475e!important;}
    .hero-compact .actions{gap:14px!important;}
    .photo-card{overflow:hidden;background:#fff!important;}
    .photo-card>img{width:100%;height:100%;min-height:460px;object-fit:cover;display:block;border-radius:inherit;}
    .hero-photo-card{border-radius:var(--card-radius,20px)!important;box-shadow:0 24px 58px rgba(7,29,54,.14)!important;opacity:0;transform:translateY(14px) scale(.98);animation:heroCardIn .7s .15s ease forwards;}
    .hero-photo-card .note-card{display:flex!important;align-items:flex-start;gap:12px;max-width:380px!important;border-radius:16px!important;background:rgba(7,29,54,.5)!important;backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.24);box-shadow:0 16px 34px rgba(7,29,54,.22);}
    .hero-photo-card .note-icon{flex:none;display:grid;place-items:center;width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.3);color:#fff;}
    .hero-photo-card .note-icon svg{width:19px;height:16px;}
    .hero-photo-card .note-copy{display:flex;flex-direction:column;gap:4px;}
    .hero-photo-card .note-card strong{color:var(--yellow)!important;}
    @keyframes heroCardIn{to{opacity:1;transform:translateY(0) scale(1);}}
    @media(prefers-reduced-motion:reduce){.hero-photo-card{opacity:1;transform:none;animation:none;}}
    .diagnostic-menu-link{white-space:nowrap!important;}.label-short{display:none;}

    .impact-analogy{position:relative;padding-left:22px!important;border-left:5px solid var(--yellow)!important;max-width:760px;}
    .payment-path{display:grid;grid-template-columns:minmax(0,1fr) 44px minmax(0,1.15fr);gap:10px;align-items:stretch;margin-top:24px;}
    .payment-path>span:not(.path-arrow){display:grid;align-content:center;gap:4px;min-height:76px;padding:14px 16px;border:1px solid #cfe4f7;border-radius:16px;background:#fff;color:#19334f;line-height:1.25;}
    .payment-path b{font-size:15px;font-weight:950}.payment-path small{font-size:13px;color:#617386;font-weight:800}
    .payment-path .path-limited{border-color:#d9e2ea!important;background:#f7f9fb!important}.payment-path .path-open{border-color:#9bd3fb!important;background:#edf8ff!important;box-shadow:inset 4px 0 0 #0073e6}
    .payment-path .path-arrow{display:grid;place-items:center;color:#0073e6;font-size:28px;font-weight:950;}

    .advisory-band{background:radial-gradient(circle at 94% 10%,rgba(255,210,63,.06),transparent 30%),radial-gradient(circle at 6% 90%,rgba(0,115,230,.035),transparent 32%),#fff!important;color:var(--navy)!important;padding-top:64px!important;padding-bottom:64px!important;}
    .advice-split{align-items:stretch!important;gap:34px!important;grid-template-columns:.9fr 1.1fr!important;}
    .advisory-band h2,.advisory-band h3{color:var(--navy)!important;}
    .advisory-band .lead,.advice-list p{color:#40546a!important;}
    .advice-photo{position:relative;margin:22px 0 0!important;border-radius:28px!important;overflow:hidden!important;border:1px solid var(--line)!important;box-shadow:0 22px 50px rgba(7,29,54,.12)!important;min-height:330px!important;background:#fff!important;}
    .advice-photo img{display:block!important;width:100%!important;height:330px!important;object-fit:cover!important;}
    .advice-photo:after{content:"Asesoría para elegir con claridad";position:absolute;left:24px;right:24px;bottom:24px;padding:18px 20px;border-radius:20px;background:rgba(7,29,54,.54);backdrop-filter:blur(14px);color:#fff;font-weight:900;font-size:20px;box-shadow:0 14px 34px rgba(7,29,54,.22);}
    .advice-list{display:flex;align-items:stretch!important;min-width:0}
    .advice-list .list-item{background:#fff!important;border:1px solid var(--line)!important;box-shadow:0 14px 30px rgba(7,29,54,.06)!important;}
    .advice-list .icon{font-size:0!important;display:grid!important;place-items:center!important;border-radius:14px!important;}
    .diagnostic-with-image{grid-template-columns:.82fr 1.18fr!important;}
    .diagnostic-visual{margin:22px 0 0;border-radius:22px;overflow:hidden;border:1px solid rgba(7,29,54,.12);box-shadow:0 22px 42px rgba(7,29,54,.12);}
    .diagnostic-visual img{width:100%;height:260px;object-fit:cover;display:block;}
    .diagnostic-stepper .diagnostic-progress{position:sticky;top:96px;z-index:10;background:rgba(255,255,255,.95);backdrop-filter:blur(10px);}
    .step-mode{display:block;min-height:360px;}
    .step-mode .q-card{display:none;max-width:720px;margin:0 auto;padding:28px;animation:questionIn .28s ease both;}
    .step-mode .q-card.active{display:block;}
    .step-mode .q-title{font-size:24px;line-height:1.25;margin-bottom:20px;}
    .step-mode .option{position:relative;padding:16px 18px;font-size:18px;transition:border-color .16s ease,background .16s ease,transform .12s ease,box-shadow .16s ease;}
    .step-mode .option:hover{border-color:#8bc8f4;background:#f3faff;transform:translateY(-1px);box-shadow:0 8px 18px rgba(7,29,54,.07);}
    .step-mode .option input:focus-visible+.mark{outline:3px solid #ffbf00;outline-offset:2px;}
    .step-mode .option:has(input:checked){box-shadow:0 10px 24px rgba(0,115,230,.14);}
    .step-mode .option .mark{width:26px;height:26px;}
    .step-mode .option:has(input:checked) .mark{animation:markPop .2s ease both;}
    .step-mode .option .label{font-size:18px;}
    @keyframes markPop{from{transform:scale(.7)}to{transform:scale(1)}}
    .diagnostic-nav{display:flex;gap:12px;justify-content:center;margin-top:18px;}
    .diagnostic-nav .btn[disabled]{opacity:.45;cursor:not-allowed;}
    #diagnosticSubmit{display:inline-flex!important;}
    .diagnostic-stepper .result{border:1px solid #b9dcf7!important;border-radius:22px!important;padding:24px!important;background:radial-gradient(circle at 92% 10%,rgba(255,210,63,.22),transparent 24%),linear-gradient(135deg,#fff,#f6fbff 68%,#fff8df)!important;box-shadow:0 18px 44px rgba(7,29,54,.1)!important;}
    .result.show{animation:resultIn .32s ease both;}
    .result h3{display:flex;gap:10px;align-items:center;font-size:24px!important;margin-bottom:12px!important;}
    .result h3:before{border:none!important;width:34px;height:34px;border-radius:12px;background:linear-gradient(135deg,#0073e6,#19aeea);box-shadow:0 10px 22px rgba(0,115,230,.24);}
    .result p{font-size:18px!important;line-height:1.55!important;color:#33475c!important;}
    .result-tags a,.result-tags span{display:inline-flex;align-items:center;gap:6px;border-radius:999px;background:#edf7ff;color:#0058ba;border:1px solid #cfe4f7;padding:8px 12px;font-weight:900;font-size:14px;text-decoration:none;transition:transform .18s ease,background .18s ease;}
    .result-tags a:hover{transform:translateY(-2px);background:#dff2ff;}
    .result-tags .tag-primary{background:#fff8dc;color:#071d36;border-color:#ffd23f;}
    .result-actions-note{margin:4px 0 14px;color:#667789;font-size:14px;font-weight:800;}
    @keyframes questionIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    @keyframes resultIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}

    .payment-band{background:#fbfdff!important;padding-top:54px!important;border-top:1px solid #e3edf6!important;border-bottom:1px solid #e3edf6!important;}
    .payment-section h2{max-width:840px;margin-bottom:22px!important;}
    .payment-cloud{grid-template-columns:repeat(auto-fit,minmax(138px,1fr))!important;gap:18px!important;}
    .payment-cloud .logo-tile{min-height:122px;border-color:#cfe4f7;box-shadow:0 12px 28px rgba(7,29,54,.06);background:#fff;}
    .payment-cloud .logo-tile .brand-mask{width:108px!important;height:62px!important;}
    .payment-cloud .logo-tile img{max-width:124px!important;max-height:66px!important;width:auto;height:auto;object-fit:contain;}
    .payment-lead{max-width:840px;margin-bottom:18px!important}.payment-marquee:focus-visible{outline:3px solid #ffbf00;outline-offset:3px}
    .payment-marquee{position:relative;overflow-x:auto;overflow-y:hidden;margin-inline:calc(50% - 50vw);padding:12px max(20px,calc((100vw - var(--max))/2)) 22px;scroll-behavior:smooth;scroll-snap-type:x mandatory;scrollbar-width:thin;scrollbar-color:#8bc8f4 #eaf4fb}
    .payment-track{display:flex;width:max-content;gap:16px}.payment-set{display:flex;gap:16px}.payment-marquee .logo-tile{display:grid;place-items:center;flex:0 0 142px;width:142px;height:92px;padding:16px;border:1px solid #d8e8f6;border-radius:18px;background:#fff;box-shadow:0 12px 28px rgba(7,29,54,.07);scroll-snap-align:start}.payment-marquee .logo-tile img{max-width:108px;max-height:54px;width:auto;height:auto;object-fit:contain}.payment-name{text-align:center;color:#19334f}.payment-name strong{font-size:15px;line-height:1.2}
    @media(prefers-reduced-motion:reduce){.payment-marquee{scroll-behavior:auto}}

    .compact-notice{padding:32px 0!important;background:#f5f9fc!important;}
    .compact-notice h2{font-size:24px!important;margin-bottom:8px!important;}
    .compact-notice p{font-size:15px!important;line-height:1.6!important;max-width:980px;}

    .terminal-hero{background:linear-gradient(135deg,#eaf8ff,#fff 60%,#fff8dd)!important;}
    .terminal-hero-grid{display:grid;grid-template-columns:.92fr 1.08fr;gap:34px;align-items:center;}
    .terminal-hero-visual,.compare-hero-visual{border-radius:28px;overflow:hidden;border:1px solid #cfe4f7;background:#fff;box-shadow:0 24px 60px rgba(7,29,54,.12);}
    .terminal-hero-visual img{display:block;width:100%;height:460px;object-fit:cover;}
    .compare-hero-inner{grid-template-columns:.95fr 1.05fr!important;align-items:center;}
    .compare-hero-visual{background:linear-gradient(135deg,#fff,#f7fcff)!important;}
    .compare-hero-visual img{display:block;width:100%;height:440px;object-fit:cover;}
    .article-hero-image img,.article-image img{height:auto!important;max-height:none!important;object-fit:contain!important;background:#fff;}

    .top-link{width:54px!important;height:54px!important;border-radius:50%!important;background:rgba(7,29,54,.38)!important;color:#fff!important;border:1px solid rgba(255,255,255,.34)!important;box-shadow:0 14px 32px rgba(7,29,54,.18)!important;backdrop-filter:blur(12px)!important;font-size:0!important;display:grid!important;place-items:center!important;transition:transform .2s ease,opacity .2s ease,background .2s ease!important;}
    .top-link:before{content:"";width:16px;height:16px;border-left:3px solid currentColor;border-top:3px solid currentColor;transform:rotate(45deg) translate(2px,2px);}
    .top-link:hover{transform:translateY(-4px)!important;background:rgba(0,115,230,.68)!important;}
    body.privacy-page .header{position:relative!important;top:auto!important;}

    .cookie-banner{position:fixed;left:20px;right:20px;bottom:20px;z-index:9999;display:grid;grid-template-columns:1fr auto auto;gap:16px;align-items:center;max-width:1120px;margin:auto;padding:18px 20px;border:1px solid #cfe4f7;border-radius:18px;background:rgba(255,255,255,.96);box-shadow:0 24px 60px rgba(7,29,54,.18);backdrop-filter:blur(14px);}
    .cookie-banner strong{display:block;color:#071d36;font-size:18px;margin-bottom:4px;}
    .cookie-banner p{margin:0;color:#53687f;line-height:1.45;font-size:15px;}
    .cookie-banner a{font-weight:900;color:#0073e6;text-decoration:none;white-space:nowrap;}
    .cookie-actions{display:flex;gap:10px;}
    .cookie-actions .btn{height:46px;padding:0 18px;font-size:15px;}

    @media(max-width:900px){
      .nav,.hero-compact .hero-inner,.diagnostic-with-image,.terminal-hero-grid,.compare-hero-inner,.advice-split{grid-template-columns:1fr!important;}
      .terminal-hero-visual img,.compare-hero-visual img{height:auto;max-height:520px;object-fit:contain;}
    }
    @media(max-width:680px){
      .header{transition:box-shadow .32s ease,background .32s ease!important;}
      .nav{padding:12px 16px 13px!important;gap:8px!important;transition:min-height .34s ease,padding .34s ease,gap .34s ease!important;}
      .brand{gap:12px!important;align-items:center!important;transition:max-height .34s ease,opacity .25s ease,transform .34s ease,margin .34s ease!important;}
      .header .brand-logo{width:50px!important;height:50px!important;padding:4px!important;border-radius:13px!important;}
      .header .brand-name{font-size:27px!important;line-height:1.02!important;letter-spacing:.01em!important;max-width:360px!important;}
      .header .brand-name small{font-size:14px!important;margin-top:4px!important;}
      .menu{display:flex!important;flex-wrap:nowrap!important;justify-content:flex-start!important;gap:16px!important;margin-top:8px!important;overflow-x:auto!important;max-width:100%!important;scrollbar-width:none!important;transition:max-height .34s ease,opacity .25s ease,transform .34s ease,margin .34s ease!important;}
      .menu::-webkit-scrollbar{display:none;}
      .menu a{font-size:16px!important;padding:5px 0!important;white-space:nowrap!important;}
      .header-actions{margin-top:9px!important;transition:margin .34s ease!important;display:grid!important;grid-template-columns:minmax(180px,1fr) auto!important;align-items:center!important;gap:8px!important;}
      .header-actions>.btn{height:48px!important;min-height:48px!important;padding:0 14px!important;font-size:16px!important;line-height:1.05!important;}
      .mobile-social{display:flex!important;gap:7px!important;justify-content:flex-end!important;}
      .mini-social{width:44px!important;height:44px!important;border-radius:50%!important;}
      .mini-social .brand-mask{width:22px!important;height:22px!important;}
      .header.compact{box-shadow:0 10px 28px rgba(7,29,54,.12)!important;background:rgba(255,255,255,.985)!important;}
      .header.compact .nav{padding:8px 14px!important;min-height:auto!important;gap:0!important;}
      .header.compact .brand,.header.compact .menu{max-height:0!important;opacity:0!important;transform:translateY(-10px)!important;margin:0!important;overflow:hidden!important;pointer-events:none!important;}
      .header.compact .header-actions{margin-top:0!important;}
      .header.compact .header-actions>.btn{height:44px!important;min-height:44px!important;}
      .header.compact .mini-social{width:40px!important;height:40px!important;}
      .hero-compact{padding-top:20px!important;padding-bottom:24px!important;}
      .hero-compact h1{font-size:clamp(42px,11.4vw,54px)!important;line-height:1.04!important;margin-bottom:14px!important;}
      .hero-compact .lead{font-size:18px!important;line-height:1.46!important;margin-bottom:18px!important;}
      .hero-compact .actions{display:grid!important;grid-template-columns:1fr!important;gap:10px!important;}
      .hero-compact .actions .btn{height:52px!important;min-height:52px!important;font-size:17px!important;}
      .photo-card>img{min-height:300px;}
      .hero-photo-card .note-card{font-size:15px!important;line-height:1.45!important;}
      .payment-path{grid-template-columns:1fr!important}.payment-path .path-arrow{min-height:30px;transform:rotate(90deg)}
      .advisory-band{padding-top:44px!important;padding-bottom:48px!important;}
      .advice-photo{min-height:285px!important;}
      .advice-photo:after{font-size:16px;left:18px;right:18px;bottom:18px;}
      .advice-list .list-item{padding:18px!important;}
      .label-full{display:none}.label-short{display:inline}
      .diagnostic-stepper .diagnostic-progress{top:70px;}
      .step-mode{min-height:390px;}
      .step-mode .q-card{padding:22px;}
      .step-mode .q-title{font-size:21px;}
      .step-mode .option .label{font-size:16px;}
      .diagnostic-nav{display:grid;grid-template-columns:1fr;}
      .payment-band{padding-top:42px!important;}
      .payment-section h2{font-size:34px!important;line-height:1.12!important;}
      .payment-marquee{margin-inline:-20px;padding-inline:20px}
      .payment-marquee .logo-tile{flex-basis:124px;width:124px;height:82px}.payment-marquee .logo-tile img{max-width:96px;max-height:48px}
      .top-link{width:52px!important;height:52px!important;right:14px!important;bottom:84px!important;border-radius:50%!important;opacity:.72!important;}
      .cookie-banner{grid-template-columns:1fr;left:12px;right:12px;bottom:12px;gap:10px;padding:14px 16px;}
      .cookie-banner strong{font-size:16px;margin-bottom:2px;}
      .cookie-banner p{font-size:13px;line-height:1.38;}
      .cookie-banner a{font-size:13px;}
      .cookie-actions{display:grid;grid-template-columns:1fr 1fr;}
      .cookie-actions .btn{height:42px;min-height:42px;padding:0 10px;font-size:13px;}
      .cookie-banner a{white-space:normal;}
    }
  `;
  document.head.appendChild(visualPolish);

  const flatSurfacePalette = document.createElement('style');
  flatSurfacePalette.textContent = `
    body,
    .hero,
    .hero-compact,
    .product-hero,
    .terminal-hero,
    .compare-hero,
    .blog-hero,
    .article-hero,
    .growth-section,
    .blue-band,
    .diagnostic,
    .payment-band,
    .notice,
    .advisory-band,
    .contact,
    .terminal-final{background:#fff!important;}

    .stat-callout,
    .article-callout,
    .terminal-price,
    .comparison-table .provider-cell{background:#fff!important;}

    .rate-panel,
    .article-cta{background:#0758b5!important;}

    .progress-track span,
    .result h3:before,
    .icon-data{background:#0873df!important;}
    .icon-check{background:#18a058!important;}
    .icon-star{background:#ffd23f!important;}

    .home-page .hero,
    .home-page .growth-section{background:#fff!important;}
    .home-page .btn-primary{background:#0758b5!important;background-image:none!important;border-color:#0758b5!important;color:#fff!important;box-shadow:none!important;}
    .home-page .btn-primary:hover{background:#063f82!important;border-color:#063f82!important;}
    .home-page .btn-soft{background:#f2f7fb!important;background-image:none!important;border-color:#cbddea!important;color:#071d36!important;box-shadow:none!important;}
    .home-page .btn-yellow,
    .home-page .btn-white,
    .home-page button.btn{background-image:none!important;box-shadow:none!important;}

  `;
  document.head.appendChild(flatSurfacePalette);

  const setText = (selector, text) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
  };

  const applyVisualCopy = () => {
    setText('.impact-analogy', 'Quedarte solo con efectivo es mirar el mar desde la orilla: ves una parte, pero dejas fuera al océano de clientes que prefieren pagar con tarjeta, link o billetera digital.');
    setText('.feature-section-title', 'Información clara para decidir mejor.');
    setText('.feature-intro .lead', 'Comparamos el equipo, los costos, las condiciones y la capacidad de crecer.');
    setText('.advisory-band h2', 'Elige con claridad, no solo por precio.');
    setText('.advisory-band .lead', 'Conocemos tu negocio, comparamos opciones y te explicamos por qué una alternativa puede convenirte.');

    const imageFallbacks = [
      ['.advice-photo img', `${assetPrefix}assets/hero/asesoria-personalizada.webp`],
      ['.compare-hero-visual img', `${assetPrefix}assets/hero/diagnostico-cobro.webp`]
    ];

    imageFallbacks.forEach(([selector, fallback]) => {
      const img = document.querySelector(selector);
      if (!img) return;
      img.addEventListener('error', () => { img.src = fallback; }, { once: true });
      if (!img.getAttribute('src') || img.complete && img.naturalWidth === 0) img.src = fallback;
    });
  };

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
        <strong>Ayúdanos a mejorar la página</strong>
        <p>Usamos datos anónimos de navegación para saber qué información resulta más útil. Puedes aceptar o seguir solo con lo necesario.</p>
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

  const initPaymentMarquee = () => {
    const carousel = document.querySelector('.payment-marquee');
    const controls = Array.from(document.querySelectorAll('[data-payment-direction]'));
    if (!carousel) return;
    const step = () => Math.min(520, Math.max(260, carousel.clientWidth * .72));
    controls.forEach((control) => control.addEventListener('click', () => {
      const direction = control.dataset.paymentDirection === 'previous' ? -1 : 1;
      carousel.scrollBy({ left: direction * step(), behavior: 'smooth' });
    }));
    carousel.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      carousel.scrollBy({ left: (event.key === 'ArrowLeft' ? -1 : 1) * step(), behavior: 'smooth' });
    });

    let active = false;
    let startX = 0;
    let startScroll = 0;
    carousel.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch' || event.target.closest('a,button')) return;
      active = true;
      startX = event.clientX;
      startScroll = carousel.scrollLeft;
      carousel.classList.add('is-dragging');
      carousel.setPointerCapture(event.pointerId);
    });
    carousel.addEventListener('pointermove', (event) => {
      if (!active) return;
      carousel.scrollLeft = startScroll - (event.clientX - startX);
    });
    const stopDrag = (event) => {
      if (!active) return;
      active = false;
      carousel.classList.remove('is-dragging');
      if (carousel.hasPointerCapture(event.pointerId)) carousel.releasePointerCapture(event.pointerId);
    };
    carousel.addEventListener('pointerup', stopDrag);
    carousel.addEventListener('pointercancel', stopDrag);
  };

  const initStoryTabs = () => {
    const shell = document.querySelector('.story-shell');
    if (!shell) return;
    const tabs = Array.from(shell.querySelectorAll('.story-tab'));
    const media = Array.from(shell.querySelectorAll('.story-media img'));
    const progress = Array.from(shell.querySelectorAll('.story-progress span'));
    if (!tabs.length || !media.length) return;

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let current = 0;
    let timer = null;

    const show = (index) => {
      current = index;
      tabs.forEach((tab) => tab.classList.toggle('active', Number(tab.dataset.storyIndex) === index));
      media.forEach((img) => img.classList.toggle('active', Number(img.dataset.storyIndex) === index));
      progress.forEach((bar, barIndex) => {
        bar.classList.toggle('done', barIndex < index);
        bar.classList.toggle('active', barIndex === index);
      });
    };
    const next = () => show((current + 1) % tabs.length);
    const restart = () => {
      if (reduceMotion) return;
      window.clearInterval(timer);
      timer = window.setInterval(next, 4200);
    };

    tabs.forEach((tab) => tab.addEventListener('click', () => {
      show(Number(tab.dataset.storyIndex));
      restart();
    }));
    show(0);
    restart();
  };

  const initFeatureReveal = () => {
    const cards = Array.from(document.querySelectorAll('.feature-row .feature-card'));
    if (!cards.length) return;

    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || typeof window.IntersectionObserver !== 'function') {
      cards.forEach((card) => card.classList.add('is-visible'));
      return;
    }

    const observer = new window.IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const card = entry.target;
        const index = cards.indexOf(card);
        window.setTimeout(() => card.classList.add('is-visible'), Math.max(0, index) * 90);
        obs.unobserve(card);
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

    cards.forEach((card) => observer.observe(card));
  };

  const initPagePolish = () => {
    applyVisualCopy();
    initPaymentMarquee();
    initStoryTabs();
    initFeatureReveal();
    injectPrivacyLinks();
    injectCookieBanner();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPagePolish);
  else initPagePolish();

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
  const next = document.getElementById('diagnosticSubmit');
  const PHASE_NAMES = ['Tu negocio', 'Tu operación', 'Lo que necesitas'];
  const phaseStepsHost = document.getElementById('phaseSteps');
  const phaseNameEl = document.getElementById('phaseName');
  let currentStep = 0;
  let progressText;
  let progressPercent;
  let progressFill;
  let progressSteps = [];
  let hasShownResult = false;
  let lastTrackedResult = '';
  let autoAdvanceTimer = null;
  const AUTO_ADVANCE_DELAY = 450;
  const AUTO_ADVANCE_DELAY_CHECKBOX = 900;

  const isMultiCard = (card) => Boolean(card.querySelector('input[type="checkbox"]'));
  const cardRequiresAnswer = (card) => Boolean(card.querySelector('[required]'));

  const isCardVisible = (card) => {
    const cond = card.dataset.showIf;
    if (!cond) return true;
    const [name, valuesStr] = cond.split(':');
    const allowed = valuesStr.split(',');
    const checked = Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map((input) => input.value);
    return allowed.some((value) => checked.includes(value));
  };
  const visibleCards = () => questionCards.filter(isCardVisible);
  const getTotal = () => visibleCards().length;

  const cardPhase = (card) => (card ? Number(card.dataset.phase || 0) : 0);
  const cardsInPhase = (phaseIndex) => visibleCards().filter((card) => cardPhase(card) === phaseIndex);

  const renderPhaseHead = () => {
    if (!phaseStepsHost || !phaseNameEl) return;
    const activePhase = cardPhase(questionCards[currentStep]);
    phaseStepsHost.innerHTML = PHASE_NAMES.map((name, i) => {
      const cls = i < activePhase ? 'done' : (i === activePhase ? 'active' : '');
      const icon = i < activePhase ? '✓' : String(i + 1);
      return `<div class="phase-dot ${cls}"><span class="n">${icon}</span></div>`;
    }).join('');
    phaseNameEl.textContent = `Fase ${activePhase + 1} de ${PHASE_NAMES.length}: ${PHASE_NAMES[activePhase] || ''}`;
  };

  const nextVisibleIndex = (from) => {
    for (let i = from + 1; i < questionCards.length; i++) if (isCardVisible(questionCards[i])) return i;
    return -1;
  };
  const prevVisibleIndex = (from) => {
    for (let i = from - 1; i >= 0; i--) if (isCardVisible(questionCards[i])) return i;
    return -1;
  };

  const buildProgress = () => {
    const total = getTotal();
    progress.innerHTML = `
      <div class="progress-label">
        <span id="progressText">0 de ${total} respuestas</span>
        <span class="progress-percent" id="progressPercent">0%</span>
      </div>
      <div class="progress-track" aria-hidden="true"><span id="progressFill"></span></div>
      <div class="progress-steps" id="progressSteps" aria-hidden="true">${Array.from({ length: total }).map(() => '<span></span>').join('')}</div>
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
    if (back) back.disabled = prevVisibleIndex(currentStep) === -1;
    if (next) {
      const card = questionCards[currentStep];
      next.textContent = nextVisibleIndex(currentStep) === -1 ? 'Ver recomendación' : 'Siguiente';
      next.disabled = cardRequiresAnswer(card) && !card.querySelector('input:checked');
    }
  };

  const answeredCount = () => visibleCards().filter((card) => card.querySelector('input:checked')).length;

  const renderProgress = () => {
    buildProgress();
    const answered = answeredCount();
    const total = getTotal();
    const percent = total ? Math.round((answered / total) * 100) : 0;

    const activeCard = questionCards[currentStep];
    const phaseCards = cardsInPhase(cardPhase(activeCard));
    const posInPhase = phaseCards.indexOf(activeCard);
    progressText.textContent = posInPhase !== -1
      ? `Pregunta ${posInPhase + 1} de ${phaseCards.length} en esta fase`
      : `${answered} de ${total} respuestas`;
    progressPercent.textContent = `${percent}%`;
    progressFill.style.width = `${percent}%`;
    progressSteps.forEach((step, index) => step.classList.toggle('done', index < answered));
    questionCards.forEach((card) => card.classList.toggle('is-answered', Boolean(card.querySelector('input:checked'))));
    renderPhaseHead();
  };

  const collectFormData = () => {
    const formData = new FormData(form);
    const data = {};
    questionCards.forEach((card) => {
      const input = card.querySelector('input');
      if (!input) return;
      data[input.name] = isMultiCard(card) ? formData.getAll(input.name) : (formData.get(input.name) || '');
    });
    return data;
  };

  const profileResult = (data) => {
    const canal = Array.isArray(data.canal) ? data.canal : [];
    const funciones = Array.isArray(data.funciones) ? data.funciones : [];
    const compromiso = Array.isArray(data.compromiso) ? data.compromiso : [];
    const conectividad = Array.isArray(data.conectividad) ? data.conectividad : [];

    const compareLink = isBlogArticle ? '../compara.html#matriz' : 'compara.html#matriz';
    const categoryLink = (category) => `${compareLink.split('#')[0]}?tipo=${category}#matriz`;

    // Pagos a plazos sin tarjeta es una necesidad puntual: la mostramos directo.
    if (data.plazos === 'bnpl') {
      return {
        key: 'pagos_plazos',
        title: 'Ruta recomendada: pagos a plazos sin tarjeta',
        text: 'Un esquema BNPL puede ampliar opciones para tus clientes, pero su comisión suele ser mayor. Evalúalo solo si tu margen puede absorber el costo.',
        tags: [
          { label: 'Kueski Pay', href: 'https://www.kueskipay.com/para-comercios', primary: true },
          { label: 'Aplazo', href: 'https://aplazo.mx/' },
          { label: 'Revisar margen' }
        ],
        note: 'Por qué: elegiste pagos a plazos sin tarjeta. Antes de contratar calcula el margen neto, devoluciones, liquidación y elegibilidad de tus productos.',
        ctaText: 'Comparar opciones BNPL',
        ctaHref: categoryLink('bnpl'),
        ctaClass: 'btn btn-primary'
      };
    }

    const score = { rapida: 0, hibrida: 0, banca: 0, pasarela: 0 };

    if (canal.includes('ecommerce')) score.pasarela += 7;
    if (canal.includes('movil')) score.rapida += 4;
    if (canal.includes('links')) { score.rapida += 3; score.pasarela += 2; }
    if (canal.includes('mostrador')) { score.hibrida += 1; score.banca += 1; score.rapida += 1; }

    if (data.formalidad === 'sin_rfc') score.rapida += 6;
    if (data.formalidad === 'fisica') { score.rapida += 2; score.hibrida += 2; }
    if (data.formalidad === 'moral') { score.banca += 4; score.hibrida += 3; }

    if (data.volumen === 'bajo') score.rapida += 4;
    if (data.volumen === 'medio') { score.rapida += 2; score.hibrida += 3; }
    if (data.volumen === 'alto') { score.banca += 4; score.hibrida += 3; }
    if (data.volumen === 'muy_alto') score.banca += 6;

    if (data.ticket === 'alto' || data.ticket === 'muy_alto') { score.banca += 1; score.hibrida += 1; }
    if (data.ticket === 'bajo') score.rapida += 1;

    if (data.estabilidad === 'variable') score.rapida += 3;
    if (data.estabilidad === 'temporada') score.hibrida += 1;
    if (data.estabilidad === 'estable') { score.banca += 3; score.hibrida += 2; }

    if (data.liquidez === 'mismo_dia') score.rapida += 4;
    if (data.liquidez === 'siguiente_dia') { score.rapida += 1; score.hibrida += 1; }
    if (data.liquidez === 'dos_dias') { score.banca += 1; score.hibrida += 1; }

    if (funciones.includes('simple')) score.rapida += 3;
    if (funciones.includes('catalogo') || funciones.includes('multiusuario')) { score.hibrida += 2; score.banca += 1; }
    if (funciones.includes('integracion')) score.pasarela += 3;

    if (compromiso.includes('comprar')) score.rapida += 3;
    if (compromiso.includes('renta')) { score.hibrida += 2; score.banca += 2; }
    if (compromiso.includes('ninguno')) score.rapida += 4;

    if (data.prioridad === 'costo') { score.banca += 5; score.hibrida += 2; }
    if (data.prioridad === 'liquidez') score.rapida += 5;
    if (data.prioridad === 'facilidad') score.rapida += 5;
    if (data.prioridad === 'flexibilidad') score.rapida += 4;
    if (data.prioridad === 'soporte') { score.hibrida += 3; score.banca += 2; }
    if (data.prioridad === 'funciones') { score.hibrida += 2; score.pasarela += 3; }

    if (data.plazos === 'msi_frecuente') score.banca += 4;
    if (data.plazos === 'msi_ocasional') score.hibrida += 2;

    if (conectividad.includes('senal_debil')) score.rapida += 2;

    if (data.plataforma && data.plataforma !== 'ninguna' && data.plataforma !== 'no_seguro') score.pasarela += 3;

    // Filtros duros: descartamos categorías que hoy no puedes contratar o no aceptas.
    if (data.formalidad === 'sin_rfc') score.banca = -Infinity;
    if (compromiso.includes('ninguno')) { score.banca = -Infinity; score.hibrida = -Infinity; }

    const winner = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];

    return {
      rapida: {
        key: 'terminal_moderna',
        title: 'Ruta recomendada: cobro rápido',
        text: 'Tu perfil favorece una terminal de activación sencilla y sin renta obligatoria, incluida la opción de cobrar con el celular (Tap to Pay) si te mueves seguido. Compara costo total, tiempo de depósito, movilidad y soporte antes de elegir.',
        tags: [
          { label: 'Mercado Pago Point', href: 'https://www.mercadopago.com.mx/herramientas-para-vender/lectores-point', primary: true },
          { label: 'Clip', href: 'https://www.clip.mx/' },
          { label: 'Ualá Bis', href: 'https://www.ualabis.com.mx/' },
          { label: 'Menos trámites' }
        ],
        note: 'Por qué: tus respuestas priorizan facilidad, flexibilidad, rapidez o movilidad. Confirma la tasa final con IVA, los límites, el plazo de depósito y si necesitas NFC para cobrar con el celular.',
        ctaText: 'Comparar opciones rápidas',
        ctaHref: categoryLink('rapida'),
        ctaClass: 'btn btn-primary'
      },
      hibrida: {
        key: 'modelo_hibrido',
        title: 'Recomendación: modelo híbrido',
        text: 'Revisa Getnet y Konfío. Puede servir si ya vendes más, quieres formalidad y buscas equilibrar tecnología con mejores condiciones.',
        tags: [
          { label: 'Getnet', href: 'https://www.getnet.net/mx/', primary: true },
          { label: 'Konfío', href: 'https://konfio.mx/terminal-punto-de-venta/' },
          { label: 'Negocio en crecimiento' },
          { label: 'Contrato claro' }
        ],
        note: 'Por qué: tu operación ya necesita más funciones, pero todavía importa conservar flexibilidad. Revisa contrato, liquidación y costo total.',
        ctaText: 'Ver opciones del mercado',
        ctaHref: categoryLink('hibrida'),
        ctaClass: 'btn btn-primary'
      },
      banca: {
        key: 'tpv_bancaria',
        title: 'Recomendación: TPV bancaria',
        text: 'Compara BBVA, Banorte y Citibanamex. Puede convenirte si tienes RFC, cuenta, ventas constantes y buscas negociar condiciones.',
        tags: [
          { label: 'BBVA TPV', href: 'https://www.bbva.mx/empresas/productos/cobros-y-pagos.html', primary: true },
          { label: 'Banorte TPV', href: 'https://www.banorte.com/' },
          { label: 'Citibanamex', href: 'https://www.banamex.com/es/pymes/productos-y-servicios/cobros/' },
          { label: 'Volumen estable' }
        ],
        note: 'Por qué: tu formalidad, volumen o estabilidad pueden ayudarte a negociar. Revisa renta, mínimos, permanencia y costo de la cuenta vinculada.',
        ctaText: 'Ver comparativa bancaria',
        ctaHref: categoryLink('banca'),
        ctaClass: 'btn btn-primary'
      },
      pasarela: {
        key: 'pasarela_digital',
        title: 'Ruta recomendada: pagos en línea',
        text: 'Tu negocio necesita cobrar a distancia o integrar una tienda en línea. Compara pasarelas por costo por transacción, integración, antifraude, contracargos y liquidación.',
        tags: [
          { label: 'Openpay', href: 'https://www.openpay.mx/', primary: true },
          { label: 'Conekta', href: 'https://www.conekta.com/' },
          { label: 'Stripe', href: 'https://stripe.com/mx' },
          { label: 'Venta digital' }
        ],
        note: 'Por qué: indicaste que vendes en línea, por links o necesitas integración. Valida costos fijos, reservas, devoluciones y soporte técnico.',
        ctaText: 'Comparar pasarelas',
        ctaHref: categoryLink('pasarela'),
        ctaClass: 'btn btn-primary'
      },
    }[winner];
  };

  const showRecommendation = () => {
    renderProgress();
    const missing = visibleCards().find((card) => cardRequiresAnswer(card) && !card.querySelector('input:checked'));
    if (missing) {
      showStep(questionCards.indexOf(missing));
      return;
    }

    const data = collectFormData();
    const result = profileResult(data);
    const res = document.getElementById('diagnosticResult');
    const title = document.getElementById('resultTitle');
    const text = document.getElementById('resultText');
    const tags = document.getElementById('resultTags');
    const cta = document.getElementById('resultWhatsapp');

    title.textContent = result.title;
    text.textContent = result.text;
    tags.innerHTML = result.tags.map((tag) => {
      const className = tag.primary ? ' class="tag-primary"' : '';
      if (tag.href) return `<a${className} href="${tag.href}" target="_blank" rel="noopener">${tag.label}</a>`;
      return `<span${className}>${tag.label}</span>`;
    }).join('');

    const existingNote = res.querySelector('.result-actions-note');
    if (existingNote) existingNote.remove();
    if (result.note) {
      const note = document.createElement('p');
      note.className = 'result-actions-note';
      note.textContent = result.note;
      cta.insertAdjacentElement('beforebegin', note);
    }

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

  const goToNextOrFinish = (index) => {
    const nextIndex = nextVisibleIndex(index);
    if (nextIndex === -1) {
      showRecommendation();
    } else {
      showStep(nextIndex);
      renderProgress();
      questionCards[nextIndex]?.querySelector('.q-title')?.focus?.();
    }
  };

  buildProgress();
  showStep(0);
  renderProgress();

  form.addEventListener('change', (event) => {
    if (!event.target.matches('input[type="radio"], input[type="checkbox"]')) return;
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
      // Si para cuando corre este frame el auto-avance ya movió currentStep hacia
      // adelante (por ejemplo, si el navegador retrasó este frame), no lo pisemos
      // reactivando la tarjeta vieja: solo refrescamos si seguimos en la misma pregunta.
      if (currentStep === index) showStep(index);
    });

    // Avanza sola a la siguiente pregunta poco después de elegir una opción, dejando ver
    // brevemente la marca de seleccionado antes de cambiar. En preguntas de opción múltiple
    // (checkbox) usamos un retraso mayor que se reinicia con cada clic, para que el usuario
    // pueda marcar varias casillas antes de que avance solo.
    window.clearTimeout(autoAdvanceTimer);
    const cardNeedsAnswer = cardRequiresAnswer(card) && !card.querySelector('input:checked');
    if (!cardNeedsAnswer) {
      const delay = event.target.type === 'radio' ? AUTO_ADVANCE_DELAY : AUTO_ADVANCE_DELAY_CHECKBOX;
      autoAdvanceTimer = window.setTimeout(() => goToNextOrFinish(index), delay);
    }
  });

  const back = document.getElementById('diagnosticBack');
  if (back) back.addEventListener('click', () => {
    window.clearTimeout(autoAdvanceTimer);
    const prevIndex = prevVisibleIndex(currentStep);
    if (prevIndex !== -1) showStep(prevIndex);
    renderProgress();
  });

  if (next) next.addEventListener('click', () => {
    const card = questionCards[currentStep];
    if (cardRequiresAnswer(card) && !card.querySelector('input:checked')) {
      card.querySelector('.option input')?.focus();
      return;
    }
    window.clearTimeout(autoAdvanceTimer);
    goToNextOrFinish(currentStep);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    showRecommendation();
  });
})();
