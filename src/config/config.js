import path from "path";
import { userAgents } from "./user-agent";

import PhantomPlugin from "website-scraper-phantom";
import { GenerateCssOptimizeFilePlugin } from "../lib/plugins/index";

const config = {
	app: {
		port: process.env.PORT || 3000,
		staticPath: "/static",
	},
	files: {
		directory: path.resolve(__dirname, "files/"),
		previewPath: "/static/files/{directory}",
		downloadPath: "/sites/{directory}/download",
	},
	options: {
		request: {
			headers: {
				"User-Agent": userAgents.list[0].userAgent,
			},
		},
		plugins: [new GenerateCssOptimizeFilePlugin()],
	},
};

export { config };
