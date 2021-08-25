import bcrypt from "bcrypt"
import User from "../models/User.js"
import { createToken } from "./global.js"

export const loginUser = async (req: any, reply: any) => {
	try {
		const email = req.body.email
		const password = req.body.password
		console.log({ email, password })
		const userDb = await User.findOne({ email })
		if (!userDb) return reply.send("Error, wrong email")
		console.log({ db: userDb });

		const result = bcrypt.compareSync(password, userDb.password)
		console.log({ result })
		// if (!result) return reply.send({ message: "Error, wrong pasword" })
		const token = createToken(userDb)
		return reply.send({ token })
		reply.send("Success")
	} catch (e) {
		console.log(e)
		return reply.send({ message: "Error, no user found" })
	}
}

// export const getInfosUser = async (req, res) => {
// 	const user = await User.findById(req.token.id, "-password")
// 	console.log(user)
// 	return res.json(user)
// }

// export async function updatePassword(req, res) {
// 	const method = req.method.toLowerCase()
// 	if (method === "get") return res.render("update")
// 	const { password, user } = req.body
// 	bcrypt.hash(password, 10, async (err, hash) => {
// 		if (err) return res.json({ message: `Error, password not updated, ${e}` })
// 		const newUser = await User.updateOne({ user }, { password: hash })
// 	})
// 	req.session.loggedIn = undefined
// 	return res.render("login")
// }

export const addingUser = async (req: any, reply: any) => {
	const { email, password } = req.body
	bcrypt.hash(password, 10, async (err, hash) => {
		try {
			const login = new User({ email, password: hash })
			const newUser = await login.save()
			console.log(newUser)
			reply.send({ message: `Success, user created` })
		} catch (e) {
			reply.send({ message: `Error, user not created, ${e}` })
		}
	})
}
