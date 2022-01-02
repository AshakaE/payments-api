const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize')
const validator = require('validator')
const db = require('../config/database')

const User = db.define(
    'users',
    {
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        passwordConfirm: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                customValidator(value) {
                    if (value !== this.password) {
                        throw new Error('Passwords are not the same')
                    }
                },
            },
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: 'Please provide a valid email',
                },
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    user.password = await bcrypt.hash(user.password, 12)
                    user.passwordConfirm = undefined
                }
            },
            beforeUpdate: async (user) => {
                if (user.password) {
                    user.password = await bcrypt.hash(user.password, 12)
                    user.passwordConfirm = undefined
                }
            },
        },
        instanceMethods: {
            validPassword: (password) => {
                return bcrypt.compareSync(password, this.password)
            },
        },
    },
)

User.prototype.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash)
}

module.exports = User
