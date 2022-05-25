const Controller = require('../controllers/controller')
const router = require('express').Router()

router.get('/', Controller.redirectAuth)
router.get('/login', Controller.login)
router.get('/register', Controller.register)
router.post('/register', Controller.addUser)
router.get('/home', Controller.home)
router.get('/productdetail/:id', Controller.productDetail)
router.get('/addlike/:id',Controller.addLike)
router.get('/buy/:id',Controller.buyForm)
router.post('/buy/:id',Controller.addTransaction)



module.exports = router
