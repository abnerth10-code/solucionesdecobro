# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es este proyecto

Sitio estático (HTML/CSS/JS puro, sin framework ni build step) para **Soluciones de Cobro**, un portal que ayuda a negocios en México a elegir, comparar y comprar terminales y soluciones de cobro con tarjeta. La línea comercial principal es la venta de terminales Mercado Pago vía link de referido; el sitio también compara bancos, agregadores, pasarelas y modelos híbridos.

Se publica en GitHub Pages con dominio propio `solucionesdecobro.com` (ver `CNAME`).

## Cómo se trabaja en este repo (flujo real del dueño)

- No hay editor único: se ha editado con ChatGPT, con `aider` (aparece como autor en el historial de git) y con VS Code.
- Los commits y el push a producción se hacen con **GitHub Desktop**, no por línea de comandos, así que cualquier cambio debe quedar en un estado que se pueda revisar y commitear limpiamente ahí.
- **No hay proceso de build ni CI.** Lo que está en los archivos `.html/.css/.js` de la raíz es literalmente lo que se publica. No hay minificación, bundling ni transpilación.
- Cuidado especial con el historial de git: ya ha habido cadenas largas de commits `Revert "..."` / `Reapply "..."` por confusión entre herramientas. Antes de hacer cambios grandes, revisa `git status` y `git log --oneline -20` para confirmar que no hay una operación de revert/merge a medias.

## Comandos

No hay `package.json` ni gestor de paquetes para el sitio. Es HTML/CSS/JS servido tal cual; para verlo localmente basta abrir los archivos o servir la carpeta con cualquier servidor estático (por ejemplo `python3 -m http.server`).

El único script de build es para generar el PDF descargable de la matriz comparativa:

```bash
python3 scripts/generate_matrix_pdf.py
```

- Depende de `reportlab` (no está listado en ningún requirements.txt del repo — instalar con `pip install reportlab` si falta) y de tener `node` disponible en el PATH (lo usa para evaluar `comparison-data.js` y extraer `window.COMPARISON_PROVIDERS` como JSON).
- Lee `comparison-data.js` (fuente única de los proveedores) y escribe el PDF en `output/pdf/matriz-comparativa-soluciones-de-cobro-mexico.pdf`, copiándolo también a `assets/downloads/matriz-comparativa-soluciones-de-cobro-mexico.pdf` (esta segunda ruta es la que se enlaza desde el sitio). Si agregas o editas proveedores en `comparison-data.js`, hay que volver a correr este script para que el PDF descargable quede sincronizado.

No hay tests ni linter configurados.

## Arquitectura y estructura grande

### Páginas (todas en la raíz, sin router)

- `index.html` — landing principal: hero, propuesta de valor, tarjetas de "soluciones para crecer", sección de asesoría, el **diagnóstico interactivo** y FAQ.
- `terminales.html` — catálogo de terminales Mercado Pago (Point Smart 2, Point Air, Point Mini).
- `compara.html` — matriz comparativa de proveedores (carga `comparison-data.js` + `comparison.js`).
- `blog.html` — listado del blog; los posts individuales viven en `blog/*.html` (rutas relativas con `../` hacia `assets/` y `privacidad.html`).
- `privacidad.html` — aviso de privacidad; header no fijo a propósito (la lectura legal importa más que la conversión).

### JS compartido

- `site.js` (el archivo más grande, ~800 líneas) es un único IIFE que maneja *todo* lo transversal: consentimiento de cookies (`sdc_cookie_consent` en localStorage) y carga condicional de Google Analytics (`GA_MEASUREMENT_ID`), inyección de estilos "de parche" en runtime (`visualPolish`, `flatSurfacePalette` — buscar aquí antes de tocar CSS si algo se ve distinto a lo que hay en `styles.css`), header compacto/sticky en móvil, carrusel de medios de pago, tracking de clicks salientes, y **el diagnóstico interactivo completo**: stepper de preguntas (`profileResult()` calcula un score por categoría — `rapida`, `hibrida`, `banca`, `pasarela`, `softpos`, `bnpl` — a partir de las respuestas y decide la recomendación).
- `comparison-data.js` — única fuente de verdad de los ~37 proveedores (`window.COMPARISON_PROVIDERS`), cada uno con `category`, `cost`, `hardware`, `requirements`, `settlement`, `review`, etc. Es el dato que también consume `scripts/generate_matrix_pdf.py`.
- `comparison.js` — construye dinámicamente la tabla/matriz de `compara.html` a partir de `comparison-data.js` (agrupa por categoría, arma buscador y filtros, soporta parámetro de URL `?tipo=` para llegar filtrado desde otras páginas).

Nota: la categoría en la URL (`?tipo=`) y las categorías internas no son 1:1 — `comparison.js` remapea `adquirente` → `banca` y `softpos` → `rapida` al filtrar (ver `requestedFilter` en `comparison.js`).

### CSS

- `styles.css` es la hoja principal (organizada por comentarios de sección, ej. "Header de marca compacto", "Paleta 2026", "Inicio minimalista", "Comparativa").
- `desktop-layout-pass.css` es una capa aparte, solo `@media (min-width: 980px)`, pensada como "primera pasada verificable" de ajustes de escritorio — es decir, cambios de layout desktop se han ido metiendo aquí en vez de directamente en `styles.css`. Revisa ambos archivos al tocar layout de escritorio.
- Además, `site.js` inyecta bloques `<style>` adicionales en runtime (ver arriba) — si un ajuste de CSS no tiene efecto visible, puede ser porque JS lo está sobreescribiendo después de cargar.

### Assets

- `assets/hero/`, `assets/logos/`, `assets/cards/`, `assets/blog/<slug>/` — imágenes por sección/página.
- Varias imágenes hero pesan varios MB (hasta ~3-4 MB); es un problema de rendimiento conocido, priorizar WebP y tamaños razonables al agregar nuevas.
- `assets/downloads/` — el PDF generado por `scripts/generate_matrix_pdf.py` (no editar a mano, regenerar desde el script).

## Guía de diseño y contenido

Antes de cambiar textos, estructura o estilo visual, lee:

- `docs/croquis-del-sitio.md` — guía de diseño completa: paleta de colores exacta, personalidad visual, estructura sección por sección de cada página, reglas de comportamiento móvil (header que se compacta al hacer scroll), y la matriz de decisión completa del diagnóstico (qué variables entran y qué resultados existen).
- `docs/bitacora-y-ruta.md` — bitácora de decisiones y flujo de trabajo acordado con el dueño del proyecto (fuente única = copia local, GitHub Desktop como puente de publicación, criterios de cierre por ronda de cambios).

Estos dos documentos son la referencia de producto/diseño; este `CLAUDE.md` es la referencia técnica. Si hay conflicto entre lo que dice el código y lo que dicen estos docs, los docs reflejan la intención — vale la pena preguntar antes de "corregir" el código para que se aleje de lo documentado.
