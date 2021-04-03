import mongoose from "mongoose"
const { model, Schema, ObjectId } = mongoose

const repoSchema = new Schema({
	user: ObjectId,
	word: ObjectId,
	name: String,
	email: String,
	description: String,
	date: { type: Date, default: Date.now },
	socialNetwork: Object,
	files: Array,
})

export default model("repo", repoSchema)
