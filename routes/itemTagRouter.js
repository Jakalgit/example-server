const Router = require('express')
const router = new Router()
const checkRole = require("../middleware/checkRoleMiddleware")
const itemTagController = require("../controllers/itemTagController")

router.post("/", checkRole("ADMIN"), itemTagController.create)
router.put("/change-name", checkRole("ADMIN"), itemTagController.changeName)
router.delete("/delete", checkRole("ADMIN"), itemTagController.deleteTag)
router.get("/all", itemTagController.getAll)
router.get("/one", itemTagController.getOne)

module.exports = router