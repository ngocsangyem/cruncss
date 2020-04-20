import Axios from "axios";
import { urlItem } from "../../../helpers/template/urlItem";

const getData = () => {
	const urls = Array.from(document.querySelectorAll(".form-url")).map(
		url => url.value
	);
	const url = document.getElementById("form-url").value;
	const userAgent = document.getElementById("user-agent").value;

	return {
		urls,
		url,
		userAgent
	};
};

const generateItemUrl = (title, previewPath, downloadPath) => {
	const listContainer = document.querySelector(".url-list");
	listContainer.insertAdjacentHTML(
		"afterbegin",
		urlItem(title, previewPath, downloadPath)
	);
};

const generateListUrl = listUrl => {
	listUrl.forEach(url => {
		generateItemUrl(url.directory, url.previewPath, url.downloadPath);
	});
};

const formGet = () => {
	Axios.get("/sites")
		.then(response => {
			const listUrl = response.data;
			generateListUrl(listUrl);
		})
		.catch(error => {
			// handle error
			console.log(error.response);
		});
};

const formPost = () => {
	const submitButton = document.querySelector(".crawler-form-submit-button");
	submitButton.addEventListener("click", () => {
		const data = {
			url: getData().url,
			request: {
				headers: {
					"User-Agent": getData().userAgent
				}
			}
		};

		Axios.post("/sites", data)
			.then(response => {
				const data = response.data;
				generateItemUrl(
					data.directory,
					data.previewPath,
					data.downloadPath
				);
			})
			.catch(error => {
				console.log(error.response);
			});
	});
};

const formHttpInit = () => {
	formPost();
	formGet();
};

export { formHttpInit };
