import mongoose from "mongoose"
const { model, Schema } = mongoose
const userSchema = new Schema({
    user: String,
    password: String,
})

export default model("user", userSchema)
