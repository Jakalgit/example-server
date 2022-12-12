const {RepairRequest} = require("../models/models")

class repairController {
    async create(req, res) {
        try {
            const {name, phone, message} = req.body
            if (name && phone) {
                const repairReq = await RepairRequest.create({name, phone, message, response: false})

                return res.json(repairReq)
            } else {
                return res.json("Ошибка")
            }
        } catch (e) {
            console.log(e)
            return res.json("Error")
        }
    }

    async changeResponse(req, res) {
        try {
            const {id, response} = req.body

            if (id && response) {
                const repairReq = await RepairRequest.findOne({where: {id}})
                repairReq.response = response
                await repairReq.save()

                return res.json(repairReq)
            } else {
                return res.json("Ошибка")
            }
        } catch (e) {
            console.log(e)
            return res.json("Error")
        }
    }

    async getAllRequest(req, res) {
        const requests = await RepairRequest.findAll()

        return res.json(requests)
    }

    async delete(req, res) {
        try {
            const {id} = req.body

            if (id) {
                await RepairRequest.destroy({where: {id}})

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

module.exports = new repairController()