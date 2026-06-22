(() => {
  const smoothStyle = document.createElement('style');
  smoothStyle.textContent = `
    .brand-logo{width:132px!important;height:86px!important;}
    .stat-sales{background:radial-gradient(circle at 8% 16%,rgba(255,210,63,.35),transparent 26%),linear-gradient(135deg,#ffffff,#eef9ff 65%,#fff7d7)!important;}
    .stat-icon{background:linear-gradient(135deg,#ffd23f,#19aeea)!important;color:#071d36!important;box-shadow:0 14px 30px rgba(25,174,234,.22);}
    .feature-grid{align-items:stretch;}
    .feature-card{position:relative;overflow:hidden;min-height:270px;background:radial-gradient(circle at 88% 12%,rgba(25,174,234,.18),transparent 34%),radial-gradient(circle at 10% 90%,rgba(255,210,63,.28),transparent 28%),#fff;transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease;}
    .feature-card:hover{transform:translateY(-4px);box-shadow:0 20px 42px rgba(7,29,54,.12);border-color:#bfe8ff;}
    .feature-card .icon{width:62px;height:62px;font-size:26px;color:#fff;box-shadow:0 14px 30px rgba(7,29,54,.14);}
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
    #diagnosticSubmit{display:none;}
    #diagnosticSubmit.show{display:inline-flex;}
    @keyframes questionIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    .payment-band{background:linear-gradient(135deg,#fff,#f3fbff 68%,#fff8dd)!important;}
    .payment-cloud{grid-template-columns:repeat(6,minmax(120px,1fr))!important;gap:16px!important;}
    .payment-cloud .logo-tile{min-height:108px;border-color:#cfe4f7;box-shadow:0 12px 28px rgba(7,29,54,.06);}
    .payment-cloud .logo-tile .brand-mask{width:96px!important;height:54px!important;}
    .payment-cloud .logo-tile img{max-width:112px!important;max-height:58px!important;}
    .article-hero-image img,.article-image img{height:auto!important;max-height:none!important;object-fit:contain!important;background:#fff;}
    @media(max-width:680px){
      .brand-logo{width:144px!important;height:92px!important;}
      .nav{transition:min-height .42s ease,padding .42s ease !important;}
      .brand,.menu{transition:max-height .46s ease,opacity .34s ease,transform .42s ease !important;}
      .header-actions{transition:margin .42s ease !important;}
      .diagnostic-stepper .diagnostic-progress{top:78px;}
      .step-mode{min-height:390px;}
      .step-mode .q-card{padding:22px;}
      .step-mode .q-title{font-size:21px;}
      .step-mode .option span{font-size:16px;}
      .diagnostic-nav{display:grid;grid-template-columns:1fr;}
      .payment-cloud{grid-template-columns:repeat(2,1fr)!important;}
      .payment-cloud .logo-tile{min-height:96px;}
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
    const submit = document.getElementById('diagnosticSubmit');
    if (back) back.disabled = currentStep === 0;
    if (submit) submit.classList.toggle('show', currentStep === questionCards.length - 1);
  };

  const renderProgress = () => {
    if (!progressFill || !progressFill.isConnected) buildProgress();
    const answered = requiredNames.filter((name) => form.querySelector(`input[name="${name}"]:checked`)).length;
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
      rapida: ['Perfil recomendado: terminal moderna', 'Te conviene explorar opciones rápidas de cobro, como terminales modernas o links de pago. Son útiles para empezar con menos requisitos y operar con agilidad.', ['Menos requisitos', 'Inicio rápido', 'Movilidad']],
      hibrida: ['Perfil recomendado: modelo híbrido', 'Puede convenirte una solución intermedia: tecnología moderna con condiciones más formales. Buena para negocios que ya crecen y quieren ordenar cobros.', ['Equilibrio', 'Tecnología', 'Revisión de contrato']],
      banca: ['Perfil recomendado: banca tradicional', 'Tu perfil apunta a comparar bancos: volumen estable, formalidad fiscal y búsqueda de mejores condiciones. Revisa rentas, mínimos y penalizaciones.', ['Volumen estable', 'Más requisitos', 'Costos a revisar']]
    }[winner];
  };

  buildProgress();
  showStep(0);
  renderProgress();

  form.addEventListener('change', (event) => {
    if (!event.target.matches('input[type="radio"]')) return;
    window.requestAnimationFrame(renderProgress);
    const card = event.target.closest('.q-card');
    const index = questionCards.indexOf(card);
    if (index >= 0 && index < questionCards.length - 1) {
      setTimeout(() => {
        showStep(index + 1);
        renderProgress();
      }, 180);
    }
  });

  const back = document.getElementById('diagnosticBack');
  if (back) back.addEventListener('click', () => {
    showStep(currentStep - 1);
    renderProgress();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
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
    res.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
})();
