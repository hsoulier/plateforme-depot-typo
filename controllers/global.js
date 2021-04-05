import Text from "../models/Text.js"
import Word from "../models/Word.js"

export async function home(req, res) {
	const word = await Word.findOne({ isCurrent: true })
	return res.render("home", { text: req.rules, word })
}

export async function getRules(req, res, next) {
	req.rules = await Text.findOne({ type: "règles" })
	next()
}
