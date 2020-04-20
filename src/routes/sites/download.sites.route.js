import express from "express";
import controller from "app-controller";
import { sitesController } from "../../controller/sites.controller";

const router = express.Router();
const sites = controller(sitesController);

/**
 * Update sites
 */

const downloadSite = router.get("/:dirname/download", sites.download);

export default downloadSite;
