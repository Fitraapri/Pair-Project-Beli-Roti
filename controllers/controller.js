const res = require('express/lib/response')
const {Product,ProductDetail,Transaction,User} = require('../models')
class Controller {
    static redirectAuth(req,res) {
        res.redirect('/login')
    }

    static login(req,res) {
        res.render('login')
    }

    static register(req,res) {
        res.render('register')
    }

    static addUser(req,res) {
        console.log(req.body)
        res.redirect('/login')
    }

    static home(req,res) {
        Product.findAll()
        .then((products) => {
            res.render('home', {products})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static productDetail(req,res) {
        const id = req.params.id
        ProductDetail.findByPk(id,{
            include: [
                {
                    model: Product
                }
            ]
        })
        .then((detail) => {
            res.render('productDetail', {detail})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static addLike(req,res) {
        const productId = req.params.id
        Product.increment({like: 1}, { where: { id: productId } })
        .then(() => {
            res.redirect('/home')
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static buyForm(req,res) {
        const id = req.params.id
        Product.findByPk(id)
        .then((product) => {
            res.render('buyForm', {product})
        })
        .catch((err) => {
            res.send(err)
        })
    }

}

module.exports = Controller