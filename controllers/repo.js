import Repo from "../models/Repo.js"
import faker from "faker"
import archiver from "archiver"
import { formatBytes, jsonReader, delAt } from "../utils/index.js"
import fs, { promises as fsPromises } from "fs"
import path from "path"

export function uploadRepo(req, res, next) {
	const { nickname, name, instagram, twitter, email, description } = req.body
	const socialNetwork = {
		instagram: delAt(instagram),
		twitter: delAt(twitter),
	}
	console.log(req.files)
	const files = []
	req.files.forEach((file) => {
		files.push(file.filename)
	})
	console.log({ nickname, name, socialNetwork, email, files })
	try {
		const repo = new Repo({
			nickname,
			name,
			email,
			description,
			socialNetwork,
			files,
		})
		repo.save((err) => {
			if (err) return res.render("success", { success: false })
			res.render("success", { success: true })
		})
	} catch (e) {
		res.render("success", { success: false })
	}
}

export function getAllRepos(req, res) {
	if (req.session.loggedIn) {
		Repo.find({}, (err, repos) => {
			if (err) return res.status(500).send("Error")
			let allRepos = []
			repos.forEach((repo) => {
				const date = new Date(repo.date)
				const el = repo
				const exts = []
				;[...repo.files].forEach((file) => {
					const arrFile = file.split(".")
					exts.push(arrFile[arrFile.length - 1])
				})
				el.exts = exts
				el.message = encodeURI(repo.description)
				el.dateRepo = `${date.getDate()}/${
					date.getMonth() + 1
				}/${date.getFullYear()}`
				allRepos.push(el)
			})
			console.log(allRepos)
			res.render("dashboard", { repos: allRepos })
		})
	} else {
		res.redirect("/login")
	}
}
export function zipFiles(req, res) {
	const __dirname = path.resolve()
	const filename = `fonts-${Math.random().toString(36).substring(2)}.zip`
	const output = fs.createWriteStream(__dirname + `/public/repos/${filename}`)
	const archive = archiver("zip", {
		zlib: { level: 9 }, // Sets the compression level.
	})
	output.on("close", () => {
		console.log(
			`${formatBytes(archive.pointer())} total bytes, archiver done`
		)
		res.redirect(`/repos/${filename}`)
	})
	output.on("end", () => {
		res.redirect(`/repos/${filename}`)
	})
	archive.on("warning", (err) => {
		if (err.code === "ENOENT") {
			return res.render("success", { success: false })
		} else {
			throw err
		}
	})
	archive.on("error", (err) => {
		res.status(500).render("success", { success: false })
		throw err
	})
	archive.pipe(output)
	archive.directory(path.join(__dirname, "/public/uploads/current/"), false)
	archive.finalize()
}

export async function changeWord(req, res) {
	const data = await fsPromises.readFile(path.resolve("./word.json"))
	const oldWord = JSON.parse(data).word
	jsonReader(path.resolve("./word.json"), (err, file) => {
		if (err) return res.json({ message: "Une erreur est survenue" })
		file.word = req.body["word"]
		fs.writeFile(
			path.resolve("./word.json"),
			JSON.stringify(file),
			(err) => {
				if (err) return res.json({ message: "Une erreur est survenue" })
			}
		)
	})
	await fsPromises.rename(
		path.resolve(`./public/uploads/current`),
		path.resolve(`./public/uploads/${oldWord}`)
	)
	await fsPromises.mkdir(path.resolve("./public/uploads/current"))
	// await Repo.deleteMany({})
	return res.json({ message: "Mot mis à jour" })
}