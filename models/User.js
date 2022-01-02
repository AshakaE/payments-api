// const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('../config/database')
const User = db.define('users', {
    // password: {
    //     field: 'user_password',
    //     type: Sequelize.STRING,
    //     allowNull: true,
    // },
    name: {
        type: Sequelize.STRING,
        // field: 'user_name',
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        // field: 'user_email',
        allowNull: false,
    },
})

module.exports = User
