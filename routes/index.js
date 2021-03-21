import { Router } from "express"
import {
	uploadRepo,
	getAllRepos,
	zipFiles,
	changeWord,
} from "../controllers/repo.js"
import { loginUser, checkLogin, addingUser } from "../controllers/user.js"
import upload from "../controllers/multer.js"
import fs from "fs"
import path from "path"
const router = Router()

router.get("/", (req, res) => {
	fs.readFile(path.resolve("./word.json"), "utf8", (err, jsonString) => {
		if (err) return res.render("success", { success: false })
		const data = JSON.parse(jsonString)
		res.render("home", { home: true, word: data.word })
	})
})
router.get("/disconnect", (req, res) => {
	req.session.loggedIn = undefined
	res.redirect("/")
})
router.post("/submit-work", upload, uploadRepo)
router.post("/login-user", loginUser)
router.get("/download", checkLogin, zipFiles)
router.post("/change-word", checkLogin, changeWord)
router.get("/dashboard", checkLogin, getAllRepos)
router.get("/login", (req, res) => {
	res.render("login", { login: true, error: req.session.errorLogin })
})
router.post("/add-user", addingUser)


export default router
