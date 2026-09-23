import { updateProgressBanner } from "@utils/progressBanner";
import Papa from "papaparse";

export function validateCSV(file: File): Promise<boolean> {
	return new Promise((resolve) => {
		if (file.type !== "text/csv" && !file.name.toLowerCase().endsWith(".csv")) {
			console.error("Invalid file type. Expected CSV.");
			updateProgressBanner(
				"Invalid file type.",
				"Please upload a .csv file.",
				"https://cdn-icons-png.flaticon.com/512/6514/6514954.png",
			);
			return resolve(false);
		}

		Papa.parse(file, {
			header: true,
			comments: "#",
			skipEmptyLines: true,
			complete: (results) => {
				if (results.data.length === 0) {
					console.error("CSV is empty.");
					updateProgressBanner(
						"CSV is empty.",
						"The uploaded CSV file is empty.",
						"https://cdn-icons-png.flaticon.com/512/6514/6514954.png",
					);
					return resolve(false);
				}

				const columns = results.meta.fields;

				if (!columns) {
					console.error("No columns found in CSV.");
					updateProgressBanner(
						"No columns found in CSV.",
						"The uploaded CSV file does not contain any columns.",
						"https://cdn-icons-png.flaticon.com/512/6514/6514954.png",
					);
					return resolve(false);
				}

				resolve(true);
			},
			error: (parseError) => {
				console.error("Error parsing CSV:", parseError);
				resolve(false);
			},
		});
	});
}
