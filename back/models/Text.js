import mongoose from "mongoose"
const { model, Schema } = mongoose
const textSchema = new Schema({
	type: String,
	content: String,
})

export default model("text", textSchema)
