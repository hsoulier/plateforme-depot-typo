import { Router } from "express"
import { home } from "../controllers/global.js"
const router = Router()

router.get("/", home)

export default router
