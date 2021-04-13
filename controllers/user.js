import bcrypt from "bcrypt"
import User from "../models/User.js"
import { createToken } from "./global.js"

export async function loginUser(req, res) {
	try {
		const { email, password } = req.body
		const userDb = await User.findOne({ email })
		if (!Boolean(userDb)) return res.json({ success: "Bad email" })
		const result = await bcrypt.compare(password, userDb.password)
		if (!result) return res.json({ success: "Bad password" })
		const token = createToken(userDb)
		return res.json({ token })
		// return res.redirect("/dash")
	} catch (e) {
		return res.render("success", { success: false })
	}
}

export const getInfosUser = async (req, res) => {
	const user = await User.findById(req.token.id, "-password")
	console.log(user)
	return res.json(user)
}

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
