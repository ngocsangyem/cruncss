const urlItem = (title = "Some url", previewPath, downloadPath) => {
	return `
	<div class="url-list-item">
		${title}
		<a class="url-list-item-link" href="${previewPath}" target="_blank">
			<i class="fas fa-external-link-alt"></i>
		</a>
		<a class="url-list-item-download" href="${downloadPath}" download>
			<i class="fas fa-file-download"></i>
		</a>
	</div>
	`;
};

export { urlItem };
