#!/usr/bin/env python3
"""
Genera los carruseles de Instagram de Kizuna en 1080x1350 (formato 4:5).

Todo se dibuja en SVG y se rasteriza con cairosvg, en los colores y tipografias
de la marca. Los datos numericos salen de comparison-data.js, no se inventan.

    python3 scripts/generar_carruseles.py

Salida: assets/marca-kizuna/carruseles/<slug>/01.png, 02.png, ...
"""
import os, textwrap, html
import cairosvg

W, H = 1080, 1350
TINTA, AZUL, CIELO, AMAR, VERDE = '#071d36', '#0073e6', '#4aa3ff', '#ffd23f', '#18a058'
FONDO, LINEA, GRIS = '#f7fbff', '#dbe8f5', '#5b6f84'
DISPLAY, SERIF = 'Poppins', 'Lora'
RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
SALIDA = os.path.join(RAIZ, 'assets', 'marca-kizuna', 'carruseles')


def e(t):
    return html.escape(str(t), quote=False)


def isotipo(x, y, tam, c1, c2, trazo=None):
    lado = tam
    t = trazo or max(6, round(tam * 0.23))
    r = round(lado * 0.32)
    d = round(lado * 0.64)
    return (f'<g fill="none" stroke-width="{t}" stroke-linejoin="round">'
            f'<rect x="{x}" y="{y}" width="{lado}" height="{lado}" rx="{r}" stroke="{c1}"/>'
            f'<rect x="{x+d}" y="{y}" width="{lado}" height="{lado}" rx="{r}" stroke="{c2}"/></g>')


def envolver(texto, ancho):
    return textwrap.wrap(texto, width=ancho)


def lineas(texto, x, y, tam, color, ancho, interlinea=1.18, peso=700,
           familia=DISPLAY, anchor='start', italica=False):
    """Texto multilinea. Devuelve (svg, y_final)."""
    fs = 'font-style="italic"' if italica else ''
    out, yy = [], y
    for ln in envolver(texto, ancho):
        out.append(f'<text x="{x}" y="{yy:.0f}" text-anchor="{anchor}" font-family="{familia}" '
                   f'font-size="{tam}" font-weight="{peso}" fill="{color}" {fs}>{e(ln)}</text>')
        yy += tam * interlinea
    return ''.join(out), yy - tam * interlinea


def pie(oscuro=False, indice=None, total=None):
    """Firma inferior: isotipo, dominio y contador de diapositiva."""
    c1 = CIELO if oscuro else AZUL
    c2 = '#ffffff' if oscuro else TINTA
    ctxt = '#7fb8ee' if oscuro else GRIS
    s = isotipo(72, H - 132, 34, c1, c2, 9)
    s += (f'<text x="176" y="{H-102}" font-family="{DISPLAY}" font-size="24" font-weight="600" '
          f'fill="{ctxt}" letter-spacing="2">KIZUNAPAY.COM</text>')
    if indice and total:
        s += (f'<text x="{W-72}" y="{H-102}" text-anchor="end" font-family="{DISPLAY}" '
              f'font-size="24" font-weight="600" fill="{ctxt}">{indice}/{total}</text>')
    return s


def lienzo(cuerpo, oscuro=False, indice=None, total=None):
    if oscuro:
        fondo = (f'<defs><linearGradient id="g" x1="0" y1="0" x2="0.3" y2="1">'
                 f'<stop offset="0" stop-color="{TINTA}"/><stop offset="1" stop-color="#0a3160"/>'
                 f'</linearGradient><radialGradient id="sol" cx="84%" cy="10%" r="46%">'
                 f'<stop offset="0" stop-color="{AMAR}" stop-opacity=".22"/>'
                 f'<stop offset="60%" stop-color="{AMAR}" stop-opacity=".04"/>'
                 f'<stop offset="100%" stop-color="{AMAR}" stop-opacity="0"/></radialGradient></defs>'
                 f'<rect width="{W}" height="{H}" fill="url(#g)"/>'
                 f'<rect width="{W}" height="{H}" fill="url(#sol)"/>')
    else:
        fondo = f'<rect width="{W}" height="{H}" fill="{FONDO}"/>'
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}">'
            f'{fondo}{cuerpo}{pie(oscuro, indice, total)}</svg>')


# ---------------------------------------------------------------- plantillas

def portada(kicker, titulo, sub=None, total=None):
    s = (f'<text x="72" y="250" font-family="{DISPLAY}" font-size="26" font-weight="600" '
         f'fill="{CIELO}" letter-spacing="5">{e(kicker.upper())}</text>')
    b, yfin = lineas(titulo, 72, 380, 82, '#ffffff', 20, 1.16)
    s += b
    if sub:
        b2, _ = lineas(sub, 72, yfin + 110, 36, '#b9d4f2', 40, 1.35, peso=400)
        s += b2
    # Flecha dibujada, no como caracter: Poppins no trae el glifo y sale un cuadro.
    s += (f'<g transform="translate(72,{H-250})"><rect width="230" height="6" rx="3" fill="{AMAR}"/></g>'
          f'<text x="72" y="{H-190}" font-family="{DISPLAY}" font-size="27" font-weight="600" '
          f'fill="{AMAR}">Desliza</text>'
          f'<g stroke="{AMAR}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none">'
          f'<line x1="196" y1="{H-199}" x2="232" y2="{H-199}"/>'
          f'<polyline points="220,{H-211} 232,{H-199} 220,{H-187}"/></g>')
    return lienzo(s, oscuro=True, indice=1, total=total)


def dato(titulo, numero, apoyo, indice, total, color=AZUL):
    b, yfin = lineas(titulo, 72, 220, 46, TINTA, 26, 1.22)
    s = b
    s += (f'<text x="72" y="{yfin+230:.0f}" font-family="{DISPLAY}" font-size="200" '
          f'font-weight="700" fill="{color}">{e(numero)}</text>')
    b2, _ = lineas(apoyo, 72, yfin + 330, 38, GRIS, 38, 1.4, peso=400)
    s += b2
    return lienzo(s, indice=indice, total=total)


def lista(titulo, filas, indice, total, marca='✓', color=VERDE):
    b, yfin = lineas(titulo, 72, 200, 52, TINTA, 24, 1.2)
    s = b
    y = yfin + 130
    for txt in filas:
        s += (f'<circle cx="94" cy="{y-16}" r="24" fill="{color}"/>'
              f'<text x="94" y="{y-6}" text-anchor="middle" font-family="{DISPLAY}" '
              f'font-size="26" font-weight="700" fill="#ffffff">{e(marca)}</text>')
        b2, y2 = lineas(txt, 146, y, 36, '#3f5468', 33, 1.3, peso=500)
        s += b2
        y = y2 + 84
    return lienzo(s, indice=indice, total=total)


def tabla(titulo, encabezados, filas, indice, total):
    b, yfin = lineas(titulo, 72, 200, 50, TINTA, 25, 1.2)
    s = b
    y = yfin + 120
    cols = [72, 560, 830]
    for i, h in enumerate(encabezados):
        s += (f'<text x="{cols[i]}" y="{y}" font-family="{DISPLAY}" font-size="24" '
              f'font-weight="600" fill="{AZUL}" letter-spacing="2">{e(h.upper())}</text>')
    y += 26
    s += f'<line x1="72" y1="{y}" x2="{W-72}" y2="{y}" stroke="{LINEA}" stroke-width="3"/>'
    y += 74
    for fila in filas:
        for i, celda in enumerate(fila):
            peso = 600 if i == 0 else 700
            col = TINTA if i == 0 else AZUL
            tam = 34 if i == 0 else 40
            s += (f'<text x="{cols[i]}" y="{y}" font-family="{DISPLAY}" font-size="{tam}" '
                  f'font-weight="{peso}" fill="{col}">{e(celda)}</text>')
        y += 30
        s += f'<line x1="72" y1="{y}" x2="{W-72}" y2="{y}" stroke="{LINEA}" stroke-width="2"/>'
        y += 76
    return lienzo(s, indice=indice, total=total)


def cierre(titulo, cuerpo, boton, indice, total):
    b, yfin = lineas(titulo, 72, 300, 68, '#ffffff', 22, 1.18)
    s = b
    b2, y2 = lineas(cuerpo, 72, yfin + 120, 38, '#b9d4f2', 38, 1.4, peso=400)
    s += b2
    s += (f'<rect x="72" y="{y2+80:.0f}" width="620" height="112" rx="24" fill="{AZUL}"/>'
          f'<text x="382" y="{y2+152:.0f}" text-anchor="middle" font-family="{DISPLAY}" '
          f'font-size="36" font-weight="700" fill="#ffffff">{e(boton)}</text>')
    return lienzo(s, oscuro=True, indice=indice, total=total)


def frase(texto_a, resaltado, texto_b, indice, total):
    s = (f'<text x="{W/2}" y="560" text-anchor="middle" font-family="{SERIF}" font-style="italic" '
         f'font-size="72" fill="#eaf3fd">{e(texto_a)}</text>'
         f'<text x="{W/2}" y="670" text-anchor="middle" font-family="{SERIF}" font-style="italic" '
         f'font-size="72" font-weight="600" fill="{CIELO}">{e(resaltado)}</text>'
         f'<text x="{W/2}" y="780" text-anchor="middle" font-family="{SERIF}" font-style="italic" '
         f'font-size="72" fill="#eaf3fd">{e(texto_b)}</text>')
    return lienzo(s, oscuro=True, indice=indice, total=total)


# ---------------------------------------------------------------- carruseles

def carrusel_comision():
    n = 6
    return [
        portada('Educar', 'Qué significa de verdad 3.5% + IVA.',
                'Te lo desgloso con una venta de $1,000.', total=n),
        dato('En una venta de $1,000, la comisión del 3.5% es:', '$35',
             'Pero ahí no termina la cuenta. Falta el IVA.', 2, n),
        dato('El IVA se cobra sobre la comisión, no sobre la venta:', '$5.60',
             '16% de $35. Es el error más común al calcular.', 3, n, color=AMAR),
        dato('Lo que realmente te llega a la cuenta:', '$959.40',
             'De cada $1,000 que cobras con tarjeta.', 4, n, color=VERDE),
        dato('Si vendes 100 veces al mes, te quedas sin:', '$4,060',
             'Al año son $48,720. Por eso medio punto de diferencia sí importa.', 5, n),
        cierre('¿Estás pagando de más?',
               'Comparé 34 opciones en México. Las tasas van de 1.39% a 6.33% más IVA. '
               'Te digo cuál le conviene a tu negocio, gratis.',
               'Escríbeme por WhatsApp', 6, n),
    ]


def carrusel_rfc():
    n = 6
    return [
        portada('Desmitificar', '¿Necesito RFC para tener terminal?',
                'La respuesta corta: depende de cuál.', total=n),
        lista('Para una terminal bancaria, sí. Y piden más:',
              ['RFC y alta fiscal vigente',
               'Cuenta empresarial en ese banco',
               'e.firma, en varios casos',
               'Comprobante de domicilio del negocio',
               'Evaluación comercial que puedes no pasar'],
              2, n, marca='✕', color='#d64545'),
        lista('Con una terminal de cobro rápido, arrancas con:',
              ['Identificación oficial',
               'Una cuenta a tu nombre',
               'Validación de tu perfil'],
              3, n),
        dato('De las 34 opciones que comparo, las bancarias son:', '13',
             'Trece opciones que quedan fuera si no tienes RFC. Recomendártelas sería hacerte perder el tiempo.',
             4, n),
        frase('La flexibilidad', 'se paga', 'con comisión.', 5, n),
        cierre('Mi diagnóstico ya lo considera.',
               'Si me dices que no tienes RFC, descarto solo las opciones que no vas a poder contratar. '
               'Nueve preguntas, dos minutos, sin registro.',
               'Hazlo gratis', 6, n),
    ]


def carrusel_deposito():
    n = 5
    return [
        portada('Educar', '¿Cuándo llega tu dinero?',
                'Este dato pesa más que medio punto de comisión.', total=n),
        tabla('El tiempo cambia mucho entre opciones:',
              ['Tipo', '', 'Depósito'],
              [['Solo dos de las 34', '', 'Mismo día'],
               ['Resto de cobro rápido', '', '24 h'],
               ['Banca (TPV)', '', '24-48 h'],
               ['Pasarela', '', '48-72 h']],
              2, n),
        lista('Y ojo con la letra chiquita:',
              ['"24 horas" casi siempre significa 24 horas hábiles',
               'Sábado y domingo no cuentan',
               'Un cobro del viernes puede caer hasta el lunes',
               'Varios cobran extra por adelantar el depósito'],
              3, n, marca='!', color=AMAR),
        frase('Si compras insumos', 'a diario,', 'esto define tu semana.', 4, n),
        cierre('¿Cuál te conviene a ti?',
               'Depende de qué tan rápido rota tu dinero. Te ayudo a verlo con números, sin costo.',
               'Escríbeme por WhatsApp', 5, n),
    ]


def carrusel_costo_real():
    """Escenario: $36,000 al mes cobrados con tarjeta.
       3.5% sin renta      = 1,260
       2.5% + renta $500   =   900 + 500 = 1,400
       1.9% + renta $900   =   684 + 900 = 1,584
       Punto de cruce 3.5% vs 2.5%+500 -> 0.01V = 500 -> V = $50,000
    """
    n = 7
    return [
        portada('Comparar', 'La tasa más baja no siempre es la más barata.',
                'Mismo negocio, tres opciones, tres resultados.', total=n),
        dato('Este negocio cobra con tarjeta al mes:', '$36,000',
             'Una tienda de barrio. Es el número sobre el que se calcula todo.', 2, n),
        tabla('Tres rutas para el mismo negocio:',
              ['Opción', '', 'Al mes'],
              [['Tasa 3.5%, sin renta', '', '$1,260'],
               ['Tasa 2.5% + renta $500', '', '$1,400'],
               ['Tasa 1.9% + renta $900', '', '$1,584']],
              3, n),
        dato('Gana la de la tasa MÁS ALTA, por:', '$324',
             'Al mes. $3,888 al año. Con este volumen la renta pesa más que la tasa.',
             4, n, color=VERDE),
        dato('La renta empieza a convenir arriba de:', '$50,000',
             'Cobrados con tarjeta al mes. Abajo de eso, la renta se come el ahorro de la tasa.',
             5, n, color=AMAR),
        lista('Lo que también cambia el resultado:',
              ['Si tus clientes pagan débito o crédito',
               'Cuándo necesitas el dinero disponible',
               'Si hay contrato forzoso o penalización',
               'Los meses sin intereses que ofrezcas'],
              6, n),
        cierre('Los números son de tu negocio.',
               'No hay una opción mejor para todos. Hago este ejercicio contigo, con tus ventas reales.',
               'Escríbeme por WhatsApp', 7, n),
    ]


CARRUSELES = {
    'comision-real': carrusel_comision,
    'sin-rfc': carrusel_rfc,
    'cuando-llega-tu-dinero': carrusel_deposito,
    'costo-real': carrusel_costo_real,
}


def main():
    for slug, fn in CARRUSELES.items():
        carpeta = os.path.join(SALIDA, slug)
        os.makedirs(carpeta, exist_ok=True)
        svgs = fn()
        for i, svg in enumerate(svgs, 1):
            ruta = os.path.join(carpeta, f'{i:02d}.png')
            cairosvg.svg2png(bytestring=svg.encode(), write_to=ruta,
                             output_width=W, output_height=H)
        print(f'{slug:26s} {len(svgs)} diapositivas')


if __name__ == '__main__':
    main()
