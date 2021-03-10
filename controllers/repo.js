import Repo from "../models/Repo.js"

export default function uploadWork(req, res, next) {
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
            if (err) return res.send("Une erreur est survenue")
            res.send("Success")
        })
    } catch (e) {
        res.send("Une erreur est survenue")
    }
}
