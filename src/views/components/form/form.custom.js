import { slideDown } from "../../../helpers/slideDown";
import { slideUp } from "../../../helpers/slideUp";
import { attachEvent } from "../../../helpers/attachEvent";
import { formUrlTemplate } from "../../../helpers/template/formUrlTemplate";

let formCount = 0;

const showOptions = () => {
	const showOptionsButton = document.querySelector(
		".control-options .custom-control-label"
	);
	const optionsContainer = document.querySelector(".options-container");
	const slideDuration = 300;
	let isClose = true;

	showOptionsButton.addEventListener("click", function () {
		if (isClose) {
			this.textContent = "Hide advanced options";
			slideDown(optionsContainer, slideDuration);
			isClose = false;
		} else {
			this.textContent = "Show advanced options";
			slideUp(optionsContainer, slideDuration);
			isClose = true;
		}
	});
};

const addUrlForm = () => {
	const addButton = document.querySelector(".crawler-form-addMoreUrl");
	const formInputContainer = document.querySelector(".form-group-urls");
	if (!!addButton) {
		addButton.addEventListener("click", () => {
			formCount++;
			formInputContainer.insertAdjacentHTML(
				"beforeend",
				formUrlTemplate(formCount)
			);
		});
	}
};

const removeUrlForm = () => {
	attachEvent("crawler-form-removeUrl", (event) => {
		const target = event.target;
		const parent = target.parentNode.parentNode;
		parent.remove();
	});
};

const formCustomInit = () => {
	showOptions();
	addUrlForm();
	removeUrlForm();
};

export { formCustomInit };
