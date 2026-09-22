import type { PDFForm } from "pdf-lib";
import { PDFName, PDFTextField } from "pdf-lib";
import { styleField } from "@utils/styleField.ts";

export async function populateFields(
	form: PDFForm,
	csvRow: Record<string, string>,
) {
	console.log(`Creating SF9 for ${csvRow["name"]}...`);

	for (const [pdfFieldName, value] of Object.entries(csvRow)) {
		try {
			form.getTextField(pdfFieldName).setText(value || "");
		} catch (error) {
			console.error(`Error setting text for field ${pdfFieldName}:`, error);
		}
	}

	for (const field of form.getFields()) {
		if (!(field instanceof PDFTextField)) continue;
		field.acroField.dict.delete(PDFName.of("AP"));
		if (!field.acroField.getDefaultAppearance()) {
			field.acroField.setDefaultAppearance("/Arial 12 Tf 0 g");
		}

		styleField(field, "bookman-old-style-bold", 7.8, "center");
	}
}
