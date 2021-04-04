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
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())
app.use(express.static("public"))
app.use(helmet())
app.use(morgan("dev"))
app.set("view engine", "hbs")
app.engine(
	"hbs",
	exphbs({
		extname: "hbs",
		partialsDir: "views/partials",
		handlebars: allowInsecurePrototypeAccess(handlebars),
	})
)

app.use("/populate", routerPopulate)
app.use("/user", routerUser)
app.use("/test", routerTest)
app.use("/", routerIndex)
app.all("*", (req, res) => {
	res.render("404")
})
app.listen(3005, () => {
	console.log("App listen on http://localhost:3005")
})
