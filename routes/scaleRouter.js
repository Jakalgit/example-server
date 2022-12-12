const Router = require('express')
const router = new Router()
const checkRole = require("../middleware/checkRoleMiddleware")
const scaleController = require("../controllers/scaleController")

router.post('/', checkRole('ADMIN'), scaleController.create)
router.get('/all', scaleController.getAll)
router.post('/change', checkRole('ADMIN'), scaleController.change)
router.post('/delete', checkRole('ADMIN'), scaleController.delete)

module.exports = router