const {OrderItem, Item} = require('../models/models')
const ApiError = require("../error/ApiError");

class orderItemController {

    async create(req, res, next) {
        try {
            const {orderId, name, price, img, count, id} = req.body

            const orderItem = await OrderItem.create({name, price, img, count, orderId})
            const item = await Item.findOne({where: {id}})

            item.count_shop += 1
            await item.save()

            return res.json(orderItem)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOrderItem(req, res) {
        try {
            const {id} = req.query

            const orderItem = await OrderItem.findOne({where: {id}})
            if (orderItem) {
                return res.json(orderItem)
            } else {
                return res.json('Ошибка')
            }
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async increment(req, res) {
        try {
            const {id} = req.body
            const item = await OrderItem.findOne({where: {id}})

            if (item && item.count < 99) {
                item.count = item.count + 1
                await item.save()
            }

            return res.json(item)
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async decrement(req, res) {
        try {
            const {id} = req.body
            const item = await OrderItem.findOne({where: {id}})

            if (item && item.count > 1) {
                item.count = item.count - 1
                await item.save()
            }

            return res.json(item)
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }


    async getOrderItems(req, res) {
        try {
            const {orderId} = req.query

            if (orderId) {
                const orderItems = await OrderItem.findAndCountAll({where: {orderId}})
                return res.json(orderItems)
            } else {
                return res.json('Ошибка')
            }
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async deleteOrderItem(req, res) {
        try {
            const {id} = req.body

            const orderItem = await OrderItem.findOne({where: {id}})
            if (orderItem) {
                await OrderItem.destroy({where: {id}})
                return res.json('Удалено')
            } else {
                return res.json('Ошибка')
            }
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async deleteOrderItems(req, res) {
        try {
            const {orderId} = req.body

            const orderItems = await OrderItem.findAndCountAll({where: {orderId}})
            if (orderItems) {
                await OrderItem.destroy({where: {orderId}})
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

module.exports = new orderItemController()