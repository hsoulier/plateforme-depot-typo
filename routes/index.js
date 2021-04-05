import { Router } from "express"
import { home } from "../controllers/global.js"
const router = Router()

router.get("/", home)
router.get("/login", home)

export default router
