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
    const activePhase = cardPhase(activeCard);
    const phaseCards = cardsInPhase(activePhase);
    const posInPhase = phaseCards.indexOf(activeCard);
    progressText.textContent = posInPhase !== -1
      ? (PHASE_STAGE_TEXT[activePhase] || PHASE_NAMES[activePhase] || '')
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

    if (data.conectividad === 'senal_debil') score.rapida += 2;

    if (data.plataforma === 'si') score.pasarela += 3;

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
