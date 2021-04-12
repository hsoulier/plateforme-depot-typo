import { Router } from "express"
import { upload, renameFiles } from "../controllers/upload.js"

const router = Router()

router.get("/", (req, res) => {
	res.json({ message: "Hello sur l'API 👋" })
})

router.post("/repo", upload, renameFiles)

export default router
