import { Router } from "express"
import { populateUser } from "../controllers/user.js"
const router = Router()

router.get("/populate", populateUser)
router.get("*", (req, res) => {
	res.json({ route: req.url })
})

export default router
