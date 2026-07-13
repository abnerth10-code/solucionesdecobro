# Bitacora y ruta de trabajo

Actualizado: 2026-07-13

## Fuente unica

- Repositorio local: `/Users/abnr/Documents/GitHub/solucionesdecobro`
- Remoto: `abnerth10-code/solucionesdecobro`
- Rama: `main`
- Publicacion: GitHub Pages con dominio `solucionesdecobro.com`

## Estructura actual

- `index.html`: pagina principal y diagnostico.
- `terminales.html`: catalogo de terminales.
- `compara.html`: matriz y enlaces comparativos.
- `blog.html`: listado del blog.
- `privacidad.html`: aviso de privacidad.
- `styles.css`: estilos compartidos.
- `site.js`: interacciones compartidas y diagnostico.
- `assets/hero/`: imagenes principales de secciones.
- `assets/logos/`: isotipo, redes y medios de pago.
- `docs/croquis-del-sitio.md`: mapa y criterios visuales.
- `docs/bitacora-y-ruta.md`: registro de decisiones y cambios.

## Diagnostico de trabajo

El proyecto no necesita reiniciarse ni abrir otro chat. La repeticion se produjo por alternar entre GitHub en linea, archivos temporales del chat y la copia local, sin una fuente unica de trabajo ni una bitacora corta.

Desde ahora, la fuente de verdad es la copia local. GitHub Desktop sera el unico puente para revisar cambios, hacer commit y publicar. GitHub en linea se usara solo para confirmar el resultado publicado o revisar el historial.

## Flujo acordado

1. Abrir `/Users/abnr/Documents/GitHub/solucionesdecobro` en VS Code.
2. Colocar imagenes nuevas dentro de la carpeta local correspondiente, por ejemplo `assets/hero/` o `assets/logos/`.
3. Hacer una ronda acotada de cambios en los archivos necesarios.
4. Verificar nombres, rutas, imagenes y vista movil antes de publicar.
5. Abrir GitHub Desktop, revisar la lista de cambios, escribir un resumen y hacer commit a `main`.
6. Pulsar `Push origin` y esperar el despliegue de GitHub Pages.
7. Confirmar `https://solucionesdecobro.com` y revisar la version publicada.

## Proxima ronda aprobada: escritorio

1. Ajustar el encabezado para que el nombre y el menu no choquen.
2. Aumentar ligeramente el hero y conservar el azul solido atractivo del titulo.
3. Dar prioridad a `Compara` y `Diagnostico`; dejar la compra como llamada secundaria.
4. Alinear las dos tarjetas de introduccion y llevar el degradado suave al fondo de la seccion de crecimiento.
5. Unificar las cuatro tarjetas con el estilo visual de las tarjetas 2 y 4.
6. Revisar la imagen de asesoria en `assets/hero/asesoria-personalizada.png`.
7. Verificar que no queden imagenes corruptas o rutas antiguas.

## Criterios de cierre

- Ninguna imagen requerida puede tener 0 o 2 bytes.
- Todas las rutas deben funcionar desde GitHub Pages y desde el dominio propio.
- La cabecera debe ser legible en escritorio y movil.
- Cada ronda debe terminar con un diff verificable, un commit y una URL comprobada.
- No se inicia otra ronda hasta que la anterior este publicada y revisada.
