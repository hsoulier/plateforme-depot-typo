import Repo from "../models/Repo.js"
import zipFolder from "zip-a-folder"
import archiver from "archiver"
import path from "path"
import fs from "fs"

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
		console.log("Data has been drained")
		res.redirect(`/repos/${filename}`)
	})
	archive.on("warning", (err) => {
		if (err.code === "ENOENT") {
			console.log(err)
		} else {
			throw err
		}
	})

	archive.on("error", (err) => {
		res.status(500).send("Error")
		throw err
	})
	archive.pipe(output)
	archive.directory(path.join(__dirname, "/public/uploads/"), false)
	archive.finalize()
}

// With the Module Zip-A-Folder
export function zipFilesZipFolder(req, res) {
	const filename = `fonts-${Math.random().toString(36).substring(2)}.zip`
	const __dirname = path.resolve()
	console.log(path.join(__dirname, "../index.js"))
	zipFolder.zipFolder(
		path.join(__dirname, "/public/uploads"),
		path.join(__dirname, `/public/repos/${filename}`),
		(err) => {
			if (err) {
				console.log("Something went wrong!", err)
				return res.send("Une erreur est survenue")
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
