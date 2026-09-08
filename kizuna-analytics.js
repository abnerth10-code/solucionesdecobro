/* ============================================================
   KIZUNA — Analítica con consentimiento
   - No carga Google Analytics hasta que la persona acepta.
   - Guarda la decisión en el navegador (kz_cookie_consent).
   - Registra clics salientes valiosos: compra, WhatsApp, PDF.
   - Encabezado móvil: repliega la fila del menú al bajar, la regresa al subir.
   ============================================================ */
(function () {
  'use strict';

  var GA_ID = 'G-49P7XY0Z7W';
  var KEY = 'kz_cookie_consent';

  function leer() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function guardar(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function acepto() { return leer() === 'granted'; }

  /* ---------- Google Analytics (solo con consentimiento) ---------- */
  var gaCargado = false;
  function cargarGA() {
    if (gaCargado || !acepto()) return;
    gaCargado = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  }

  function evento(nombre, datos) {
    if (!acepto() || typeof window.gtag !== 'function') return;
    window.gtag('event', nombre, datos || {});
  }

  /* ---------- Banner ---------- */
  function estilos() {
    if (document.getElementById('kzCookieCss')) return;
    var css = document.createElement('style');
    css.id = 'kzCookieCss';
    /* Compacto, abajo a la izquierda, sin tapar el contenido.
       Ambos botones con el MISMO peso visual: rechazar debe ser tan fácil
       como aceptar (requisito legal y coherente con la marca). */
    css.textContent =
      '.kz-cookie{position:fixed;left:20px;bottom:20px;z-index:200;width:min(360px,calc(100vw - 40px));' +
      'background:#fff;border:1px solid #e4edf6;border-radius:14px;padding:16px 18px;' +
      'box-shadow:0 14px 36px rgba(7,29,54,.14);' +
      "font-family:'Inter',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;" +
      'transform:translateY(14px);opacity:0;transition:opacity .3s ease,transform .3s ease}' +
      '.kz-cookie.show{opacity:1;transform:none}' +
      '.kz-cookie p{margin:0 0 12px;font-size:14px;line-height:1.45;color:#42566a}' +
      '.kz-cookie a{color:#0073e6;font-weight:600;text-decoration:underline}' +
      '.kz-cookie-btns{display:flex;gap:8px}' +
      ".kz-cookie button{flex:1;font-family:'Poppins',sans-serif;font-weight:600;font-size:13px;" +
      'padding:11px 12px;border-radius:9px;border:1.5px solid #cfe0f2;background:#fff;' +
      'color:#0058ba;cursor:pointer;transition:.15s}' +
      '.kz-cookie button:hover{background:#eaf3ff;border-color:#0073e6}' +
      '.kz-cookie button:focus-visible{outline:2px solid #0073e6;outline-offset:2px}' +
      '@media(max-width:560px){.kz-cookie{left:12px;right:12px;bottom:12px;width:auto;padding:14px 16px}}';
    document.head.appendChild(css);
  }

  function banner() {
    if (leer()) return;                      // ya decidió
    estilos();
    var caja = document.createElement('div');
    caja.className = 'kz-cookie';
    caja.setAttribute('role', 'dialog');
    caja.setAttribute('aria-label', 'Aviso de cookies');
    caja.innerHTML =
      '<p>Usamos datos anónimos para mejorar la página. ' +
      '<a href="privacidad.html">Cómo tratamos tus datos</a></p>' +
      '<div class="kz-cookie-btns">' +
      '<button type="button" data-kz="denied">Rechazar</button>' +
      '<button type="button" data-kz="granted">Aceptar</button>' +
      '</div>';
    document.body.appendChild(caja);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { caja.classList.add('show'); });
    });
    caja.addEventListener('click', function (e) {
      var b = e.target.closest('[data-kz]');
      if (!b) return;
      guardar(b.getAttribute('data-kz'));
      cargarGA();
      caja.classList.remove('show');
      setTimeout(function () { caja.remove(); }, 350);
    });
  }

  /* ---------- Clics valiosos ---------- */
  function seguimiento() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a || !a.href) return;
      var href = a.href;
      if (href.indexOf('mpago.li') > -1) {
        evento('clic_comprar_terminal', { destino: 'mercado_pago' });
      } else if (href.indexOf('wa.me') > -1) {
        evento('clic_whatsapp', {});
      } else if (href.slice(-4) === '.pdf') {
        evento('descarga_pdf', { archivo: href.split('/').pop() });
      }
    }, true);
  }

  /* ---------- Encabezado móvil que se repliega al bajar ----------
     En pantallas chicas el encabezado ocupa dos filas. Mantenerlo fijo
     completo se come la pantalla; esconderlo del todo obliga a subir hasta
     arriba para navegar. La fila del menú se oculta al bajar y regresa al
     subir: es el patrón que usan los sitios de contenido en móvil. */
  function encabezado() {
    var h = document.querySelector('.site-header');
    if (!h || getComputedStyle(h).position !== 'sticky') return;
    var ultimo = window.scrollY || 0, tick = false;
    function ver() {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (y > 140 && y > ultimo + 6) h.classList.add('compacto');
      else if (y < ultimo - 6 || y < 140) h.classList.remove('compacto');
      ultimo = y; tick = false;
    }
    window.addEventListener('scroll', function () {
      if (!tick) { tick = true; requestAnimationFrame(ver); }
    }, { passive: true });
  }

  /* ---------- Arranque ---------- */
  function iniciar() {
    if (acepto()) cargarGA();
    banner();
    seguimiento();
    encabezado();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }

  /* Permite reabrir la decisión desde el aviso de privacidad */
  window.kizunaCookies = {
    revocar: function () { try { localStorage.removeItem(KEY); } catch (e) {} location.reload(); }
  };
})();
