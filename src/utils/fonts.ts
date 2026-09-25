import type { PDFDocument, PDFFont } from "pdf-lib";

export type FontName =
	| "arial-bold"
	| "arial-narrow-bold"
	| "bookman-old-style"
	| "bookman-old-style-bold";

let arialBoldBytes: ArrayBuffer | null = null;
let arialNarrowBoldBytes: ArrayBuffer | null = null;
let bookmanOldStyleBytes: ArrayBuffer | null = null;
let bookmanOldStyleBoldBytes: ArrayBuffer | null = null;

let fontMap: Record<FontName, PDFFont>;

export async function initFonts(pdfDoc: PDFDocument): Promise<void> {
	if (!arialBoldBytes || !arialNarrowBoldBytes) {
		[arialBoldBytes, arialNarrowBoldBytes] = await Promise.all([
			fetch("/fonts/arial/bold.ttf").then((r) => r.arrayBuffer()),
			fetch("/fonts/arial/narrow-bold.ttf").then((r) => r.arrayBuffer()),
		]);
	}

	if (!bookmanOldStyleBytes || !bookmanOldStyleBoldBytes) {
		[bookmanOldStyleBytes, bookmanOldStyleBoldBytes] = await Promise.all([
			fetch("/fonts/bookman-old-style/regular.ttf").then((r) =>
				r.arrayBuffer(),
			),
			fetch("/fonts/bookman-old-style/bold.ttf").then((r) => r.arrayBuffer()),
		]);
	}

	fontMap = {
		"arial-bold": await pdfDoc.embedFont(arialBoldBytes),
		"arial-narrow-bold": await pdfDoc.embedFont(arialNarrowBoldBytes),
		"bookman-old-style": await pdfDoc.embedFont(bookmanOldStyleBytes),
		"bookman-old-style-bold": await pdfDoc.embedFont(bookmanOldStyleBoldBytes),
	};
}

export function getFont(fontName: FontName): PDFFont {
	return fontMap[fontName];
}
