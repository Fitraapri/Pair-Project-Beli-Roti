'use strict'

const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const Login = require('../controllers/login')
const Pdf = require('../controllers/pdf')
const Register = require('../controllers/register')

router.get('/register', Register.regisForm)
router.post('/register', Register.postRegis)
router.get('/login', Login.loginForm)
router.post('/login', Login.postLogin)
router.use((req, res, next) => {
    if (!req.session.userId) {
        const error = 'Please Login First!'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
})
router.get('/', Controller.home)
router.get('/logout', Login.Logout)
router.get('/admin', Controller.adminHome)
router.get('/admin/editusers', Controller.editUsers)
router.get('/admin/editproducts', Controller.editProducts)
router.get('/admin/listtransactions', Controller.getTransaction)
router.get('/pdf/:id', Pdf.pdfread)
router.get('/productDetail/:id', Controller.productsDetail)
router.get('/addlike/:id', Controller.addLike)
router.get('/buy/:id', Controller.buyForm)
router.post('/buy/:id', Controller.createTransaction)
router.get('/admin/acceptrequest/:id', Controller.acceptAdmin)
router.get('/admin/revoke/:id', Controller.revokeAdmin)
router.get('/admin/delete/:id', Controller.deleteUser)
router.get('/admin/deleteTransaction/:id', Controller.deleteTransaction)
router.get('/admin/editproducts/:id', Controller.editProductById)
router.get('/admin/deleteproduct/:id', Controller.deleteProduct)
router.post('/admin/editproducts/:id', Controller.submitEditedProduct)

module.exports = router