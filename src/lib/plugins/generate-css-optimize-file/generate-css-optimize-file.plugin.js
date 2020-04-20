import path from "path";
import Promise from "bluebird";
import purify from "purify-css";
import postcss from "postcss";
import cssnano from "cssnano";
import combineMediaQuery from "postcss-combine-media-query";
import cheerio from "cheerio";

import { concatFiles } from "../../helpers/concatFiles";

const purifyCss = async (outputPath, content, css) => {
	return await purify([content], [css], {
		output: outputPath,
	});
};

const handlePostCss = (directory, destination) => {
	return fs.readFile(directory, (err, css) => {
		if (err) {
			console.log(err);

			return false;
		}
		postcss([combineMediaQuery, cssnano])
			.process(css, { from: directory, to: destination })
			.then((result) => {
				fs.writeFile(destination, result.css, () => true);
			});
	});
};

const modifyHTMLFile = (htmlPath, outputPath, cssPath) => {
	fs.readFile(htmlPath, { encoding: "utf8" }, function (error, data) {
		var $ = cheerio.load(data);
		$('link[rel="stylesheet"]').remove();
		$("head").append('<link href="' + cssPath + '" rel="stylesheet">');

		fs.writeFile(outputPath, $.html(), () => true);
	});
};

const fs = Promise.promisifyAll(require("fs"));

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
			const finalOptimizeFile = cssPath + "/finale.css";

			await concatFiles(cssPath, concatPath);
			purifyCss(purifyPath, content, concatPath).then(() => {
				if (fs.existsSync(purifyPath)) {
					handlePostCss(purifyPath, finalOptimizeFile);
					modifyHTMLFile(
						htmlPath,
						htmlPath,
						previewPath + "/css/finale.css"
					);
				}
			});
		});
	}
}

export { GenerateCssOptimizeFilePlugin };
