const {Item, Scale} = require("../models/models")
const ApiError = require("../error/ApiError")

class scaleController {
    async create(req, res, next) {
        try {
            const {value} = req.body

            const scale = await Scale.create({value})

            return res.json(scale)
        } catch (e) {
            console.log(e)
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const scales = await Scale.findAll()

        return res.json(scales)
    }

    async change(req, res) {
        try {
            const {value, id} = req.body

            const scale = await Scale.findOne({where: {id}})
            if (scale) {
                scale.value = value
                await scale.save()
                return res.json('Изменено')
            } else {
                return res.json('Ошибка')
            }
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.body

            const items = await Item.findAll({where: {scaleId: id}})
            if (items.length === 0) {
                await Scale.destroy({where: {id}})
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

module.exports = new scaleController()