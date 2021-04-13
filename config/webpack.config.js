import webpack from "webpack"
import { resolve } from "path"
import MiniCssExtractPlugin from "mini-css-extract-plugin"

const config = {
	mode: "development",
	entry: "./assets/js",
	output: {
		path: resolve("./public/js"),
		filename: "app.js",
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: ({ chunk }) =>
				`${chunk.name.replace("/js/", "/css/")}.css`,
		}),
	],
}

export default config
