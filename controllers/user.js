import User from "../models/User.js"
import bcrypt from "bcrypt"

export async function loginUser(req, res, next) {
    const { user, password } = req.body
    if (req.session.loggedIn) {
        next()
    }
    if (user === undefined || password === undefined) {
        return res.redirect("/login")
    }
    try {
        User.findOne({ user }, (err, login) => {
            if (err)
                return res.statut(500).render("success", { success: false })
            bcrypt.compare(password, login.password, (err, result) => {
                if (err)
                    return res.statut(500).render("success", { success: false })
                if (result) {
                    req.session.loggedIn = true
                    res.redirect("/dashboard")
                } else {
                    req.session.errorLogin = "Mauvais identifiants"
                    res.redirect("/login")
                }
            })
        })
    } catch (e) {
        res.render("Success", { success: false })
    }
}

export async function addingUser(req, res) {
    const { user, password } = req.body
    bcrypt.hash(password, 10, (err, hash) => {
        try {
            const login = new User({ user, password: hash })
            login.save((err) => {
                if (err) return res.render("Success", { success: false })
                res.render("Success", { success: true })
            })
        } catch (e) {
            res.render("Success", { success: false })
        }
    })
}
