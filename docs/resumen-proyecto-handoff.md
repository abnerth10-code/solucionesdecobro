# Soluciones de Cobro — Resumen completo del proyecto (handoff)

> Documento de traspaso. Está escrito para que **otro asistente (u otra persona) pueda entender el proyecto por completo sin contexto previo**: el negocio, cómo opera, cómo está construida la web y cómo se trabaja en ella. Verificado contra el repositorio real el **25 de agosto de 2026**.
>
> Si hay conflicto entre este documento y el código, gana el código (este doc puede quedar desactualizado). Los tres documentos de referencia son: `docs/croquis-del-sitio.md` (diseño/contenido), `docs/bitacora-y-ruta.md` (flujo de trabajo) y `CLAUDE.md` (referencia técnica).

---

## 1. La idea de negocio

**Soluciones de Cobro** es un portal mexicano que ayuda a negocios (changarros, PyMEs, comercios, vendedores móviles) a **elegir, comparar y comprar terminales y soluciones de cobro con tarjeta**. El sitio traduce un tema confuso (comisiones, requisitos, depósitos, rentas, contratos, meses sin intereses) a lenguaje claro para dueños de negocio que no son técnicos ni financieros.

**Cómo gana dinero (línea comercial principal):** venta de **terminales Mercado Pago (Point)** mediante **link de referido / afiliado**. El link real de compra que usa el sitio es `https://mpago.li/2j1nqHG` (aparece en `terminales.html` y en los CTA de compra). Cuando alguien compra por ese link, se genera la comisión de referido.

**Estrategia de contenido / captación:** el sitio no solo vende Point. También **compara honestamente** ~34 proveedores (bancos, agregadores, pasarelas, modelos híbridos, BNPL). Esa comparativa imparcial es el gancho de confianza y SEO: atrae tráfico orgánico de gente buscando "qué terminal me conviene", y el **diagnóstico interactivo** los encamina hacia la recomendación adecuada — que muchas veces (pero no siempre) es una terminal moderna tipo Point.

**Servicio adjunto:** asesoría personalizada por **WhatsApp** (número `52 951 182 5881`, un número de Oaxaca — la marca es "solucionesdecobrooax" en redes). Es venta consultiva, no solo un catálogo.

**Posicionamiento / tono:** profesional, cercano, claro y **luminoso**. Nada de jerga innecesaria. La honestidad de la comparativa es parte del argumento de venta ("te ayudamos a decidir de verdad, no solo a vender").

---

## 2. Cómo opera el sitio (recorrido del usuario)

1. **Llega** al inicio (`index.html`) por búsqueda, redes o el blog.
2. **Entiende el valor** de aceptar tarjeta (sección de impacto: analogía de la playa, rango orientativo de +20–35% de ventas potenciales).
3. **Se orienta** con una de tres acciones: *Comprar terminal* (directo al link de Mercado Pago), *Pedir asesoría* (WhatsApp) o *Hacer diagnóstico*.
4. **Diagnóstico interactivo** (10 preguntas, viven en `index.html` + lógica en `site.js`): según sus respuestas, el sitio calcula un perfil y recomienda una de varias rutas. Si recomienda terminal moderna → link de compra; si recomienda híbrido o banca → lo manda a la comparativa.
5. **Compara** (`compara.html`): matriz de ~34 proveedores con costos, requisitos, depósito, renta, contrato, reseña, y link oficial de cada uno.
6. **Blog** (`blog.html` + entradas): contenido educativo para atraer tráfico y resolver dudas; cada entrada enlaza al diagnóstico/comparativa/compra.
7. **Convierte** por el link de referido de Mercado Pago o por WhatsApp.

Canales de contacto: WhatsApp `52 951 182 5881`; Facebook (`facebook.com/profile.php?id=61582373169392`); Instagram (`@solucionesdecobrooax`); correo formal de privacidad `contacto@solucionesdecobro.com`.

---

## 3. Stack técnico y cómo se publica

- **Sitio estático puro: HTML + CSS + JS a mano. NO hay framework, NO hay build step, NO hay bundler, NO hay minificación, NO hay CI, NO hay tests ni linter.** Lo que está en los archivos `.html/.css/.js` de la raíz es literalmente lo que se publica.
- **Hosting:** GitHub Pages con dominio propio. `CNAME` = `solucionesdecobro.com`.
- **Repo remoto:** `abnerth10-code/solucionesdecobro`, rama `main`.
- **Publicación:** se hace con **GitHub Desktop** (no por línea de comandos). El dueño revisa el diff, escribe un mensaje de commit, hace commit a `main` y `Push origin`; GitHub Pages despliega solo.
- **Analytics:** Google Analytics 4, ID `G-49P7XY0Z7W`, cargado **condicionalmente** solo si el usuario acepta cookies (consentimiento guardado en `localStorage` bajo la clave `sdc_cookie_consent`). Toda la lógica de cookies/GA está en `site.js`.
- **Verificación de Google Search Console:** archivo `google6c56813bdd4c33ca.html` en la raíz.
- **SEO:** `sitemap.xml` y `robots.txt` en la raíz; cada página tiene `<title>`, meta description, canonical y (en el blog) JSON-LD de artículo.

### Cómo probar localmente
No hay gestor de paquetes para el sitio. Basta abrir los archivos o servir la carpeta:
```bash
python3 -m http.server
```

### Advertencia importante sobre el historial de git
Ya ha habido cadenas de commits `Revert` / `Reapply` por confusión entre herramientas (se editó con ChatGPT, con `aider`, y con VS Code en distintos momentos). **La fuente única de verdad es la copia local; GitHub Desktop es el único puente de publicación.** Antes de cambios grandes, revisar `git status` y `git log --oneline -20` para confirmar que no hay un revert/merge a medias.

> Nota operativa vista en la práctica: en la máquina del dueño coexisten varios repos en `~/Documents/GitHub/` (por ejemplo `promocionesmx`, un proyecto **distinto**). Cuidado en GitHub Desktop de estar en el repositorio correcto ("Current Repository" = `solucionesdecobro`) y de no arrastrar un mensaje de commit de un proyecto a otro.

---

## 4. Estructura de archivos del repositorio

### Páginas HTML (todas en la raíz, sin router)
| Archivo | Función |
|---|---|
| `index.html` | Landing principal: header, hero, impacto, "soluciones para crecer", asesoría, **diagnóstico interactivo**, medios de pago, FAQ, cierre. |
| `terminales.html` | Catálogo de terminales Mercado Pago (Point Smart 2, Point Air, Point Mini) + FAQ + CTA de compra (`mpago.li/2j1nqHG`). |
| `compara.html` | Matriz comparativa de ~34 proveedores; carga `comparison-data.js` + `comparison.js`. Soporta `?tipo=` en la URL para llegar prefiltrado. |
| `blog.html` | Listado del blog (tipografía serif editorial, guía destacada, "más guías", "próximamente"). |
| `blog/que-solucion-de-cobro-le-conviene-a-tu-negocio.html` | Guía completa (~990 palabras, 6–8 min): operación, costo real (3.5%+IVA, MSI), 4 rutas, ejemplo, regla, resumen + aviso. |
| `blog/requisitos-terminal-bancaria.html` | Guía: qué requisitos pide un banco para dar TPV (RFC, documentos, persona moral, evaluación, alternativa, checklist). |
| `privacidad.html` | Aviso de privacidad. Header **no** fijo a propósito (la lectura legal importa más que la conversión). Contacto: `contacto@solucionesdecobro.com`. |

### JavaScript
| Archivo | Qué hace |
|---|---|
| `site.js` (~835 líneas) | El archivo más grande. Un único IIFE que maneja **todo lo transversal**: consentimiento de cookies + carga condicional de GA; inyección de estilos "de parche" en runtime (buscar `visualPolish` y `flatSurfacePalette` aquí antes de tocar CSS si algo se ve distinto a `styles.css`); header compacto/sticky en móvil; carrusel de medios de pago; tracking de clics salientes; y **el diagnóstico completo** (stepper de preguntas + `profileResult()` que calcula un score por categoría y decide la recomendación). |
| `comparison-data.js` | **Fuente única de verdad de los ~34 proveedores** (`window.COMPARISON_PROVIDERS`). Cada proveedor tiene `category`, `cost`, `hardware`, `requirements`, `settlement`, `review`, etc. También lo consume el script del PDF. |
| `comparison.js` (~236 líneas) | Construye dinámicamente la matriz de `compara.html` desde `comparison-data.js`: agrupa por categoría, arma buscador y filtros, y lee el parámetro `?tipo=`. **Remapea** al filtrar: `adquirente → banca` y `softpos → rapida` (ver `requestedFilter`). |
| `share.js` (67 líneas) | Barra de compartir de los artículos del blog. Progresivo: sin JS los iconos siguen visibles; con JS arma los enlaces reales (WhatsApp, Telegram, Facebook, X) desde el canonical + título, botón "copiar enlace" con feedback, y animación de entrada con IntersectionObserver. Solo se carga en las páginas de blog. |

### CSS
| Archivo | Qué es |
|---|---|
| `styles.css` (~504 líneas) | Hoja principal, organizada por comentarios de sección ("Header de marca compacto", "Paleta 2026", "Inicio minimalista", "Comparativa", etc.). |
| `visual-polish.css` (~345 líneas) | Capa de ajustes/parches sobre `styles.css`. Aquí viven, entre otras cosas: la **barra de compartir del blog** (`.share-bar`), la interacción de la **barra lateral de redes** del home (`.social-rail`) y los **iconos de redes del header móvil** (`.mobile-social`). Se enlaza en las páginas después de `styles.css`. |

> Importante: además de estos dos archivos CSS, **`site.js` inyecta bloques `<style>` adicionales en runtime**. Si un ajuste de CSS no tiene efecto visible, puede ser porque el JS lo sobreescribe después de cargar. (Nota: `CLAUDE.md` menciona un `desktop-layout-pass.css`, pero **ese archivo ya no existe** en el repo; los únicos CSS son `styles.css` y `visual-polish.css`.)

### Assets
- `assets/hero/` — imágenes principales por sección (algunas PNG pesan varios MB; **usar siempre las versiones `.webp` livianas** ya presentes, no re-enlazar los PNG pesados).
- `assets/logos/` — isotipo de marca, logos de redes (facebook/instagram/whatsapp .svg) y logos de medios de pago.
- `assets/cards/` — imágenes de tarjetas de secciones.
- `assets/blog/<slug>/` — imágenes por entrada del blog (webp de ~59–87 KB, peso correcto).
- `assets/downloads/` — el PDF de la matriz comparativa (generado por script, **no editar a mano**).

### Docs y scripts
- `docs/croquis-del-sitio.md` — guía completa de diseño/contenido: paleta exacta, personalidad visual, estructura sección por sección, comportamiento móvil y la matriz de decisión del diagnóstico.
- `docs/bitacora-y-ruta.md` — bitácora de decisiones y flujo de trabajo acordado.
- `docs/pendientes-assets-y-blog.md` — lista viva de pendientes (logos que faltan, verificaciones post-publicación, decisiones de contenido).
- `docs/resumen-proyecto-handoff.md` — este documento.
- `scripts/generate_matrix_pdf.py` — genera el PDF descargable de la matriz.

---

## 5. El diagnóstico interactivo (corazón del sitio)

Vive en `index.html` (markup del stepper) + `site.js` (lógica). Son **10 preguntas**, varias de selección múltiple, con barra de avance ("FASE 1 DE 3") y auto-avance con un pequeño retardo en las multi-opción.

**Variables que entran en la decisión:** formalidad fiscal, volumen mensual esperado, estabilidad de ventas, urgencia para recibir el dinero, margen por venta, necesidad de meses sin intereses, lugar/forma de cobro, y preferencia entre "requisitos simples" vs "mejores condiciones con más trámites".

**Cómo decide:** la función `profileResult()` en `site.js` suma un **score por categoría** a partir de las respuestas. Las categorías internas son: `rapida`, `hibrida`, `banca`, `pasarela`, `softpos`, `bnpl`. Gana la categoría con más puntos y se muestra una tarjeta de resultado con: un emblema, los motivos, una recomendación comercial y CTAs.

**Resultados posibles y salida comercial:**
1. **Terminal moderna** (`rapida`) → para empezar rápido, movilidad, pocos requisitos o cobro en redes. Recomendación inicial: **Point de Mercado Pago** (link de compra), luego Clip y NetPay.
2. **Modelo híbrido** (`hibrida`) → negocios en crecimiento que quieren estructura sin ir directo a banca. Ej.: Getnet, Konfío. → manda a comparativa.
3. **TPV bancaria** (`banca`) → negocios con RFC, cuenta y ventas constantes que quieren negociar condiciones. Ej.: BBVA, Banorte, Citibanamex. → manda a comparativa.
4. Rutas complementarias: `pasarela` (e-commerce: Stripe, Conekta), `bnpl` (meses/compra ahora paga después: Aplazo, Kueski), `softpos` (cobrar con el celular sin terminal).

> Nota de mapeo: las categorías internas del score (`softpos`, `adquirente`) no son 1:1 con los filtros de la URL de la comparativa; `comparison.js` remapea `adquirente → banca` y `softpos → rapida`.

---

## 6. La comparativa (`compara.html` + datos)

- **Fuente de datos:** `comparison-data.js` → `window.COMPARISON_PROVIDERS`, ~34 proveedores.
- **Distribución por categoría (actual):** `banca` 13, `rapida` 8, `pasarela` 7, `adquirente` 2, `bnpl` 2, `hibrida` 2.
- **Proveedores incluidos (muestra):** Mercado Pago Point, Clip, Zettle, Billpocket, Sr. Pago, KiWi, Ualá Bis, Feenicia, NetPay, Getnet, BBVA TPV, Banorte TPV, Citibanamex, Santander TPV, HSBC, Scotiabank, Banregio, BanBajío, Afirme, Inbursa, Banco Azteca, Openpay, Conekta, Stripe, Adyen, PayPal México, Kushki, PayU, Fiserv, EVO Payments, Kueski Pay, Aplazo, Banca Mifel, Banco Multiva.
- **Render:** `comparison.js` agrupa por categoría, ofrece buscador y filtros, y cada tarjeta muestra costo, requisitos, depósito (settlement), renta/contrato y una reseña corta, con link oficial. Las tarjetas usan un patrón de **acordeón** "Ver detalles / Ocultar detalles".
- **Logos de la matriz:** hoy usa el servicio de favicons de Google (calidad irregular). Mejora futura opcional: reemplazar por logos locales.

### PDF descargable de la matriz
```bash
python3 scripts/generate_matrix_pdf.py
```
- Depende de `reportlab` (`pip install reportlab` si falta) y de tener `node` en el PATH (lo usa para evaluar `comparison-data.js` y extraer el JSON de proveedores).
- Lee `comparison-data.js`, escribe el PDF en `output/pdf/…` y lo copia a `assets/downloads/matriz-comparativa-soluciones-de-cobro-mexico.pdf` (esta segunda ruta es la que enlaza el sitio).
- **Si agregas o editas proveedores, hay que volver a correr este script** para sincronizar el PDF descargable.

---

## 7. Identidad visual (resumen; el detalle está en `croquis-del-sitio.md`)

**Personalidad:** profesional, cercana, clara, luminosa. Fondo claro, azul dosificado, amarillo/verde como acentos funcionales. Evitar que parezca plantilla genérica; cada sección responde "qué es / para quién / qué hago ahora".

**Paleta base:**
- Azul tinta `#071d36` · Azul acción `#0073e6` · Azul acción oscuro `#0058ba` · Azul claro fintech `#19aeea`
- Fondo principal `#f7fbff` · Blanco `#ffffff` · Crema suave `#fff8e6` · Crema cálida `#fffdf6`
- Línea suave `#dce7f1` · Texto secundario `#53687f`
- Amarillo acento `#ffd23f` · Verde confianza/WhatsApp `#18a058`
- Colores de marca de redes (usados en iconos): Facebook `#0866FF`, Instagram `#FF0069`, WhatsApp `#25D366`.

**Blog (capa editorial, añadida recientemente):** títulos con fuente **serif "Newsreader"** (Google Fonts), cuerpo sans ~19px, columna de lectura angosta (~680–700px) centrada, e **índice lateral pegajoso (TOC)** en una rejilla de dos columnas (`210px + columna de lectura`) que colapsa a una sola columna en ≤980px.

---

## 8. Comportamiento móvil (clave del proyecto)

- Header compacto: isotipo pequeño + nombre legible + menú en una línea + botón de compra + redes.
- Al empezar a bajar, el header **se compacta y oculta marca y menú**, dejando solo la acción principal y las redes (lógica en `site.js`, clase `.header.compact`).
- No duplicar el botón de compra dentro del hero en móvil (ya queda fijo arriba).
- Botón flotante "volver arriba" visible pero que no compita con el de compra.
- Cuidar que la barra inferior de Safari móvil no tape botones.
- La **barra lateral de redes** (`.social-rail`, fija a la derecha) es solo desktop; en móvil se ocultan y aparecen los iconos `.mobile-social` en el header.

---

## 9. Componentes de redes sociales (estado actual, agosto 2026)

Hay **tres** lugares con iconos de redes, ahora unificados visualmente:
1. **Barra lateral desktop** (`.social-rail`, fija a la derecha del home): enlaces a los perfiles propios (Facebook, Instagram, WhatsApp). Al pasar el cursor el círculo se rellena con el color de la marca y el icono se vuelve blanco; anillo de foco accesible; **animación de entrada escalonada** deslizando desde la derecha (disparada por un pequeño script inline tras la barra en `index.html`; respeta `prefers-reduced-motion`).
2. **Header móvil** (`.mobile-social`): mismos enlaces, misma interacción de relleno de color al tocar/hover + foco.
3. **Barra de compartir del blog** (`.share-bar` en cada artículo, comportamiento en `share.js`): comparte el artículo por WhatsApp/Telegram/Facebook/X + copiar enlace. Es de **compartir**, no de seguir (distinta función, mismo lenguaje visual).

Todo el estilo de estos tres vive en `visual-polish.css`.

---

## 10. Flujo de trabajo acordado con el dueño (Abner)

1. Trabajar sobre la **copia local** `/Users/abnr/Documents/GitHub/solucionesdecobro` (fuente única de verdad).
2. Colocar imágenes nuevas en la carpeta correspondiente (`assets/hero/`, `assets/logos/`, etc.) — preferir `.webp` liviano.
3. Hacer **rondas acotadas** de cambios.
4. Verificar nombres, rutas, imágenes y **vista móvil** antes de publicar.
5. Publicar solo por **GitHub Desktop**: revisar el diff, escribir un mensaje claro, commit a `main`, `Push origin`.
6. Confirmar en `https://solucionesdecobro.com` (en **incógnito o con refresco forzado**, porque el caché de GitHub Pages y del teléfono muestra versiones viejas por unos minutos).

**Criterios de cierre de cada ronda:** ninguna imagen con 0/2 bytes; todas las rutas funcionan desde el dominio propio; cabecera legible en desktop y móvil; cada ronda termina con diff verificable + commit + URL comprobada. No se inicia otra ronda hasta que la anterior esté publicada y revisada.

**Estilo de colaboración del dueño:** prefiere respuestas concisas y directas; suele revisar en PC y en móvil; valida visualmente. A veces usa "publicado" para indicar que ya subió los cambios y toca verificar en vivo.

---

## 11. Pendientes conocidos (ver `docs/pendientes-assets-y-blog.md` para el detalle)

- **8 logos del resultado del diagnóstico** (el código ya los espera en `assets/logos/`, muestra la inicial como respaldo mientras tanto): `clip.svg`, `uala.svg`, `konfio.svg`, `banorte.svg`, `citibanamex.svg`, `conekta.svg`, `stripe.svg`, `aplazo.svg`.
- **5 logos del carrusel de medios de pago del inicio** (hoy en texto; este carrusel **no** tiene respaldo automático, requiere un pequeño cambio de HTML al subirlos): `pluxee.svg`, `total.svg` (confirmar a qué "Total" se refiere), `samsungpay.svg`, `banco-bienestar.svg`, `tengo.svg`.
- **Logos locales para la matriz** (opcional, 34 logos, segunda etapa) para reemplazar los favicons de Google.
- **Decisiones de contenido:** confirmar si dejar las cifras de MSI de referencia (BBVA: ~4% a 3 meses … ~13% a 12 meses) o dejarlo más general.
- **Seguridad (recordatorio activo):** rotar una API key de 21st.dev que quedó expuesta en texto plano en un chat (pertenece al proyecto **PromocionesMX**, no a este sitio, pero está en la lista de pendientes del dueño; hay un recordatorio programado).

---

## 12. Reglas de oro para quien continúe

- **No introducir build steps ni frameworks** sin acordarlo: el sitio se publica tal cual.
- **`comparison-data.js` es la única fuente de proveedores**; edítalo ahí y regenera el PDF.
- Antes de "corregir" el CSS, revisa si **`site.js` inyecta estilos en runtime** que lo sobreescriben.
- Antes de tocar textos/estructura/estilo, lee `docs/croquis-del-sitio.md`: si el código contradice al doc, el doc refleja la intención — **pregunta antes de alejar el código de lo documentado**.
- Verifica siempre en **móvil** y en **incógnito** después de publicar.
- No re-enlazar imágenes PNG pesadas; usar `.webp`.
- Cuidado con el historial de git y con estar en el repositorio correcto en GitHub Desktop.
- Los logos de marcas se usan con fines informativos y siempre acompañados del aviso legal de marcas.
