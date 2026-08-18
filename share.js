/* Barra de compartir para artículos del blog. Progresivo: sin JS los iconos
   siguen visibles; con JS se arman los enlaces reales, el botón de copiar y la
   animación de entrada. Respeta prefers-reduced-motion (vía CSS). */
(function () {
  var bar = document.querySelector('.share-bar');
  if (!bar) return;

  var canonical = document.querySelector('link[rel="canonical"]');
  var url = (canonical && canonical.href) || window.location.href;
  var title = document.title.split('|')[0].trim() || document.title;
  var eu = encodeURIComponent(url);
  var et = encodeURIComponent(title);

  var links = {
    whatsapp: 'https://wa.me/?text=' + encodeURIComponent(title + ' ' + url),
    telegram: 'https://t.me/share/url?url=' + eu + '&text=' + et,
    facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + eu,
    x: 'https://twitter.com/intent/tweet?url=' + eu + '&text=' + et
  };

  bar.querySelectorAll('.share-icon[data-share]').forEach(function (a) {
    var key = a.getAttribute('data-share');
    if (links[key]) {
      a.setAttribute('href', links[key]);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    }
  });

  var btn = bar.querySelector('.share-copy');
  var label = bar.querySelector('.share-copy-label');
  if (btn && label) {
    var original = label.innerHTML;
    var copiedHTML = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg> ¡Enlace copiado!';
    var timer;
    btn.addEventListener('click', function () {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url);
        }
      } catch (e) { /* sin permiso de portapapeles: mostramos feedback igual */ }
      label.innerHTML = copiedHTML;
      btn.classList.add('is-copied');
      clearTimeout(timer);
      timer = setTimeout(function () {
        label.innerHTML = original;
        btn.classList.remove('is-copied');
      }, 2000);
    });
  }

  // Animación de entrada al hacer scroll a la barra.
  bar.classList.add('share-bar--anim');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          bar.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    io.observe(bar);
  } else {
    bar.classList.add('in-view');
  }
})();
