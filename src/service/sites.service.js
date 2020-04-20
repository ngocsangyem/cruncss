import { config } from "../config/config";
import _ from "lodash";
import Promise from "bluebird";
import url from "url";
import path from "path";
import scrapeWebsite from "website-scraper";
import format from "string-template";

const fs = Promise.promisifyAll(require("fs"));

const getSiteDirname = (siteUrl) => {
	const urlObj = url.parse(siteUrl);
	const domain = urlObj.host;
	const title = urlObj.path.split("/").join("--");
	return domain + title + "-" + new Date().getTime();
};

const getSiteFullPath = (siteDirname) => {
	return path.resolve(config.files.directory, siteDirname);
};

const getSitesDirectories = () => {
	const root = config.files.directory;
	const directories = [];
	if (!fs.existsSync(root)) {
		fs.mkdirSync(root);
	}

	return fs.readdirAsync(root).then(function (files) {
		return Promise.map(files, (file) => {
			return fs
				.statAsync(root + "/" + file)
				.then(function (stat) {
					if (stat.isDirectory()) {
						directories.push(file);
					}
				})
				.catch(function (err) {
					console.log(err);
				});
		})
			.then(function () {
				return Promise.resolve(directories);
			})
			.catch(function (err) {
				console.log(err);
			});
	});
};

const buildSiteObject = (directory) => {
	return {
		directory: directory,
		previewPath: format(config.files.previewPath, { directory: directory }),
		downloadPath: format(config.files.downloadPath, {
			directory: directory,
		}),
	};
};

const getNotFoundError = (directory) => {
	return {
		errors: {
			directory: "Site " + directory + " was not found",
		},
	};
};

const SiteService = {
	scrape: async function (options) {
		// options.url.forEach(async url => {
		// 	const siteDirname = getSiteDirname(url);
		// 	const siteFullPath = getSiteFullPath(siteDirname);
		// 	console.log("url", url);
		// 	const scraperOptions = _.extend({}, config.options, {
		// 		urls: url,
		// 		directory: siteFullPath,
		// 		request: !!options.request
		// 			? options.request
		// 			: config.options.request
		// 	});
		// 	console.log("scraperOptions", scraperOptions);
		// 	await scrapeWebsite(scraperOptions);
		// 	return Promise.resolve(buildSiteObject(siteDirname));
		// });
		const siteDirname = getSiteDirname(options.url);
		const siteFullPath = getSiteFullPath(siteDirname);
		const scraperOptions = _.extend({}, config.options, {
			...config.options,
			urls: [options.url],
			directory: siteFullPath,
			request: !!options.request
				? options.request
				: config.options.request,
		});

		await scrapeWebsite(scraperOptions);
		return Promise.resolve(buildSiteObject(siteDirname));
	},

	list: function list() {
		return getSitesDirectories()
			.then(function (directories) {
				const list = directories.map(buildSiteObject);
				return Promise.resolve(list);
			})
			.catch(function (err) {
				console.log(err);
			});
	},

	find: function find(dirname) {
		return getSitesDirectories()
			.then(function (directories) {
				const found = _.find(directories, function (el) {
					return el === dirname;
				});

				if (!found) {
					return Promise.reject(getNotFoundError(dirname));
				}

				return Promise.resolve(buildSiteObject(found));
			})
			.catch(function (err) {
				console.log(err);
			});
	},

	getFullPath: function getFullPath(dirname) {
		return getSitesDirectories()
			.then(function (directories) {
				const exists = directories.indexOf(dirname) > -1;

				if (!exists) {
					return Promise.reject(getNotFoundError(dirname));
				}

				return Promise.resolve(getSiteFullPath(dirname));
			})
			.catch(function (err) {
				console.log(err);
			});
	},
};

export { SiteService };
