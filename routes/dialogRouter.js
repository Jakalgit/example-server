const Router = require('express')
const router = new Router()
const dialogController = require("../controllers/dialogsController")
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', dialogController.create)
router.get('/one', dialogController.getOne)
router.get('/all', checkRole('ADMIN'), dialogController.getAll)
router.post('/change-name', checkRole('ADMIN'), dialogController.changeName)
router.post('/change-last-message', dialogController.changeLastMessage)
router.post('/change-last-admin-check', checkRole("ADMIN"), dialogController.changeLastAdminCheck)
router.post('/delete', dialogController.delete)

module.exports = router