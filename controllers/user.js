import User from "../models/User.js"
import bcrypt from "bcrypt"

export async function loginUser(req, res, next) {
    const { user, password } = req.body
    try {
        User.findOne({ user }, (err, login) => {
            bcrypt.compare(password, login.password, (err, result) => {
                result
                    ? res.render("dashboard")
                    : res.render("success", { success: false })
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
