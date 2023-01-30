const Router = require('express')
const router = new Router()
const basketItemController = require('../controllers/basketItemController')

router.post('/', basketItemController.create)
router.post('/increment', basketItemController.increment)
router.post('/decrement', basketItemController.decrement)
router.post('/deleteone', basketItemController.deleteOne)
router.post('/delete', basketItemController.deleteAll)
router.get('/one', basketItemController.getOne)
router.get('/', basketItemController.getAll)

module.exports = router