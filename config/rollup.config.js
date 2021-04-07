import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { terser } from "rollup-plugin-terser"
import scss from "rollup-plugin-scss"
import json from "@rollup/plugin-json"
import sass from "sass"

const production = !process.env.ROLLUP_WATCH

export default {
	input: "assets/js/index.js",
	output: {
		file: "public/js/app.js",
		format: "iife",
	},
	plugins: [
		json(),
		scss({
			sourceMap: !production,
			watch: "./assets/style",
			output: "./public/css/style.css",
			outputStyle: production ? "compressed" : "expanded",
			failOnError: true,
			runtime: sass,
		}),
		resolve({ browser: true }),
		commonjs(),
		production && terser(),
	],
}
