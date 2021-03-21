import bcrypt from "bcrypt"
import User from "../models/User.js"
import fs from "fs"
import path from "path"

export async function loginUser(req, res, next) {
	if (process.env.NODE_ENV === "dev") {
		req.session.loggedIn = true
		return res.redirect("/dashboard")
	}
	const { user, password } = req.body
	console.log({ user, password, loggedIn: req.session.loggedIn })
	if (req.session.loggedIn) {
		return next()
	}
	if (user === undefined || password === undefined) {
		return res.redirect("/login")
	}
	try {
		User.findOne({ user }, (err, login) => {
			if (err)
				return res.statut(500).render("success", { success: false })
			bcrypt.compare(password, login.password, (err, result) => {
				if (err)
					return res.statut(500).render("success", { success: false })
				if (result) {
					req.session.loggedIn = true
					res.redirect("/dashboard")
				} else {
					req.session.errorLogin = "Mauvais identifiants"
					res.redirect("/login")
				}
			})
		})
	} catch (e) {
		res.render("success", { success: false })
	}
}

export async function addingUser(req, res) {
	const { user, password } = req.body
	bcrypt.hash(password, 10, (err, hash) => {
		try {
			const login = new User({ user, password: hash })
			login.save((err) => {
				if (err) return res.render("success", { success: false })
				res.render("success", { success: true })
			})
		} catch (e) {
			res.render("success", { success: false })
		}
	})
}

export function changeWord(req, res) {
	console.log(req.body)
	jsonReader(path.resolve("./word.json"), (err, file) => {
		if (err) {
			res.json({ message: "Une erreur est survenue" })
			return
		}
		file.word = req.body["word"]
		fs.writeFile(
			path.resolve("./word.json"),
			JSON.stringify(file),
			(err) => {
				if (err) return res.json({ message: "Une erreur est survenue" })
			}
		)
		return res.json({ message: "Mot mis à jour" })
	})
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
