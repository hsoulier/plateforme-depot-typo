import mongoose from "mongoose"
import { UserDoc } from "./schemas"
const { model, Schema } = mongoose
const userSchema = new Schema({
	name: String,
	email: String,
	password: String,
	isAdmin: Boolean,
	socials: Object,
})

export default model<UserDoc>("user", userSchema)
