const { Sequelize } = require('sequelize')

module.exports = new Sequelize(
    process.env.DB,
    process.env.DBUSER,
    process.env.PASSWORD,
    {
        host: 'localhost',
        dialect: 'postgres',
    },
)
