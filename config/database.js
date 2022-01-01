const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })

module.exports = new Sequelize(
    process.env.DB,
    process.env.DBUSER,
    process.env.PASSWORD,
    {
        host: 'localhost',
        dialect: 'postgres',
    },
)
