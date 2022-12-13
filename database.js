const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    'postgres', // Название БД
    'postgres', // Пользователь
    'parus12database', // Пароль
    {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        host: 'db.opztfbjgsvpzargnicly.supabase.co',
        port: '5432',
    },
)
