import type { PDFDocument, PDFFont, PDFTextField } from "pdf-lib";
import { TextAlignment } from "pdf-lib";

const alignmentMap = {
	left: TextAlignment.Left,
	center: TextAlignment.Center,
	right: TextAlignment.Right,
};

export type FontName = "arial-bold" | "arial-narrow-bold";
let arialBoldBytes: ArrayBuffer | null = null;
let arialNarrowBoldBytes: ArrayBuffer | null = null;
let fontMap: Record<FontName, PDFFont>;

export async function initFonts(pdfDoc: PDFDocument): Promise<void> {
	if (!arialBoldBytes || !arialNarrowBoldBytes) {
		[arialBoldBytes, arialNarrowBoldBytes] = await Promise.all([
			fetch("/fonts/Arial-Bold.ttf").then((r) => r.arrayBuffer()),
			fetch("/fonts/Arial-Narrow-Bold.ttf").then((r) => r.arrayBuffer()),
		]);
	}

	fontMap = {
		"arial-bold": await pdfDoc.embedFont(arialBoldBytes),
		"arial-narrow-bold": await pdfDoc.embedFont(arialNarrowBoldBytes),
	};
}

function shrinkToFit(
	text: string,
	font: PDFFont,
	maxSize: number,
	fieldWidth: number,
	minSize = 6,
	padding = 4,
): number {
	if (!text) return maxSize;
	const availableWidth = fieldWidth - padding;
	const currentWidth = font.widthOfTextAtSize(text, maxSize);
	if (currentWidth <= availableWidth) return maxSize;
	const fitSize = (availableWidth / currentWidth) * maxSize;
	return Math.max(minSize, fitSize);
}

export function styleField(
	field: PDFTextField,
	fontName: FontName = "arial-bold",
	maxSize = 12,
	alignment: "left" | "center" | "right" = "center",
): void {
	const font = fontMap[fontName];
	const text = field.getText() ?? "";
	const fieldWidth =
		field.acroField.getWidgets()[0]?.getRectangle().width ?? Infinity;

	field.setFontSize(shrinkToFit(text, font, maxSize, fieldWidth));
	field.setAlignment(alignmentMap[alignment]);
	field.updateAppearances(font);
}
