const CustomerPayment = require('../models/CustomerPayment')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.payments = async (req, res, next) => {
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

exports.pay = async (req, res, next) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1099,
            currency: 'usd',
            payment_method: req.body.payment_method_id,
            confirm: true,
            capture_method: 'manual',
        })
        // console.log(paymentIntent)
        let { id } = paymentIntent
        console.log(id)
        const intent = await stripe.paymentIntents.capture(id)
        await stripe.paymentIntents.cancel('pi_3KCjuvKsrv8lDCbw0TMi4xbZ')
        console.log(intent)
        res.json({ data: intent })
    } catch (e) {
        console.log(e)
    }
    // CustomerPayment.create({
    //     amount,
    //     currency,
    //     status,
    // })
    // const data = {
    //     reference: 'Elasticsearch',
    //     referenceId: 4647,
    //     amount: '5000',
    //     currency: 0,
    //     status: 1,
    // }
    // let { reference, referenceId, amount, currency, status } = data
    // Payment.create({
    //     reference,
    //     referenceId,
    //     amount,
    //     currency,
    //     status,
    // })
    // .then(() => res.redirect('/gigs/payments'))

    // res.json({ data: paymentIntent })
    // .catch((e) => console.log(e))
    next()
}

exports.chargePayment = async (req, res, next) => {
    const { id } = req.body.pId
    const intent = await stripe.paymentIntents.capture(id)
    res.status(200).json({
        data: intent,
    })
    next()
}

exports.cancelPayment = async (req, res, next) => {
    const { id } = req.body.pId
    const cancel = await stripe.paymentIntents.cancel(id)
    res.status(200).json({
        data: cancel,
    })
    next()
}

exports.refundPayment = async (req, res, next) => {
    const { id } = req.body.pId
    const refund = await stripe.refunds.create({
        payment_intent: id
    })
    res.status(200).json({
        data: refund,
    })
    next()
}
