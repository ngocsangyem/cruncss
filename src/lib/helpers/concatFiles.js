import path from "path";
import Promise from "bluebird";

const fs = Promise.promisifyAll(require("fs"));

const concatFiles = (directory, destination) => {
	return fs
		.readdirAsync(directory)
		.filter((file) => /\.(css)$/i.test(file))
		.map((file) => fs.readFileAsync(path.join(directory, file)))
		.then((contents) =>
			fs.writeFileAsync(destination, contents.join("\n"))
		);
};

export { concatFiles };
