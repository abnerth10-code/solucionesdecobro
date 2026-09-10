# Kizuna — Ideas guardadas

Cosas que valen la pena y todavía no se han hecho. Sin fecha, sin compromiso.

---

## 0. PENDIENTE INMEDIATO · reemplazar el carrusel del lunes 14 ⚠️

El carrusel de comisión (publicación 2, `02_lun-14-sep_carrusel-comision`) traía la tasa mala de Ualá en la diapositiva 5 y en el pie de foto. **Ya está regenerado en la carpeta**, pero si se programó con la versión anterior hay que reemplazarlo en Meta antes del 14 de septiembre.

Lo que cambió: "las tasas van de 1.39% a 6.33%" → "las tasas de entrada van de 2.99% a 6.33%".

---

## 1. Calculadora de costo real ✅ hecha el 9 de septiembre

**El problema que resuelve:** varios pies de foto prometen *"te lo saco con tus números"*, y hoy eso depende de que Abner haga la cuenta a mano. Una promesa que cuesta trabajo cumplir se termina incumpliendo.

**Qué sería:** una página en el sitio donde el negocio mete tres datos y obtiene el costo mensual de las opciones que sí puede contratar, ordenadas de menor a mayor.

**Entradas**
- Ventas al mes (total)
- Qué porcentaje se pagaría con tarjeta (por defecto 40%)
- ¿Tiene RFC? Sí / No

**Salida**
- Costo mensual de 4 o 5 opciones reales de `comparison-data.js`
- Cuál gana y por cuánto
- **El punto de cruce:** a partir de qué volumen le empieza a convenir pagar renta

**La fórmula, que es toda la lógica**

```
V      = ventas al mes × porcentaje con tarjeta
Costo  = (V × tasa × 1.16) + renta          ← el 1.16 es el IVA sobre la comisión
Cruce  = renta ÷ (tasa_alta − tasa_baja)    ← volumen a partir del cual conviene la renta
```

Si no hay RFC, se descartan las 13 opciones bancarias — la misma regla dura que ya usa el diagnóstico.

**Por qué vale la pena, más allá de cumplir la promesa**
- Tapa el hueco de precios que salió en la retro del sitio: hoy no aparece un solo peso en toda la página
- Abner la usa en vivo mientras habla por WhatsApp: mete los datos, toma captura, la manda
- **Grabarla en uso es un Reel completo**, sin cámara y sin salir en pantalla
- Alimenta el diagnóstico: quien la usa ya está a un paso de escribir

**Costo estimado:** media hora. Usa los datos que ya existen, no hay que investigar nada.

**Método manual mientras tanto** — tres preguntas por WhatsApp:
1. ¿Cuánto vendes al mes, más o menos?
2. ¿Qué parte te pagarían con tarjeta? (si no sabe, 40%)
3. ¿Tienes RFC activo?

Y se corre la fórmula de arriba con tres opciones. Funciona en papel.

---

## 2. Reemplazar el render de IA del sitio

La foto de las tres terminales en `assets/hero/catalogo-terminales.webp` es generada y se nota: las sombras no coinciden entre los equipos. La foto real de las tres Point encendidas sobre un mostrador resuelve esto y sirve también para redes.

---

## 3. Prueba social en el sitio

El hueco más grande del home. Dos o tres testimonios con nombre de negocio y ciudad. Ya existe el material fotográfico de la boutique Mini-me; falta el permiso y la frase de la dueña.

---

## 4. Registro de marca

Consultar a un agente de propiedad industrial. El caso ya está armado: marca mixta "Kizuna Soluciones de Cobro" en **clase 35** (comparación de precios, venta al menudeo), no en la 36 donde vive el registro 2503072 de Kizuna Consulting — que está vigente y con despacho activo cuidándolo.

Pregunta concreta para el agente: ¿conviene registrar el conjunto completo con descriptor, o la mixta con "Kizuna" dominante y el descriptor en tamaño secundario para poder cambiarlo después?

---

## 5. Google Search Console

Dar de alta kizunapay.com, mandar el sitemap y hacer el cambio de dirección desde solucionesdecobro.com para no perder el historial.
