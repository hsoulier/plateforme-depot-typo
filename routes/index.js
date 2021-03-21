import { Router } from "express"
import { uploadRepo, getAllRepos, zipFiles } from "../controllers/repo.js"
import { loginUser, addingUser, changeWord } from "../controllers/user.js"
import upload from "../controllers/multer.js"
import fs from "fs"
import path from "path"
const router = Router()

router.get("/", (req, res) => {
	fs.readFile(path.resolve("./word.json"), "utf8", (err, jsonString) => {
		if (err) {
			console.log("File read failed:", err)
			return
		}
		const data = JSON.parse(jsonString)
		console.log(`File data: ${data.word}`)
		res.render("home", { home: true, word: data.word })
	})
})
router.get("/disconnect", (req, res) => {
	req.session.loggedIn = undefined
	res.redirect("/")
})
router.get("/download", loginUser, zipFiles)
router.post("/submit-work", upload, uploadRepo)
router.post("/login-user", loginUser)
router.post("/change-word", changeWord)
router.get("/login", (req, res) => {
	res.render("login", { login: true, error: req.session.errorLogin })
})
router.get("/dashboard", getAllRepos)
router.get("/test", (req, res) => {
	res.render("success", { success: true })
})

export default router
