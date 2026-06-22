(() => {
  const header = document.querySelector('.header');
  if (!header) return;

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
})();
