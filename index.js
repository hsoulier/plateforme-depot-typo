import dotenv from "dotenv"
import express, { json } from "express"
import bodyParser from "body-parser"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import mongoose from "mongoose"
import session from "express-session"
import mustacheExpress from "mustache-express"
import {uploadRepo, getAllRepos} from "./controllers/repo.js"
import { loginUser, addingUser } from "./controllers/user.js"
import upload from "./controllers/multer.js"

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
app.set("trust proxy", 1)
app.use(
    session({
        secret: process.env.SECRET_SESSION,
        name: "uniqueSessionID",
        proxy: true,
        resave: true,
        saveUninitialized: true,
        cookie: { secure: true },
    })
)
app.use(json())
app.use(cors())
app.use(express.static("public"))
app.use(helmet())
app.use(morgan("dev"))
app.engine("html", mustacheExpress("views/partials", ".html"))
app.set("view engine", "html")
app.set("views", "views")

app.get("/", (req, res) => {
    res.render("home", { home: true })
})
app.post("/submit-work", upload, uploadRepo)
app.post("/login-user", loginUser)
app.get("/login", (req, res) => {
    const error = req.session.error || false
    res.render("login", { login: true, error: error })
})
app.get("/dashboard",getAllRepos)

app.listen(3005, () => {
    console.log("App listen on http://localhost:3005")
})
