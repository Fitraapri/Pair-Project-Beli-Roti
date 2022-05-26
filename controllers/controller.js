const bcrypt = require('bcryptjs')
const res = require('express/lib/response')
const {
    Product,
    ProductDetail,
    Transaction,
    User
} = require('../models')
class Controller {
    static redirectAuth(req, res) {
        res.redirect('/login')
    }

    static loginForm(req, res) {
        const {
            error
        } = req.query
        res.render('login', {
            error
        })
    }
    static loginPost(req, res) {
        // {"username":"admin1","password":"12345"}
        const {
            username,
            password
        } = req.body

        User.findOne({
                where: {
                    username
                }
            })
            .then(user => {
                if (user) {
                    const role = user.dataValues.role
                    const isValidPasword = bcrypt.compareSync(password, user.password)

                    if (isValidPasword) {

                        if (role !== 'pending') {
                            res.redirect('/home')
                        } else {
                            const error = 'Status admin kamu masih pending'
                            res.redirect(`/login?error=${error}`)
                        }
                    } else {
                        const error = 'invalid username/password'
                        res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = 'invalid username/password'
                    res.redirect(`/login?error=${error}`)
                }
            })
            .catch(err => {
                res.send(err)
            })
        // res.send(req.body)
    }

    static register(req, res) {
        res.render('register')
    }

    static postRegister(req, res) {
        // {"name":"asdasda","email":"jonathanadrino@gmail.com","password":"12345","address":"gilimanuk","role":"customer"}
        let {
            username,
            email,
            password,
            address,
            role
        } = req.body
        // console.log(req.body)
        // res.send(req.body)
        User.create({
                username,
                email,
                password,
                address,
                role
            })
            .then(newUser => {
                res.redirect('/login')
            })
            .catch(err => res.send(err))

        // res.redirect('/login')
    }

    static home(req, res) {
        Product.findAll({
                order: [
                    ['like', 'DESC']
                ]
            })
            .then((products) => {
                res.render('home', {
                    products
                })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static productDetail(req, res) {
        const id = req.params.id
        ProductDetail.findByPk(id, {
                include: [{
                    model: Product
                }]
            })
            .then((detail) => {
                res.render('productDetail', {
                    detail
                })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static addLike(req, res) {
        const productId = req.params.id
        Product.increment({
                like: 1
            }, {
                where: {
                    id: productId
                }
            })
            .then(() => {
                res.redirect('/home')
            })
            .catch((err) => {
                res.send(err)
            })
    }



    static adminHome(req, res) {
        res.render('adminPage')
    }

    static editUsers(req, res) {
        User.findAll({
                order: [
                    ['id', 'ASC']
                ]
            })
            .then((users) => {
                res.render('userslist', {
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
        // {"name":"Ibuprofen","price":"51000","stock":"0","imageUrl":"http://dummyimage.com/106x100.png/dddddd/000000","createdAt":"2022-05-22","origin":"Moldova","ingredients":"chocolate"}
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
                res.redirect('/home')
            })
            .catch(err => res.send(err))
    }

    static transaction(req, res) {
        const userId = req.params.id
        User.findByPk(userId,{ include: Product })
            .then((data) => {
                res.render('userTransaction', {
                    data
                })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static cancelTransaction(req, res) {
        const transId = req.params.id
        Transaction.destroy({
                where: {
                    id: transId
                }
            })
            .then(() => {
                res.redirect('/transaction/1')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static showInvoice (req,res) {
        const transId = req.params.id
        Transaction.findAll({
            where: {
                id: transId
            }
        })
            .then((data) => {
                res.render('invoice', {
                    data
                })
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = Controller