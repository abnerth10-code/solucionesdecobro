# Conectar kizunapay.com — guía paso a paso

> **Regla de oro:** primero se configura el DNS, se espera a que propague, y **hasta el final** se cambia el archivo `CNAME`. Si lo haces al revés, `solucionesdecobro.com` deja de funcionar y el sitio queda caído hasta que el DNS resuelva.

---

## Estado actual

- El archivo `CNAME` del repositorio sigue diciendo **`solucionesdecobro.com`** — a propósito, para que el sitio siga en línea mientras preparas el cambio.
- El sitio ya está rediseñado con la marca Kizuna y **funciona en cualquier dominio** (todas las rutas son relativas).
- `sitemap.xml`, `robots.txt`, los canonical y las etiquetas Open Graph **ya apuntan a kizunapay.com**, listos para cuando hagas el cambio.

---

## Paso 1 · Publica el rediseño en el dominio actual

Antes de mover el dominio, sube los cambios con GitHub Desktop y verifica que todo funcione en `solucionesdecobro.com`:

- [ ] El diagnóstico avanza, calcula y muestra resultado.
- [ ] La matriz de Compara carga los 34 proveedores y los filtros responden.
- [ ] Se ven las tres terminales con su foto correcta.
- [ ] Los dos artículos del blog abren bien.
- [ ] Se descargan los dos PDF (matriz y formulario ARCO).

Si algo falla, se corrige aquí — no cuando ya movimos el dominio.

---

## Paso 2 · Configura el DNS en Spaceship

Entra a tu dominio `kizunapay.com` en Spaceship → **Advanced DNS** (o *DNS Records*) y agrega:

**Cuatro registros A** (apuntan el dominio raíz a GitHub Pages):

| Tipo | Host | Valor | TTL |
|---|---|---|---|
| A | @ | `185.199.108.153` | Automático |
| A | @ | `185.199.109.153` | Automático |
| A | @ | `185.199.110.153` | Automático |
| A | @ | `185.199.111.153` | Automático |

**Un registro CNAME** (para la versión con www):

| Tipo | Host | Valor | TTL |
|---|---|---|---|
| CNAME | www | `abnerth10-code.github.io.` | Automático |

> Si Spaceship trae registros de estacionamiento (*parking*) o un redirect por defecto, **bórralos** antes de guardar: chocan con los de arriba.

**Espera la propagación.** Suele tardar de 15 minutos a 2 horas. Puedes comprobarlo entrando a `dnschecker.org` y buscando `kizunapay.com` con tipo A: cuando veas las cuatro IP de GitHub en la mayoría de los servidores, ya está.

---

## Paso 3 · Cambia el dominio en el repositorio

Cuando el DNS ya propagó:

1. Abre el archivo **`CNAME`** (está en la raíz del proyecto) y reemplaza su contenido por:
   ```
   kizunapay.com
   ```
2. Guarda, haz commit en GitHub Desktop y publica.
3. Entra a GitHub → tu repositorio → **Settings → Pages** y confirma que en *Custom domain* aparece `kizunapay.com`.
4. Marca la casilla **Enforce HTTPS**. Puede tardar unos minutos en habilitarse mientras GitHub emite el certificado.

---

## Paso 4 · No pierdas el posicionamiento del dominio viejo

`solucionesdecobro.com` ya tiene historial en Google. Para no perderlo, **redirígelo** al nuevo en lugar de abandonarlo:

- En el registrador donde tengas `solucionesdecobro.com`, configura un **redirect 301 (permanente)** de `solucionesdecobro.com` hacia `https://kizunapay.com`.
- Mantén el dominio viejo **renovado al menos un año más**. Es barato y protege tu tráfico.
- En [Google Search Console](https://search.google.com/search-console): da de alta `kizunapay.com`, verifica la propiedad y usa la herramienta de **Cambio de dirección** desde el dominio viejo al nuevo.
- Envía el nuevo `sitemap.xml`: `https://kizunapay.com/sitemap.xml`.

---

## Paso 5 · Después del cambio

- [ ] Actualiza el enlace de tu **bio de Instagram y Facebook**.
- [ ] Actualiza el correo de contacto si migras a `contacto@kizunapay.com` (habría que ajustarlo en `privacidad.html` y en el formulario ARCO).
- [ ] Revisa que Google Analytics siga registrando visitas con el dominio nuevo.
- [ ] Aparta los handles de redes con el nombre Kizuna, si aún no lo hiciste.

---

## Notas técnicas

- **`legacy/`** guarda una copia del sitio anterior por si necesitas consultar algo. Está bloqueado en `robots.txt` para que Google no lo indexe. Cuando ya no lo necesites, se puede borrar.
- El correo `contacto@solucionesdecobro.com` seguirá funcionando mientras conserves ese dominio y su servicio de correo.
- Si algo sale mal en el Paso 3, revertir es simple: regresa el archivo `CNAME` a `solucionesdecobro.com` y publica.
