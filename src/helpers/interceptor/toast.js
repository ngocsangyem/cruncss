import iZtoast from "izitoast";

const toast = {
	error: (message, title = "Error") => {
		return iZtoast.error({
			title: title,
			message: message,
			position: "topRight"
		});
	},
	success: (message, title = "Success") => {
		return iZtoast.success({
			title: title,
			message: message,
			position: "topRight"
		});
	}
};

export { toast };
