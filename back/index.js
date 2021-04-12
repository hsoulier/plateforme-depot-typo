import dotenv from "dotenv"
import express, { json } from "express"
import helmet from "helmet"
import morgan from "morgan"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import routerIndex from "./routes/index.js"
import routerContent from "./routes/content.js"
import routerUser from "./routes/user.js"

dotenv.config()
const app = express()

mongoose
	.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected")
	})
	.catch((err) => {
		console.error(`connection error: ${err}`)
	})

// Global middlewares
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(json())
app.use(express.static("public"))

// Router
app.use("/content", routerContent)
app.use("/user", routerUser)
app.use("/", routerIndex)
app.all("*", (req, res) => {
	res.json({ error: "404 page" })
})

// Start Server
app.listen(3005, () => {
	console.log("App listen on http://localhost:3005")
})
