import type { Alignment } from "@utils/styleField.ts";
import type { FontName } from "@utils/fonts";
import type { PDFForm } from "pdf-lib";
import { PDFName, PDFTextField } from "pdf-lib";
import { styleField } from "@utils/styleField.ts";
import styleDictionary from "@data/styleDictionary.json";

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

		const fieldStyle =
			(
				styleDictionary as Record<
					string,
					{
						font?: FontName;
						fontSize?: number;
						alignment?: Alignment;
					}
				>
			)[field.getName()] ?? {};

		styleField(
			field,
			fieldStyle.font ?? "bookman-old-style-bold",
			fieldStyle.fontSize ?? 7.8,
			fieldStyle.alignment ?? "center",
		);
	}
}
