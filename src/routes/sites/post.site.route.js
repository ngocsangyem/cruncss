import express from "express";
import controller from "app-controller";
import { sitesController } from "../../controller/sites.controller";

const router = express.Router();
const sites = controller(sitesController);

/**
 * Add sites
 */

const addSite = router.post("/", sites.scrape);

export default addSite;
