import { initFonts } from "@utils/fonts";
import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export async function createDocument(template: ArrayBuffer) {
	const pdfDoc = await PDFDocument.load(template);
	pdfDoc.registerFontkit(fontkit);
	await initFonts(pdfDoc);

	return {
		pdfDoc,
		acroform: pdfDoc.getForm(),
	};
}
