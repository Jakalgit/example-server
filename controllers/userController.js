const {User} = require('../models/models')

class userController {
    async init(req, res) {
        try {
            const {token} = req.body

            const strRole = token === '12121212121212' ? 'ADMIN' : 'USER'

            let user = await User.findOne({where: {token}})
            if (!user) {
                user = await User.create({token, role: strRole})
            }

            return res.json(user)
        } catch (e) {
            console.log(e)
            return res.json(e)
        }
    }
}

module.exports = new userController()