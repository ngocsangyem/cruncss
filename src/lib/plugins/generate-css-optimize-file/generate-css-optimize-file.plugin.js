import path from "path";
import Promise from "bluebird";
import purify from "purify-css";
import PurgeCSS from "purgecss";
import postcss from "postcss";
import cssnano from "cssnano";
import combineMediaQuery from "postcss-combine-media-query";
import cheerio from "cheerio";
import extractMediaQuery from "postcss-extract-media-query";

import { concatFiles } from "../../helpers/concatFiles";

const fs = Promise.promisifyAll(require("fs"));

const purifyCss = (outputPath, content, css) => {
	return purify([content], [css], {
		output: outputPath,
	});
};

const purgeCSS = async (outputPath, content, css) => {
	return await new PurgeCSS()
		.purge({
			content: [content],
			css: [css],
			whitelist: [
				"slick-slide",
				"slick-track",
				"slick-initialized",
				"slick-list",
			],
		})
		.then((result) => {
			fs.writeFile(outputPath, result[0].css, (err) => {
				if (err) {
					return console.log(err);
				}

				console.log("The file was saved!");
			});
		});
};

const postCssExtract = (
	directory,
	destination,
	extractFileName,
	extractOutput
) => {
	fs.readFileAsync(directory).then((css) => {
		postcss([
			extractMediaQuery({
				output: {
					path: extractOutput, // emit to 'dist' folder in root
					name: "[name]-[query].[ext]", // pattern of emited files
				},
			}),
		])
			.process(css, { from: directory, to: destination })
			.then((result) =>
				fs.writeFileAsync(extractFileName, result.css, () => true)
			);
	});
};

const handlePostCss = (
	directory,
	destination,
	extractFileName,
	extractOutput
) => {
	return fs.readFileAsync(directory).then((css) => {
		postcss([combineMediaQuery, cssnano])
			.process(css, { from: directory, to: destination })
			.then((result) => {
				return fs.writeFileAsync(destination, result.css, () => true);
			})
			.then(() => {
				postCssExtract(
					destination,
					destination,
					extractFileName,
					extractOutput
				);
			});
	});
};

const modifyHTMLFile = (htmlPath, outputPath, cssPath) => {
	return fs.readFileAsync(htmlPath, { encoding: "utf8" }).then((data) => {
		var $ = cheerio.load(data);
		$('link[rel="stylesheet"]').remove();
		$("head").append('<link href="' + cssPath + '" rel="stylesheet">');

		fs.writeFile(outputPath, $.html(), () => true);
	});
};

class GenerateCssOptimizeFilePlugin {
	apply(registerAction) {
		let absoluteDirectoryPath;
		let previewPath;

		registerAction("beforeStart", ({ options }) => {
			if (!options.directory || typeof options.directory !== "string") {
				throw new Error(`Incorrect directory ${options.directory}`);
			}
			absoluteDirectoryPath = path.resolve(
				process.cwd(),
				options.directory
			);

			const directoryPath = absoluteDirectoryPath.split("/");
			const folderName = directoryPath[directoryPath.length - 1];

			previewPath = "/static/files/" + folderName;

			if (fs.existsSync(absoluteDirectoryPath)) {
				throw new Error(`Directory ${absoluteDirectoryPath} exists`);
			}
		});

		registerAction("afterFinish", async () => {
			const content = absoluteDirectoryPath + "/index.html";
			const cssPath = absoluteDirectoryPath + "/css";
			const htmlPath = absoluteDirectoryPath + "/index.html";
			const concatPath = cssPath + "/concat.css";
			const purifyPath = cssPath + "/optimize.purify.css";
			const purgeCssPath = cssPath + "/optimize.purge.css";
			const finalOptimizeFile = cssPath + "/optimize.css";
			const extractFileName = cssPath + "/optimize.final.css";
			const extractOutput = cssPath + "/extract";

			await concatFiles(cssPath, concatPath);
			await purgeCSS(purgeCssPath, content, concatPath);
			// await purifyCss(purifyPath, content, concatPath);
			await handlePostCss(
				purgeCssPath,
				finalOptimizeFile,
				extractFileName,
				extractOutput
			);
			await modifyHTMLFile(
				htmlPath,
				htmlPath,
				previewPath + "/css/optimize.final.css"
			);
		});
	}
}

export { GenerateCssOptimizeFilePlugin };
