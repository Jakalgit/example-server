const {BasketItem} = require("../models/models")

class basketItemController {
    async create(req, res) {
        try {
            const {itemId, itemColorId, basketId, count, image, name, price} = req.body

            let basketItem = await BasketItem.findOne({where: {itemId, itemColorId, basketId}})
            if (!basketItem) {
                basketItem = await BasketItem.create({itemId, itemColorId, basketId, count, img: image, name, price})
            } else {
                basketItem.count = count
                await basketItem.save()
            }

            return res.json(basketItem)
        } catch (e) {
            console.log(e)
            return res.json(e)
        }
    }

    async increment(req, res) {
        try {
            const {itemId, itemColorId, basketId} = req.body
            let basketItem = await BasketItem.findOne({where: {itemId, itemColorId, basketId}})
            if (basketItem && basketItem.count <= 99) {
                basketItem.count = basketItem.count + 1
                await basketItem.save()
            }

            return res.json(basketItem)
        } catch (e) {
            console.log(e)
            return res.json(e)
        }
    }

    async decrement(req, res) {
        try {
            const {itemId, itemColorId, basketId} = req.body
            let basketItem = await BasketItem.findOne({where: {itemId, itemColorId, basketId}})
            if (basketItem && basketItem.count >= 1) {
                basketItem.count = basketItem.count - 1
                await basketItem.save()
            }

            return res.json(basketItem)
        } catch (e) {
            console.log(e)
            return res.json(e)
        }
    }

    async deleteOne(req, res) {
        try {
            const {id} = req.body
            const basketItem = await BasketItem.findOne({where: {id}})
            if (basketItem) {
                await basketItem.destroy()
                return res.json('Удалено')
            } else {
                return res.json('Ошибка')
            }
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async deleteAll(req, res) {
        try {
            const {basketId} = req.body
            const basketItems = await BasketItem.findAll({where: {basketId}})
            if (basketItems.length !== 0) {
                await BasketItem.destroy({where: {basketId}})
                return res.json('Удалено')
            } else {
                return res.json('Ошибка')
            }
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async getOne(req, res) {
        try {
            const {itemId, itemColorId, basketId} = req.query

            const basketItem = await BasketItem.findOne({where: {itemId, itemColorId, basketId}})
            if (basketItem) {
                return res.json(basketItem)
            } else {
                return res.json('Ошибка')
            }
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async getAll(req, res) {
        try {
            const {basketId} = req.query
            const basketItems = await BasketItem.findAll({where: {basketId}})

            return res.json(basketItems)
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }
}

module.exports = new basketItemController()