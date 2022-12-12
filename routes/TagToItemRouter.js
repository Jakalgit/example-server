const Router = require('express')
const router = new Router()
const checkRole = require("../middleware/checkRoleMiddleware")
const tagToItemController = require("../controllers/TagToItemController")

router.put("/change-tags", checkRole("ADMIN"), tagToItemController.changeTags)
router.get("/by-item-id", tagToItemController.getByItemId)
router.get("/all", tagToItemController.getAll)

module.exports = router