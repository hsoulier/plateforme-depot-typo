import { Router } from "express"
import { hashPassword } from "./index.js"
import Word from "../models/Word.js"
import User from "../models/User.js"
import Repo from "../models/Repo.js"
import faker from "faker"
const router = Router()

router.get("/user", async (req, res) => {
	try {
		let data = []
		for (let i = 0; i < 5; i++) {
			const pwd = faker.internet.password()
			const password = await hashPassword(pwd)
			const email = faker.internet.email()
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
					password,
				},
			]
		}
		const inserted = await User.insertMany(data)
		return res.json({ result: inserted })
	} catch (error) {
		return res.json(error)
	}
})
router.get("/word", async (req, res) => {
	try {
		const words = ["ligatures", "kaléidoscope", "synthetica"]
		let data = []
		for (let i = 0; i < words.length; i++) {
			const start = faker.date.past()
			const now = new Date().toISOString()
			const end = faker.date.between(start, now)
			data = [
				...data,
				{
					word: words[i],
					start,
					end,
					isCurrent: false,
				},
			]
		}
		const inserted = await Word.insertMany(data)
		return res.json({ result: inserted })
	} catch (error) {
		console.log(error)
		return res.json({ error })
	}
})
router.get("/repo", async (req, res) => {
	try {
		const words = await Word.find()
		const users = await User.find()
		const idsWords = words.map((word) => word._id)
		const idsUsers = users.map((user) => user._id)
		let repos = []
		idsWords.forEach((idWord) => {
			// const n = Math.round(Math.random() * 10)
			const n = 10
			for (let i = 0; i < n; i++) {
				const repo = {
					wordId: idWord,
					userId:
						idsUsers[
							Math.round(Math.random() * (idsUsers.length - 1))
						],
					files: ["test-test.png"],
					date: faker.date.recent(),
				}
				repos = [...repos, repo]
			}
		})
		const inserted = await Repo.insertMany(repos)
		return res.json({ result: inserted })
	} catch (error) {
		console.log(error)
		return res.json({ error })
	}
})

export default router
