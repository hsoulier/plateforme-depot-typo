import Text from "../models/Text.js"
import Word from "../models/Word.js"
import { statSync, readdirSync } from "fs"
import { resolve, join } from "path"

let files = []
const isDirectory = (path) => statSync(path).isDirectory()
const getDirectories = (path) =>
	readdirSync(path)
		.map((name) => join(path, name))
		.filter(isDirectory)

const isFile = (path) => statSync(path).isFile()
const getFiles = (path) =>
	readdirSync(path)
		.map((name) => join(path, name))
		.filter(isFile)

const getFilesRecursively = (path) => {
	let dirs = getDirectories(path)
	let files = dirs
		.map((dir) => getFilesRecursively(dir))
		.reduce((a, b) => a.concat(b), [])
	return files.concat(getFiles(path))
}

export async function home(req, res) {
	files = getFilesRecursively(`./public/uploads`)
	let imgs = files
		.map((img) =>
			img.includes("public") ? img.replace("public", "") : img
		)
		.filter(
			(file) =>
				!file.includes(".DS_Store") &&
				file
					.split(".")
					[file.split(".").length - 1].match(/jp(e)?g|png/g)
		)
	console.log(imgs)
	const word = await Word.findOne({ isCurrent: true })
	return res.render("home", { text: req.rules, word, imgs })
}

export async function getRules(req, res, next) {
	req.rules = await Text.findOne({ type: "règles" })
	next()
}
