const {ItemColor, Item} = require("../models/models")
const admin = require("firebase-admin");
const {Op} = require('sequelize');

class itemColorController {
    async create(req, res) {
        try {
            let {itemId} = req.body
            let {img_1, img_2, img_3, img_4} = req.files

            const bucket = admin.storage().bucket()

            const item = await Item.findOne({
                where: {id: itemId}
            })

            if (item && itemId && img_1 && img_2 && img_3 && img_4) {

                const date = Date.now()
                const fileName1 = String(date + '-1-' + img_1.name.replace('.', '-'))
                const file1 = bucket.file(fileName1)

                const fileName2 = String(date + '-2-' + img_2.name.replace('.', '-'))
                const file2 = bucket.file(fileName2)

                const fileName3 = String(date + '-3-' + img_3.name.replace('.', '-'))
                const file3 = bucket.file(fileName3)

                const fileName4 = String(date + '-4-' + img_4.name.replace('.', '-'))
                const file4 = bucket.file(fileName4)

                streamStart(file1, img_1)
                streamStart(file2, img_2)
                streamStart(file3, img_3)
                streamStart(file4, img_4)

                const itemColor = await ItemColor.create(
                    {itemId, img1: fileName1, img2: fileName2, img3: fileName3, img4: fileName4}
                )

                await item.save()
                return res.json(itemColor)
            } else {
                return res.json('Ошибка')
            }
        } catch (e) {
            console.error(e)
            return res.json('Ошибка')
        }
    }

    async changeImg_1(req, res) {
        try {
            const {id} = req.body
            const {img1} = req.files

            const bucket = admin.storage().bucket()

            const colorCond = await ItemColor.findOne({where: {id}})
            if (colorCond) {
                await deleteFile(bucket, colorCond.img1)
                const fileName = String(colorCond.img1)
                const file = bucket.file(fileName)
                streamStart(file, img1)
                colorCond.img1 = fileName
                await colorCond.save()

                return res.json('Сохранено')
            } else {
                return res.json('Ошибка')
            }
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async changeImg_2(req, res) {
        try {
            const {id} = req.body
            const {img2} = req.files

            const bucket = admin.storage().bucket()

            const colorCond = await ItemColor.findOne({where: {id}})
            if (colorCond) {
                await deleteFile(bucket, colorCond.img2)
                const fileName = String(colorCond.img2)
                const file = bucket.file(fileName)
                streamStart(file, img2)
                colorCond.img2 = fileName
                await colorCond.save()

                return res.json('Сохранено')
            } else {
                return res.json('Ошибка')
            }
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async changeImg_3(req, res) {
        try {
            const {id} = req.body
            const {img3} = req.files

            const bucket = admin.storage().bucket()

            const colorCond = await ItemColor.findOne({where: {id}})
            if (colorCond) {
                await deleteFile(bucket, colorCond.img3)
                const fileName = String(colorCond.img3)
                const file = bucket.file(fileName)
                streamStart(file, img3)
                colorCond.img3 = fileName
                await colorCond.save()

                return res.json('Сохранено')
            } else {
                return res.json('Ошибка')
            }
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async changeImg_4(req, res) {
        try {
            const {id} = req.body
            const {img4} = req.files

            const bucket = admin.storage().bucket()

            const colorCond = await ItemColor.findOne({where: {id}})
            if (colorCond) {
                await deleteFile(bucket, colorCond.img4)
                const fileName = String(colorCond.img4)
                const file = bucket.file(fileName)
                streamStart(file, img4)
                colorCond.img4 = fileName
                await colorCond.save()

                return res.json('Сохранено')
            } else {
                return res.json('Ошибка')
            }
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async deleteColor(req, res) {
        try {
            const {id} = req.body

            const bucket = admin.storage().bucket()

            const colorCond = await ItemColor.findOne({where: {id}})
            if (colorCond) {
                await ItemColor.destroy({where: {id}})
                await deleteFile(bucket, colorCond.img1)
                await deleteFile(bucket, colorCond.img2)
                await deleteFile(bucket, colorCond.img3)
                await deleteFile(bucket, colorCond.img4)

                // Смена изображения айтема если мы удаляем 1ый цвет
                const colors = await ItemColor.findAll({where: colorCond.itemId})
                const item = await Item.findOne({where: colorCond.itemId})
                item.img = colors[0].img1
                await item.save()

                return res.json('Удалено')
            } else {
                return res.json('Ошибка')
            }
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async getColor(req, res) {
        try {
            const {itemId} = req.query

            const itemColor = await ItemColor.findOne({where: {itemId}})
            if (itemColor) {
                return res.json(itemColor)
            } else {
                return res.json('Ошибка')
            }
        } catch (e) {
            console.log(e)
            return res.json('Ошибка')
        }
    }

    async getColorByIds(req, res) {
        try {
            const {IDs} = req.query
            const parseList = JSON.parse(IDs)
            parseList.replaceAll('%7B', '{')
            parseList.replaceAll('%22', '"')
            parseList.replaceAll('%7D', '}')
            console.log(parseList)
            const colors = await ItemColor.findAll({where: {[Op.or]: parseList}})
            return res.json(colors)
        } catch (e) {
            console.log(e)
            return res.json("Error")
        }
    }

    async getFullAll(req, res) {
        const itemColors = await ItemColor.findAll()

        return res.json(itemColors)
    }
}

function streamStart(file, img) {
    const stream = file.createWriteStream({
        metadata: {
            contentType: img.mimetype,
        },
    })
    stream.on("error", (e) => {
        console.log(e)
        const stream = file.createWriteStream({
            metadata: {
                contentType: img.mimetype,
            },
        })
        stream.on("error", () => {
            console.log(e)
        }).on("finish", async () => {
            await file.makePublic()
        }).end(img.data)
    }).on("finish", async () => {
        await file.makePublic()
    }).end(img.data)
}

async function deleteFile(bucket, fileName) {
    await bucket.file(fileName).delete()
}

module.exports = new itemColorController()
