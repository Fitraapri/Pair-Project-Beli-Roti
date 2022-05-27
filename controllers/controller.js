'use strict'
const { Product, ProductDetail, Transaction, User } = require('../models')

class Controller {
    static home(req, res) {
        let { sort } = req.query
        let input = { order: [["name", "asc"]] }
        if (sort) {
            input.order = [[sort, 'desc']]
        }
        Product.findAll(input)
            .then((products) => {
                res.render('home', { products })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static productsDetail(req, res) {
        const id = req.params.id
        ProductDetail.findByPk(id, { include: [{ model: Product }] })
            .then((detail) => {
                res.render('productDetail', { detail })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static addLike(req, res) {
        const productId = req.params.id
        Product.increment({ like: 1 }, { where: { id: productId } })
            .then(() => {
                res.redirect('/')
            })
            .catch((err) => {
                res.send(err)
            })
    }


    static buyForm(req, res) {
        const id = req.params.id
        Product.findByPk(id)
            .then((product) => {
                res.render('buyForm', {
                    product
                })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static createTransaction(req, res) {
        const {
            quantity,
            UserId,
            ProductId,
            price
        } = req.body
        Transaction.create({
            quantity,
            UserId,
            ProductId,
            price
        })
            .then(() => {
                Product.decrement({
                    stock: quantity
                }, {
                    where: {
                        id: ProductId
                    }
                })
            })
            .then(() => {
                res.redirect('/')
            })
            .catch(err => res.send(err))
    }

    static adminHome(req, res) {
        res.render('adminHome')
    }

    static editUsers(req, res) {
        User.findAll({
            order: [
                ['id', 'ASC']
            ]
        })
            .then((users) => {
                res.render('usersList', {
                    users
                })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static acceptAdmin(req, res) {
        const userId = req.params.id
        User.update({
            role: 'admin'
        }, {
            where: {
                id: userId
            }
        })
            .then(() => {
                res.redirect('/admin/editusers')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static revokeAdmin(req, res) {
        const userId = req.params.id
        User.update({
            role: 'customer'
        }, {
            where: {
                id: userId
            }
        })
            .then(() => {
                res.redirect('/admin/editusers')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static deleteUser(req, res) {
        const userId = req.params.id
        User.destroy({
            where: {
                id: userId
            }
        })
            .then(() => {
                res.redirect('/admin/editusers')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editProducts(req, res) {
        ProductDetail.findAll({
            include: [{
                model: Product
            }]
        })
            .then((products) => {
                res.render('editProducts', {
                    products
                })
            })
            .catch((err) => {

                res.send(err)
            })
    }

    static deleteProduct(req, res) {
        const id = req.params.id
        Product.destroy({
            where: {
                id
            }
        })
            .then(() => {
                res.redirect('/admin/editproducts')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editProductById(req, res) {
        const id = req.params.id
        ProductDetail.findByPk(id, {
            include: [{
                model: Product
            }]
        })
            .then((data) => {
                res.render('formEditProduct', {
                    data
                })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static submitEditedProduct(req, res) {
        const {
            name,
            price,
            stock,
            imageUrl,
            createdAt,
            origin,
            ingredients,
            like,
            ProductDetailId
        } = req.body
        const productId = req.params.id
        ProductDetail.update({
            ingredients: ingredients,
            createdAt: createdAt,
            origin: origin,
        }, {
            where: {
                id: productId
            }
        })
            .then(() => {
                Product.update({
                    name: name,
                    price: price,
                    stock: stock,
                    imageUrl: imageUrl,
                    like: like,
                    ProductDetailId: ProductDetailId,
                }, {
                    where: {
                        id: productId
                    }
                })
            })
            .then(() => {
                res.redirect('/admin/editproducts')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static getTransaction(req, res) {
        Transaction.findAll({
            order: [['id', 'asc']],
            include: { model: Product }
        })
            .then((data) => {
                res.render('history', { data })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static deleteTransaction(req, res) {
        const id = req.params.id
        Transaction.destroy({
            where: {
                id
            }
        })
            .then(() => {
                res.redirect('/admin/listtransactions/')
            })
            .catch(err => {
                res.send(err)
            })
    }

}

module.exports = Controller