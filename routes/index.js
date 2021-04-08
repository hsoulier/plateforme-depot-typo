import { Router } from "express"
import { home, getRules, checkToken } from "../controllers/global.js"
const router = Router()

router.get("/", getRules, home)
router.get("/submit", getRules, (req, res) => {
	res.render("submit-repo", { text: req.rules })
})
router.get("/dash", checkToken, getRules, (req, res) => {
	res.render("submit-repo", { text: req.rules, token: req.token })
})
router.get("/login", getRules, (req, res) => {
	res.render("login", { text: req.rules })
})

export default router
