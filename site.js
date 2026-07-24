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
  const PHASE_STAGE_TEXT = [
    'Conociendo tu negocio',
    'Revisando cómo vendes',
    'Ajustando la recomendación a lo que necesitas'
  ];
  const phaseStepsHost = document.getElementById('phaseSteps');
  const phaseNameEl = document.getElementById('phaseName');
  let currentStep = 0;
  let progressText;
  let progressPercent;
  let progressFill;
  let hasShownResult = false;
  let lastTrackedResult = '';
  let autoAdvanceTimer = null;
  const AUTO_ADVANCE_DELAY = 450;
  const AUTO_ADVANCE_DELAY_CHECKBOX = 1800;

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
    `;
    progressText = document.getElementById('progressText');
    progressPercent = document.getElementById('progressPercent');
    progressFill = document.getElementById('progressFill');
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
      next.textContent = nextVisibleIndex(currentStep) === -1 ? 'Ver resultado' : 'Siguiente';
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
    const activePhase = cardPhase(activeCard);
    const phaseCards = cardsInPhase(activePhase);
    const posInPhase = phaseCards.indexOf(activeCard);
    progressText.textContent = posInPhase !== -1
      ? (PHASE_STAGE_TEXT[activePhase] || PHASE_NAMES[activePhase] || '')
      : `${answered} de ${total} respuestas`;
    progressPercent.textContent = `${percent}%`;
    progressFill.style.width = `${percent}%`;
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

  const EMBLEM_COLORS = {
    rapida: ['#1e86ff', '#0062db'],
    hibrida: ['#8a5cf0', '#6d3fd0'],
    banca: ['#22b06a', '#14874b'],
    pasarela: ['#f0902f', '#d1700f'],
    bnpl: ['#ec5f8c', '#c2185b']
  };

  const emblemGlyph = (category, c2) => {
    switch (category) {
      case 'hibrida':
        return `<g transform="translate(28 27)"><rect x="0" y="2" width="46" height="28" rx="5" fill="#fff"/><rect x="0" y="9" width="46" height="6" fill="${c2}"/><rect x="6" y="22" width="13" height="4" rx="2" fill="#fff" opacity=".55"/><rect x="6" y="38" width="7" height="11" rx="2.5" fill="#fff"/><rect x="17" y="33" width="7" height="16" rx="2.5" fill="#fff"/><rect x="28" y="41" width="7" height="8" rx="2.5" fill="#fff"/></g>`;
      case 'banca':
        return `<g transform="translate(27 25)" fill="#fff"><path d="M24 1 47 15 H1 Z"/><rect x="6" y="18" width="4.5" height="24" rx="1"/><rect x="15" y="18" width="4.5" height="24" rx="1"/><rect x="24" y="18" width="4.5" height="24" rx="1"/><rect x="33" y="18" width="4.5" height="24" rx="1"/><rect x="0" y="44" width="48" height="6" rx="2"/></g>`;
      case 'pasarela':
        return `<g transform="translate(28 27)"><rect x="0" y="0" width="46" height="34" rx="6" fill="#fff"/><circle cx="8" cy="7.5" r="1.9" fill="${c2}"/><circle cx="15" cy="7.5" r="1.9" fill="${c2}"/><circle cx="22" cy="7.5" r="1.9" fill="${c2}"/><rect x="9" y="15" width="28" height="15" rx="3" fill="${c2}"/><rect x="9" y="19.5" width="28" height="3" fill="#fff" opacity=".55"/></g>`;
      case 'bnpl':
        return `<g transform="translate(27 24)"><rect x="2" y="6" width="42" height="38" rx="6" fill="#fff"/><rect x="2" y="6" width="42" height="11" rx="6" fill="${c2}"/><rect x="2" y="11" width="42" height="6" fill="${c2}"/><rect x="11" y="2" width="4.5" height="9" rx="2.2" fill="#fff"/><rect x="30" y="2" width="4.5" height="9" rx="2.2" fill="#fff"/><circle cx="13" cy="27" r="3" fill="${c2}"/><circle cx="23" cy="27" r="3" fill="#ffd23f"/><circle cx="33" cy="27" r="3" fill="${c2}"/><circle cx="13" cy="37" r="3" fill="${c2}"/><circle cx="23" cy="37" r="3" fill="${c2}"/></g>`;
      default: // rapida
        return `<g transform="translate(31 26)"><rect x="6" y="10" width="30" height="42" rx="6" fill="#fff"/><rect x="11" y="16" width="20" height="12" rx="2.5" fill="${c2}"/><rect x="11" y="32" width="6" height="6" rx="1.5" fill="#fff" opacity=".55"/><rect x="19" y="32" width="6" height="6" rx="1.5" fill="#fff" opacity=".55"/><rect x="27" y="32" width="6" height="6" rx="1.5" fill="#fff" opacity=".55"/><rect x="11" y="41" width="6" height="6" rx="1.5" fill="#fff" opacity=".55"/><rect x="19" y="41" width="6" height="6" rx="1.5" fill="#ffd23f"/><rect x="27" y="41" width="6" height="6" rx="1.5" fill="#fff" opacity=".55"/><path class="emblem-wave" d="M40 12 a10 10 0 0 1 0 14" fill="none" stroke="#ffd23f" stroke-width="3" stroke-linecap="round"/><path class="emblem-wave emblem-wave-2" d="M44 8 a16 16 0 0 1 0 22" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/></g>`;
    }
  };

  const emblemSvg = (category) => {
    const [c1, c2] = EMBLEM_COLORS[category] || EMBLEM_COLORS.rapida;
    const gid = `emb-${category}`;
    return `<svg viewBox="0 0 102 102" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true"><defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><path d="M51 3 C18 3 3 18 3 51 C3 84 18 99 51 99 C84 99 99 84 99 51 C99 18 84 3 51 3 Z" fill="url(#${gid})"/><path d="M51 3 C18 3 3 18 3 51 C3 68 7 79 16 87 C13 80 12 70 12 58 C12 25 27 10 60 10 C72 10 82 11 89 14 C81 7 69 3 51 3 Z" fill="#fff" opacity=".16"/>${emblemGlyph(category, c2)}</svg>`;
  };

  const REASON_ICONS = {
    check: '<path d="M20 6 9 17l-5-5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3.2 2"/>',
    phone: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10.5 18h3"/>',
    shield: '<path d="M12 2l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5z"/>',
    tag: '<path d="M20.5 13.5 12 22l-9-9V4h9z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
    building: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 8h.5M14.5 8h.5M9 12h.5M14.5 12h.5M9.5 21v-4h5v4"/>',
    chart: '<path d="M4 20V4M4 20h16"/><rect x="7" y="11" width="3" height="6"/><rect x="12" y="7" width="3" height="10"/><rect x="17" y="13" width="3" height="4"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    headset: '<path d="M4 13v-1a8 8 0 0 1 16 0v1"/><rect x="2.5" y="13" width="4" height="6.5" rx="1.6"/><rect x="17.5" y="13" width="4" height="6.5" rx="1.6"/>',
    calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>'
  };
  const REASON_TONES = {
    green: ['#e8f6ee', '#18a058'],
    blue: ['#e9f1ff', '#0062db'],
    amber: ['#fff3dd', '#c77b00'],
    purple: ['#efeaff', '#6d3fd0'],
    pink: ['#fdeaf1', '#c2185b']
  };

  const resultReasons = (data, winner) => {
    const canal = Array.isArray(data.canal) ? data.canal : [];
    const funciones = Array.isArray(data.funciones) ? data.funciones : [];
    const compromiso = Array.isArray(data.compromiso) ? data.compromiso : [];
    const prioridad = Array.isArray(data.prioridad) ? data.prioridad : (data.prioridad ? [data.prioridad] : []);
    const inList = (list, value) => list.includes(value);

    const pool = [
      { on: winner === 'banca', icon: 'shield', tone: 'green', text: 'Puede incluir seguro para tu negocio' },
      { on: winner === 'banca', icon: 'headset', tone: 'blue', text: 'Soporte y respaldo de un banco' },
      { on: inList(prioridad, 'facilidad'), icon: 'check', tone: 'green', text: 'Empiezas sin trámites pesados' },
      { on: inList(prioridad, 'liquidez') || data.liquidez === 'mismo_dia', icon: 'clock', tone: 'blue', text: 'Recibes tu dinero muy rápido' },
      { on: inList(canal, 'movil'), icon: 'phone', tone: 'amber', text: 'Cobras con el celular (Tap to Pay)' },
      { on: inList(compromiso, 'ninguno'), icon: 'shield', tone: 'green', text: 'Sin rentas ni permanencia' },
      { on: inList(prioridad, 'costo'), icon: 'tag', tone: 'blue', text: 'Priorizas el menor costo total' },
      { on: data.formalidad === 'moral', icon: 'building', tone: 'purple', text: 'Tu formalidad te ayuda a negociar' },
      { on: data.volumen === 'alto' || data.volumen === 'muy_alto', icon: 'chart', tone: 'blue', text: 'Tu volumen te da poder de negociación' },
      { on: inList(canal, 'ecommerce'), icon: 'globe', tone: 'purple', text: 'Vendes o quieres vender en línea' },
      { on: inList(funciones, 'catalogo') || inList(funciones, 'multiusuario'), icon: 'grid', tone: 'purple', text: 'Necesitas funciones de negocio' },
      { on: inList(prioridad, 'soporte'), icon: 'headset', tone: 'blue', text: 'Te importa el soporte y la continuidad' },
      { on: inList(canal, 'links'), icon: 'phone', tone: 'amber', text: 'Cobras por link o redes sociales' }
    ];
    const fallbacks = {
      rapida: [
        { icon: 'check', tone: 'green', text: 'Activación sencilla y rápida' },
        { icon: 'clock', tone: 'blue', text: 'Depósitos ágiles de tus ventas' },
        { icon: 'phone', tone: 'amber', text: 'Opción de cobrar con el celular' }
      ],
      hibrida: [
        { icon: 'grid', tone: 'purple', text: 'Funciones de negocio incluidas' },
        { icon: 'check', tone: 'green', text: 'Condiciones más flexibles' },
        { icon: 'tag', tone: 'blue', text: 'Equilibrio entre costo y herramientas' }
      ],
      banca: [
        { icon: 'building', tone: 'purple', text: 'Respaldo de un banco' },
        { icon: 'tag', tone: 'blue', text: 'Puedes negociar la tasa' },
        { icon: 'chart', tone: 'blue', text: 'Conviene con volumen estable' }
      ],
      pasarela: [
        { icon: 'globe', tone: 'purple', text: 'Cobras en línea sin equipo' },
        { icon: 'grid', tone: 'blue', text: 'Se integra a tu tienda o app' },
        { icon: 'shield', tone: 'green', text: 'Herramientas antifraude' }
      ],
      bnpl: [
        { icon: 'building', tone: 'purple', text: 'Una empresa da el crédito a tu cliente' },
        { icon: 'check', tone: 'green', text: 'Tú recibes el total, menos una comisión' },
        { icon: 'calendar', tone: 'pink', text: 'Tu cliente paga a plazos, no tú' }
      ]
    };

    const picked = pool.filter((reason) => reason.on).map((reason) => ({ icon: reason.icon, tone: reason.tone, text: reason.text }));
    const seen = new Set(picked.map((reason) => reason.text));
    (fallbacks[winner] || fallbacks.rapida).forEach((reason) => {
      if (picked.length >= 3 || seen.has(reason.text)) return;
      picked.push(reason);
      seen.add(reason.text);
    });
    return picked.slice(0, 3);
  };

  const profileResult = (data) => {
    const canal = Array.isArray(data.canal) ? data.canal : [];
    const funciones = Array.isArray(data.funciones) ? data.funciones : [];
    const compromiso = Array.isArray(data.compromiso) ? data.compromiso : [];
    const prioridad = Array.isArray(data.prioridad) ? data.prioridad : (data.prioridad ? [data.prioridad] : []);

    const compareLink = isBlogArticle ? '../compara.html#matriz' : 'compara.html#matriz';
    const categoryLink = (category) => `${compareLink.split('#')[0]}?tipo=${category}#matriz`;

    // Pagos a plazos sin tarjeta es una necesidad puntual: la mostramos directo.
    if (data.plazos === 'bnpl') {
      return {
        key: 'pagos_plazos',
        category: 'bnpl',
        title: 'Pagos a plazos sin tarjeta',
        subtitle: 'Te asocias con una empresa que financia a tu cliente',
        caveat: 'La empresa le da el crédito a tu cliente y te paga el importe total menos una comisión. Antes de contratar, calcula el margen, la comisión, devoluciones y la elegibilidad de tus productos.',
        primaryCtaText: 'Ir a Kueski Pay',
        tags: [
          { label: 'Kueski Pay', href: 'https://www.kueskipay.com/para-comercios', primary: true },
          { label: 'Aplazo', href: 'https://aplazo.mx/', logo: 'aplazo' },
          { label: 'Revisar margen' }
        ],
        ctaText: 'Comparar opciones BNPL',
        ctaHref: categoryLink('bnpl')
      };
    }

    const score = { rapida: 0, hibrida: 0, banca: 0, pasarela: 0 };

    if (canal.includes('ecommerce')) score.pasarela += 7;
    if (canal.includes('movil')) score.rapida += 4;
    if (canal.includes('links')) { score.rapida += 3; score.pasarela += 2; }
    if (canal.includes('mostrador')) { score.hibrida += 1; score.banca += 1; score.rapida += 1; }

    if (data.formalidad === 'sin_rfc') score.rapida += 6;
    if (data.formalidad === 'fisica') { score.rapida += 2; score.hibrida += 2; }
    if (data.formalidad === 'moral') { score.banca += 7; score.hibrida += 4; }

    if (data.volumen === 'bajo') score.rapida += 4;
    if (data.volumen === 'medio') { score.rapida += 2; score.hibrida += 3; }
    if (data.volumen === 'alto') { score.banca += 4; score.hibrida += 3; }
    if (data.volumen === 'muy_alto') score.banca += 6;

    if (data.estabilidad === 'variable') score.rapida += 3;
    if (data.estabilidad === 'temporada') score.hibrida += 1;
    if (data.estabilidad === 'estable') { score.banca += 3; score.hibrida += 2; }

    if (data.liquidez === 'mismo_dia') score.rapida += 4;
    if (data.liquidez === 'siguiente_dia') { score.rapida += 1; score.hibrida += 1; }
    // Poder esperar 2 días o más indica que la persona valora tasa y beneficios
    // (seguro, soporte) por encima de la velocidad: eso encaja con la banca.
    if (data.liquidez === 'dos_dias') { score.banca += 3; score.hibrida += 1; }

    if (funciones.includes('simple')) score.rapida += 3;
    if (funciones.includes('catalogo') || funciones.includes('multiusuario')) { score.hibrida += 2; score.banca += 1; }
    if (funciones.includes('integracion')) score.pasarela += 3;

    if (compromiso.includes('comprar')) score.rapida += 3;
    if (compromiso.includes('renta')) { score.hibrida += 2; score.banca += 2; }
    if (compromiso.includes('ninguno')) score.rapida += 4;

    // "¿Qué quieres priorizar?" es opción múltiple. Para que marcar muchas no
    // domine el resultado, contamos solo las primeras 2 prioridades y con peso
    // decreciente (la 1a al 100%, la 2a al 60%; el resto no suma).
    const prioridadEffects = {
      costo: { banca: 5, hibrida: 2 },
      liquidez: { rapida: 5 },
      facilidad: { rapida: 5 },
      flexibilidad: { rapida: 4 },
      soporte: { hibrida: 3, banca: 2 },
      funciones: { hibrida: 2, pasarela: 3 }
    };
    prioridad.slice(0, 2).forEach((clave, indice) => {
      const efecto = prioridadEffects[clave];
      if (!efecto) return;
      const factor = indice === 0 ? 1 : 0.6;
      Object.entries(efecto).forEach(([categoria, puntos]) => { score[categoria] += puntos * factor; });
    });

    if (data.plazos === 'msi_frecuente') score.banca += 4;
    if (data.plazos === 'msi_ocasional') score.hibrida += 2;

    if (data.plataforma === 'si') score.pasarela += 3;

    // Filtros duros: descartamos categorías que hoy no puedes contratar o no aceptas.
    if (data.formalidad === 'sin_rfc') score.banca = -Infinity;
    if (compromiso.includes('ninguno')) { score.banca = -Infinity; score.hibrida = -Infinity; }

    const winner = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];

    return {
      rapida: {
        key: 'terminal_moderna',
        category: 'rapida',
        title: 'Cobro rápido',
        subtitle: 'Terminal sencilla, sin renta obligatoria',
        caveat: 'Confirma la tasa final con IVA, el plazo de depósito y si necesitas NFC antes de elegir.',
        primaryCtaText: 'Comprar Point de Mercado Pago',
        tags: [
          { label: 'Mercado Pago Point', href: 'https://mpago.li/2j1nqHG', primary: true },
          { label: 'Clip', href: 'https://www.clip.mx/', logo: 'clip' },
          { label: 'Ualá Bis', href: 'https://www.ualabis.com.mx/', logo: 'uala' },
          { label: 'Menos trámites' }
        ],
        ctaText: 'Comparar opciones rápidas',
        ctaHref: categoryLink('rapida')
      },
      hibrida: {
        key: 'modelo_hibrido',
        category: 'hibrida',
        title: 'Modelo híbrido',
        subtitle: 'Funciones de negocio con condiciones flexibles',
        caveat: 'Revisa contrato, liquidación y costo total antes de decidir.',
        primaryCtaText: 'Ir a Getnet',
        tags: [
          { label: 'Getnet', href: 'https://www.getnet.net/mx/', primary: true },
          { label: 'Konfío', href: 'https://konfio.mx/terminal-punto-de-venta/', logo: 'konfio' },
          { label: 'Negocio en crecimiento' },
          { label: 'Contrato claro' }
        ],
        ctaText: 'Ver opciones del mercado',
        ctaHref: categoryLink('hibrida')
      },
      banca: {
        key: 'tpv_bancaria',
        category: 'banca',
        title: 'TPV bancaria',
        subtitle: 'Una terminal de banco para negociar condiciones',
        caveat: 'Revisa renta, mínimos, permanencia y el costo de la cuenta vinculada.',
        primaryCtaText: 'Ir a BBVA TPV',
        tags: [
          { label: 'BBVA TPV', href: 'https://www.bbva.mx/empresas/productos/cobros-y-pagos.html', primary: true },
          { label: 'Banorte TPV', href: 'https://www.banorte.com/', logo: 'banorte' },
          { label: 'Citibanamex', href: 'https://www.banamex.com/es/pymes/productos-y-servicios/cobros/', logo: 'citibanamex' },
          { label: 'Volumen estable' }
        ],
        ctaText: 'Ver comparativa bancaria',
        ctaHref: categoryLink('banca')
      },
      pasarela: {
        key: 'pasarela_digital',
        category: 'pasarela',
        title: 'Pagos en línea',
        subtitle: 'Cobra a distancia, sin equipo físico',
        caveat: 'Valida costos por transacción, integración, antifraude, contracargos y liquidación.',
        primaryCtaText: 'Ir a Openpay',
        tags: [
          { label: 'Openpay', href: 'https://www.openpay.mx/', primary: true },
          { label: 'Conekta', href: 'https://www.conekta.com/', logo: 'conekta' },
          { label: 'Stripe', href: 'https://stripe.com/mx', logo: 'stripe' },
          { label: 'Venta digital' }
        ],
        ctaText: 'Comparar pasarelas',
        ctaHref: categoryLink('pasarela')
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
    const category = result.category || 'rapida';
    const res = document.getElementById('diagnosticResult');
    const emblem = document.getElementById('resultEmblem');
    const title = document.getElementById('resultTitle');
    const subtitle = document.getElementById('resultSubtitle');
    const reasonsList = document.getElementById('resultReasons');
    const caveat = document.getElementById('resultCaveat');
    const primaryCta = document.getElementById('resultPrimaryCta');
    const secondaryLabel = document.getElementById('resultSecondaryLabel');
    const options = document.getElementById('resultTags');
    const cta = document.getElementById('resultCompareLink');

    res.dataset.category = category;
    if (emblem) emblem.innerHTML = emblemSvg(category);
    title.textContent = result.title;
    if (subtitle) subtitle.textContent = result.subtitle || '';
    if (caveat) {
      const quiereMsi = data.plazos === 'msi_frecuente' || data.plazos === 'msi_ocasional';
      const msiNota = quiereMsi ? ' Ofrecer meses sin intereses agrega un costo: confirma la comisión o si tú absorbes el interés.' : '';
      const textoCaveat = `${result.caveat || ''}${msiNota}`.trim();
      caveat.textContent = textoCaveat;
      caveat.hidden = !textoCaveat;
    }

    if (reasonsList) {
      reasonsList.innerHTML = resultReasons(data, category).map((reason) => {
        const [bg, stroke] = REASON_TONES[reason.tone] || REASON_TONES.blue;
        const icon = REASON_ICONS[reason.icon] || REASON_ICONS.check;
        return `<li><span class="reason-icon" style="background:${bg}"><svg viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${icon}</svg></span><span class="reason-text">${reason.text}</span></li>`;
      }).join('');
    }

    const primaryTag = result.tags.find((tag) => tag.primary) || result.tags[0];
    const secondaryTags = result.tags.filter((tag) => tag !== primaryTag && tag.href);

    if (primaryTag && primaryTag.href) {
      primaryCta.hidden = false;
      primaryCta.textContent = result.primaryCtaText || primaryTag.label;
      primaryCta.href = primaryTag.href;
    } else {
      primaryCta.hidden = true;
    }

    secondaryLabel.hidden = secondaryTags.length === 0;
    options.innerHTML = secondaryTags.map((tag) => {
      const initial = tag.label.charAt(0).toUpperCase();
      const badge = tag.logo
        ? `<span class="result-option-badge"><img class="result-option-logo" src="${assetPrefix}assets/logos/${tag.logo}.svg" alt="" loading="lazy"><span class="result-option-letter">${initial}</span></span>`
        : `<span class="result-option-badge is-letter">${initial}</span>`;
      return `<a href="${tag.href}" target="_blank" rel="noopener" class="result-option">${badge}<span class="result-option-copy"><span class="result-option-name">${tag.label}</span><span class="result-option-cta">Ver sitio</span></span></a>`;
    }).join('');
    options.querySelectorAll('.result-option-logo').forEach((img) => {
      img.addEventListener('error', () => {
        if (img.src.endsWith('.svg')) {
          img.src = img.src.slice(0, -4) + '.png';
          return;
        }
        const badge = img.parentNode;
        img.remove();
        if (badge) badge.classList.add('is-letter');
      });
    });

    cta.textContent = result.ctaText;
    cta.href = result.ctaHref;
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

  const restartBtn = document.getElementById('resultRestart');
  if (restartBtn) restartBtn.addEventListener('click', () => {
    window.clearTimeout(autoAdvanceTimer);
    form.reset();
    questionCards.forEach((card) => card.classList.remove('is-answered', 'answered-past'));
    const res = document.getElementById('diagnosticResult');
    if (res) res.classList.remove('show');
    hasShownResult = false;
    lastTrackedResult = null;
    showStep(0);
    renderProgress();
    const shell = document.querySelector('.diagnostic-stepper') || form;
    shell.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();
