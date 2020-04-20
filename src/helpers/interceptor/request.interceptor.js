import Axios from "axios";
import { errorInterceptor } from "./error.interceptor";
import { startProgess, stopProgress } from "../loading";

const requestInterceptor = Axios.interceptors.request.use(
	// Add a request interceptor
	function(config) {
		startProgess();
		// Do something before request is sent
		return config;
	},
	errorInterceptor
);

export { requestInterceptor };
