import dotenv from "dotenv"
import express, { json, urlencoded } from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import mongoose from "mongoose"
import routerIndex from "./routes/index.js"
import routerContent from "./routes/content.js"
import routerUser from "./routes/user.js"
import routerPopulate from "./utils/populate.js"
import routerTest from "./utils/routerTest.js"

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
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(express.static("public"))

// Router
// app.use("/populate", routerPopulate)
// app.use("/test", routerTest)
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
