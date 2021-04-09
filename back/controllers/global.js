import Text from "../models/Text.js"
import Word from "../models/Word.js"
import { shuffleArray, getFilesRecursively } from "../utils/index.js"
import jwt from "jsonwebtoken"

let imgs = []

export async function getRules(req, res) {
	const rules = await Text.findOne({ type: "règles" })
	return res.json(rules)
}

export async function getImages(req, res) {
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
	return res.json({ imgs: imgs.slice(0, 30) })
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
		return res.status(401).json({ error: "Error. Need a token" })
	}

	jwt.verify(token, SECRET_JWT, (err, decodedToken) => {
		if (err) {
			res.status(401).json({ error: "Error. Bad token" })
		} else {
			req.token = decodedToken
			return next()
		}
	})
}

// export async function home(req, res) {
// 	imgs = getFilesRecursively(`./public/uploads`)
// 	imgs = imgs
// 		.map((img) =>
// 			img.includes("public") ? img.replace("public", "") : img
// 		)
// 		.filter(
// 			(file) =>
// 				!file.includes(".DS_Store") &&
// 				file
// 					.split(".")
// 					[file.split(".").length - 1].match(/jp(e)?g|png/g)
// 		)
// 	shuffleArray(imgs)
// 	const word = await Word.findOne({ isCurrent: true })
// 	return res.render("home", { text: req.rules, word, imgs })
// }
