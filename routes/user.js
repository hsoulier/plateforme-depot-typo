import { Router } from "express"
import { getInfosUser } from "../controllers/user.js"
import { checkToken } from "../controllers/global.js"
import { loginUser } from "../controllers/user.js"
const router = Router()

router.post("/login", loginUser)
router.get("/", checkToken, getInfosUser)

export default router
