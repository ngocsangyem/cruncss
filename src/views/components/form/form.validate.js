import { events } from "../../../helpers/events";
import { isValidUrl } from "../../../helpers/validate/isValidUrl";
import { attachEvent } from "../../../helpers/attachEvent";
import { parents } from "../../../helpers/parents";

const handleErrorInput = target => {
	const value = target.value;
	const submitButton = document.querySelector(".crawler-form-submit-button");
	const parent = parents(target, ".form-group-item")[0];
	if (!isValidUrl(value) || !value) {
		submitButton.setAttribute("disabled", "disabled");
		parent.classList.add("is-invalid");
		target.classList.add("is-invalid");
	} else {
		submitButton.removeAttribute("disabled");
		parent.classList.remove("is-invalid");
		target.classList.remove("is-invalid");
	}
};

const addErrorMessage = target => {
	const errorMessage = {
		invalid: "Invalid url",
		emty: "Url is empty"
	};
	const value = target.value;
	const parent = parents(target, ".form-group-item")[0];
	const errorEl = parent.querySelector(".invalid-feedback");

	if (!value) {
		errorEl.textContent = errorMessage.emty;
	} else if (!isValidUrl(value)) {
		errorEl.textContent = errorMessage.invalid;
	}
};

const handleInputEvent = () => {
	attachEvent("form-url", event => {
		const target = event.target;
		events(target, "keyup bind cut copy paste blur", event => {
			if (!!target) {
				handleErrorInput(target);
				addErrorMessage(target);
			}
		});
	});
};

const resetForm = () => {
	const resetButton = document.querySelector(".crawler-form-reset-button");
	resetButton.addEventListener("click", () => {
		const inputUrls = document.querySelectorAll(".form-url");
		inputUrls.forEach(url => {
			const parent = parents(url, ".form-group-item")[0];
			parent.classList.remove("is-invalid");
			if (url.value || url.classList.contains("is-invalid")) {
				url.value = "";
				url.classList.remove("is-invalid");
			}
		});
	});
};

const formValidateInit = () => {
	handleInputEvent();
	resetForm();
};

export { formValidateInit };
