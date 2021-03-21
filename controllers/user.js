import bcrypt from "bcrypt"
import User from "../models/User.js"

export function checkLogin(req, res, next) {
	if (process.env.NODE_ENV === "dev") {
		req.session.loggedIn = true
		return next()
	}
	if (req.session.loggedIn) {
		return next()
	}
	return res.redirect("/login")
}

export async function loginUser(req, res, next) {
	if (process.env.NODE_ENV === "dev") {
		req.session.loggedIn = true
		return res.redirect("/dashboard")
	}
	const { user, password } = req.body

	if (user === undefined || password === undefined) {
		return res.redirect("/login")
	}
	try {
		User.findOne({ user }, (err, login) => {
			if (err) return res.render("success", { success: false })
			bcrypt.compare(password, login.password, (err, result) => {
				if (err) return res.render("success", { success: false })
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
	bcrypt.hash(password, 10, async (err, hash) => {
		try {
			const login = new User({ user, password: hash })
			const newUser = await login.save()
			console.log(newUser)
		} catch (e) {
			res.render("success", { success: false })
		}
	})
}
