import { toast } from "./toast";
import { stopProgress } from "../loading";

const errorInterceptor = error => {
	const errorJson = error.toJSON();
	stopProgress();
	if (
		errorJson.config.hasOwnProperty("errorHandle") &&
		errorJson.config.errorHandle === false
	) {
		return Promise.reject(errorJson);
	}

	if (errorJson.message) {
		toast.error(errorJson.message);
	}
};

export { errorInterceptor };
