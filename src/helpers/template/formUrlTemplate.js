const formUrlTemplate = number => {
	return `<div class="form-group-item">
				<div class="form-group-item-inner">
					<input class="form-control form-url" id="form-url-${number}" type="url" placeholder="http://example.com/" required="" name="url-${number}">
					<button type="button" class="btn btn-danger crawler-form-removeUrl">Remove</button>
				</div>
				<div class="invalid-feedback"></div>
			</div>`;
};

export { formUrlTemplate };
