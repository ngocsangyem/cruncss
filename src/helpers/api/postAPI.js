const postAPI = (url, callback, options = {}) => {
	axios
		.post(url, options)
		.then(response => {
			callback(response);
		})
		.catch(err => {
			console.log("api -> post: ", err);
		});
};

export { postAPI };
