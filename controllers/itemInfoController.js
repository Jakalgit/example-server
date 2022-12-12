const {ItemInfo} = require("../models/models")
const ApiError = require("../error/ApiError");

class itemInfoController {
    async create(req, res, next) {
        try {
            let {info, itemId} = req.body

            if (info) {
                const itemInfo = await ItemInfo.create({info, itemId})

                return res.json(itemInfo)
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        try {
            let {itemId} = req.query

            const info = await ItemInfo.findAndCountAll({where: {itemId}})

            return res.json(info)
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async changeInfo(req, res) {
        try {
            const {info, id} = req.body
            const itemInfo = await ItemInfo.findOne({where: {id}})
            if (itemInfo && info) {
                itemInfo.info = info
                await itemInfo.save()
                return res.json(info)
            } else {
                return res.json('Ошибка')
            }
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async deleteInfo(req, res) {
        try {
            let {id} = req.body

            const info = await ItemInfo.findOne({where: {id}})
            if (info) {
                await ItemInfo.destroy({where: {id}})
                return res.json('Удалено')
            } else {
                return res.json('Ошибка')
            }
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }
}

module.exports = new itemInfoController()