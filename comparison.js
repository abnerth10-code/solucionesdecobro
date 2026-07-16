(() => {
  const providers = Array.isArray(window.COMPARISON_PROVIDERS) ? window.COMPARISON_PROVIDERS : [];
  const tbody = document.getElementById('comparisonRows');
  const search = document.getElementById('providerSearch');
  const category = document.getElementById('providerCategory');
  const reset = document.getElementById('comparisonReset');
  const count = document.getElementById('comparisonCount');
  const empty = document.getElementById('comparisonEmpty');

  if (!tbody || !providers.length) return;

  const requestedCategory = new URLSearchParams(window.location.search).get('tipo');
  if (category && requestedCategory && Array.from(category.options).some((option) => option.value === requestedCategory)) {
    category.value = requestedCategory;
  }

  const normalize = (value) => String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

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
    official.textContent = 'Sitio oficial ↗';
    official.setAttribute('aria-label', `Abrir el sitio oficial de ${provider.name} en una pestaña nueva`);

    providerText.append(name, official);

    if (provider.status) {
      const status = document.createElement('span');
      status.className = 'verification-badge';
      status.textContent = provider.status;
      providerText.append(status);
    }

    identity.append(logoBox, providerText);

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'comparison-toggle';
    toggle.textContent = 'Ver detalles';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', `provider-row-${index}`);

    cell.append(identity, toggle);
    return cell;
  };

  const rows = providers.map((provider, index) => {
    const row = document.createElement('tr');
    row.id = `provider-row-${index}`;
    row.dataset.category = provider.category;
    row.dataset.search = normalize(Object.values(provider).join(' '));

    const toggleDetails = () => {
      const expanded = !row.classList.contains('mobile-expanded');
      row.classList.toggle('mobile-expanded', expanded);
      const toggle = row.querySelector('.comparison-toggle');
      toggle.setAttribute('aria-expanded', String(expanded));
      toggle.textContent = expanded ? 'Ocultar detalles' : 'Ver detalles';
    };

    row.append(
      makeProviderCell(provider, index),
      makeCell('Tipo', provider.type),
      makeCell('Tasa o costo', provider.cost),
      makeCell('Hardware', provider.hardware, true),
      makeCell('Requisitos', provider.requirements, true),
      makeCell('Liquidación', provider.settlement),
      makeCell('Qué revisar', provider.review, true)
    );

    row.querySelector('.comparison-toggle').addEventListener('click', toggleDetails);
    tbody.append(row);
    return row;
  });

  const update = () => {
    const query = normalize(search ? search.value.trim() : '');
    const selectedCategory = category ? category.value : 'all';
    let visible = 0;

    rows.forEach((row) => {
      const matchesText = !query || row.dataset.search.includes(query);
      const matchesCategory = selectedCategory === 'all' || row.dataset.category === selectedCategory;
      const show = matchesText && matchesCategory;
      row.hidden = !show;
      if (show) visible += 1;
    });

    if (count) count.textContent = `${visible} de ${providers.length} proveedores`;
    if (empty) empty.hidden = visible !== 0;
  };

  if (search) search.addEventListener('input', update);
  if (category) category.addEventListener('change', update);
  if (reset) reset.addEventListener('click', () => {
    if (search) search.value = '';
    if (category) category.value = 'all';
    update();
    if (search) search.focus();
  });

  update();
})();
