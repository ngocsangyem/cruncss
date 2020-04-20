import express from "express";
import controller from "app-controller";
import { sitesController } from "../../controller/sites.controller";

const router = express.Router();
const sites = controller(sitesController);

/**
 * Get sites by id
 */

const getSites = router.get("/", sites.list);

export default getSites;
