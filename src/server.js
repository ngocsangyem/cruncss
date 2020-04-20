import express from "express";
import { config } from "./config/config";
import { Routes } from "./routes/routes";
import { Middlewares } from "./middlewares/middlewares";

const PORT = config.app.port;

// Init app
const app = express();

Middlewares(app);
Routes(app);

app.listen(PORT, function () {
	console.log(`Connect to localhost:${PORT}`);
	console.log("Press Ctrl+C to quit.");
});
