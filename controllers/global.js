import Text from "../models/Text.js"

export async function home(req, res) {
	const text = await Text.findOne({ type: "règles" })
	return res.render("home", { view: "home", text })
}
