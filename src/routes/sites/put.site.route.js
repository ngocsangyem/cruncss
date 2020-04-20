import express from "express";
import controller from "app-controller";
import { sitesController } from "../../controller/sites.controller";

const router = express.Router();
const sites = controller(sitesController);

/**
 * Update sites
 */

const updateSite = router.get("/:dirname", (req, res, next) => {});

export default updateSite;
