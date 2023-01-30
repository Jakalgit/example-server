const {Sequelize} = require('sequelize')
require('pg')

module.exports = new Sequelize(
    'postgres', // Название БД
    'postgres', // Пользователь
    'example-database_123', // Пароль
    {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        host: 'db.oyalflccjxehzmhtcdjp.supabase.co',
        port: '5432',
    },
)
