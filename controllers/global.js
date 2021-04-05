import Text from "../models/Text.js"
import Word from "../models/Word.js"

export async function home(req, res) {
	const text = await Text.findOne({ type: "règles" })
	const word = await Word.findOne({ isCurrent: true })
	return res.render("home", { text, word })
}
