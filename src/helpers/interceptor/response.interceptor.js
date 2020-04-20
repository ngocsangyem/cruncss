import Axios from "axios";
import { errorInterceptor } from "./error.interceptor";
import { startProgess, stopProgress } from "../loading";

const responseInterceptor = Axios.interceptors.response.use(
	// Add a response interceptor
	function(response) {
		// Do something with response data
		stopProgress();
		return response;
	},
	errorInterceptor
);

export { responseInterceptor };
