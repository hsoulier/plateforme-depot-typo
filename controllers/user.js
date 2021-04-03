import bcrypt from "bcrypt"
import User from "../models/User.js"
import faker from "faker"

export function checkLogin(req, res, next) {
	return res.redirect("/login")
}

export async function loginUser(req, res, next) {
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

const hashPassword = async (password, saltRounds = 10) => {
	try {
		const salt = await bcrypt.genSalt(saltRounds)
		return await bcrypt.hash(password, salt)
	} catch (error) {
		console.log(error)
	}
	return null
}

export async function populateUser(req, res) {
	let data = []
	for (let i = 0; i < 20; i++) {
		const pwd = faker.internet.password()
		const password = await hashPassword(pwd)
		let repos = []
		const email = faker.internet.email()
		for (let j = 0; j < Math.round(Math.random() * 10); j++) {
			repos[j] = faker.datatype.number()
		}
		console.log({ email, pwd })
		data = [
			...data,
			{
				name: faker.name.findName(),
				email,
				isAdmin: false,
				socials: {
					twitter: faker.name.firstName(),
					instagram: faker.name.firstName(),
				},
				repos,
				password,
			},
		]
	}
	User.insertMany(data, function (error, docs) {
		if (error) return res.json({ error })
		res.json({ message: "Success Populate", result: docs })
	})
}
