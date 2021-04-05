import { Router } from "express"
import { home, getRules } from "../controllers/global.js"
const router = Router()

router.get("/", getRules, home)
router.get("/login", getRules, (req, res) => {
	res.render("login", { text: req.rules })
})

export default router
