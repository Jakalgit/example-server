const Router = require('express')
const router = new Router()
const checkRole = require("../middleware/checkRoleMiddleware")
const orderItemController = require('../controllers/orderItemController')

router.post('/', orderItemController.create)
router.post('/increment', checkRole('ADMIN'), orderItemController.increment)
router.post('/decrement', checkRole('ADMIN'), orderItemController.decrement)
router.post('/delete', checkRole('ADMIN'),orderItemController.deleteOrderItem)
router.post('/delete/all', checkRole('ADMIN'), orderItemController.deleteOrderItems)
router.get('/one', orderItemController.getOrderItem)
router.get('/', orderItemController.getOrderItems)

module.exports = router