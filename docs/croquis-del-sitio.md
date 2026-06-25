# Croquis del sitio: Soluciones de Cobro

Este documento sirve como guía para mantener coherencia visual, de contenido y navegación cuando la página siga creciendo.

## Objetivo del sitio

Ayudar a negocios a elegir, comparar y comprar soluciones de cobro con lenguaje claro. La primera línea comercial es la venta de terminales de Mercado Pago mediante link de referido; el sitio debe crecer hacia comparativas de bancos, agregadores, modelos híbridos, links de pago, pasarelas y contenidos educativos.

## Personalidad visual

- Profesional, cercana y clara.
- Inspiración: diseño financiero moderno, tarjetas limpias, imágenes reales de comercios, fondos claros con acentos azul, amarillo y verde.
- La página debe sentirse luminosa: blancos, azul muy claro, crema suave y sombras limpias.
- El azul institucional se usa como acento de confianza y acción, no como fondo dominante.
- Evitar que parezca plantilla genérica: usar imágenes propias o generadas con intención, textos concretos y secciones bien respiradas.
- En móvil, prioridad absoluta: lectura rápida, botones grandes, pocas distracciones y navegación compacta.

## Paleta base

La marca sí vive en azul, pero el sitio no debe sentirse completamente azul. La regla es: fondo claro, azul dosificado y amarillo/verde como acentos funcionales.

- Azul institucional / tinta: `#071d36`
- Azul acción: `#0073e6`
- Azul acción oscuro: `#0058ba`
- Azul claro fintech: `#19aeea`
- Fondo principal: `#f7fbff`
- Blanco papel: `#ffffff`
- Crema suave: `#fff8e6`
- Crema cálida: `#fffdf6`
- Línea suave: `#dce7f1`
- Texto secundario: `#53687f`
- Amarillo acento: `#ffd23f`
- Verde confianza / WhatsApp: `#18a058`

Uso recomendado:

- Fondos de secciones: blanco, azul casi blanco o crema suave.
- Botones principales: azul acción.
- Avisos, métricas o detalles: amarillo acento.
- Acciones de WhatsApp o confirmación: verde.
- Evitar bloques grandes en azul fuerte salvo casos muy puntuales.

## Estructura actual

### Inicio (`index.html`)

Función: presentar la marca, explicar el valor de aceptar tarjeta, orientar al usuario y llevarlo a comprar, pedir asesoría o hacer diagnóstico.

Secciones:

1. Encabezado
   - Logo compacto: isotipo `assets/logos/logo-isotipo-soluciones-cobro.png` junto al nombre escrito de la marca.
   - Evitar repetir el logotipo completo y luego el mismo texto en grande.
   - Menú: Inicio, Terminales, Diagnóstico, Compara, Blog.
   - Botón principal: Comprar terminal.
   - Redes visibles en móvil junto al botón.
   - En móvil, al empezar a bajar la página, se ocultan marca y menú; queda solo la barra de acción con comprar terminal y redes.

2. Hero principal
   - Mensaje principal: `Acepta tarjetas sin complicarte.`
   - CTA: Pedir asesoría y Hacer diagnóstico.
   - En móvil, no duplicar el botón de compra dentro del hero porque ya queda fijo en la barra superior compacta.
   - Imagen real de negocio/terminal.
   - Recuadro: `Elección inteligente...`

3. Impacto de aceptar tarjeta
   - Analogía de la playa y el océano de clientes potenciales.
   - Métrica orientativa: 20% a 35% de incremento potencial, tratada como rango informativo.

4. Soluciones para crecer
   - Cuatro tarjetas visuales: equipo adecuado, información clara, comparación real y escala tu negocio.

5. Asesoría
   - Explica por qué una terminal no es solo un aparato.
   - Refuerza decisión con datos y acompañamiento personalizado.

6. Diagnóstico
   - Preguntas por tarjetas.
   - Barra de avance visible.
   - Resultado automático.
   - Si recomienda terminal moderna: manda a link de compra.
   - Si recomienda híbrido o banca: manda a comparativa.

7. Medios de pago
   - Logos de medios aceptados por la mayoría de terminales.
   - Debe ser visual, breve y confiable.

8. Preguntas frecuentes
   - Información general sobre soluciones de cobro.

9. Cierre / contacto
   - CTA de compra y comparativa.
   - Redes y WhatsApp.
   - Aviso legal de marcas.
   - Esta parte debe ser clara y suave, no un bloque oscuro que rompa la estética.

### Terminales (`terminales.html`)

Función: vender los modelos disponibles y explicar diferencias.

Debe tener:

- Hero orientado a terminales.
- Catálogo de Point Smart 2, Point Air y Point Mini.
- Preguntas frecuentes específicas de terminales.
- Botones de compra claros.
- Usar imágenes limpias de producto sin fondos blancos pesados.

### Compara (`compara.html`)

Función: ayudar a decidir entre opciones rápidas, híbridas y bancarias.

Debe tener:

- Lectura rápida con categorías: opciones rápidas, híbridas y banca tradicional.
- Matriz comparativa con logos y links oficiales.
- Orden sugerido: opciones rápidas, híbridas, bancos.
- Links a páginas específicas de TPV cuando existan.
- Lenguaje simple para explicar tasas, requisitos, depósito, renta, contrato y soporte.

### Blog (`blog.html` y entradas)

Función: educar, atraer tráfico orgánico y resolver dudas comunes.

Reglas:

- Cada entrada debe complementar sus imágenes, no repetir lo mismo.
- Títulos claros y buscables.
- Incluir llamados a diagnóstico, comparativa o compra cuando tenga sentido.
- Evitar textos largos sin estructura.

### Privacidad (`privacidad.html`)

Función: informar de forma clara sobre datos, cookies, Analytics y canales de contacto.

Reglas:

- El encabezado no debe ser fijo o persistente; en esta página la lectura legal importa más que la conversión.
- El contacto formal de privacidad debe ser `contacto@solucionesdecobro.com`.
- El aviso de cookies debe sonar amable: aceptar ayuda a mejorar la página, pero el usuario puede seguir solo con cookies necesarias.

## Comportamiento móvil

- El header inicial debe ser compacto: isotipo pequeño, texto de marca legible, menú en una línea desplazable si hace falta, botón y redes alineados.
- Al bajar desde el primer desplazamiento, el header se compacta y oculta marca y menú.
- La barra compacta mantiene solo acción principal y redes.
- El botón flotante para regresar al inicio debe ser visible, moderno y no competir con el botón de compra.
- Cuidar que Safari móvil no tape botones importantes con la barra inferior del navegador.

## Diagnóstico: matriz de decisión

La recomendación se basa en estas variables:

- Formalidad fiscal.
- Volumen mensual esperado.
- Estabilidad de ventas.
- Urgencia para recibir dinero.
- Margen por venta.
- Necesidad de meses sin intereses.
- Lugar o forma de cobro.
- Preferencia entre requisitos simples o mejores condiciones con más trámites.

Resultados posibles:

1. Terminal moderna
   - Para empezar rápido, vender con movilidad, operar con menos requisitos o cobrar en redes.
   - Recomendación comercial inicial: Smartpoint 2, luego Clip y NetPay.

2. Modelo híbrido
   - Para negocios en crecimiento que quieren más estructura sin ir directo a banca tradicional.
   - Ejemplos: Getnet, Konfío u opciones similares.

3. TPV bancaria
   - Para negocios con RFC, cuenta, ventas constantes y foco en negociar condiciones.
   - Ejemplos: BBVA, Banorte, Citibanamex.

## Reglas de diseño para futuras versiones

- No saturar el inicio con todo el catálogo; las terminales viven en su propia sección.
- Mantener los botones principales visibles y grandes en móvil.
- No usar texto decorativo que no aporte decisión.
- Cada sección debe responder: qué es, para quién sirve, qué hago ahora.
- Antes de agregar una imagen, confirmar que tenga propósito: confianza, claridad, producto, comparación o acción.
- Los logos de marcas se usan con fines informativos y deben acompañarse del aviso legal.
- Si una sección se siente demasiado pesada, primero intentar resolver con más aire, fondo claro y jerarquía antes de agregar más color.
