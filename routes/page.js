import { Router } from "express"
import { home, getRules } from "../controllers/global.js"

const router = Router()

router.get("/", getRules, home)
router.get("/submit", getRules, (req, res) => {
	res.render("submit-repo", { text: req.rules })
})
router.get("/dashboard", getRules, (req, res) => {
	res.render("dashboard")
})
router.get("/login", getRules, (req, res) => {
	res.render("login", { text: req.rules })
})
router.get("/legals", (req, res) => {
	res.render("legals")
})

export default router
