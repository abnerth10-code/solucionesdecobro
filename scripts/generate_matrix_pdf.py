#!/usr/bin/env python3
"""Genera la versión descargable de la matriz comparativa."""

from __future__ import annotations

import json
import shutil
import subprocess
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import (
    BaseDocTemplate,
    CondPageBreak,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "comparison-data.js"
OUTPUT_DIR = ROOT / "output" / "pdf"
WEB_DIR = ROOT / "assets" / "downloads"
OUTPUT = OUTPUT_DIR / "matriz-comparativa-soluciones-de-cobro-mexico.pdf"
WEB_OUTPUT = WEB_DIR / OUTPUT.name

NAVY = colors.HexColor("#071D36")
BLUE = colors.HexColor("#0873DF")
BLUE_DARK = colors.HexColor("#0758B5")
SKY = colors.HexColor("#EEF9FF")
YELLOW = colors.HexColor("#FFD23F")
TEXT = colors.HexColor("#2C4055")
MUTED = colors.HexColor("#617386")
LINE = colors.HexColor("#DCE7F1")
WARM = colors.HexColor("#FFF8E6")

CATEGORY_ORDER = ["rapida", "hibrida", "banca", "pasarela", "adquirente", "softpos", "bnpl"]
CATEGORY_NAMES = {
    "rapida": "Cobro rápido",
    "hibrida": "Modelos híbridos",
    "banca": "Banca tradicional",
    "pasarela": "Pasarelas digitales",
    "adquirente": "Adquirentes directos",
    "softpos": "SoftPOS y cobro con celular",
    "bnpl": "Compra ahora, paga después (BNPL)",
}


def load_providers() -> list[dict]:
    node = shutil.which("node") or "/Users/abnr/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
    program = (
        "global.window={};"
        f"require({json.dumps(str(SOURCE))});"
        "process.stdout.write(JSON.stringify(window.COMPARISON_PROVIDERS));"
    )
    result = subprocess.run([node, "-e", program], check=True, capture_output=True, text=True)
    return json.loads(result.stdout)


def register_fonts() -> tuple[str, str]:
    candidates = [
        ("/System/Library/Fonts/Supplemental/Arial.ttf", "/System/Library/Fonts/Supplemental/Arial Bold.ttf"),
        ("/System/Library/Fonts/Supplemental/Helvetica.ttf", "/System/Library/Fonts/Supplemental/Helvetica Bold.ttf"),
    ]
    for regular, bold in candidates:
        if Path(regular).exists() and Path(bold).exists():
            pdfmetrics.registerFont(TTFont("BrandRegular", regular))
            pdfmetrics.registerFont(TTFont("BrandBold", bold))
            return "BrandRegular", "BrandBold"
    return "Helvetica", "Helvetica-Bold"


REGULAR_FONT, BOLD_FONT = register_fonts()


def esc(value: object) -> str:
    text = str(value or "")
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


class MatrixDocTemplate(BaseDocTemplate):
    def __init__(self, filename: str):
        page_size = landscape(A4)
        super().__init__(
            filename,
            pagesize=page_size,
            leftMargin=16 * mm,
            rightMargin=16 * mm,
            topMargin=18 * mm,
            bottomMargin=16 * mm,
            title="Matriz comparativa de soluciones de cobro en México",
            author="Soluciones de Cobro",
            subject="Guía comparativa de proveedores y soluciones de cobro",
        )
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id="body")
        self.addPageTemplates(PageTemplate(id="matrix", frames=[frame], onPage=draw_page))


def draw_page(canvas, doc):
    canvas.saveState()
    width, height = doc.pagesize
    canvas.setFillColor(NAVY)
    canvas.rect(0, height - 10 * mm, width, 10 * mm, fill=1, stroke=0)
    canvas.setFillColor(YELLOW)
    canvas.rect(0, height - 10 * mm, 46 * mm, 2 * mm, fill=1, stroke=0)
    canvas.setFont(BOLD_FONT, 8)
    canvas.setFillColor(colors.white)
    canvas.drawString(16 * mm, height - 6.5 * mm, "SOLUCIONES DE COBRO")
    canvas.setStrokeColor(LINE)
    canvas.line(16 * mm, 12 * mm, width - 16 * mm, 12 * mm)
    canvas.setFont(REGULAR_FONT, 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(16 * mm, 7.5 * mm, "Guía informativa. Confirma términos, tasas y disponibilidad con cada proveedor.")
    canvas.drawRightString(width - 16 * mm, 7.5 * mm, f"Página {doc.page}")
    canvas.restoreState()


styles = getSampleStyleSheet()
TITLE = ParagraphStyle("TitleBrand", parent=styles["Title"], fontName=BOLD_FONT, fontSize=28, leading=31, textColor=NAVY, alignment=TA_LEFT, spaceAfter=8)
SUBTITLE = ParagraphStyle("SubtitleBrand", parent=styles["BodyText"], fontName=REGULAR_FONT, fontSize=13, leading=18, textColor=TEXT, spaceAfter=8)
SECTION = ParagraphStyle("SectionBrand", parent=styles["Heading2"], fontName=BOLD_FONT, fontSize=18, leading=22, textColor=NAVY, spaceBefore=8, spaceAfter=10)
CARD_TITLE = ParagraphStyle("CardTitle", parent=styles["Heading3"], fontName=BOLD_FONT, fontSize=11.5, leading=14, textColor=NAVY)
CARD_TYPE = ParagraphStyle("CardType", parent=styles["BodyText"], fontName=BOLD_FONT, fontSize=7.6, leading=9.4, textColor=BLUE_DARK)
LABEL = ParagraphStyle("Label", parent=styles["BodyText"], fontName=BOLD_FONT, fontSize=7.2, leading=9, textColor=NAVY)
BODY = ParagraphStyle("Body", parent=styles["BodyText"], fontName=REGULAR_FONT, fontSize=7.2, leading=9.4, textColor=TEXT)
LINK = ParagraphStyle("Link", parent=BODY, textColor=BLUE_DARK)
COVER_NOTE = ParagraphStyle("CoverNote", parent=styles["BodyText"], fontName=REGULAR_FONT, fontSize=9.5, leading=13.5, textColor=TEXT)
CENTER = ParagraphStyle("Center", parent=styles["BodyText"], fontName=BOLD_FONT, fontSize=11, leading=14, textColor=colors.white, alignment=TA_CENTER)


def provider_card(provider: dict, card_width: float) -> Table:
    initials = "".join(character for character in provider["name"].upper() if character.isalnum())[:2]
    name_table = Table(
        [[Paragraph(initials, CENTER), Paragraph(esc(provider["name"]), CARD_TITLE)]],
        colWidths=[14 * mm, card_width - 20 * mm],
    )
    name_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), BLUE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (0, 0), 0),
        ("RIGHTPADDING", (0, 0), (0, 0), 0),
        ("TOPPADDING", (0, 0), (0, 0), 8),
        ("BOTTOMPADDING", (0, 0), (0, 0), 8),
        ("LEFTPADDING", (1, 0), (1, 0), 7),
    ]))

    data = [
        [name_table, ""],
        [Paragraph("TIPO", LABEL), Paragraph(esc(provider["type"]), CARD_TYPE)],
        [Paragraph("COSTO", LABEL), Paragraph(esc(provider["cost"]), BODY)],
        [Paragraph("LIQUIDACIÓN", LABEL), Paragraph(esc(provider["settlement"]), BODY)],
        [Paragraph("HARDWARE", LABEL), Paragraph(esc(provider["hardware"]), BODY)],
        [Paragraph("REQUISITOS", LABEL), Paragraph(esc(provider["requirements"]), BODY)],
        [Paragraph("QUÉ REVISAR", LABEL), Paragraph(esc(provider["review"]), BODY)],
        [Paragraph("SITIO OFICIAL", LABEL), Paragraph(f'<link href="{esc(provider["url"])}">{esc(provider["url"])}</link>', LINK)],
    ]
    if provider.get("status"):
        data.insert(2, [Paragraph("ESTADO", LABEL), Paragraph(esc(provider["status"]), CARD_TYPE)])

    card = Table(data, colWidths=[27 * mm, card_width - 31 * mm], hAlign="LEFT")
    card.setStyle(TableStyle([
        ("SPAN", (0, 0), (1, 0)),
        ("BACKGROUND", (0, 0), (-1, 0), SKY),
        ("BACKGROUND", (0, 1), (0, -1), colors.HexColor("#F7FBFF")),
        ("BOX", (0, 0), (-1, -1), 0.8, LINE),
        ("INNERGRID", (0, 1), (-1, -1), 0.35, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 1), (-1, -1), 6),
        ("RIGHTPADDING", (0, 1), (-1, -1), 6),
        ("TOPPADDING", (0, 1), (-1, -1), 4.5),
        ("BOTTOMPADDING", (0, 1), (-1, -1), 4.5),
    ]))
    return card


def build_story(providers: list[dict]):
    story = [Spacer(1, 18 * mm)]
    story.append(Paragraph("Matriz comparativa de soluciones de cobro en México", TITLE))
    story.append(Paragraph("37 proveedores organizados para comparar costo, equipo, requisitos, liquidación y condiciones antes de contratar.", SUBTITLE))
    story.append(Spacer(1, 8 * mm))

    overview = Table([
        [Paragraph("Cómo usar esta guía", SECTION), ""],
        [Paragraph("1", CENTER), Paragraph("Empieza por tu forma de vender: mostrador, movilidad, links, tienda en línea o pagos a plazos.", COVER_NOTE)],
        [Paragraph("2", CENTER), Paragraph("Compara el costo total: comisión, IVA, renta, cargos fijos, MSI y costo del equipo.", COVER_NOTE)],
        [Paragraph("3", CENTER), Paragraph("Revisa liquidez, requisitos, soporte, permanencia, penalizaciones y contracargos.", COVER_NOTE)],
        [Paragraph("4", CENTER), Paragraph("Abre el sitio oficial junto a cada proveedor y confirma una cotización vigente para tu giro y volumen.", COVER_NOTE)],
    ], colWidths=[18 * mm, 225 * mm])
    overview.setStyle(TableStyle([
        ("SPAN", (0, 0), (1, 0)),
        ("BACKGROUND", (0, 0), (-1, 0), SKY),
        ("BACKGROUND", (0, 1), (0, -1), BLUE),
        ("BOX", (0, 0), (-1, -1), 0.8, LINE),
        ("INNERGRID", (0, 1), (-1, -1), 0.35, LINE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(overview)
    story.append(Spacer(1, 8 * mm))
    warning = Table([[Paragraph("Importante", CARD_TITLE), Paragraph("Las cifras son referencias y pueden variar por giro, volumen, promoción, contrato o fecha. NuTap y el mPOS de Todito Pay requieren confirmar disponibilidad comercial actual en México.", COVER_NOTE)]], colWidths=[35 * mm, 208 * mm])
    warning.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), WARM),
        ("BOX", (0, 0), (-1, -1), 0.8, YELLOW),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
    ]))
    story.append(warning)
    story.append(PageBreak())

    card_gap = 6 * mm
    card_width = (MatrixDocTemplate(str(OUTPUT)).width - card_gap) / 2
    for category in CATEGORY_ORDER:
        category_providers = [provider for provider in providers if provider.get("category") == category]
        if not category_providers:
            continue
        heading = Paragraph(CATEGORY_NAMES[category], SECTION)
        rows = []
        for index in range(0, len(category_providers), 2):
            left = provider_card(category_providers[index], card_width)
            right = provider_card(category_providers[index + 1], card_width) if index + 1 < len(category_providers) else ""
            rows.append([left, right])
        grid = Table(rows, colWidths=[card_width, card_width], hAlign="LEFT")
        grid.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), card_gap if len(rows) else 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ]))
        story.append(CondPageBreak(70 * mm))
        if len(category_providers) <= 2:
            story.append(KeepTogether([heading, grid]))
        else:
            story.append(heading)
            story.append(grid)
        story.append(Spacer(1, 5 * mm))
    return story


def main():
    providers = load_providers()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    WEB_DIR.mkdir(parents=True, exist_ok=True)
    doc = MatrixDocTemplate(str(OUTPUT))
    doc.build(build_story(providers))
    shutil.copy2(OUTPUT, WEB_OUTPUT)
    print(OUTPUT)
    print(WEB_OUTPUT)


if __name__ == "__main__":
    main()
