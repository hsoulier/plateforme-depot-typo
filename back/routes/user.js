import { Router } from "express"
import { loginUser, getInfosUser } from "../controllers/user.js"
import { checkToken } from "../controllers/global.js"
const router = Router()

router.post("/login", loginUser)
router.get("/dashboard", checkToken, (req, res) => {
	res.json({ message: "Test" })
})
router.get("/", checkToken, getInfosUser)

export default router
