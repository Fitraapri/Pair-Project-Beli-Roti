'use strict'

const { User } = require('../models')

class Register {
    static regisForm(req, res) {
        res.render('register')
    }
    static postRegis(req, res) {
        const { username, email, password, role } = req.body
        User.create({ username, email, password, role })
            .then(newUser => {
                res.redirect('/login')
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = Register