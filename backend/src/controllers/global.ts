import Word from "../models/Word.js"
import jwt from "jsonwebtoken"
import { getFilesRecursively, shuffleArray } from "../utils/"
import { UserDoc } from "../models/schemas.js"





let imgs = []
export async function home(req: any, res: any) {
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


export function createToken({ email, isAdmin }: UserDoc) {
	const token = jwt.sign(
		{
			isAdmin,
			email,
		},
		// @ts-ignore
		process.env.SECRET_JWT,
		{ expiresIn: "1d" }
	)
	return token
}

const extractBearerToken = (headerValue: string) => {
	console.log(headerValue)
	if (typeof headerValue !== "string") {
		return false
	}

	const matches = headerValue.match(/(bearer)\s+(\S+)/i)
	return matches && matches[2]
}

export function checkToken(req: { headers: { authorization: any }; token: jwt.JwtPayload | undefined }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; error?: string }): void; new(): any } } }, next: () => void) {
	console.log(req.headers)
	const token =
		req.headers.authorization &&
		extractBearerToken(req.headers.authorization)

	if (!token) {
		return res.status(401).json({ message: `Error no token found in headers ${JSON.stringify(req.headers)}` })
	}

	// @ts-ignore
	jwt.verify(token, process.env.SECRET_JWT, (err, decodedToken) => {
		if (err) {
			res.status(401).json({ error: "Error. Bad token" })
		} else {
			req.token = decodedToken
			return next()
		}
	})
}
