import { Router } from "express"
import { home, getRules, checkToken } from "../controllers/global.js"
import { getInfosUser } from "../controllers/user.js"
import { uploadRepo } from "../controllers/repo.js"
import multer from "../controllers/multer.js"

const router = Router()

router.get("/", getRules, home)
router.get("/dashboard", checkToken, getInfosUser)
router.post("/submit-repo", multer, uploadRepo)

export default router
