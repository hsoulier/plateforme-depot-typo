import mongoose from "mongoose"
const { model, Schema } = mongoose
const repoSchema = new Schema({
    name: String,
    nickname: String,
    date: { type: Date, default: Date.now },
    socialNetwork: Object,
    file: String,
})

export default model("repo", repoSchema)

