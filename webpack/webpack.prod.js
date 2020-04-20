const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: {
		index: "./src/views/scripts/index.js",
	},
	output: {
		path: path.join(__dirname, "../dist"),
		publicPath: "/",
		filename: "[name].js",
	},
	target: "web",
	optimization: {
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true,
				terserOptions: {
					// https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
					extractComments: "all",
					compress: {
						drop_console: true,
						pure_funcs: [
							"console.info",
							"console.debug",
							"console.warn",
						],
					},
				},
			}),
			new OptimizeCSSAssetsPlugin({}),
		],
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
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
				test: /\.(png|svg|jpg|gif|jpeg)$/,
				use: [{ loader: "url-loader" }],
			},
			{
				test: /\.(sa|sc|c)ss$$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css",
		}),
	],
};
