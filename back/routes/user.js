import { Router } from "express"
import { loginUser } from "../controllers/user.js"
import { checkToken } from "../controllers/global.js"
const router = Router()

router.post("/login", loginUser)
router.get("/", (req, res) => {
	res.json({ route: req.url })
})
router.get("/dashboard", checkToken, (req, res) => {
	res.render("submit-repo")
})

export default router
