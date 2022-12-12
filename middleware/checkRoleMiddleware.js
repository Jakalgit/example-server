module.exports = function(role) {
    return function (req, res, next) {
        try {
            const userRole = req.headers.authorization
            if (!userRole) {
                return res.status(401).json({message: "Не авторизован"})
            }
            if (userRole !== role) {
                return res.status(403).json({message: "Нет доступа"})
            }
            next()
        } catch (e) {
            res.status(401).json({message: "Не авторизован"})
        }
    }
}