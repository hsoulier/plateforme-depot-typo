import Repo from "../models/Repo.js"
import zipFolder from "zip-a-folder"
import path from "path"

export function uploadRepo(req, res, next) {
    const { nickname, name, instagram, twitter } = req.body
    const socialNetwork = { instagram, twitter }
    console.log({ nickname, name, socialNetwork, file: req.file })
    try {
        const repo = new Repo({
            nickname,
            name,
            socialNetwork,
            file: req.file.filename,
        })
        repo.save((err) => {
            if (err) return res.render("success", { success: false })
            res.render("success", { success: true })
        })
    } catch (e) {
        res.render("success", { success: false })
    }
}

export function getAllRepos(req, res) {
    if (req.session.loggedIn) {
        Repo.find({}, (err, repos) => {
            if (err) return res.status(500).send("Error")
            let allRepos = []
            repos.forEach((repo) => {
                const date = new Date(repo.date)
                const file = repo.file.split(".")
                const el = repo
                el.fileExtension = file[file.length - 1]
                el.dateRepo = `${date.getDate()}/${
                    date.getMonth() + 1
                }/${date.getFullYear()}`
                allRepos.push(el)
            })
            res.render("dashboard", { repos: allRepos })
        })
    } else {
        res.redirect("/login")
    }
}

export function zipFiles(req, res) {
    const filename = `fonts-${Math.random().toString(36).substring(2)}.zip`
    const __dirname = path.resolve()
    console.log(path.join(__dirname, "../index.js"))
    zipFolder.zipFolder(
        path.join(__dirname, "/public/uploads"),
        path.join(__dirname, `/public/repos/${filename}`),
        (err) => {
            if (err) {
                console.log("Something went wrong!", err)
                return res.send("Une erreur est survenue")
            }
        }
    )
    res.redirect(`/repos/${filename}`)
}
