const {Sequelize} = require('sequelize')
require('pg')

module.exports = new Sequelize(
    'postgres', // Название БД
    'postgres', // Пользователь
    'example-password', // Пароль
    {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        host: 'db.aqdjyckdutvxnqggowxb.supabase.co',
        port: '5432',
    },
)
