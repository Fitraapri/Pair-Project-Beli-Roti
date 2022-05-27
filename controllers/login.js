'use strict'

const bcryptjs = require("bcryptjs")
const { User } = require("../models")

class Login {
    static loginForm(req, res) {
        const { error } = req.query
        res.render('login', { error })
    }

    static postLogin(req, res) {
        const { username, password } = req.body
        User.findOne({ where: { username } })
            .then(user => {
                if (user) {
                    const userValid = bcryptjs.compareSync(password, user.password)
                    if (userValid) {
                        req.session.userId = user.id
                        req.session.role = user.role
                        return res.redirect('/')
                    } else {
                        const error = 'invalid username or password'
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = 'invalid username or password'
                    return res.redirect(`/login?error=${error}`)
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static Logout(req, res) {
        req.session.destroy((error) => {
            if (error) {
                console.log(error);
            } else {
                res.redirect('/login')
            }
        })
    }
}

module.exports = Login