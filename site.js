(() => {
  const header = document.querySelector('.header');
  if (header) {
    const compactItems = [
      header.querySelector('.brand'),
      header.querySelector('.menu')
    ].filter(Boolean);

    let lastY = window.scrollY;
    let upwardGestures = 0;
    let lastDirection = 'none';

    const setCompact = (compact) => {
      header.classList.toggle('compact', compact);
      compactItems.forEach((item) => {
        item.setAttribute('aria-hidden', compact ? 'true' : 'false');
      });
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
        if (upwardGestures >= 3) setCompact(false);
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

  const requiredNames = ['formalidad','volumen','estabilidad','liquidez','margen','msi','operacion','etapa','preferencia'];
  const total = requiredNames.length;
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

  const questionCards = Array.from(form.querySelectorAll('.q-card'));

  const renderProgress = () => {
    if (!progressFill || !progressFill.isConnected) buildProgress();

    const answered = requiredNames.filter((name) => form.querySelector(`input[name="${name}"]:checked`)).length;
    const percent = Math.round((answered / total) * 100);

    progressText.textContent = `${answered} de ${total} respuestas`;
    progressPercent.textContent = `${percent}%`;
    progressFill.style.width = `${percent}%`;

    progressSteps.forEach((step, index) => {
      step.classList.toggle('done', index < answered);
    });

    questionCards.forEach((card) => {
      card.classList.toggle('is-answered', Boolean(card.querySelector('input:checked')));
    });
  };

  buildProgress();
  form.addEventListener('change', () => window.requestAnimationFrame(renderProgress));
  form.addEventListener('submit', () => window.requestAnimationFrame(renderProgress));
  renderProgress();
})();
