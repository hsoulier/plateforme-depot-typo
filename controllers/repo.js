import Repo from "../models/Repo.js"

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
            if (err) return res.render("Success", { success: false })
            res.render("Success", { success: true })
        })
    } catch (e) {
        res.render("Success", { success: false })
    }
}

export function getAllRepos(req, res) {
    Repo.find({}, (err, repos) => {
        if (err) return res.status(500).send("Error")
        console.log(repos)
        res.render("dashboard", { repos })
    })
    // if (req.session.loggedIn) {
    //     return res.render("dashboard")
    // }
    // TODO: remove direct acces dashboard
    // res.redirect("/login")
    // return res.render("dashboard")
}
