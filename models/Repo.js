import mongoose from "mongoose"
const { model, Schema, ObjectId } = mongoose

const optString = {
	type: String,
	required: false,
}
const repoSchema = new Schema({
	user: ObjectId,
	word: ObjectId,
	name: optString,
	email: optString,
	description: optString,
	date: { type: Date, default: Date.now },
	socialNetwork: {
		type: Object,
		required: false
	},
	files: Array,
})

export default model("repo", repoSchema)
