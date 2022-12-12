const Router = require('express')
const router = new Router()
const itemColorController = require("../controllers/itemColorController")
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), itemColorController.create)
router.post('/change/img1', checkRole('ADMIN'), itemColorController.changeImg_1)
router.post('/change/img2', checkRole('ADMIN'), itemColorController.changeImg_2)
router.post('/change/img3', checkRole('ADMIN'), itemColorController.changeImg_3)
router.post('/change/img4', checkRole('ADMIN'), itemColorController.changeImg_4)
router.post('/delete', checkRole('ADMIN'), itemColorController.deleteColor)
router.get('/get/:id', itemColorController.getColor)
router.get('/', itemColorController.getAll)
router.get('/full', itemColorController.getFullAll)

module.exports = router