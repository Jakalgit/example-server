const Router = require('express')
const router = new Router()
const checkRole = require("../middleware/checkRoleMiddleware")
const requestController = require("../controllers/requestController")

router.post('/', requestController.create)
router.put('/change-checked', checkRole('ADMIN'), requestController.changeChecked)
router.delete('/delete', checkRole('ADMIN'), requestController.deleteRequest)
router.get('/', requestController.getAll)

module.exports = router