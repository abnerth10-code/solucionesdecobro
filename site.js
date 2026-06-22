(() => {
  const smoothStyle = document.createElement('style');
  smoothStyle.textContent = `
    @media(max-width:680px){
      .nav{transition:min-height .42s ease,padding .42s ease !important;}
      .brand,.menu{transition:max-height .46s ease,opacity .34s ease,transform .42s ease !important;}
      .header-actions{transition:margin .42s ease !important;}
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
