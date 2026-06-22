(() => {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastY = window.scrollY;
  const compactHeader = () => {
    const currentY = window.scrollY;
    const isMobile = window.matchMedia('(max-width: 680px)').matches;
    if (!isMobile) {
      header.classList.remove('compact');
      lastY = currentY;
      return;
    }
    if (currentY > 140 && currentY > lastY) header.classList.add('compact');
    if (currentY < 70 || currentY < lastY) header.classList.remove('compact');
    lastY = Math.max(currentY, 0);
  };

  window.addEventListener('scroll', compactHeader, { passive: true });
  window.addEventListener('resize', compactHeader);
  compactHeader();
})();
