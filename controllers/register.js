'use strict'

const { User } = require('../models')

class Register {
    static regisForm(req, res) {
        const { error } = req.query
        res.render('register', { error })
    }
    static postRegis(req, res) {
        const { username, email, password } = req.body
        User.create({ username, email, password, role: 'User' })
            .then(newUser => {
                res.redirect('/login')
            })
            .catch(err => {
                res.redirect(`/register?error=${err.errors[0].message}`)
            })
    }
}

module.exports = Register