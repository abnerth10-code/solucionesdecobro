document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const isMobile = window.matchMedia('(max-width: 680px)').matches;
    const currentScrollY = window.scrollY;

    if (isMobile) {
      // Ocultar marca y menú al hacer scroll hacia abajo (dejando solo el botón)
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        header.classList.add('compact');
      } 
      // Mostrar marca y menú al hacer scroll hacia arriba
      else if (currentScrollY < lastScrollY) {
        header.classList.remove('compact');
      }
    } else {
      // Asegurar que el header nunca esté compacto en escritorio
      header.classList.remove('compact');
    }

    lastScrollY = currentScrollY;
  };

  // Escuchar eventos de scroll y resize
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll, { passive: true });
});
