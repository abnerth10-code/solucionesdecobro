#!/usr/bin/env python3
"""Genera el PDF descargable de la matriz comparativa — marca Kizuna.

Rediseño 2026: portada con la marca, guía de lectura, una ficha por proveedor
agrupada por categoría (en vez de una tabla apretada) y aviso legal al final.
El objetivo es que se entienda leyéndolo, no que quepa todo en una hoja.

Uso:  python3 scripts/generate_matrix_pdf.py
Requiere: reportlab (pip install reportlab) y node en el PATH.
"""

from __future__ import annotations

import json
import shutil
import subprocess
from datetime import date
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate, Frame, KeepTogether, NextPageTemplate, PageBreak,
    PageTemplate, Paragraph, Spacer, Table, TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "comparison-data.js"
OUTPUT_DIR = ROOT / "output" / "pdf"
WEB_DIR = ROOT / "assets" / "downloads"
OUTPUT = OUTPUT_DIR / "matriz-comparativa-soluciones-de-cobro-mexico.pdf"
WEB_OUTPUT = WEB_DIR / OUTPUT.name

# Paleta Kizuna
TINTA = colors.HexColor("#071D36")
AZUL = colors.HexColor("#0073E6")
AZUL_HONDO = colors.HexColor("#073F7D")
AMARILLO = colors.HexColor("#FFD23F")
VERDE = colors.HexColor("#18A058")
LINEA = colors.HexColor("#DCE7F1")
GRIS = colors.HexColor("#5B6F84")
FONDO = colors.HexColor("#F7FBFF")

CATEGORIAS = [
    ("rapida", "Cobro rápido", "Terminal o app ligera, sin trámites pesados. Activas y cobras en poco tiempo."),
    ("hibrida", "Modelo híbrido", "Suma funciones de negocio (inventario, reportes) a un cobro sencillo."),
    ("adquirente", "Adquirentes", "Procesan pagos a nombre del negocio, con condiciones negociables."),
    ("banca", "Banca tradicional", "TPV de un banco. Más trámite, pero permite negociar condiciones."),
    ("pasarela", "Pasarela digital", "Para cobrar en línea sin equipo físico: tienda, app o link de pago."),
    ("bnpl", "Compra ahora, paga después", "Tu cliente paga a plazos y tú recibes el total, menos comisión."),
]

CAMPOS = [
    ("cost", "Tasa o costo de referencia"),
    ("hardware", "Equipo"),
    ("requirements", "Requisitos"),
    ("settlement", "Cuándo recibes el dinero"),
    ("review", "Revisa antes de contratar"),
]


# ---------------------------------------------------------------- datos
def cargar_proveedores() -> list[dict]:
    """Evalúa comparison-data.js con node y devuelve la lista de proveedores."""
    js = (
        f"const fs=require('fs');const window={{}};"
        f"eval(fs.readFileSync({json.dumps(str(SOURCE))},'utf8'));"
        f"process.stdout.write(JSON.stringify(window.COMPARISON_PROVIDERS));"
    )
    out = subprocess.run(["node", "-e", js], capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


# ---------------------------------------------------------------- estilos
def estilos() -> dict:
    base = dict(fontName="Helvetica", textColor=TINTA, leading=13)
    return {
        "titulo": ParagraphStyle("t", fontName="Helvetica-Bold", fontSize=30, leading=34,
                                 textColor=TINTA, spaceAfter=8),
        "sub": ParagraphStyle("s", fontSize=12.5, leading=18, textColor=GRIS, spaceAfter=6, **{}),
        "marca": ParagraphStyle("m", fontName="Helvetica-Bold", fontSize=11, leading=14,
                                textColor=AZUL, spaceAfter=2),
        "seccion": ParagraphStyle("sec", fontName="Helvetica-Bold", fontSize=16, leading=20,
                                  textColor=AZUL_HONDO, spaceBefore=10, spaceAfter=2),
        "seccion_desc": ParagraphStyle("secd", fontSize=9.5, leading=13, textColor=GRIS, spaceAfter=8),
        "prov": ParagraphStyle("p", fontName="Helvetica-Bold", fontSize=11.5, leading=14,
                               textColor=TINTA),
        "url": ParagraphStyle("u", fontSize=8, leading=11, textColor=AZUL),
        "etq": ParagraphStyle("e", fontName="Helvetica-Bold", fontSize=7.5, leading=10,
                              textColor=AZUL),
        "val": ParagraphStyle("v", fontSize=9, leading=12.5, textColor=colors.HexColor("#42566A")),
        "nota": ParagraphStyle("n", fontSize=8.5, leading=12, textColor=GRIS),
        "cuerpo": ParagraphStyle("c", fontSize=10.5, leading=15, textColor=colors.HexColor("#3F5468"),
                                 spaceAfter=8),
    }


def dibujar_marca(canvas, doc, con_pie=True):
    """Isotipo de los dos aros + pie de página."""
    canvas.saveState()
    x, y = doc.leftMargin, A4[1] - 16 * mm
    canvas.setStrokeColor(AZUL); canvas.setLineWidth(2.2)
    canvas.roundRect(x, y, 9, 9, 3, stroke=1, fill=0)
    canvas.setStrokeColor(TINTA)
    canvas.roundRect(x + 5.5, y, 9, 9, 3, stroke=1, fill=0)
    canvas.setFont("Helvetica-Bold", 10.5); canvas.setFillColor(TINTA)
    canvas.drawString(x + 20, y + 1.5, "kizuna")
    canvas.setFont("Helvetica", 6.5); canvas.setFillColor(AZUL)
    canvas.drawString(x + 20, y - 6, "SOLUCIONES DE COBRO")
    if con_pie:
        canvas.setFont("Helvetica", 7.5); canvas.setFillColor(GRIS)
        canvas.drawString(doc.leftMargin, 12 * mm,
                          "Guía informativa · Confirma condiciones vigentes con cada proveedor")
        canvas.drawRightString(A4[0] - doc.rightMargin, 12 * mm, f"Página {doc.page - 1}")
    canvas.restoreState()


def ficha(prov: dict, st: dict) -> KeepTogether:
    """Una tarjeta por proveedor: nombre + campos etiquetados."""
    filas = [[Paragraph(prov.get("name", ""), st["prov"]),
              Paragraph(prov.get("domain", ""), st["url"])]]
    encabezado = Table(filas, colWidths=[95 * mm, 65 * mm])
    encabezado.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
        ("ALIGN", (1, 0), (1, 0), "RIGHT"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))

    datos = []
    for clave, etiqueta in CAMPOS:
        valor = (prov.get(clave) or "—").strip()
        datos.append([Paragraph(etiqueta.upper(), st["etq"]), Paragraph(valor, st["val"])])

    detalle = Table(datos, colWidths=[42 * mm, 118 * mm])
    detalle.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEABOVE", (0, 1), (-1, -1), 0.4, LINEA),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))

    caja = Table([[encabezado], [detalle]], colWidths=[160 * mm])
    caja.setStyle(TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.6, LINEA),
        ("BACKGROUND", (0, 0), (-1, -1), colors.white),
        ("LEFTPADDING", (0, 0), (-1, -1), 10), ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 8), ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LINEBEFORE", (0, 0), (0, -1), 2.4, AZUL),
    ]))
    return KeepTogether([caja, Spacer(1, 7)])


def construir(proveedores: list[dict]) -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    WEB_DIR.mkdir(parents=True, exist_ok=True)
    st = estilos()

    doc = BaseDocTemplate(str(OUTPUT), pagesize=A4,
                          leftMargin=25 * mm, rightMargin=25 * mm,
                          topMargin=26 * mm, bottomMargin=20 * mm,
                          title="Matriz comparativa de soluciones de cobro en México",
                          author="Kizuna")
    marco = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="f")
    doc.addPageTemplates([
        PageTemplate(id="portada", frames=[marco],
                     onPage=lambda c, d: dibujar_marca(c, d, con_pie=False)),
        PageTemplate(id="normal", frames=[marco], onPage=dibujar_marca),
    ])

    hoy = date.today().strftime("%d/%m/%Y")
    total = len(proveedores)
    h = []

    # ---- Portada
    h.append(Spacer(1, 34 * mm))
    h.append(Paragraph("Matriz comparativa", st["titulo"]))
    h.append(Paragraph("Soluciones de cobro con tarjeta en México", st["titulo"]))
    h.append(Spacer(1, 8))
    h.append(Paragraph(
        f"<b>{total} proveedores</b> comparados con los mismos criterios: cuánto cobran, "
        f"qué equipo usan, qué requisitos piden, cuándo recibes tu dinero y qué revisar "
        f"antes de firmar.", st["cuerpo"]))
    h.append(Spacer(1, 10))

    guia = [[Paragraph("<b>Cómo leer esta guía</b>", st["val"])],
            [Paragraph("1. Ubica tu tipo de solución en el índice de abajo.", st["val"])],
            [Paragraph("2. Compara dentro de esa familia: son opciones equivalentes entre sí.", st["val"])],
            [Paragraph("3. Revisa siempre la última fila, «revisa antes de contratar».", st["val"])],
            [Paragraph("4. Las tasas son de referencia: tu tasa final depende de tu giro y volumen.", st["val"])]]
    t_guia = Table(guia, colWidths=[160 * mm])
    t_guia.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), FONDO),
        ("BOX", (0, 0), (-1, -1), 0.6, LINEA),
        ("LEFTPADDING", (0, 0), (-1, -1), 12), ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    h.append(t_guia)
    h.append(Spacer(1, 12))

    # índice por categoría
    idx = []
    for clave, nombre, _ in CATEGORIAS:
        n = sum(1 for p in proveedores if p.get("category") == clave)
        if n:
            idx.append([Paragraph(nombre, st["val"]), Paragraph(f"<b>{n}</b>", st["val"])])
    t_idx = Table(idx, colWidths=[140 * mm, 20 * mm])
    t_idx.setStyle(TableStyle([
        ("LINEBELOW", (0, 0), (-1, -2), 0.4, LINEA),
        ("ALIGN", (1, 0), (1, -1), "RIGHT"),
        ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ]))
    h.append(t_idx)
    h.append(Spacer(1, 14))
    h.append(Paragraph(f"Actualizado el {hoy} · kizuna · Hacemos equipo para que cobres.", st["nota"]))

    h.append(NextPageTemplate("normal"))
    h.append(PageBreak())

    # ---- Fichas por categoría
    for clave, nombre, desc in CATEGORIAS:
        grupo = [p for p in proveedores if p.get("category") == clave]
        if not grupo:
            continue
        h.append(Paragraph(f"{nombre} <font color='#9BB3C9'>({len(grupo)})</font>", st["seccion"]))
        h.append(Paragraph(desc, st["seccion_desc"]))
        for prov in grupo:
            h.append(ficha(prov, st))
        h.append(Spacer(1, 6))

    # ---- Aviso
    h.append(Spacer(1, 8))
    aviso = Table([[Paragraph(
        "<b>Aviso importante.</b> Esta matriz es una guía informativa con cifras de referencia; "
        "no sustituye una cotización ni la revisión del contrato. Comisiones, promociones, "
        "requisitos y tiempos de depósito cambian sin previo aviso: confirma siempre la "
        "información vigente directamente con cada proveedor. Los nombres y marcas de terceros "
        "pertenecen a sus respectivos propietarios y se usan con fines informativos o "
        "comparativos; mencionarlos no implica patrocinio ni respaldo, salvo donde se indique "
        "una relación comercial.", st["nota"])]], colWidths=[160 * mm])
    aviso.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#FFF8E6")),
        ("BOX", (0, 0), (-1, -1), 0.6, AMARILLO),
        ("LEFTPADDING", (0, 0), (-1, -1), 12), ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 10), ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ]))
    h.append(aviso)

    doc.build(h)
    shutil.copyfile(OUTPUT, WEB_OUTPUT)
    print(f"PDF generado: {OUTPUT}")
    print(f"Copiado a:    {WEB_OUTPUT}")


if __name__ == "__main__":
    construir(cargar_proveedores())
