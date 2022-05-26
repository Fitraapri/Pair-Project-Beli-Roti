'use strict'

const bcryptjs = require("bcryptjs")
const { User } = require("../models")

class Login {
    static loginForm(req, res) {
        res.render('login')
    }

    static postLogin(req, res) {
        const { username, password } = req.body
        // console.log(req.body);
        User.findOne({ where: { username } })
            .then(user => {
                if (user) {
                    const userValid = bcryptjs.compareSync(password, user.password)
                    if (userValid) {
                        return res.redirect('/')
                    } else {
                        const error = 'invalid username or password'
                        return res.redirect(`/login?error=${error}`)
                    }
                }
            })
            .catch(err => {
                console.log(err);
                res.send(err)
            })
    }
}

module.exports = Login