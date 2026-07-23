(() => {
  const source = Array.isArray(window.COMPARISON_PROVIDERS) ? window.COMPARISON_PROVIDERS : [];
  const tbody = document.getElementById('comparisonRows');
  const search = document.getElementById('providerSearch');
  const category = document.getElementById('providerCategory');
  const reset = document.getElementById('comparisonReset');
  const count = document.getElementById('comparisonCount');
  const empty = document.getElementById('comparisonEmpty');
  const scroller = document.querySelector('.comparison-table-wrap');

  if (!tbody || !source.length) return;

  const groups = {
    rapida: { order: 1, label: 'Cobro rápido y SoftPOS', filter: 'rapida' },
    hibrida: { order: 2, label: 'Modelos híbridos', filter: 'hibrida' },
    banca: { order: 3, label: 'Banca y adquirentes', filter: 'banca' },
    adquirente: { order: 3, label: 'Banca y adquirentes', filter: 'banca' },
    pasarela: { order: 4, label: 'Pasarelas digitales', filter: 'pasarela' },
    softpos: { order: 1, label: 'Cobro rápido y SoftPOS', filter: 'rapida' },
    bnpl: { order: 5, label: 'Compra ahora, paga después', filter: 'bnpl' }
  };

  const normalize = (value) => String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  const providerGroup = (provider) => groups[provider.category] || { order: 99, label: 'Otras soluciones', filter: provider.category };
  const providers = source.map((provider, originalIndex) => ({ ...provider, originalIndex }))
    .sort((a, b) => providerGroup(a).order - providerGroup(b).order || a.originalIndex - b.originalIndex);

  const requestedCategory = new URLSearchParams(window.location.search).get('tipo');
  const requestedFilter = requestedCategory === 'adquirente' ? 'banca' : requestedCategory === 'softpos' ? 'rapida' : requestedCategory;
  if (category && requestedFilter && Array.from(category.options).some((option) => option.value === requestedFilter)) {
    category.value = requestedFilter;
  }

  const makeCell = (label, value, detail = false) => {
    const cell = document.createElement('td');
    cell.dataset.label = label;
    if (detail) cell.classList.add('comparison-secondary');
    cell.textContent = value;
    return cell;
  };

  const makeProviderCell = (provider, index) => {
    const cell = document.createElement('th');
    cell.scope = 'row';
    cell.dataset.label = 'Proveedor';
    cell.className = 'provider-cell';

    const identity = document.createElement('div');
    identity.className = 'provider-identity';
    const logoBox = document.createElement('span');
    logoBox.className = 'provider-logo';
    logoBox.setAttribute('aria-hidden', 'true');
    const logo = document.createElement('img');
    logo.src = `https://www.google.com/s2/favicons?sz=128&domain=${provider.domain}`;
    logo.alt = '';
    logo.loading = 'lazy';
    logo.decoding = 'async';
    const fallback = document.createElement('span');
    fallback.className = 'provider-logo-fallback';
    fallback.textContent = provider.name.charAt(0);
    logo.addEventListener('error', () => {
      logo.hidden = true;
      fallback.classList.add('is-visible');
    }, { once: true });
    logoBox.append(logo, fallback);

    const providerText = document.createElement('span');
    providerText.className = 'provider-text';
    const name = document.createElement('span');
    name.className = 'provider-name';
    name.textContent = provider.name;
    const official = document.createElement('a');
    official.className = 'provider-official-link';
    official.href = provider.url;
    official.target = '_blank';
    official.rel = 'noopener';
    official.textContent = 'Ir al sitio oficial';
    official.setAttribute('aria-label', `Ir al sitio oficial de ${provider.name}; se abre en una pestaña nueva`);
    providerText.append(name, official);

    if (provider.status) {
      const status = document.createElement('span');
      status.className = 'verification-badge';
      status.textContent = provider.status;
      providerText.append(status);
    }
    identity.append(logoBox, providerText);
    cell.append(identity);
    return cell;
  };

  const makeToggleCell = (index) => {
    const cell = document.createElement('td');
    cell.className = 'comparison-toggle-cell';
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'comparison-toggle';
    toggle.textContent = 'Ver detalles';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', `provider-row-${index}`);
    cell.append(toggle);
    return cell;
  };

  const groupRows = new Map();
  const rows = [];
  let lastGroup = '';

  providers.forEach((provider, index) => {
    const group = providerGroup(provider);
    if (group.label !== lastGroup) {
      const headingRow = document.createElement('tr');
      headingRow.className = 'comparison-group-row';
      headingRow.dataset.group = group.filter;
      const heading = document.createElement('th');
      heading.colSpan = 7;
      heading.scope = 'colgroup';
      heading.textContent = group.label;
      headingRow.append(heading);
      tbody.append(headingRow);
      groupRows.set(group.label, headingRow);
      lastGroup = group.label;
    }

    const row = document.createElement('tr');
    row.id = `provider-row-${index}`;
    row.dataset.category = provider.category;
    row.dataset.filterCategory = group.filter;
    row.dataset.groupLabel = group.label;
    row.dataset.search = normalize(Object.values(provider).join(' '));
    row.append(
      makeProviderCell(provider, index),
      makeCell('Tipo', provider.type),
      makeCell('Tasa o costo', provider.cost),
      makeCell('Hardware', provider.hardware, true),
      makeCell('Requisitos', provider.requirements, true),
      makeCell('Liquidación', provider.settlement),
      makeCell('Qué revisar', provider.review, true),
      makeToggleCell(index)
    );

    const toggleBtn = row.querySelector('.comparison-toggle');
    const setExpanded = (expanded) => {
      row.classList.toggle('mobile-expanded', expanded);
      toggleBtn.setAttribute('aria-expanded', String(expanded));
      toggleBtn.textContent = expanded ? 'Ocultar detalles' : 'Ver detalles';
    };
    toggleBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      setExpanded(!row.classList.contains('mobile-expanded'));
    });
    tbody.append(row);
    rows.push(row);
  });

  const update = () => {
    const query = normalize(search ? search.value.trim() : '');
    const selectedCategory = category ? category.value : 'all';
    let visible = 0;
    const visibleGroups = new Set();

    rows.forEach((row) => {
      const matchesText = !query || row.dataset.search.includes(query);
      const matchesCategory = selectedCategory === 'all' || row.dataset.filterCategory === selectedCategory;
      const show = matchesText && matchesCategory;
      if (!show && row.classList.contains('mobile-expanded')) {
        row.classList.remove('mobile-expanded');
        const toggleBtn = row.querySelector('.comparison-toggle');
        if (toggleBtn) {
          toggleBtn.setAttribute('aria-expanded', 'false');
          toggleBtn.textContent = 'Ver detalles';
        }
      }
      row.hidden = !show;
      if (show) {
        visible += 1;
        visibleGroups.add(row.dataset.groupLabel);
      }
    });
    groupRows.forEach((row, label) => { row.hidden = !visibleGroups.has(label); });
    if (count) count.textContent = `${visible} opciones encontradas`;
    if (empty) empty.hidden = visible !== 0;
  };

  const enableDragScroll = () => {
    if (!scroller) return;
    let active = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;
    scroller.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch' || event.target.closest('a,button,input,select')) return;
      active = true;
      moved = false;
      startX = event.clientX;
      startScroll = scroller.scrollLeft;
      scroller.classList.add('is-dragging');
      scroller.setPointerCapture(event.pointerId);
    });
    scroller.addEventListener('pointermove', (event) => {
      if (!active) return;
      const distance = event.clientX - startX;
      if (Math.abs(distance) > 4) moved = true;
      scroller.scrollLeft = startScroll - distance;
    });
    const stop = (event) => {
      if (!active) return;
      active = false;
      scroller.classList.remove('is-dragging');
      if (scroller.hasPointerCapture(event.pointerId)) scroller.releasePointerCapture(event.pointerId);
    };
    scroller.addEventListener('pointerup', stop);
    scroller.addEventListener('pointercancel', stop);
    scroller.addEventListener('click', (event) => {
      if (moved) event.preventDefault();
      moved = false;
    }, true);
  };

  if (search) search.addEventListener('input', update);
  if (category) category.addEventListener('change', update);
  if (reset) reset.addEventListener('click', () => {
    if (search) search.value = '';
    if (category) category.value = 'all';
    update();
    if (search) search.focus();
  });

  enableDragScroll();
  update();
})();
