import { saveAs } from "file-saver";

const dropdown = document.getElementById(
	"template-selection-dropdown",
) as HTMLSelectElement;

dropdown.addEventListener("change", function () {
	const fileUrl = this.value;
	if (fileUrl) {
		const fileName = fileUrl.split("/").pop();
		saveAs(fileUrl, fileName);
	}
});
