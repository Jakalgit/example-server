const {User} = require('../models/models')

class userController {
    async init(req, res) {
        try {
            const {token} = req.body

            if (token) {
                let user = await User.findOne({where: {token}})
                if (!user) {
                    user = await User.create({token})
                }
                return res.json(user)
            } else {
                return res.json("Ошибка")
            }
        } catch (e) {
            console.log(e)
            return res.json(e)
        }
    }
}

module.exports = new userController()