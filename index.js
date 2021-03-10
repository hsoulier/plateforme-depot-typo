import dotenv from "dotenv"
import express, { json } from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import mongoose from "mongoose"
// import session from "express-session"
import mustacheExpress from "mustache-express"
import uploadRepo from "./controllers/repo.js"
import upload from "./controllers/multer.js"

dotenv.config()
const app = express()

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection
db.on("error", (err) => {
    console.error(`connection error: ${err}`)
})
db.once("open", () => {
    console.log("Connected")
})

// Global middlewares
// app.set("trust proxy", 1)
// app.use(
//     session({
//         secret: process.env.SECRET_SESSION,
//         proxy: true,
//         resave: false,
//         saveUninitialized: true,
//         cookie: { secure: true },
//     })
// )
app.use(cors())
app.use(json())
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
app.get("/login", (req, res) => {
    // res.render("login", { login: true, error: req.session.error })
    res.render("login", { login: true })
})
app.post("/login-user", (req, res) => {
    console.log(req.body)
    const { user, password } = req.body
    console.log({
        user,
        dbname: process.env.USER_TEST,
        password,
        dbpass: process.env.PASSWORD_TEST,
    })
    if (
        user !== process.env.USER_TEST ||
        password !== process.env.PASSWORD_TEST
    ) {
        // req.session.error = "Mauvais identifiants"
        res.redirect("/login")
    } else {
        // req.session.error = false
        req.session.login = true
    }
})
app.get("/dashboard", (req, res) => {
    console.log(req.session.login)
    if (!req.session.login) {
        res.redirect("/login")
    }
    res.render("dashboard")
})

app.listen(3005, () => {
    console.log("App listen on http://localhost:3005")
})
