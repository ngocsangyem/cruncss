const getAPI = (url, callback, options = {}) => {
	axios
		.get(url, options)
		.then(response => {
			callback(response);
		})
		.catch(err => {
			console.log("api -> get: ", err);
		});
};

export { getAPI };
