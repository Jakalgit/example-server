const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.post('/init', userController.init)

module.exports = router