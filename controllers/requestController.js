const {Request} = require("../models/models");

class requestController {
    async create(req, res) {
        try {
            const {name, phone} = req.body

            if (name && phone) {
                const requests = await Request.findAll({where: {phone}})
                if (requests.length === 0) {
                    const request = await Request.create({name, phone, checked: false})
                    return res.json(request)
                }
                return res.json("")
            } else {
                return res.json("Ошибка")
            }
        } catch (e) {
            console.log(e)
            return res.json("Error")
        }
    }

    async changeChecked(req, res) {
        try {
            const {checked, id} = req.body

            const request = await Request.findOne({where: {id}})
            if (request) {
                request.checked = checked
                await request.save()
                return res.json(request)
            } else {
                return res.json("Ошибка")
            }
        } catch (e) {
            console.log(e)
            return res.json("Error")
        }
    }

    async deleteRequest(req, res) {
        try {
            const {id} = req.query
            await Request.destroy({where: {id}})
        } catch (e) {
            console.log(e)
            return res.json("Error")
        }
    }

    async getAll(req, res) {
        const requests = await Request.findAll()

        return res.json(requests)
    }
}

module.exports = new requestController()