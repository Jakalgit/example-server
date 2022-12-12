const Router = require('express')
const router = new Router()
const checkRole = require("../middleware/checkRoleMiddleware")
const repairController = require("../controllers/repairController")

router.post('/create', repairController.create)
router.post('/change-res', checkRole('ADMIN'), repairController.changeResponse)
router.post('/delete', checkRole('ADMIN'), repairController.delete)
router.get('/get-all', checkRole('ADMIN'), repairController.getAllRequest)

module.exports = router