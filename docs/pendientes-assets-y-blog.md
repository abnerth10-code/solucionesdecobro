# Pendientes del proyecto — assets, verificaciones y blog

> Documento de trabajo generado el 24 de julio de 2026. Es una lista de lo que falta y cómo resolverlo. Puedes borrarlo o moverlo cuando ya no lo necesites.

---

## 1. Logos de proveedores (tarjeta de resultado del diagnóstico)

Son los logos de las "opciones complementarias" que aparecen en el resultado. El código ya está listo: en cuanto pongas el archivo, el logo aparece solo; mientras tanto se muestra la inicial (C, U, etc.) como respaldo.

**Faltan 8:**

| Marca | Nombre de archivo | Categoría donde aparece |
|---|---|---|
| Clip | `clip.svg` | Cobro rápido |
| Ualá Bis | `uala.svg` | Cobro rápido |
| Konfío | `konfio.svg` | Modelo híbrido |
| Banorte | `banorte.svg` | Banca |
| Citibanamex | `citibanamex.svg` | Banca |
| Conekta | `conekta.svg` | Pasarela |
| Stripe | `stripe.svg` | Pasarela |
| Aplazo | `aplazo.svg` | BNPL |

- **Dónde sacarlos:** página oficial de cada marca (sección "prensa", "marca" o "brand"), o bancos de logos: brandfetch.com, worldvectorlogo.com, seeklogo.com, o Wikimedia Commons (busca "[marca] logo svg").
- **Formato/extensión:** SVG de preferencia (se ve nítido en cualquier tamaño). Si solo consigues PNG, sirve — el código intenta primero `.svg` y luego `.png` automáticamente.
- **Cómo debe verse el archivo:** el isotipo/símbolo de la marca, **cuadrado o casi cuadrado**, con **fondo transparente** y poco margen (recortado al borde del logo). Si el logo es muy horizontal (Stripe, Citibanamex en texto), usa mejor su símbolo/isotipo, no el logotipo con texto largo — se ve mejor en el recuadro chico (se muestra a ~26 px).
- **Nombre exacto:** minúsculas, sin acentos ni espacios, tal cual la tabla de arriba.
- **Dónde pegarlos:** carpeta `assets/logos/`.
- **Después:** no necesito reprogramar nada; solo publica.

---

## 2. Logos de medios de pago (carrusel "Medios de pago" del inicio)

En el carrusel del inicio hay 5 marcas que hoy aparecen como **texto** en vez de logo.

**Faltan 5:**

| Marca | Nombre sugerido | Nota |
|---|---|---|
| Pluxee | `pluxee.svg` | (antes Sodexo) |
| Total | `total.svg` | Confírmame a cuál "Total" te refieres (¿Totalplay? ¿vale de despensa?) |
| Samsung Pay | `samsungpay.svg` | |
| Banco del Bienestar | `banco-bienestar.svg` | |
| TENGO! | `tengo.svg` | |

- **Dónde sacarlos y formato:** igual que la sección 1 (SVG o PNG transparente, cuadrado/horizontal según el logo).
- **Cómo debe verse:** aquí sí pueden ser logos horizontales (el recuadro es más ancho, ~124 px). Fondo transparente.
- **Dónde pegarlos:** `assets/logos/`.
- **Diferencia importante:** este carrusel **no tiene respaldo automático**, así que aquí sí necesito hacer un pequeño cambio en el HTML (cambiar el texto por la etiqueta de imagen) una vez que tengas los archivos. Cuando los subas, avísame y lo hago en 5 líneas — o te digo exactamente qué cambiar.

---

## 3. Logos de la matriz comparativa (opcional, mejora futura)

Hoy la matriz usa el servicio de "favicons" de Google para los ~34 proveedores (por eso algunos se ven como iconitos genéricos, como el "apretón de manos" de Mercado Pago). Funciona sin mantenimiento, pero la calidad es irregular.

- **Si quieres subirlo de nivel:** conseguir los logos reales de los 34 proveedores (mismos criterios de la sección 1) y yo cambio el código para que use archivos locales en vez de favicons.
- **Recomendación:** es opcional y da trabajo (34 logos). Yo lo dejaría para una segunda etapa; primero los 8 del resultado, que son los más visibles.

---

## 4. Imágenes e ilustraciones

**Estado: sin pendientes urgentes.** Todas las imágenes referenciadas existen y todas tienen texto alternativo (`alt`). El peso de las imágenes del blog está bien (webp de 59–87 KB).

Oportunidades opcionales (no urgentes):
- Las fotos hero son grandes (varios MB en la versión PNG); el sitio ya usa las versiones `.webp` livianas, así que no hay problema de velocidad. Solo cuida no volver a enlazar los `.png` pesados.
- Si algún día quieres reemplazar el emblema del resultado (el squircle azul) por una ilustración tuya generada con IA (como la del terminal que subiste), avísame y te paso el prompt exacto y el tamaño.

---

## 5. Iconos

**Estado: nada pendiente de tu parte.** Todos los iconos del sitio (el ave animada, las píldoras "Sin costo/Sin compromiso", el emblema del resultado, los iconos del legend estilo Apple, la animación de la lupa en compara) están hechos en SVG dentro del código. No necesitas generar ni subir nada.

---

## 6. Blog — rediseño (investigado)

Tu diagnóstico es correcto: el blog necesita trabajo. No es el peso de las imágenes (están livianas), sino que **se muestran demasiado grandes y dominantes** (1200×900 a todo lo ancho) y la estructura no invita a leer.

**Lo que dice la investigación de buenas prácticas 2026:**
- El **73% de la gente no lee, escanea**; el promedio son ~37 segundos por artículo. Todo debe ser escaneable.
- Párrafos **cortos (2–4 líneas)**, subtítulos frecuentes, listas y negritas para "anclar" la vista.
- Imágenes: **una cada 300–400 palabras**, que **complementen, no dominen**. Mejor imágenes simples que comuniquen una idea (diagramas, infografías chicas) que ilustraciones grandes decorativas.
- Jerarquía de títulos clara (un H1, varios H2 con palabras clave) — ayuda a lectores y a Google.
- Nivel de lectura sencillo (como para secundaria), voz activa.
- Enlaces internos (ya los tienes: diagnóstico, compara).

**Plan concreto que propongo para tu blog (a decidir juntos):**
1. **Achicar y encuadrar las imágenes:** que no ocupen todo el ancho; mostrarlas a un tamaño medio, centradas, con más aire alrededor. O convertirlas en diagramas simples (como los del sitio) en vez de ilustraciones grandes.
2. **Reestructurar el artículo** en bloques más escaneables: intro corta, subtítulos con la pregunta que resuelve cada sección, una idea por párrafo, y "cajas" de resumen (las que ya tienes de "4 rutas" están bien).
3. **Agregar un índice** al inicio del artículo (tabla de contenidos con anclas) para artículos largos.
4. **Un solo gráfico fuerte por artículo** en vez de 4 ilustraciones; el resto, apoyos chicos.
5. **Plantilla reutilizable:** dejar el artículo como molde para las próximas guías (ya tienes 3 "próximas guías" listadas), con estilo consistente.
6. **Homogeneizar tono:** textos que informan y enganchan, con títulos tipo pregunta ("¿Qué significa 3.5% + IVA?").

**Necesito tu decisión antes de rediseñar:** ¿quieres que (a) mantenga tus ilustraciones actuales pero más chicas y mejor acomodadas, o (b) las reemplace por diagramas simples estilo el resto del sitio (barco, lupa, emblemas)? Mi recomendación es (b): más coherente y "comunican" mejor.

---

## 7. Verificaciones después de publicar

Cada vez que publiques desde GitHub Desktop, revisa **en incógnito o con refresco forzado** (tu teléfono guarda caché y te muestra versiones viejas):

- [ ] **Matriz en móvil:** que el botón "Ver detalles / Ocultar detalles" abra y cierre bien en TODAS las filas (antes fallaba en las pares). Probar Mercado Pago y Zettle específicamente.
- [ ] **Nombre del proveedor** en la matriz móvil: que "Mercado Pago Point" se vea completo y "Ir al sitio oficial" en una línea, sin espacio vacío a la derecha.
- [ ] **Resultado del diagnóstico:** hacer el test con varios perfiles y ver que el emblema, los motivos y el botón "Comprar Point de Mercado Pago" aparezcan bien; probar "Volver a evaluar".
- [ ] **Legend "¿Qué significa cada opción?":** en móvil que se apile (no scroll horizontal) y que los iconos se vean nítidos.
- [ ] **PageSpeed Insights** (pagespeed.web.dev): correr móvil y escritorio; confirmar que ya no sale el error rojo y que da puntaje numérico.
- [ ] **Ave animada** e iconos de las píldoras en el inicio.

---

## 8. Decisiones de contenido pendientes

- [ ] **Tasas de MSI:** la sección nueva "¿Cómo se calcula lo que pagas?" usa cifras de referencia de BBVA (4% a 3 meses… 13% a 12 meses). Confirma que te parece bien mostrarlas o si prefieres dejarlo más general.
- [ ] **Info de tasas en otras páginas:** hoy está en compara (donde vive la matriz). Si quieres una versión corta en Inicio o Terminales, dime.
- [ ] **Marca "Total"** del carrusel: confirmar a cuál te refieres para conseguir el logo correcto.

---

## 9. Pulido menor ya aplicado (para tu registro)

- Resultado con una sola opción secundaria (ej. BNPL → Aplazo): ahora esa tarjeta ocupa todo el ancho en vez de dejar hueco.
- Revisión ortográfica global de compara.html y comparison-data.js: sin errores.
- Todas las imágenes tienen `alt`; ninguna referencia de archivo está rota.

---

### Fuentes consultadas
- Comisiones TPV México: clip.mx, bbva.mx, banorte.com, banxico.org.mx, banamex.com (Tasa Cero MSI).
- Buenas prácticas de blog 2026: bdthemes.com, typeflo.io, proofdigital.com, koanthic.com.
