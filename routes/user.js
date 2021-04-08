import { Router } from "express"
import { loginUser } from "../controllers/user.js"
const router = Router()

router.post("/login", loginUser)
router.get("/", (req, res) => {
	res.json({ route: req.url })
})

export default router
