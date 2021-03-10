import dotenv from "dotenv"
import express, { json } from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import mongoose from "mongoose"
import mustacheExpress from "mustache-express"
import upload from "./controllers/multer.js"

const app = express()
dotenv.config()

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection
db.on("error", (err) => {
    console.error(`connection error ${err}`)
})
db.on("open", () => {
    console.log("Connected")
})

// Global middlewares
app.use(cors())
app.use(json())
app.use(express.static("public"))
app.use(helmet())
app.use(morgan("dev"))
app.engine("html", mustacheExpress())
app.set("view engine", "html")
app.set("views", "views")

app.get("/", (req, res) => {
    res.render("home", { name: "Sherlynn" })
})
app.post("/submit-work", upload, (req, res) => {
    res.send(`File submitted and file is ${req.file}`)
})

app.listen(3005, () => {
    console.log("App listen on http://localhost:3005")
})
