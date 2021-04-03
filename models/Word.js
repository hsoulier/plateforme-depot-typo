import mongoose from "mongoose"
const { model, Schema } = mongoose
const wordSchema = new Schema({
	word: String,
	start: { type: Date, default: Date.now },
	end: Date,
	isCurrent: Boolean,
})

export default model("word", wordSchema)
