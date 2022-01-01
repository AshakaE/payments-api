const Sequelize = require('sequelize')
const db = require('../config/database')

const CustomerPayment = db.define('payments', {
    reference: {
        type: Sequelize.STRING,
    },
    referenceId: {
        type: Sequelize.STRING,
    },
    amount: {
        type: Sequelize.INTEGER,
    },
    currency: {
        type: Sequelize.ENUM({
            values: ['USD', 'NGN'],
        }),
    },
    status: {
        type: Sequelize.ENUM({
            values: [
                'canceled',
                'processing',
                'requires_action',
                'requires_capture',
                'requires_confirmation',
                'requires_payment_method',
                'succeeded',
                'refunded',
            ],
        }),
    },
})

module.exports = CustomerPayment
