import Papa from "papaparse";
import schema from "../data/schema.json";

export function getSchema(file: File): Promise<string | boolean> {
	return new Promise((resolve) => {
		Papa.parse(file, {
			header: true,
			comments: "#",
			skipEmptyLines: true,
			complete: (results) => {
				const matchedSchema = schema.find((s) =>
					s.columns.every((col) => results.meta.fields!.includes(col)),
				);

				if (!matchedSchema) {
					console.error(
						"Invalid CSV. The columns do not match any known schema.",
					);
					return resolve(false);
				}

				console.log(
					`Successfully matched CSV to ${matchedSchema.name} schema.`,
				);
				resolve(matchedSchema.name);
			},
			error: (parseError) => {
				console.error("Error parsing CSV:", parseError);
				resolve(false);
			},
		});
	});
}
