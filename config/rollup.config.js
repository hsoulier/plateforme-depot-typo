import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { terser } from "rollup-plugin-terser"
import postcss from "rollup-plugin-postcss"
import json from "@rollup/plugin-json"
import path from "path"

const production = !process.env.ROLLUP_WATCH
export default {
	input: "assets/js/index.js",
	output: {
		file: "public/js/app.js",
		format: "iife",
	},
	plugins: [
		json(),
		postcss({
			config: {
				path: path.resolve("./config/postcss.config.js"),
			},
			name: "style",
			extensions: [".css"],
			extract: true,
		}),
		resolve({ browser: true }), // tells Rollup how to find date-fns in node_modules
		commonjs(), // converts date-fns to ES modules
		production && terser(), // minify, but only in production
	],
}
