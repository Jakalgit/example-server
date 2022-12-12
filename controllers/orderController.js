const {Order} = require('../models/models')
const ApiError = require("../error/ApiError");

class orderController {
    async create(req, res, next) {
        try {
            let {token, number, firstName, lastName, secondName, phoneNumber, email, index, street, house, flat, price, typePay, typeDelivery, typeSubmit} = req.body
            if (typeDelivery === '1') {
                if (token && number && firstName && phoneNumber && price && typePay && typeSubmit) {
                    if (!lastName) {
                        lastName = 'не указано'
                    }
                    if (!secondName) {
                        secondName = 'не указано'
                    }
                    if (!email) {
                        email = 'не указано'
                    }

                    const order = await Order.create({token, number, firstName, lastName, secondName, phoneNumber, email, index: 'не указано',
                        street: 'не указано', house: 'не указано', flat: 'не указано', price, track: 'не указано', typePay, typeDelivery, typeSubmit})

                    return res.json(order)
                }
            }

            if (typeDelivery === '2') {
                if (token && number && firstName && phoneNumber && street && house && flat && price && typePay && typeDelivery && typeSubmit) {
                    if (!lastName) {
                        lastName = 'не указано'
                    }
                    if (!secondName) {
                        secondName = 'не указано'
                    }
                    if (!index) {
                        index = 'не указан'
                    }
                    if (!email) {
                        email = 'не указано'
                    }

                    const order = await Order.create({token, number, firstName, lastName, secondName, phoneNumber, email, index,
                        street, house, flat, price, track: 'не указано', typePay, typeDelivery, typeSubmit})

                    return res.json(order)
                }
            }

            if (typeDelivery === '3') {
                if (token && number && firstName && lastName && secondName && phoneNumber && index && street && house && flat && price && (typePay === '1') && typeDelivery && typeSubmit) {
                    if (!email) {
                        email = 'не указано'
                    }
                    const order = await Order.create({token, number, firstName, lastName, secondName, phoneNumber, email, index,
                        street, house, flat, price, track: 'не указано', typePay, typeDelivery, typeSubmit})

                    return res.json(order)
                }
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeSubmit(req, res) {
        try {
            const {id, typeSubmit} = req.body

            const order = await Order.findOne({where: {id}})
            if (order) {
                order.typeSubmit = typeSubmit
                await order.save()
            }

            return res.json(order)
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async setTrack(req, res) {
        try {
            const {track, id} = req.body

            const order = await Order.findOne({where: {id}})
            if (order) {
                order.track = track
                await order.save()
                return res.json('Сохранено')
            } else {
                return res.json('Ошибка')
            }
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async getOneByNumber(req, res) {
        try {
            const {number} = req.params

            const order = await Order.findOne({where: {number}})
            if (order) {
                return res.json(order)
            } else {
                return res.json('Заказ не найден')
            }
        } catch (e) {
             console.log(e)
            return res.json('Ошибка')
        }
    }

    async getOneByPhone(req, res) {
        try {
            const {phone} = req.params

            const orders = await Order.findAll({where: {phoneNumber: phone}})
            if (orders.length !== 0) {
                return res.json(orders)
            } else {
                return res.json('Заказы не найдены')
            }
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.params

            const order = await Order.findOne({
                where: {id}
            })

            return res.json(order)
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async getAll(req, res) {
        const order = await Order.findAll()

        return res.json(order)
    }

    async deleteOrder(req, res) {
        try {
            const {id} = req.body

            const order = await Order.findOne({where: {id}})
            if (order) {
                await Order.destroy({where: {id}})
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

module.exports = new orderController()