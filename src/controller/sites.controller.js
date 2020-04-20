import archiver from "archiver";
import { SiteService } from "../service/sites.service";

const sitesController = {
	scrape: SiteService.scrape,
	list: SiteService.list,
	find: function (directory) {
		return SiteService.find(directory.dirname);
	},

	download: function scrape(directory, req, res) {
		return SiteService.getFullPath(directory.dirname)
			.then(function (fullPath) {
				res.writeHead(200, {
					"Content-Type": "application/zip",
					"Content-disposition":
						"attachment; filename=" + directory.dirname + ".zip",
				});

				var zip = archiver("zip");
				zip.pipe(res);
				zip.directory(fullPath, false).finalize();
			})
			.catch(function (err) {
				console.log(err);
			});
	},
};

export { sitesController };
