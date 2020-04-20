import express from "express";
import pug from "pug";
import bodyParser from "body-parser";
import path from "path";
import { config } from "../config/config";

const Middlewares = function (app) {
	app.use(bodyParser.json());
	app.set("views", path.join(__dirname, "./views"));
	app.set("pug", pug);

	app.use(config.app.staticPath, express.static(path.resolve(__dirname)));
};

export { Middlewares };
