import dotenv from "dotenv"
import express, { json } from "express"
import bodyParser from "body-parser"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import mongoose from "mongoose"
import session from "express-session"
import exphbs from "express-handlebars"
import handlebars from "handlebars"
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access"
import router from "./routes/index.js"

dotenv.config()
const app = express()

mongoose
	.connect(process.env.DB_URI_DEV, {
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
app.set("trust proxy", 1)
app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: process.env.SECRET_SESSION,
		cookie: { maxAge: 21600000 },
	})
)
app.use(bodyParser.urlencoded({ extended: false }))
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

app.use("/", router)
app.all("*", (req, res) => {
	res.render("404")
})
app.listen(3005, () => {
	console.log("App listen on http://localhost:3005")
})
