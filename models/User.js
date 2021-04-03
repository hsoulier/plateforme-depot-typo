import mongoose from "mongoose"
const { model, Schema } = mongoose
const userSchema = new Schema({
	name: String,
	email: String,
	password: String,
	isAdmin: Boolean,
	socials: Object,
	repos: Array,
})

export default model("user", userSchema)
