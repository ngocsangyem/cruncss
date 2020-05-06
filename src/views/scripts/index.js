import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/shards-ui/dist/css/shards.min.css";
import "../../../node_modules/izitoast/dist/css/iziToast.min.css";
import "../styles/index.scss";
import { navbarInit, toggleNavbar } from "../components/navbar/navbar";
import * as Form from "../components/form/form";
import * as Interceptor from "../../helpers/interceptor/index";

const supportsOrientationChange = "onorientationchange" in window;
const orientationEvent = supportsOrientationChange
	? "orientationchange"
	: "resize";

document.addEventListener(
	"DOMContentLoaded",
	() => {
		Interceptor.requestInterceptor;
		Interceptor.responseInterceptor;

		toggleNavbar();
		setTimeout(function () {
			navbarInit();
		}, 500);
		Form.formCustomInit();
		Form.formHttpInit();
		Form.formValidateInit();
	},
	false
);

window.addEventListener(
	orientationEvent,
	function () {
		setTimeout(function () {
			navbarInit();
		}, 500);
	},
	false
);
