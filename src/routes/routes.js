import { indexController } from "../controller/index.controller";
import * as siteRoutes from "./sites/site.routes";

const Routes = (app) => {
	app.use("/sites", [
		siteRoutes.addSite,
		siteRoutes.downloadSite,
		siteRoutes.getSite,
		siteRoutes.getSites,
	]);

	app.get("/", indexController.index);
	app.get("*", indexController.index);
};

export { Routes };
