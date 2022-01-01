const CustomerPayment = require('../models/CustomerPayment')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.payment = async (req, res, next) => {
    CustomerPayment.findAll()
        .then((gigs) => {
            console.log(gigs)
            res.status(200).json({
                data: gigs,
            })
        })
        .catch((e) => console.log(e)),
        next()
}
