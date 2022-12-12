const {Tag_to_Item} = require("../models/models")

class tagToItemController {
    async changeTags(req, res) {
        try {
            const {tags, id} = req.body

            if (tags && id) {
                await Tag_to_Item.destroy({where: {itemId: id}})
                for (const tag of JSON.parse(tags)) {
                    let condTag = await Tag_to_Item.findAll({where: {itemId: id, name: tag.name}})
                    if (condTag.length === 0) {
                        condTag = await Tag_to_Item.create({name: tag.name, itemTagId: tag.id, itemId: id})
                    }
                }
                const newTags = await Tag_to_Item.findAll({where: {itemId: id}})
                return res.json(newTags)
            } else {
                return res.json("Ошибка")
            }
        } catch (e) {
            console.log(e)
            return res.json("Error")
        }
    }

    async getByItemId(req, res) {
        try {
            const {id} = req.query

            const tagToItems = await Tag_to_Item.findAll({where: {itemId: id}})

            return res.json(tagToItems)
        } catch (e) {
            console.log(e)
            return res.json("Error")
        }
    }

    async getAll(req, res) {
        const tagsToItems = await Tag_to_Item.findAll()

        return res.json(tagsToItems)
    }
}

module.exports = new tagToItemController()