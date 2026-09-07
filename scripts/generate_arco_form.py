#!/usr/bin/env python3
"""Genera el Formulario Único para el ejercicio de Derechos ARCO — marca Kizuna.

Formato imprimible y llenable a mano, conforme a la LFPDPPP: identifica al
titular, acredita identidad, señala el derecho que se ejerce y el medio de
respuesta. Estructura basada en la práctica estándar del mercado mexicano.

Uso:  python3 scripts/generate_arco_form.py
Requiere: reportlab (pip install reportlab)
"""

from __future__ import annotations

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table, TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
WEB_DIR = ROOT / "assets" / "downloads"
OUTPUT = WEB_DIR / "formulario-derechos-arco-kizuna.pdf"

TINTA = colors.HexColor("#071D36")
AZUL = colors.HexColor("#0073E6")
AZUL_HONDO = colors.HexColor("#073F7D")
AMARILLO = colors.HexColor("#FFD23F")
LINEA = colors.HexColor("#DCE7F1")
GRIS = colors.HexColor("#5B6F84")
FONDO = colors.HexColor("#F7FBFF")

ANCHO = 160 * mm
CORREO = "contacto@solucionesdecobro.com"


def estilos() -> dict:
    return {
        "h1": ParagraphStyle("h1", fontName="Helvetica-Bold", fontSize=19, leading=23, textColor=TINTA),
        "sub": ParagraphStyle("sub", fontSize=10, leading=14, textColor=GRIS),
        "sec": ParagraphStyle("sec", fontName="Helvetica-Bold", fontSize=10, leading=13,
                              textColor=colors.white),
        "lbl": ParagraphStyle("lbl", fontName="Helvetica-Bold", fontSize=7.5, leading=10, textColor=AZUL),
        "txt": ParagraphStyle("txt", fontSize=8.8, leading=12.5, textColor=colors.HexColor("#42566A")),
        "mini": ParagraphStyle("mini", fontSize=7.6, leading=10.5, textColor=GRIS),
        "der": ParagraphStyle("der", fontSize=8.8, leading=12, textColor=colors.HexColor("#42566A")),
    }


def marca(canvas, doc):
    canvas.saveState()
    x, y = doc.leftMargin, A4[1] - 15 * mm
    canvas.setStrokeColor(AZUL); canvas.setLineWidth(2.2)
    canvas.roundRect(x, y, 9, 9, 3, stroke=1, fill=0)
    canvas.setStrokeColor(TINTA)
    canvas.roundRect(x + 5.5, y, 9, 9, 3, stroke=1, fill=0)
    canvas.setFont("Helvetica-Bold", 10.5); canvas.setFillColor(TINTA)
    canvas.drawString(x + 20, y + 1.5, "kizuna")
    canvas.setFont("Helvetica", 6.5); canvas.setFillColor(AZUL)
    canvas.drawString(x + 20, y - 6, "SOLUCIONES DE COBRO")
    canvas.setFont("Helvetica", 7.2); canvas.setFillColor(GRIS)
    canvas.drawRightString(A4[0] - doc.rightMargin, y + 1,
                           "Formulario Único de Derechos ARCO")
    canvas.drawString(doc.leftMargin, 11 * mm,
                      f"Envía este formulario y tu identificación a {CORREO}")
    canvas.drawRightString(A4[0] - doc.rightMargin, 11 * mm, f"Página {doc.page}")
    canvas.restoreState()


def banda(texto: str, st: dict) -> Table:
    t = Table([[Paragraph(texto, st["sec"])]], colWidths=[ANCHO])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), AZUL_HONDO),
        ("LEFTPADDING", (0, 0), (-1, -1), 10), ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return t


def campos(filas: list[list[tuple[str, float]]], st: dict) -> Table:
    """filas: lista de renglones; cada renglón es lista de (etiqueta, ancho_mm)."""
    data, estilo, r = [], [], 0
    for fila in filas:
        celdas, anchos = [], []
        for etiqueta, ancho in fila:
            celdas.append(Paragraph(etiqueta.upper(), st["lbl"]))
            anchos.append(ancho * mm)
        data.append(celdas)
        estilo += [("LINEBELOW", (c, r), (c, r), 0.7, LINEA) for c in range(len(celdas))]
        r += 1
    t = Table(data, colWidths=anchos, rowHeights=[13 * mm] * len(data))
    t.setStyle(TableStyle(estilo + [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 2), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 3), ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    return t


def construir() -> None:
    WEB_DIR.mkdir(parents=True, exist_ok=True)
    st = estilos()
    doc = BaseDocTemplate(str(OUTPUT), pagesize=A4,
                          leftMargin=25 * mm, rightMargin=25 * mm,
                          topMargin=24 * mm, bottomMargin=18 * mm,
                          title="Formulario Único de Derechos ARCO — Kizuna",
                          author="Kizuna")
    doc.addPageTemplates([PageTemplate(
        id="n", frames=[Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="f")],
        onPage=marca)])

    h = []
    h.append(Paragraph("Formulario Único para el ejercicio<br/>de Derechos ARCO", st["h1"]))
    h.append(Spacer(1, 6))
    h.append(Paragraph(
        "Con este formulario puedes solicitar el <b>Acceso</b>, <b>Rectificación</b>, "
        "<b>Cancelación</b> u <b>Oposición</b> al tratamiento de tus datos personales, así como "
        "<b>revocar tu consentimiento</b>, conforme a la Ley Federal de Protección de Datos "
        "Personales en Posesión de los Particulares. Llénalo con letra de molde, fírmalo y "
        f"envíalo junto con tu identificación oficial vigente a <b>{CORREO}</b>.", st["txt"]))
    h.append(Spacer(1, 12))

    # 1. Titular
    h.append(banda("1. Datos del titular de los datos personales", st))
    h.append(Spacer(1, 4))
    h.append(campos([
        [("Nombre(s)", 80), ("Apellido paterno", 40), ("Apellido materno", 40)],
        [("Correo electrónico para recibir la respuesta", 90), ("Teléfono de contacto", 70)],
        [("Domicilio (calle, número, colonia)", 105), ("C.P.", 20), ("Estado", 35)],
    ], st))
    h.append(Spacer(1, 10))

    # 2. Representante
    h.append(banda("2. Si actúas por medio de representante legal (opcional)", st))
    h.append(Spacer(1, 4))
    h.append(campos([
        [("Nombre completo del representante", 100), ("Teléfono", 60)],
    ], st))
    h.append(Paragraph(
        "Adjunta el documento que acredite la representación (carta poder simple firmada por dos "
        "testigos o poder notarial) e identificación oficial del representante.", st["mini"]))
    h.append(Spacer(1, 10))

    # 3. Derecho
    h.append(banda("3. Derecho que deseas ejercer (marca una o varias)", st))
    h.append(Spacer(1, 4))
    derechos = [
        ("Acceso", "Conocer qué datos personales tenemos sobre ti y cómo los usamos."),
        ("Rectificación", "Corregir datos inexactos, incompletos o desactualizados."),
        ("Cancelación", "Solicitar que eliminemos tus datos de nuestros registros."),
        ("Oposición", "Pedir que dejemos de usar tus datos para un fin específico."),
        ("Revocación del consentimiento", "Retirar el permiso que otorgaste para tratar tus datos."),
        ("Limitación de uso o divulgación", "Restringir el uso o la difusión de tus datos."),
    ]
    filas = [[Paragraph("☐", st["der"]), Paragraph(f"<b>{n}</b>", st["der"]),
              Paragraph(d, st["der"])] for n, d in derechos]
    t = Table(filas, colWidths=[8 * mm, 52 * mm, 100 * mm])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -2), 0.4, LINEA),
        ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LEFTPADDING", (0, 0), (-1, -1), 2),
    ]))
    h.append(t)
    h.append(Spacer(1, 10))

    # 4. Descripción
    h.append(banda("4. Describe tu solicitud", st))
    h.append(Spacer(1, 4))
    h.append(Paragraph(
        "Señala con claridad los datos personales sobre los que ejerces tu derecho. Si solicitas "
        "una rectificación, indica el dato correcto y adjunta el documento que lo compruebe.",
        st["mini"]))
    h.append(Spacer(1, 4))
    caja = Table([[""]], colWidths=[ANCHO], rowHeights=[42 * mm])
    caja.setStyle(TableStyle([("BOX", (0, 0), (-1, -1), 0.7, LINEA),
                              ("BACKGROUND", (0, 0), (-1, -1), FONDO)]))
    h.append(caja)
    h.append(Spacer(1, 10))

    # 5. Identificación
    h.append(banda("5. Documento con el que acreditas tu identidad", st))
    h.append(Spacer(1, 4))
    ident = [[Paragraph("☐ Credencial para votar (INE)", st["der"]),
              Paragraph("☐ Pasaporte", st["der"]),
              Paragraph("☐ Cédula profesional", st["der"])],
             [Paragraph("☐ Licencia de conducir", st["der"]),
              Paragraph("☐ Documento migratorio", st["der"]),
              Paragraph("☐ Otro: ______________", st["der"])]]
    ti = Table(ident, colWidths=[56 * mm, 52 * mm, 52 * mm])
    ti.setStyle(TableStyle([("TOPPADDING", (0, 0), (-1, -1), 5),
                            ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                            ("LEFTPADDING", (0, 0), (-1, -1), 2)]))
    h.append(ti)
    h.append(Paragraph(
        "<b>Adjunta copia legible de la identificación seleccionada.</b> Sin este documento no "
        "podemos acreditar tu identidad y la solicitud no podrá atenderse.", st["mini"]))
    h.append(Spacer(1, 12))

    # 6. Firma
    h.append(banda("6. Firma del titular o representante legal", st))
    h.append(Spacer(1, 14))
    firma = Table([["", ""], [Paragraph("Nombre y firma", st["mini"]),
                              Paragraph("Lugar y fecha", st["mini"])]],
                  colWidths=[95 * mm, 65 * mm], rowHeights=[16 * mm, 8 * mm])
    firma.setStyle(TableStyle([
        ("LINEBELOW", (0, 0), (0, 0), 0.7, TINTA),
        ("LINEBELOW", (1, 0), (1, 0), 0.7, TINTA),
        ("ALIGN", (0, 1), (-1, 1), "CENTER"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 14),
    ]))
    h.append(firma)
    h.append(Spacer(1, 12))

    # Qué sigue
    aviso = Table([[Paragraph(
        "<b>¿Qué sigue después de enviarlo?</b><br/>"
        f"1. Envía este formulario y tu identificación a <b>{CORREO}</b>.<br/>"
        "2. Te confirmaremos la recepción y podríamos pedirte información adicional si algo falta.<br/>"
        "3. Te comunicaremos la respuesta en un plazo máximo de <b>20 días hábiles</b>. Si procede, "
        "la haremos efectiva dentro de los <b>15 días hábiles</b> siguientes.<br/>"
        "4. El ejercicio de estos derechos es <b>gratuito</b>; solo podrían cobrarse gastos de envío "
        "o reproducción, si aplican.<br/><br/>"
        "Si consideras que tu derecho no fue atendido, puedes acudir al INAI (<b>inai.org.mx</b>).",
        st["mini"])]], colWidths=[ANCHO])
    aviso.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#FFF8E6")),
        ("BOX", (0, 0), (-1, -1), 0.6, AMARILLO),
        ("LEFTPADDING", (0, 0), (-1, -1), 12), ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 10), ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ]))
    h.append(aviso)

    doc.build(h)
    print(f"Formulario ARCO generado: {OUTPUT}")


if __name__ == "__main__":
    construir()
