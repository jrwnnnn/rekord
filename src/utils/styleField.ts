import type { PDFFont, PDFTextField } from "pdf-lib";
import { TextAlignment } from "pdf-lib";
import { getFont, type FontName } from "@utils/fonts";

const alignmentMap = {
	left: TextAlignment.Left,
	center: TextAlignment.Center,
	right: TextAlignment.Right,
};

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
	const font = getFont(fontName);
	const text = field.getText() ?? "";
	const fieldWidth =
		field.acroField.getWidgets()[0]?.getRectangle().width ?? Infinity;

	field.setFontSize(shrinkToFit(text, font, maxSize, fieldWidth));
	field.setAlignment(alignmentMap[alignment]);
	field.updateAppearances(font);
}
