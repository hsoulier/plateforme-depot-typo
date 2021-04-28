import mongoose from "mongoose"

const { model, Schema, ObjectId } = mongoose

const optString = {
	type: String,
	required: false
}
const repoSchema = new Schema({
	userId: ObjectId,
	wordId: ObjectId,
	name: String,
	email: String,
	description: optString,
	date: { type: Date, default: Date.now },
	socialNetwork: {
		type: Object,
		required: false
	},
	files: Array
})

export default model("repo", repoSchema)
