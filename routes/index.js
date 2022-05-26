const Controller = require('../controllers/controller')
const router = require('express').Router()


router.get('/register', Controller.register)
router.post('/register', Controller.postRegister)

router.get('/', Controller.redirectAuth)
router.get('/login', Controller.loginForm)
router.post('/login', Controller.loginPost)

router.get('/admin', Controller.adminHome)
router.get('/admin/editusers', Controller.editUsers)
router.get('/admin/editproducts', Controller.editProducts)
router.get('/admin/editproducts/:id', Controller.editProductById)
router.post('/admin/editproducts/:id', Controller.submitEditedProduct)

router.get('/admin/acceptrequest/:id', Controller.acceptAdmin)
router.get('/admin/revoke/:id', Controller.revokeAdmin)
router.get('/admin/delete/:id', Controller.deleteUser)



router.get('/home', Controller.home)
router.get('/transaction/:id', Controller.transaction)
router.get('/transaction/cancel/:id', Controller.cancelTransaction)
router.get('/transaction/invoice/:id', Controller.showInvoice)
router.get('/productdetail/:id', Controller.productDetail)
router.get('/addlike/:id',Controller.addLike)
router.get('/buy/:id',Controller.buyForm)
router.post('/buy/:id',Controller.createTransaction)



module.exports = router
