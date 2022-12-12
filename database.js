const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    'fedwszks', // Название БД
    'fedwszks', // Пользователь
    'WI7l3E8O5L7JIBHLAvW6da7Szp7Sq8IA', // Пароль
    {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        host: 'peanut.db.elephantsql.com',
        port: '5432',
    },
)