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
import { uploadRepo, getAllRepos, zipFiles } from "./controllers/repo.js"
import { loginUser, addingUser } from "./controllers/user.js"
import upload from "./controllers/multer.js"
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access"

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

app.get("/", (req, res) => {
    res.render("home", { home: true })
})
app.get("/disconnect", (req, res) => {
    req.session.loggedIn = undefined
    res.redirect("/")
})
app.get("/download", loginUser, zipFiles)
app.post("/submit-work", upload, uploadRepo)
app.post("/login-user", loginUser)
app.get("/login", (req, res) => {
    res.render("login", { login: true, error: req.session.errorLogin })
})
app.get("/dashboard", getAllRepos)

app.listen(3005, () => {
    console.log("App listen on http://localhost:3005")
})
