(() => {
  const smoothStyle = document.createElement('style');
  smoothStyle.textContent = `
    .brand-logo{width:142px!important;height:92px!important;}
    .hero-compact{padding-top:54px!important;padding-bottom:54px!important;}
    .hero-compact .hero-inner{gap:42px!important;}
    .sales-impact{display:grid;grid-template-columns:1.35fr .65fr;gap:24px;align-items:stretch;margin:0 0 54px;}
    .impact-copy,.impact-metric{border:1px solid #cfe4f7;border-radius:24px;background:#fff;box-shadow:0 18px 44px rgba(7,29,54,.08);}
    .impact-copy{padding:34px;background:linear-gradient(135deg,#fff,#f2fbff 68%,#fff8dc);}
    .impact-copy h2{font-size:clamp(32px,4vw,54px);margin:12px 0 12px;}
    .impact-copy p{font-size:20px;line-height:1.65;color:#53687f;margin:0;}
    .impact-metric{position:relative;overflow:hidden;padding:30px;display:flex;flex-direction:column;justify-content:center;background:radial-gradient(circle at 78% 12%,rgba(255,210,63,.55),transparent 34%),linear-gradient(145deg,#071d36,#075fb8);color:#fff;}
    .impact-metric:before{content:"";position:absolute;inset:auto -40px -60px auto;width:180px;height:180px;border-radius:999px;background:rgba(25,174,234,.35);filter:blur(4px);}
    .impact-metric span{font-size:13px;text-transform:uppercase;letter-spacing:.12em;font-weight:900;color:#cfeeff;}
    .impact-metric strong{font-size:clamp(48px,6vw,76px);line-height:.95;margin:12px 0;color:#ffd23f;}
    .impact-metric small{font-size:15px;line-height:1.45;color:#e7f4ff;position:relative;}
    .media-feature-grid{align-items:stretch;}
    .media-card{position:relative;overflow:hidden;min-height:330px;padding:28px!important;display:flex;flex-direction:column;justify-content:flex-end;color:#fff!important;background:#071d36!important;border-color:rgba(255,255,255,.18)!important;box-shadow:0 22px 50px rgba(7,29,54,.16)!important;transition:transform .22s ease,box-shadow .22s ease;}
    .media-card:before{content:"";position:absolute;inset:0;background-size:cover;background-position:center;filter:saturate(1.06);transform:scale(1.03);transition:transform .35s ease,filter .35s ease;}
    .media-card:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,29,54,.08),rgba(7,29,54,.74) 58%,rgba(7,29,54,.94));}
    .media-card:hover{transform:translateY(-5px);box-shadow:0 26px 60px rgba(7,29,54,.2)!important;}
    .media-card:hover:before{transform:scale(1.08);filter:saturate(1.1) blur(1px);}
    .media-card h3,.media-card p,.media-card .icon{position:relative;z-index:1;}
    .media-card h3{color:#fff!important;font-size:25px;}
    .media-card p{color:#eaf6ff!important;font-size:17px;line-height:1.55;margin-bottom:0;}
    .media-card .icon{width:62px;height:62px;font-size:26px;color:#fff;box-shadow:0 14px 30px rgba(7,29,54,.26);margin-bottom:auto;}
    .media-hardware:before{background-image:url('assets/Smartpoint2.webp');background-position:center 38%;}
    .media-info:before{background-image:url('assets/blog/que-solucion-de-cobro-le-conviene-a-tu-negocio/revisaesto.png');}
    .media-compare:before{background-image:url('assets/blog/que-solucion-de-cobro-le-conviene-a-tu-negocio/4formasdecobrar.png');}
    .media-growth:before{background-image:url('assets/multi-mlm-hero.png');}
    .icon-terminal{background:linear-gradient(135deg,#0073e6,#19aeea)!important;}
    .icon-info{background:linear-gradient(135deg,#18a058,#25D366)!important;}
    .icon-compare{background:linear-gradient(135deg,#1A1F71,#0073e6)!important;}
    .icon-growth{background:linear-gradient(135deg,#ffd23f,#f59e0b)!important;color:#071d36!important;}
    .diagnostic-stepper form{position:relative;}
    .diagnostic-stepper .diagnostic-progress{position:sticky;top:104px;z-index:10;}
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
    .payment-band{background:linear-gradient(135deg,#fff,#f3fbff 68%,#fff8dd)!important;}
    .payment-cloud{grid-template-columns:repeat(6,minmax(132px,1fr))!important;gap:18px!important;}
    .payment-cloud .logo-tile{min-height:118px;border-color:#cfe4f7;box-shadow:0 12px 28px rgba(7,29,54,.06);background:#fff;}
    .payment-cloud .logo-tile .brand-mask{width:108px!important;height:62px!important;}
    .payment-cloud .logo-tile img{max-width:124px!important;max-height:66px!important;}
    .article-hero-image img,.article-image img{height:auto!important;max-height:none!important;object-fit:contain!important;background:#fff;}
    @media(max-width:900px){
      .sales-impact{grid-template-columns:1fr;}
      .media-feature-grid{grid-template-columns:1fr 1fr!important;}
    }
    @media(max-width:680px){
      .brand-logo{width:150px!important;height:96px!important;}
      .hero-compact{padding-top:36px!important;padding-bottom:38px!important;}
      .hero-compact h1{font-size:clamp(50px,15vw,68px)!important;}
      .nav{transition:min-height .52s ease,padding .52s ease !important;}
      .brand,.menu{transition:max-height .58s ease,opacity .44s ease,transform .52s ease !important;}
      .header-actions{transition:margin .52s ease !important;}
      .sales-impact{margin-bottom:38px;}
      .impact-copy,.impact-metric{border-radius:20px;padding:24px;}
      .impact-copy p{font-size:17px;}
      .media-feature-grid{grid-template-columns:1fr!important;}
      .media-card{min-height:280px;}
      .diagnostic-stepper .diagnostic-progress{top:78px;}
      .step-mode{min-height:390px;}
      .step-mode .q-card{padding:22px;}
      .step-mode .q-title{font-size:21px;}
      .step-mode .option span{font-size:16px;}
      .diagnostic-nav{display:grid;grid-template-columns:1fr;}
      .payment-cloud{grid-template-columns:repeat(2,1fr)!important;}
      .payment-cloud .logo-tile{min-height:104px;}
    }
  `;
  document.head.appendChild(smoothStyle);

  const header = document.querySelector('.header');
  if (header) {
    const compactItems = [header.querySelector('.brand'), header.querySelector('.menu')].filter(Boolean);
    let lastY = window.scrollY;
    let upwardGestures = 0;
    let lastDirection = 'none';

    const setCompact = (compact) => {
      header.classList.toggle('compact', compact);
      compactItems.forEach((item) => item.setAttribute('aria-hidden', compact ? 'true' : 'false'));
    };

    const compactHeader = () => {
      const currentY = Math.max(window.scrollY, 0);
      const delta = currentY - lastY;
      const isMobile = window.matchMedia('(max-width: 680px)').matches;

      if (!isMobile) {
        upwardGestures = 0;
        setCompact(false);
        lastY = currentY;
        return;
      }

      if (currentY < 70) {
        upwardGestures = 0;
        setCompact(false);
        lastY = currentY;
        return;
      }

      if (currentY > 150 && delta > 12) {
        upwardGestures = 0;
        lastDirection = 'down';
        setCompact(true);
      }

      if (delta < -18) {
        if (lastDirection !== 'up') upwardGestures = 0;
        upwardGestures += 1;
        lastDirection = 'up';
        if (upwardGestures >= 5) setCompact(false);
      }

      lastY = currentY;
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
    if (data.formalidad === 'informal') score.rapida += 5;
    if (data.formalidad === 'fisica') { score.rapida += 2; score.hibrida += 1; }
    if (data.formalidad === 'moral') { score.banca += 3; score.hibrida += 3; }
    if (data.volumen === 'bajo') score.rapida += 4;
    if (data.volumen === 'medio') { score.rapida += 2; score.hibrida += 2; }
    if (data.volumen === 'alto') { score.banca += 4; score.hibrida += 3; }
    if (data.estabilidad === 'variable') score.rapida += 3;
    if (data.estabilidad === 'estable') { score.banca += 2; score.hibrida += 2; }
    if (data.liquidez === 'inmediata') score.rapida += 3;
    if (data.margen === 'bajo') score.banca += 2;
    if (data.margen === 'medio') score.hibrida += 1;
    if (data.margen === 'alto') { score.rapida += 1; score.hibrida += 1; }
    if (data.msi === 'interesa') score.hibrida += 2;
    if (data.msi === 'frecuente') score.banca += 4;
    if (data.operacion === 'movil' || data.operacion === 'online') score.rapida += 2;
    if (data.preferencia === 'simple') score.rapida += 3;
    if (data.preferencia === 'costo') { score.banca += 3; score.hibrida += 2; }

    const winner = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
    return {
      rapida: [
        'Recomendación: terminal moderna',
        'Te conviene empezar comparando Mercado Pago Point, Clip y NetPay, en ese orden. Son opciones ágiles para vender con menos requisitos, moverte entre mostrador, entregas o redes, y activar cobros sin un proceso bancario pesado.',
        ['Mercado Pago Point', 'Clip', 'NetPay', 'Inicio rápido']
      ],
      hibrida: [
        'Recomendación: modelo híbrido',
        'Revisa Getnet y Konfío como opciones intermedias: combinan tecnología moderna con evaluación más formal, contrato y condiciones útiles para negocios que ya están creciendo.',
        ['Getnet', 'Konfío', 'Negocio en crecimiento', 'Contrato claro']
      ],
      banca: [
        'Recomendación: TPV bancaria',
        'Compara BBVA TPV, Banorte TPV y Citibanamex. Puede convenirte si ya tienes RFC, cuenta, ventas constantes y buscas negociar mejores condiciones revisando renta, mínimos y tiempos de depósito.',
        ['BBVA TPV', 'Banorte TPV', 'Citibanamex', 'Volumen estable']
      ]
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
    const wa = document.getElementById('resultWhatsapp');

    title.textContent = result[0];
    text.textContent = result[1];
    tags.innerHTML = result[2].map((tag) => `<span>${tag}</span>`).join('');
    wa.href = 'https://wa.me/529511825881?text=' + encodeURIComponent('Hola, hice el diagnóstico en Soluciones de Cobro. Resultado: ' + result[0]);
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
