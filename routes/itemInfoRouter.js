const Router = require('express')
const router = new Router()
const itemInfoController = require("../controllers/itemInfoController")
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), itemInfoController.create)
router.post('/changeinfo', checkRole('ADMIN'), itemInfoController.changeInfo)
router.post('/delete', itemInfoController.deleteInfo)
router.get('/', itemInfoController.getAll)

module.exports = router