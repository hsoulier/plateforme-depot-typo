import bcrypt from "bcrypt"
import User from "../models/User.js"

/**
 * Middleware to check if the user is connected
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export function checkLogin(req, res, next) {
	// if (process.env.NODE_ENV === "dev") {
	// 	req.session.loggedIn = true
	// 	return next()
	// }
	if (req.session.loggedIn) {
		return next()
	}
	return res.redirect("/login")
}

/**
 * Middleware to check if user exist in db
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export async function loginUser(req, res, next) {
	// if (process.env.NODE_ENV === "dev") {
	// 	req.session.loggedIn = true
	// 	return res.redirect("/dashboard")
	// }
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

/**
 * Updating the password wih the current password in body
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export async function updatePassword(req, res) {
	const method = req.method.toLowerCase()
	if (method === "get") return res.render("update")
	const { password, user } = req.body
	bcrypt.hash(password, 10, async (err, hash) => {
		if (err) return res.render("success", { success: false })
		const newUser = await User.updateOne({ user }, { password: hash })
	})
	req.session.loggedIn = undefined
	return res.render("login")
}

/**
 * Create new user
 * @param {*} req
 * @param {*} res
 */
export async function addingUser(req, res) {
	const { user, password } = req.body
	bcrypt.hash(password, 10, async (err, hash) => {
		try {
			const login = new User({ user, password: hash })
			const newUser = await login.save()
			console.log(newUser)
			res.render("success")
		} catch (e) {
			res.render("success", { success: false })
		}
	})
}
