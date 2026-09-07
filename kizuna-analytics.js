/* ============================================================
   KIZUNA — Analítica con consentimiento
   - No carga Google Analytics hasta que la persona acepta.
   - Guarda la decisión en el navegador (kz_cookie_consent).
   - Registra clics salientes valiosos: compra, WhatsApp, PDF.
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
    css.textContent =
      '.kz-cookie{position:fixed;left:20px;right:20px;bottom:20px;z-index:200;max-width:660px;margin:0 auto;' +
      'background:#fff;border:1px solid #e4edf6;border-radius:18px;padding:20px 24px;' +
      'box-shadow:0 24px 60px rgba(7,29,54,.18);display:flex;gap:20px;align-items:center;flex-wrap:wrap;' +
      "font-family:'Inter',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;" +
      'transform:translateY(18px);opacity:0;transition:opacity .35s ease,transform .35s ease}' +
      '.kz-cookie.show{opacity:1;transform:none}' +
      '.kz-cookie p{margin:0;flex:1 1 300px;font-size:14.5px;line-height:1.5;color:#42566a}' +
      '.kz-cookie b{font-family:\'Poppins\',sans-serif;color:#071d36;display:block;margin-bottom:3px;font-size:15px}' +
      '.kz-cookie a{color:#0073e6;font-weight:600;text-decoration:none}' +
      '.kz-cookie-btns{display:flex;gap:10px;flex-wrap:wrap}' +
      ".kz-cookie button{font-family:'Poppins',sans-serif;font-weight:600;font-size:12.5px;text-transform:uppercase;" +
      'letter-spacing:.07em;padding:13px 20px;border-radius:11px;border:1.5px solid #e4edf6;background:#fff;' +
      'color:#071d36;cursor:pointer;transition:.15s}' +
      '.kz-cookie button:hover{border-color:#0073e6;color:#0073e6}' +
      '.kz-cookie button.kz-ok{background:#0073e6;border-color:#0073e6;color:#fff}' +
      '.kz-cookie button.kz-ok:hover{background:#0058ba;border-color:#0058ba;color:#fff}' +
      '@media(max-width:560px){.kz-cookie{padding:18px;left:12px;right:12px;bottom:12px}' +
      '.kz-cookie-btns{width:100%}.kz-cookie button{flex:1}}';
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
      '<p><b>Ayúdanos a mejorar la página</b>Usamos datos anónimos de navegación para saber qué información te resulta útil. ' +
      'Puedes aceptar o seguir solo con lo necesario. <a href="privacidad.html">Aviso de privacidad</a></p>' +
      '<div class="kz-cookie-btns">' +
      '<button type="button" data-kz="denied">Solo necesarias</button>' +
      '<button type="button" class="kz-ok" data-kz="granted">Aceptar</button>' +
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

  /* ---------- Arranque ---------- */
  function iniciar() {
    if (acepto()) cargarGA();
    banner();
    seguimiento();
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
