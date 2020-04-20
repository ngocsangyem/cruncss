const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: {
		index: ["./src/views/scripts/index.js"],
	},
	output: {
		path: path.join(__dirname, "../dist"),
		publicPath: "/",
		filename: "[name].js",
	},
	mode: "development",
	target: "web",
	devtool: "#source-map",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
			},
			{
				test: /\.pug$/,
				use: [
					{
						loader: "pug-loader",
					},
				],
			},
			{
				test: /\.(sa|sc|c)ss$$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(png|svg|jpg|gif|jpeg)$/,
				use: ["file-loader"],
			},
		],
	},
	plugins: [
		// new HtmlWebPackPlugin({
		// 	template: "./src/views/index.pug",
		// 	filename: "./views/index.pug",
		// 	excludeChunks: ["server"],
		// }),
		new CopyPlugin([
			{
				from: "./src/views/components/form/form.pug",
				to: "views/components/form",
			},
			{
				from: "./src/views/index.pug",
				to: "views/index.pug",
			},
			{
				from: "./src/views/components/navbar/navbar.pug",
				to: "views/components/navbar",
			},
			{
				from: "./src/views/layouts/layout.pug",
				to: "views/layouts",
			},
			{
				from: "./src/views/layouts/includes/variables.pug",
				to: "views/layouts/includes",
			},
			{
				from: "./src/views/layouts/includes/watermark.pug",
				to: "views/layouts/includes",
			},
		]),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	],
};
