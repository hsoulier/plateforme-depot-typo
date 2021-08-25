"use strict";
// import Repo from "../models/Repo.js"
// import Word from "../models/Word.js"
// import archiver from "archiver"
// import { formatBytes, jsonReader, delAt } from "../utils/index.js"
// import fs, { promises as fsPromises } from "fs"
// import path from "path"
// export async function uploadRepo(req, res, next) {
// 	const {
// 		firstName,
// 		name,
// 		instagram,
// 		twitter,
// 		email,
// 		description,
// 		userId,
// 	} = req.body
// 	const socialNetwork = {
// 		instagram: delAt(instagram),
// 		twitter: delAt(twitter),
// 	}
// 	console.log(req.files)
// 	const files = []
// 	req.files.forEach((file) => {
// 		files.push(file.filename)
// 	})
// 	try {
// 		const currentWord = await Word.find({ isCurrent: true })
// 		const repo = new Repo({
// 			name: `${firstName} ${name}`,
// 			email,
// 			description,
// 			socialNetwork,
// 			files,
// 			wordId: currentWord._id,
// 			userId,
// 		})
// 		repo.save((err) => {
// 			if (err) return res.json({ message: "Error, repo not saved" })
// 			res.json({ message: "Success, the repo was uploaded" })
// 		})
// 	} catch (e) {
// 		res.json({ message: `Error, repo not saved, ${e}` })
// 	}
// }
// export function getAllRepos(req, res) {
// 	if (req.session.loggedIn) {
// 		Repo.find({}, (err, repos) => {
// 			if (err) return res.status(500).send("Error")
// 			let allRepos = []
// 			repos.forEach((repo) => {
// 				const date = new Date(repo.date)
// 				const el = repo
// 				const exts = []
// 				;[...repo.files].forEach((file) => {
// 					const arrFile = file.split(".")
// 					exts.push(arrFile[arrFile.length - 1])
// 				})
// 				el.exts = exts
// 				el.message = encodeURI(repo.description)
// 				el.dateRepo = `${date.getDate()}/${
// 					date.getMonth() + 1
// 				}/${date.getFullYear()}`
// 				allRepos.push(el)
// 			})
// 			console.log(allRepos)
// 			res.render("dashboard", { repos: allRepos })
// 		})
// 	} else {
// 		res.redirect("/login")
// 	}
// }
// export function zipFiles(req, res) {
// 	const __dirname = path.resolve()
// 	const filename = `fonts-${Math.random().toString(36).substring(2)}.zip`
// 	const output = fs.createWriteStream(__dirname + `/public/repos/${filename}`)
// 	const archive = archiver("zip", {
// 		zlib: { level: 9 }, // Sets the compression level.
// 	})
// 	output.on("close", () => {
// 		console.log(
// 			`${formatBytes(archive.pointer())} total bytes, archiver done`
// 		)
// 		res.redirect(`/repos/${filename}`)
// 	})
// 	output.on("end", () => {
// 		res.redirect(`/repos/${filename}`)
// 	})
// 	archive.on("warning", (err) => {
// 		if (err.code === "ENOENT") {
// 			return res.json({ message: `Error, compression failed, ${e}` })
// 		} else {
// 			throw err
// 		}
// 	})
// 	archive.on("error", (err) => {
// 		res.status(500).json({ message: `Error, compression failed, ${e}` })
// 		throw err
// 	})
// 	archive.pipe(output)
// 	archive.directory(path.join(__dirname, "/public/uploads/current/"), false)
// 	archive.finalize()
// }
// export async function changeWord(req, res) {
// 	const data = await fsPromises.readFile(path.resolve("./word.json"))
// 	const oldWord = JSON.parse(data).word
// 	jsonReader(path.resolve("./word.json"), (err, file) => {
// 		if (err) return res.json({ message: "Une erreur est survenue" })
// 		file.word = req.body["word"]
// 		fs.writeFile(
// 			path.resolve("./word.json"),
// 			JSON.stringify(file),
// 			(err) => {
// 				if (err) return res.json({ message: "Une erreur est survenue" })
// 			}
// 		)
// 	})
// 	await fsPromises.rename(
// 		path.resolve(`./public/uploads/current`),
// 		path.resolve(`./public/uploads/${oldWord}`)
// 	)
// 	await fsPromises.mkdir(path.resolve("./public/uploads/current"))
// 	// await Repo.deleteMany({})
// 	return res.json({ message: "Mot mis à jour" })
// }
//# sourceMappingURL=repo.js.map