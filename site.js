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
    .header-actions>.btn{height:52px!important;padding:0 20px!important;font-size:16px!important;border-radius:12px!important;}
    .mini-social{border-color:#d7e7f5!important;background:#fff!important;box-shadow:0 8px 18px rgba(7,29,54,.05)!important;}

    .hero-compact{padding-top:38px!important;padding-bottom:34px!important;background:radial-gradient(circle at 88% 12%,rgba(255,210,63,.08),transparent 29%),radial-gradient(circle at 8% 88%,rgba(0,115,230,.05),transparent 32%),#fff!important;}
    .hero-compact .hero-inner{grid-template-columns:.9fr 1.1fr!important;gap:42px!important;align-items:center!important;}
    .hero-compact h1{font-size:clamp(48px,5.6vw,82px)!important;line-height:1.02!important;letter-spacing:-.01em!important;margin-bottom:18px!important;background:none!important;-webkit-background-clip:initial!important;background-clip:initial!important;color:#0758b5!important;}
    .hero-compact .lead{font-size:clamp(20px,2vw,27px)!important;line-height:1.46!important;max-width:760px!important;color:#31475e!important;}
    .hero-compact .actions{gap:14px!important;}
    .photo-card{overflow:hidden;background:#fff!important;}
    .photo-card>img{width:100%;height:100%;min-height:460px;object-fit:cover;display:block;border-radius:inherit;}
    .hero-photo-card{box-shadow:0 24px 58px rgba(7,29,54,.14)!important;}
    .hero-photo-card .note-card{background:rgba(7,29,54,.50)!important;backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.24);box-shadow:0 16px 34px rgba(7,29,54,.22);}
    .hero-photo-card .note-card strong{color:var(--yellow)!important;}
    .diagnostic-menu-link{white-space:nowrap!important;}.label-short{display:none;}

    .sales-impact{display:grid!important;grid-template-columns:1.18fr .82fr!important;gap:30px!important;align-items:stretch!important;margin:-10px 0 40px!important;}
    .impact-copy,.impact-metric{border:1px solid var(--line)!important;border-radius:28px!important;box-shadow:0 18px 44px rgba(7,29,54,.08)!important;}
    .impact-copy{padding:36px!important;background:linear-gradient(135deg,#fff,#f6fbff 64%,#fff8df)!important;transform:none!important;}
    .impact-copy h2{font-size:clamp(32px,3.6vw,54px)!important;line-height:1.04!important;margin:0 0 18px!important;}
    .impact-copy p{font-size:20px!important;line-height:1.58!important;color:#42576f!important;margin:0!important;}
    .impact-analogy{position:relative;padding-left:22px!important;border-left:5px solid var(--yellow)!important;max-width:760px;}
    .impact-copy .eyebrow{display:block;margin-bottom:12px;color:#0758b5;font-weight:950;letter-spacing:.13em;text-transform:uppercase;font-size:13px;}
    .payment-path{display:grid;grid-template-columns:minmax(0,1fr) 44px minmax(0,1.15fr);gap:10px;align-items:stretch;margin-top:24px;}
    .payment-path>span:not(.path-arrow){display:grid;align-content:center;gap:4px;min-height:76px;padding:14px 16px;border:1px solid #cfe4f7;border-radius:16px;background:#fff;color:#19334f;line-height:1.25;}
    .payment-path b{font-size:15px;font-weight:950}.payment-path small{font-size:13px;color:#617386;font-weight:800}
    .payment-path .path-limited{border-color:#d9e2ea!important;background:#f7f9fb!important}.payment-path .path-open{border-color:#9bd3fb!important;background:#edf8ff!important;box-shadow:inset 4px 0 0 #0073e6}
    .payment-path .path-arrow{display:grid;place-items:center;color:#0073e6;font-size:28px;font-weight:950;}
    .impact-metric{position:relative;overflow:hidden;padding:32px!important;display:flex!important;flex-direction:column!important;justify-content:center!important;min-height:265px;background:#071d36!important;color:#fff!important;}
    .impact-metric:before{content:"";position:absolute;inset:18px;border:1px solid rgba(255,255,255,.18);border-radius:22px;pointer-events:none;}
    .impact-metric span{font-size:13px!important;text-transform:uppercase!important;letter-spacing:.16em!important;font-weight:900!important;color:#dff4ff!important;}
    .metric-number{display:flex!important;align-items:flex-end!important;justify-content:space-between!important;gap:18px!important;margin:18px 0 16px!important;position:relative;z-index:1;}
    .metric-number strong{font-size:clamp(56px,6vw,84px)!important;line-height:.9!important;color:var(--yellow)!important;text-shadow:0 16px 32px rgba(0,0,0,.18);}
    .metric-number em{font-style:normal!important;font-weight:900!important;color:#fff!important;font-size:21px!important;line-height:1.6!important;text-transform:uppercase!important;}
    .impact-metric small{font-size:13px!important;line-height:1.45!important;color:#d8e8f6!important;max-width:470px;position:relative;z-index:1;}
    .impact-metric small strong{color:#fff}
    .impact-symbol{position:absolute;right:34px;top:32px;width:98px;height:70px;display:flex;align-items:end;gap:7px;opacity:.28;z-index:1;}
    .impact-symbol i{display:block;width:14px;border-radius:999px 999px 4px 4px;background:#fff;animation:impactBars 3.2s ease-in-out infinite;}
    .impact-symbol i:nth-child(1){height:24px}.impact-symbol i:nth-child(2){height:42px;animation-delay:.18s}.impact-symbol i:nth-child(3){height:62px;animation-delay:.36s}.impact-symbol b{position:absolute;right:0;top:-12px;color:var(--yellow);font-size:42px;}
    @keyframes impactBars{0%,100%{transform:scaleY(.84);opacity:.66}50%{transform:scaleY(1);opacity:1}}

    .media-feature-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;align-items:stretch!important;gap:24px!important;}
    .media-card{--card-accent:#56b7ff;position:relative!important;overflow:hidden!important;min-height:430px!important;padding:0!important;display:flex!important;flex-direction:column!important;justify-content:flex-end!important;color:#071d36!important;background:#fff!important;border:1px solid #d8e8f6!important;box-shadow:0 18px 44px rgba(7,29,54,.1)!important;transition:transform .22s ease,box-shadow .22s ease!important;}
    .media-card:before{content:"";position:absolute;inset:0 0 43% 0;background-size:cover;background-position:center 42%;filter:saturate(.82) contrast(.96);transform:scale(1.01);transition:transform .35s ease,filter .35s ease;}
    .media-card:after{content:"";position:absolute;left:0;right:0;top:53%;height:48px;z-index:0;background:linear-gradient(180deg,transparent,#fff 92%);}
    .media-card:hover{transform:translateY(-5px);box-shadow:0 26px 60px rgba(7,29,54,.2)!important;}
    .media-card:hover:before{transform:scale(1.045);filter:saturate(.9) contrast(1);}
    .media-card .icon,.media-card .card-copy{position:relative;z-index:1;}
    .media-card .card-copy{width:100%;min-height:43%;padding:24px 26px 26px;border:0;border-top:5px solid var(--card-accent);border-radius:0;background:#fff;box-shadow:none;}
    .media-card .card-kicker{display:block;margin:0 0 7px;color:var(--card-accent);font-size:12px;font-weight:950;letter-spacing:.14em;text-transform:uppercase;}
    .media-card h3{color:#071d36!important;font-size:25px!important;}
    .media-card p{color:#53687f!important;font-size:16px!important;line-height:1.55!important;margin-bottom:0!important;}
    .media-card .icon{position:absolute!important;left:24px;top:24px;width:58px!important;height:58px!important;font-size:0!important;color:#fff!important;box-shadow:0 12px 28px rgba(7,29,54,.2)!important;display:grid!important;place-items:center!important;border-radius:18px!important;}
    .media-card .icon:before,.advice-list .icon:before,.result h3:before{content:"";display:block;width:28px;height:28px;border:3px solid currentColor;border-radius:7px;}
    .icon-info:before{border:none!important;width:12px!important;height:34px!important;border-radius:8px!important;background:currentColor!important;box-shadow:14px 10px 0 currentColor,-14px 18px 0 currentColor;}
    .icon-compare:before{border:none!important;width:34px!important;height:12px!important;border-radius:999px!important;background:currentColor!important;box-shadow:0 -12px 0 rgba(255,255,255,.72),0 12px 0 rgba(255,255,255,.72);}
    .icon-growth:before{border:none!important;width:28px!important;height:28px!important;border-top:4px solid currentColor!important;border-right:4px solid currentColor!important;border-radius:0!important;}
    .icon-check:before{border:none!important;width:28px!important;height:16px!important;border-left:5px solid currentColor!important;border-bottom:5px solid currentColor!important;border-radius:0!important;transform:rotate(-45deg);}
    .icon-data:before{border:none!important;width:30px!important;height:30px!important;background:linear-gradient(135deg,currentColor 0 28%,transparent 28% 42%,currentColor 42% 64%,transparent 64% 78%,currentColor 78% 100%);border-radius:7px!important;}
    .icon-star:before{border:none!important;width:28px!important;height:28px!important;background:currentColor!important;clip-path:polygon(50% 0,61% 34%,98% 35%,68% 56%,79% 91%,50% 70%,21% 91%,32% 56%,2% 35%,39% 34%);}
    .media-info{--card-accent:#63d3c1}.media-compare{--card-accent:#ffd23f}.media-growth{--card-accent:#8ed081}
    .media-info:before{background-position:center 46%}.media-compare:before{background-position:center 40%}.media-growth:before{background-position:center 48%}
    .icon-terminal,.icon-info,.icon-compare,.icon-growth{background:rgba(7,29,54,.84)!important;color:#fff!important;border:1px solid rgba(255,255,255,.52)!important;backdrop-filter:blur(12px)!important;}
    .icon-check{background:linear-gradient(135deg,#18a058,#25D366)!important;}
    .icon-data{background:linear-gradient(135deg,#1A1F71,#0073e6)!important;}
    .icon-star{background:linear-gradient(135deg,#ffd23f,#f59e0b)!important;color:#071d36!important;}

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
    .advice-video-shell{position:relative;overflow:hidden;min-height:100%;width:100%;border-radius:26px;background:linear-gradient(145deg,#071d36,#0758b5);color:#fff;box-shadow:0 20px 46px rgba(7,29,54,.18);}
    .advice-video-shell:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 86% 12%,rgba(255,210,63,.24),transparent 28%),linear-gradient(115deg,transparent 0 48%,rgba(255,255,255,.05) 48% 50%,transparent 50%);background-size:auto,34px 34px;}
    .video-preview{position:relative;z-index:1;display:flex;min-height:100%;padding:30px;flex-direction:column;justify-content:space-between;}
    .video-topline{display:flex;justify-content:space-between;align-items:center;gap:12px}.video-badge,.video-status{display:inline-flex;align-items:center;min-height:34px;padding:7px 11px;border-radius:999px;font-size:12px;font-weight:950;letter-spacing:.04em}.video-badge{background:#fff;color:#0758b5}.video-status{border:1px solid rgba(255,255,255,.26);color:#dff2ff;background:rgba(255,255,255,.08)}
    .video-story{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:26px 0}.video-story span{display:grid;gap:8px;min-height:104px;align-content:center;padding:14px;border:1px solid rgba(255,255,255,.18);border-radius:16px;background:rgba(255,255,255,.09);color:#fff;font-size:13px;font-weight:850;line-height:1.25;animation:storyGlow 6s ease-in-out infinite}.video-story span:nth-child(2){animation-delay:2s}.video-story span:nth-child(3){animation-delay:4s}.video-story b{display:grid;place-items:center;width:30px;height:30px;border-radius:10px;background:var(--yellow);color:#071d36}
    .video-message{display:grid;gap:6px}.video-message small{color:#9edcff;font-size:13px;font-weight:950;text-transform:uppercase;letter-spacing:.11em}.video-message strong{max-width:520px;color:#fff;font-size:clamp(24px,2.4vw,34px);line-height:1.05}
    @keyframes storyGlow{0%,24%,100%{transform:translateY(0);background:rgba(255,255,255,.09)}10%{transform:translateY(-5px);background:rgba(255,255,255,.17)}}

    .diagnostic-with-image{grid-template-columns:.82fr 1.18fr!important;}
    .diagnostic-visual{margin:22px 0 0;border-radius:22px;overflow:hidden;border:1px solid rgba(7,29,54,.12);box-shadow:0 22px 42px rgba(7,29,54,.12);}
    .diagnostic-visual img{width:100%;height:260px;object-fit:cover;display:block;}
    .diagnostic-stepper .diagnostic-progress{position:sticky;top:96px;z-index:10;background:rgba(255,255,255,.95);backdrop-filter:blur(10px);}
    .step-mode{display:block;min-height:360px;}
    .step-mode .q-card{display:none;max-width:720px;margin:0 auto;padding:28px;animation:questionIn .28s ease both;}
    .step-mode .q-card.active{display:block;}
    .step-mode .q-title{font-size:24px;line-height:1.25;margin-bottom:20px;}
    .step-mode .option span{position:relative;padding:16px 52px 16px 18px;font-size:18px;transition:border-color .16s ease,background .16s ease,transform .12s ease,box-shadow .16s ease;}
    .step-mode .option span:hover{border-color:#8bc8f4;background:#f3faff;transform:translateY(-1px);box-shadow:0 8px 18px rgba(7,29,54,.07);}
    .step-mode .option input:focus-visible+span{outline:3px solid #ffbf00;outline-offset:2px;}
    .step-mode .option input:checked+span{box-shadow:0 10px 24px rgba(0,115,230,.14);}
    .step-mode .option input:checked+span:after{content:"";position:absolute;right:18px;top:50%;width:24px;height:24px;margin-top:-12px;border-radius:999px;background:linear-gradient(135deg,#0073e6,#19aeea);box-shadow:0 4px 10px rgba(0,115,230,.32);animation:checkPop .2s ease both;}
    .step-mode .option input:checked+span:before{content:"";position:absolute;right:26px;top:50%;width:9px;height:5px;margin-top:-2px;border-left:2.5px solid #fff;border-bottom:2.5px solid #fff;transform:rotate(-45deg);z-index:1;animation:checkPop .22s ease both;}
    @keyframes checkPop{from{opacity:0;transform:rotate(-45deg) scale(.4)}to{opacity:1;transform:rotate(-45deg) scale(1)}}
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
    @media(prefers-reduced-motion:reduce){.impact-symbol i,.video-story span{animation:none!important}.payment-marquee{scroll-behavior:auto}}

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

    .top-link{width:54px!important;height:54px!important;border-radius:17px!important;background:rgba(7,29,54,.38)!important;color:#fff!important;border:1px solid rgba(255,255,255,.34)!important;box-shadow:0 14px 32px rgba(7,29,54,.18)!important;backdrop-filter:blur(12px)!important;font-size:0!important;display:grid!important;place-items:center!important;transition:transform .2s ease,opacity .2s ease,background .2s ease!important;}
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
      .sales-impact{grid-template-columns:1fr!important;}
      .media-feature-grid{grid-template-columns:1fr 1fr!important;}
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
      .mini-social{width:44px!important;height:44px!important;border-radius:10px!important;}
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
      .sales-impact{gap:20px!important;margin:-18px 0 32px!important;}
      .impact-copy,.impact-metric{border-radius:22px!important;padding:24px!important;}
      .impact-copy{transform:none!important;}
      .impact-copy h2{font-size:34px!important;line-height:1.06!important;}
      .impact-copy p{font-size:17px!important;line-height:1.56!important;}
      .payment-path{grid-template-columns:1fr!important}.payment-path .path-arrow{min-height:30px;transform:rotate(90deg)}
      .metric-number{gap:12px!important;}
      .metric-number strong{font-size:57px!important;}
      .metric-number em{font-size:16px!important;}
      .impact-metric small{font-size:14px!important;}
      .impact-symbol{right:20px;top:22px;transform:scale(.8);transform-origin:top right;}
      .media-feature-grid{grid-template-columns:1fr!important;gap:18px!important;}
      .media-card{min-height:430px!important;border-radius:20px!important;padding:0!important;}
      .media-card .card-copy{width:100%;padding:20px;border-radius:0}
      .media-card .icon{width:58px!important;height:58px!important;}
      .advisory-band{padding-top:44px!important;padding-bottom:48px!important;}
      .advice-photo{min-height:285px!important;}
      .advice-photo:after{font-size:16px;left:18px;right:18px;bottom:18px;}
      .advice-list .list-item{padding:18px!important;}
      .advice-video-shell,.video-preview{min-height:350px}.video-preview{padding:20px}.video-story{grid-template-columns:1fr;gap:8px}.video-story span{min-height:58px;grid-template-columns:30px 1fr;align-items:center;align-content:initial}.video-message strong{font-size:26px}.video-status{display:none}
      .label-full{display:none}.label-short{display:inline}
      .diagnostic-stepper .diagnostic-progress{top:70px;}
      .step-mode{min-height:390px;}
      .step-mode .q-card{padding:22px;}
      .step-mode .q-title{font-size:21px;}
      .step-mode .option span{font-size:16px;}
      .diagnostic-nav{display:grid;grid-template-columns:1fr;}
      .payment-band{padding-top:42px!important;}
      .payment-section h2{font-size:34px!important;line-height:1.12!important;}
      .payment-marquee{margin-inline:-20px;padding-inline:20px}
      .payment-marquee .logo-tile{flex-basis:124px;width:124px;height:82px}.payment-marquee .logo-tile img{max-width:96px;max-height:48px}
      .top-link{width:52px!important;height:52px!important;right:14px!important;bottom:84px!important;border-radius:16px!important;opacity:.72!important;}
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

    .impact-copy,
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

    .home-page .sales-impact{grid-template-columns:minmax(0,1.04fr) minmax(360px,.96fr)!important;gap:24px!important;margin:0 0 72px!important;}
    .home-page .impact-copy,
    .home-page .impact-metric{min-height:520px!important;border:1px solid #d8e5ef!important;border-radius:28px!important;box-shadow:none!important;}
    .home-page .impact-copy{position:relative!important;isolation:isolate!important;overflow:hidden!important;padding:46px!important;background:#f6fbff!important;}
    .home-page .impact-copy:before,
    .home-page .impact-copy:after{content:"";position:absolute;z-index:-1;left:-12%;width:124%;border-radius:50% 50% 0 0/100% 100% 0 0;pointer-events:none;}
    .home-page .impact-copy:before{bottom:-94px;height:210px;background:#dcefff;transform:rotate(-2deg);}
    .home-page .impact-copy:after{bottom:-132px;height:215px;background:#c7e5fa;transform:rotate(3deg);}
    .home-page .impact-copy .eyebrow{display:inline-flex!important;width:auto!important;margin-bottom:28px!important;padding:8px 12px!important;border:1px solid #cfe2f2!important;border-radius:999px!important;background:#fff!important;color:#0758b5!important;}
    .home-page .impact-copy h2{max-width:620px!important;font-size:clamp(42px,4.8vw,66px)!important;letter-spacing:-.045em!important;}
    .home-page .impact-analogy{max-width:690px!important;padding-left:0!important;border-left:0!important;color:#3e546a!important;font-size:19px!important;}

    .home-page .impact-metric{justify-content:flex-start!important;padding:46px!important;background:#071d36!important;background-image:none!important;background-blend-mode:normal!important;}
    .home-page .impact-metric .metric-title{position:relative;z-index:2;max-width:600px;margin:24px 0 10px;color:#fff!important;font-size:clamp(33px,3.6vw,50px)!important;line-height:1.02!important;letter-spacing:-.035em!important;}
    .home-page .impact-metric>.metric-note{margin-top:auto!important;padding-top:18px!important;border-top:1px solid rgba(255,255,255,.22)!important;color:#c8d9e8!important;}

    .home-page .media-feature-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:20px!important;}
    .home-page .media-card{min-height:330px!important;padding:34px!important;justify-content:space-between!important;border:1px solid #dce6ee!important;border-radius:24px!important;background:#f5f8fa!important;color:#071d36!important;box-shadow:none!important;transform:none!important;}
    .home-page .media-card:nth-child(2){background:#f3f8fc!important;}
    .home-page .media-card:nth-child(3){background:#fff9e8!important;}
    .home-page .media-card:nth-child(4){background:#f1f7f6!important;}
    .home-page .media-card:before,
    .home-page .media-card:after{display:none!important;background:none!important;background-image:none!important;}
    .home-page .media-card .icon{position:static!important;width:54px!important;height:54px!important;margin:0 0 52px!important;border:0!important;border-radius:16px!important;background:#071d36!important;color:#fff!important;box-shadow:none!important;backdrop-filter:none!important;}
    .home-page .media-card .card-copy{position:static!important;min-height:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;}
    .home-page .media-card h3{color:#071d36!important;}
    .home-page .media-card p{color:#4d6277!important;}

    @media(max-width:980px){
      .home-page .sales-impact{grid-template-columns:1fr!important;}
    }
    @media(max-width:680px){
      .home-page .impact-copy,
      .home-page .impact-metric{min-height:0!important;padding:28px 24px!important;border-radius:22px!important;}
      .home-page .media-feature-grid{grid-template-columns:1fr!important;gap:14px!important;}
      .home-page .media-card{min-height:300px!important;padding:28px 24px!important;}
    }
  `;
  document.head.appendChild(flatSurfacePalette);

  const setText = (selector, text) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
  };

  const applyVisualCopy = () => {
    setText('.impact-copy h2', 'No limites cómo pueden pagarte.');
    setText('.impact-analogy', 'Quedarte solo con efectivo es mirar el mar desde la orilla: ves una parte, pero dejas fuera al océano de clientes que prefieren pagar con tarjeta, link o billetera digital.');
    setText('.impact-metric .metric-title', 'Crecer y tener más clientes no es suerte.');
    setText('.feature-section-title', 'Información clara para decidir mejor.');
    setText('.feature-intro .lead', 'Comparamos el equipo, los costos, las condiciones y la capacidad de crecer.');
    setText('.advisory-band h2', 'Elige con claridad, no solo por precio.');
    setText('.advisory-band .lead', 'Conocemos tu negocio, comparamos opciones y te explicamos por qué una alternativa puede convenirte.');

    const imageFallbacks = [
      ['.advice-photo img', `${assetPrefix}assets/hero/asesoria-personalizada.png`],
      ['.compare-hero-visual img', `${assetPrefix}assets/hero/diagnostico-cobro.png`]
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

  const initPagePolish = () => {
    applyVisualCopy();
    initPaymentMarquee();
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
  let currentStep = 0;
  let progressText;
  let progressPercent;
  let progressFill;
  let progressSteps = [];
  let hasShownResult = false;
  let lastTrackedResult = '';
  let autoAdvanceTimer = null;
  const AUTO_ADVANCE_DELAY = 450;

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

    progressText.textContent = `${answered} de ${total} respuestas`;
    progressPercent.textContent = `${percent}%`;
    progressFill.style.width = `${percent}%`;
    progressSteps.forEach((step, index) => step.classList.toggle('done', index < answered));
    questionCards.forEach((card) => card.classList.toggle('is-answered', Boolean(card.querySelector('input:checked'))));
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
          { label: 'Ualá Bis', href: 'https://www.uala.com.mx/bis' },
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
          { label: 'Getnet', href: 'https://www.getnet.com.mx/', primary: true },
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
      showStep(index);
    });

    // Avanza sola a la siguiente pregunta poco después de elegir una opción de radio,
    // dejando ver brevemente la marca de seleccionado antes de cambiar. En preguntas
    // de opción múltiple (checkbox) dejamos que el usuario avance con "Siguiente".
    window.clearTimeout(autoAdvanceTimer);
    if (event.target.type === 'radio') {
      autoAdvanceTimer = window.setTimeout(() => goToNextOrFinish(index), AUTO_ADVANCE_DELAY);
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
