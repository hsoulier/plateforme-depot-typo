import { Router } from "express"
import upload from "../controllers/multer.js";

const router = Router()

router.get("/", (req, res) => {
	res.json({ message: "Hello sur l'API 👋" })
})

router.post("/repo", upload, (req, res) => {
	res.json({ message: "Envoyé" })
})

export default router
