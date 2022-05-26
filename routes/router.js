'use strict'

const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const Login = require('../controllers/login')
const Register = require('../controllers/register')

router.get('/', Controller.home)
router.get('/register', Register.regisForm)
router.post('/register', Register.postRegis)
router.get('/login', Login.loginForm)
router.post('/login', Login.postLogin)

module.exports = router