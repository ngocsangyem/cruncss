const events = (el, events, callback) => {
	events
		.split(" ")
		.forEach(event => el.addEventListener(event, callback, false));
};

export { events };
