const {ItemTag, Tag_to_Item} = require("../models/models")

class itemTagController {
    async create(req, res) {
        try {
            const {name} = req.body

            const tag = await ItemTag.create({name})

            return res.json(tag)
        } catch (e) {
            console.log(e)
            return res.json("Error")
        }
    }

    async changeName(req, res) {
        try {
            const {id, name} = req.body

            const tag_cond = await ItemTag.findOne({where: id})
            if (tag_cond) {
                tag_cond.name = name
                await tag_cond.save()
                return res.json("Имя изменено")
            } else {
                return res.json("Ошибка")
            }
        } catch (e) {
            console.log(e)
            return res.json("Error")
        }
    }

    async deleteTag(req, res) {
        try {
            const {name} = req.query

            const tags = await ItemTag.findAll({where: {name}})
            if (tags.length !== 0) {
                await Tag_to_Item.destroy({where: {name}})
                await ItemTag.destroy({where: {name}})
                return res.json("Удалено")
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
            const {id} = req.query

            if (id) {
                const tag = await ItemTag.findOne({where: {id}})
                return res.json(tag)
            } else {
                return res.json("Ошибка")
            }
        } catch (e) {
            console.log(e)
            return res.json("Error")
        }
    }

    async getAll(req, res) {
        const tags = await ItemTag.findAll()

        return res.json(tags)
    }
}

module.exports = new itemTagController()