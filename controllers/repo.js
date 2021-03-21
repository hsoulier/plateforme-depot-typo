import Repo from "../models/Repo.js"
import zipFolder from "zip-a-folder"
import archiver from "archiver"
import fs, { promises as fsPromises } from "fs"
import path from "path"

export function uploadRepo(req, res, next) {
	const { nickname, name, instagram, twitter, email, description } = req.body
	const socialNetwork = { instagram, twitter }
	console.log({ nickname, name, socialNetwork, file: req.file })
	try {
		const repo = new Repo({
			nickname,
			name,
			email,
			description,
			socialNetwork,
			file: req.file.filename,
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
				const file = repo.file.split(".")
				const el = repo
				el.message = encodeURI(repo.description)
				el.fileExtension = file[file.length - 1]
				el.dateRepo = `${date.getDate()}/${
					date.getMonth() + 1
				}/${date.getFullYear()}`
				allRepos.push(el)
			})
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
			return res.render("success", {success: false})
		} else {
			throw err
		}
	})
	archive.on("error", (err) => {
		res.status(500).render("success", { success: false })
		throw err
	})
	archive.pipe(output)
	archive.directory(path.join(__dirname, "/public/uploads/"), false)
	archive.finalize()
}

export async function changeWord(req, res) {
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
	await fsPromises.rmdir(path.resolve("./public/uploads/"), {
		recursive: true,
	})
	await fsPromises.mkdir(path.resolve("./public/uploads/"))
	await Repo.deleteMany({})
	return res.json({ message: "Mot mis à jour" })
}

function jsonReader(filePath, cb) {
	fs.readFile(filePath, (err, fileData) => {
		if (err) {
			return cb && cb(err)
		}
		try {
			const object = JSON.parse(fileData)
			return cb && cb(null, object)
		} catch (err) {
			return cb && cb(err)
		}
	})
}

// With the Module Zip-A-Folder
export function zipFilesZipFolder(req, res) {
	const filename = `fonts-${Math.random().toString(36).substring(2)}.zip`
	const __dirname = path.resolve()
	zipFolder.zipFolder(
		path.join(__dirname, "/public/uploads"),
		path.join(__dirname, `/public/repos/${filename}`),
		(err) => {
			if (err) {
				return res.render("success", { success: false })
			}
		}
	)
	res.redirect(`/repos/${filename}`)
}

function formatBytes(bytes, decimals = 2) {
	if (bytes === 0) return "0 Bytes"

	const k = 1024
	const dm = decimals < 0 ? 0 : decimals
	const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

	const i = Math.floor(Math.log(bytes) / Math.log(k))

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}
