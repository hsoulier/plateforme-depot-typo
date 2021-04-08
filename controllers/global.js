import Text from "../models/Text.js"
import Word from "../models/Word.js"
import { statSync, readdirSync } from "fs"
import { join } from "path"
import jwt from "jsonwebtoken"

const shuffleArray = (array) => {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1))
		var temp = array[i]
		array[i] = array[j]
		array[j] = temp
	}
}
let imgs = []
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
	imgs = getFilesRecursively(`./public/uploads`)
	imgs = imgs
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
	shuffleArray(imgs)
	const word = await Word.findOne({ isCurrent: true })
	return res.render("home", { text: req.rules, word, imgs })
}

export async function getRules(req, res, next) {
	req.rules = await Text.findOne({ type: "règles" })
	next()
}

export function createToken({ id, email }) {
	const token = jwt.sign(
		{
			id,
			email,
		},
		process.env.SECRET_JWT,
		{ expiresIn: "1d" }
	)
	return token
}

const extractBearerToken = (headerValue) => {
	if (typeof headerValue !== "string") {
		return false
	}

	const matches = headerValue.match(/(bearer)\s+(\S+)/i)
	return matches && matches[2]
}

export function checkToken(req, res, next) {
	const token =
		req.headers.authorization &&
		extractBearerToken(req.headers.authorization)

	if (!token) {
		return res.status(401).json({ message: "Error. Need a token" })
	}

	jwt.verify(token, SECRET_JWT, (err, decodedToken) => {
		if (err) {
			res.status(401).json({ message: "Error. Bad token" })
		} else {
			req.token = decodedToken
			return next()
		}
	})
}
