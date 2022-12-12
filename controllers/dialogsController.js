const {Dialog} = require("../models/models");

class dialogsController {
    async create(req, res) {
        try {
            const {chatId, name, lastMessage} = req.body

            const dialogs = await Dialog.findAll({where: {chatId}})
            if (chatId && name && lastMessage && dialogs.length === 0) {
                const dialog = await Dialog.create({chatId, name, lastMessage, lastAdminCheck: '0'})
                return res.json(dialog)
            } else {
                return res.json("Ошибка")
            }
        } catch (e) {
            console.log(e)
            return res.json("Error")
        }
    }

    async getOne(req, res) {
        try {
            const {chatId} = req.query

            if (chatId) {
                const dialog = await Dialog.findOne({where: {chatId}})
                return res.json(dialog)
            } else {
                return res.json("Ошибка")
            }
        } catch (e) {
            console.log(e)
            return res.json("Error")
        }
    }

    async getAll(req, res) {
        const dialogs = await Dialog.findAll()

        return res.json(dialogs)
    }

    async changeName(req, res) {
        try {
            const {chatId, name} = req.body

            if (chatId && name) {
                const dialog = await Dialog.findOne({where: {chatId}})
                dialog.name = name
                await dialog.save()
                return res.json(dialog)
            } else {
                return res.json("Ошибка")
            }
        } catch (e) {
            console.log(e)
            return res.json("Error")
        }
    }

    async changeLastMessage(req, res) {
        try {
            const {chatId, lastMessage} = req.body

            if (chatId && lastMessage) {
                const dialog = await Dialog.findOne({where: {chatId}})
                dialog.lastMessage = lastMessage
                await dialog.save()

                return res.json(dialog)
            } else {
                return res.json("Ошибка")
            }
        } catch (e) {
            console.log(e)
            return res.json("Error")
        }
    }

    async changeLastAdminCheck(req, res) {
        try {
            const {chatId, lastAdminCheck} = req.body

            if (chatId && lastAdminCheck) {
                const dialog = await Dialog.findOne({where: {chatId}})
                dialog.lastAdminCheck = lastAdminCheck
                await dialog.save()

                return res.json(dialog)
            } else {
                return res.json("Ошибка")
            }
        } catch (e) {
            console.log(e)
            return res.json("Error")
        }
    }

    async delete(req, res) {
        try {
            const {chatId} = req.body

            if (chatId) {
                await Dialog.destroy({where: {chatId}})
                return res.json("Удалено")
            } else {
                return res.json("Ошибка")
            }
        } catch (e) {
            console.log(e)
            return res.json("Error")
        }
    }
}

module.exports = new dialogsController()