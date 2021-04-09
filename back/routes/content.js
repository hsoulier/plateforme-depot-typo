import { Router } from "express"
import { getRules, getImages } from "../controllers/global.js"
const router = Router()

router.get("/rules", getRules)
router.get("/images", getImages)

export default router
