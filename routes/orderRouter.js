const Router = require('express')
const router = new Router()
const checkRole = require("../middleware/checkRoleMiddleware")
const orderController = require('../controllers/orderController')

router.post('/', orderController.create)
router.post('/delete', checkRole('ADMIN'), orderController.deleteOrder)
router.post('/change', checkRole('ADMIN'), orderController.changeSubmit)
router.post('/settrack', checkRole('ADMIN'), orderController.setTrack)
router.get('/', orderController.getAll)
router.get('/id/:id', checkRole('ADMIN'), orderController.getOne)
router.get('/number/:number', orderController.getOneByNumber)
router.get('/phone/:phone', orderController.getOneByPhone)

module.exports = router