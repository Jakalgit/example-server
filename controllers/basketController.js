const {Basket} = require('../models/models')
const ApiError = require("../error/ApiError");

class basketController {
    async create(req, res, next) {
        try {
            const {userId} = req.body
            let basket = await Basket.findOne({where: {userId}})

            if (!basket) {
                basket = await Basket.create({userId})
                return res.json(basket)
            }

            return res.json(basket)
        } catch (e) {
            console.log(e)
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.params
            const basket = await Basket.findOne({where: {userId: id}})
            if (basket) {
                return res.json(basket)
            } else {
                return res.json('Ошибка')
            }
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }
}

module.exports = new basketController()