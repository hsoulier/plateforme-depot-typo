import { Router } from "express"
import { home, getRules, checkToken } from "../controllers/global.js"
import { getInfosUser } from "../controllers/user.js"
import { uploadRepo } from "../controllers/repo.js"
import { loginUser } from "../controllers/user.js"
import multer from "../controllers/multer.js"

const router = Router()

router.get("/", (req, res) => {
	res.json({ message: "Hello there 👋, you're very curious" })
})
router.get("/rules", getRules)
router.post("/login", loginUser)
router.post("/user-infos", checkToken, getInfosUser)
router.get("/dashboard", checkToken, getInfosUser)
router.post("/submit-repo", multer, uploadRepo)

export default router
