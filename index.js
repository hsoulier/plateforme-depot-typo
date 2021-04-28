import dotenv from "dotenv"
import express, { json, urlencoded } from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import mongoose from "mongoose"
import exphbs from "express-handlebars"
import handlebars from "handlebars"
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access"
import routerIndex from "./routes/index.js"
import routerUser from "./routes/user.js"
import routerApi from "./routes/api.js"
import { returnButton } from "./utils/handlebars.js"

dotenv.config()
const app = express()

mongoose
	.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("Connected")
	})
	.catch((err) => {
		console.error(`connection error: ${err}`)
	})

const hbs = exphbs.create({
	extname: "hbs",
	partialsDir: "views/partials",
	handlebars: allowInsecurePrototypeAccess(handlebars),
	helpers: {
		returnButton
	}
})

// Global middlewares
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(express.static("public"))
app.set("view engine", "hbs")
app.engine("hbs", hbs.engine)

// Router
app.use("/api/v1", routerApi)
app.use("/user", routerUser)
app.use("/", routerIndex)
app.all("*", (req, res) => {
	res.render("404")
})

// Start Server
app.listen(3005, () => {
	console.log("App listen on http://localhost:3005")
})
