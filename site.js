(() => {
  const smoothStyle = document.createElement('style');
  smoothStyle.textContent = `
    :root{--navy:#071d36;--blue:#0073e6;--sky:#19aeea;--yellow:#ffd23f;--line:#cfe4f7;--muted:#53687f;}
    .brand-logo{width:150px!important;height:96px!important;object-fit:contain!important;}
    .hero-compact{padding-top:42px!important;padding-bottom:46px!important;}
    .hero-compact .hero-inner{gap:38px!important;align-items:center;}
    .hero-compact h1{letter-spacing:0!important;}
    .hero-compact .actions{gap:14px!important;}
    .photo-card{overflow:hidden;background:#fff!important;}
    .photo-card>img{width:100%;height:100%;min-height:430px;object-fit:cover;display:block;border-radius:inherit;}
    .hero-photo-card{box-shadow:0 24px 58px rgba(7,29,54,.14)!important;}
    .hero-photo-card .note-card{background:rgba(7,29,54,.68)!important;backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.2);box-shadow:0 16px 34px rgba(7,29,54,.25);}
    .hero-photo-card .note-card strong{color:var(--yellow)!important;}

    .sales-impact{display:grid;grid-template-columns:1.28fr .72fr;gap:24px;align-items:stretch;margin:0 0 46px;}
    .impact-copy,.impact-metric{border:1px solid var(--line);border-radius:26px;background:#fff;box-shadow:0 18px 44px rgba(7,29,54,.08);}
    .impact-copy{padding:34px;background:linear-gradient(135deg,#fff,#f4fbff 62%,#fff8df);}
    .impact-copy h2{font-size:clamp(30px,3.6vw,50px);margin:0 0 14px;line-height:1.04;}
    .impact-copy p{font-size:19px;line-height:1.62;color:#42576f;margin:0;}
    .impact-analogy{position:relative;padding-left:18px;border-left:4px solid var(--yellow);}
    .impact-metric{position:relative;overflow:hidden;padding:30px;display:flex;flex-direction:column;justify-content:center;background:radial-gradient(circle at 78% 14%,rgba(255,210,63,.52),transparent 34%),linear-gradient(145deg,#071d36,#075fb8);color:#fff;}
    .impact-metric:before{content:"";position:absolute;inset:auto -44px -62px auto;width:190px;height:190px;border-radius:999px;background:rgba(25,174,234,.34);filter:blur(5px);}
    .impact-metric span{font-size:13px;text-transform:uppercase;letter-spacing:.14em;font-weight:900;color:#dff4ff;}
    .metric-number{display:flex;align-items:flex-end;gap:12px;margin:12px 0 12px;position:relative;z-index:1;}
    .metric-number strong{font-size:clamp(54px,6.2vw,80px);line-height:.9;color:var(--yellow);}
    .metric-number em{font-style:normal;font-weight:900;color:#fff;font-size:20px;line-height:1.6;text-transform:uppercase;}
    .impact-metric small{font-size:15px;line-height:1.45;color:#e7f4ff;position:relative;z-index:1;}

    .media-feature-grid{align-items:stretch;}
    .media-card{position:relative;overflow:hidden;min-height:344px;padding:30px!important;display:flex;flex-direction:column;justify-content:flex-end;color:#fff!important;background:#071d36!important;border-color:rgba(255,255,255,.18)!important;box-shadow:0 22px 50px rgba(7,29,54,.16)!important;transition:transform .22s ease,box-shadow .22s ease;}
    .media-card:before{content:"";position:absolute;inset:0;background-size:cover;background-position:center;filter:saturate(1.06);transform:scale(1.03);transition:transform .35s ease,filter .35s ease;}
    .media-card:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,29,54,.16),rgba(7,29,54,.42) 42%,rgba(7,29,54,.9));}
    .media-card:hover{transform:translateY(-5px);box-shadow:0 26px 60px rgba(7,29,54,.2)!important;}
    .media-card:hover:before{transform:scale(1.08);filter:saturate(1.1) blur(.8px);}
    .media-card h3,.media-card p,.media-card .icon{position:relative;z-index:1;}
    .media-card h3{color:#fff!important;font-size:25px;}
    .media-card p{color:#eaf6ff!important;font-size:17px;line-height:1.55;margin-bottom:0;}
    .media-card .icon{width:64px;height:64px;font-size:0;color:#fff;box-shadow:0 14px 30px rgba(7,29,54,.26);margin-bottom:auto;display:grid;place-items:center;}
    .media-card .icon:before,.advice-list .icon:before{content:"";display:block;width:28px;height:28px;border:3px solid currentColor;border-radius:7px;}
    .icon-info:before{border:none!important;width:12px!important;height:34px!important;border-radius:8px!important;background:currentColor!important;box-shadow:14px 10px 0 currentColor,-14px 18px 0 currentColor;}
    .icon-compare:before{border:none!important;width:34px!important;height:12px!important;border-radius:999px!important;background:currentColor!important;box-shadow:0 -12px 0 rgba(255,255,255,.72),0 12px 0 rgba(255,255,255,.72);}
    .icon-growth:before{border:none!important;width:28px!important;height:28px!important;border-top:4px solid currentColor!important;border-right:4px solid currentColor!important;border-radius:0!important;transform:rotate(0deg);}
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
    .advice-copy{position:relative;z-index:1;}
    .advisory-band h2,.advisory-band h3{color:#fff!important;}
    .advisory-band .lead,.advice-list p{color:#dcecff!important;}
    .advice-photo{margin:24px 0 0;border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,.26);box-shadow:0 22px 50px rgba(0,0,0,.22);background:#fff;}
    .advice-photo img{width:100%;height:300px;object-fit:cover;display:block;}
    .advice-list .list-item{background:rgba(255,255,255,.14)!important;border-color:rgba(255,255,255,.25)!important;backdrop-filter:blur(10px);box-shadow:0 16px 34px rgba(0,0,0,.12);}
    .advice-list .icon{font-size:0!important;display:grid;place-items:center;}

    .diagnostic-with-image{grid-template-columns:.82fr 1.18fr!important;}
    .diagnostic-visual{margin:22px 0 0;border-radius:22px;overflow:hidden;border:1px solid rgba(7,29,54,.12);box-shadow:0 22px 42px rgba(7,29,54,.12);}
    .diagnostic-visual img{width:100%;height:260px;object-fit:cover;display:block;}
    .diagnostic-stepper form{position:relative;}
    .diagnostic-stepper .diagnostic-progress{position:sticky;top:104px;z-index:10;background:rgba(255,255,255,.95);backdrop-filter:blur(10px);}
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
    .expanded-payment-cloud{margin-top:24px;}

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
    .terminal-hero-visual{border-radius:28px;overflow:hidden;border:1px solid #cfe4f7;background:#fff;box-shadow:0 24px 60px rgba(7,29,54,.12);}
    .terminal-hero-visual img{display:block;width:100%;height:460px;object-fit:cover;}
    .compare-hero-inner{grid-template-columns:.95fr 1.05fr!important;align-items:center;}
    .compare-hero-visual{border-radius:28px;overflow:hidden;border:1px solid #cfe4f7;background:#fff;box-shadow:0 24px 60px rgba(7,29,54,.12);}
    .compare-hero-visual img{display:block;width:100%;height:440px;object-fit:cover;}
    .article-hero-image img,.article-image img{height:auto!important;max-height:none!important;object-fit:contain!important;background:#fff;}

    @media(max-width:900px){
      .sales-impact{grid-template-columns:1fr;}
      .media-feature-grid{grid-template-columns:1fr 1fr!important;}
      .diagnostic-with-image,.terminal-hero-grid,.compare-hero-inner,.final-grid{grid-template-columns:1fr!important;}
      .terminal-hero-visual img,.compare-hero-visual img{height:auto;max-height:520px;object-fit:contain;}
    }
    @media(max-width:680px){
      .header{transition:transform .44s ease,box-shadow .44s ease!important;}
      .nav{padding:18px 22px 16px!important;transition:min-height .5s ease,padding .5s ease!important;}
      .brand{gap:14px!important;transition:max-height .48s ease,opacity .38s ease,transform .48s ease,margin .48s ease!important;}
      .brand-logo{width:132px!important;height:84px!important;}
      .brand-name{font-size:32px!important;line-height:1.04!important;}
      .brand-name small{font-size:18px!important;margin-top:4px!important;}
      .menu{gap:14px 24px!important;margin-top:12px!important;transition:max-height .48s ease,opacity .38s ease,transform .48s ease,margin .48s ease!important;}
      .menu a{font-size:24px!important;}
      .header-actions{margin-top:18px!important;transition:margin .5s ease!important;display:grid!important;grid-template-columns:minmax(210px,1fr) auto!important;align-items:center!important;gap:14px!important;}
      .header-actions>.btn{height:62px!important;padding:0 22px!important;font-size:20px!important;}
      .mobile-social{display:flex!important;gap:10px!important;}
      .mini-social{width:58px!important;height:58px!important;}
      .header.compact{box-shadow:0 10px 28px rgba(7,29,54,.12)!important;}
      .header.compact .nav{padding:10px 18px!important;min-height:auto!important;}
      .header.compact .brand,.header.compact .menu{max-height:0!important;opacity:0!important;transform:translateY(-14px)!important;margin:0!important;overflow:hidden!important;pointer-events:none!important;}
      .header.compact .header-actions{margin-top:0!important;}
      .header.compact .header-actions>.btn{height:56px!important;}
      .header.compact .mini-social{width:52px!important;height:52px!important;}
      .hero-compact{padding-top:30px!important;padding-bottom:34px!important;}
      .hero-compact h1{font-size:clamp(47px,13.2vw,62px)!important;line-height:1.04!important;margin-bottom:18px!important;}
      .hero-compact .lead{font-size:23px!important;line-height:1.48!important;margin-bottom:24px!important;}
      .hero-compact .actions{display:grid!important;grid-template-columns:1fr!important;gap:12px!important;}
      .hero-compact .actions .btn{height:62px!important;}
      .photo-card>img{min-height:310px;}
      .hero-photo-card .note-card{font-size:16px!important;line-height:1.45!important;}
      .sales-impact{margin-bottom:36px;}
      .impact-copy,.impact-metric{border-radius:20px;padding:23px;}
      .impact-copy h2{font-size:32px!important;}
      .impact-copy p{font-size:17px;line-height:1.58;}
      .metric-number{gap:8px;}
      .metric-number strong{font-size:58px;}
      .media-feature-grid{grid-template-columns:1fr!important;}
      .media-card{min-height:286px;border-radius:18px!important;padding:24px!important;}
      .media-card .icon{width:58px;height:58px;}
      .advisory-band{padding-top:44px!important;padding-bottom:48px!important;}
      .advice-photo img,.diagnostic-visual img{height:auto;}
      .advice-list .list-item{padding:18px!important;}
      .diagnostic-stepper .diagnostic-progress{top:78px;}
      .step-mode{min-height:390px;}
      .step-mode .q-card{padding:22px;}
      .step-mode .q-title{font-size:21px;}
      .step-mode .option span{font-size:16px;}
      .diagnostic-nav{display:grid;grid-template-columns:1fr;}
      .payment-band{padding-top:44px!important;}
      .payment-section h2{font-size:38px!important;line-height:1.12!important;}
      .payment-cloud{grid-template-columns:repeat(2,1fr)!important;gap:12px!important;}
      .payment-cloud .logo-tile{min-height:104px;}
      .payment-cloud .logo-tile img{max-width:108px!important;max-height:60px!important;}
      .final-cta{padding:50px 0!important;}
      .final-card{padding:22px;}
    }
  `;
  document.head.appendChild(smoothStyle);

  const header = document.querySelector('.header');
  if (header) {
    const compactItems = [header.querySelector('.brand'), header.querySelector('.menu')].filter(Boolean);
    const setCompact = (compact) => {
      header.classList.toggle('compact', compact);
      compactItems.forEach((item) => item.setAttribute('aria-hidden', compact ? 'true' : 'false'));
    };

    const compactHeader = () => {
      const currentY = Math.max(window.scrollY, 0);
      const isMobile = window.matchMedia('(max-width: 680px)').matches;

      if (!isMobile) {
        setCompact(false);
        return;
      }

      if (currentY < 70) {
        setCompact(false);
        return;
      }

      if (currentY > 120) setCompact(true);
    };

    window.addEventListener('scroll', compactHeader, { passive: true });
    window.addEventListener('resize', compactHeader);
    compactHeader();
  }

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
    const compareLink = 'compara.html#matriz';

    return {
      rapida: {
        title: 'Recomendación: terminal moderna',
        text: 'Empieza por Mercado Pago Point; después compara Clip y NetPay. Es la ruta más ágil si buscas menos trámites, movilidad e inicio rápido.',
        tags: ['Mercado Pago Point', 'Clip', 'NetPay', 'Inicio rápido'],
        ctaText: 'Comprar terminal',
        ctaHref: buyLink,
        ctaClass: 'btn btn-primary'
      },
      hibrida: {
        title: 'Recomendación: modelo híbrido',
        text: 'Revisa opciones como Getnet o Konfío. Pueden servir si ya vendes más, quieres formalidad y buscas condiciones intermedias.',
        tags: ['Getnet', 'Konfío', 'Negocio en crecimiento', 'Contrato claro'],
        ctaText: 'Ver opciones del mercado',
        ctaHref: compareLink,
        ctaClass: 'btn btn-primary'
      },
      banca: {
        title: 'Recomendación: TPV bancaria',
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
