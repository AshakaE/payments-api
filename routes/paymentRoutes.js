const express = require('express')
const router = express.Router()
const paymentsController = require('../controllers/paymentsController')
// const elements = stripe.elements()
// const elements = stripe.
// const cardElement = elements.create('card')

// router.get('/', (req, res) =>
//     Gig.findAll()
//         .then((gigs) => {
//             console.log(gigs)
//             res.sendStatus(200)
//         })
//         .catch((e) => console.log(e)),
// )
router.get('/payments', paymentsController.payment)

// router.get('/add', (req, res) => {
//     const data = {
//         title: 'Looking for a back end developer',
//         technologies: 'Node.js, PostgreSQL, Stripe, Elasticsearch',
//         budget: '$5000',
//         description:
//             'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi illo facere laboriosam delectus quidem temporibus neque ut quaerat libero fugiat quia beatae sed, inventore, minus perspiciatis distinctio? Pariatur, voluptatibus doloribus.',
//         contact_email: 'user@email.com',
//     }
//     let { title, technologies, budget, description, contact_email } = data
//     Gig.create({
//         title,
//         technologies,
//         budget,
//         description,
//         contact_email,
//     })
//         .then((gigs) => res.redirect('/gigs'))
//         .catch((e) => console.log(e))
// })
router.get('/success', (req, res) => {
    res.send({ data: 'Payment successful' })
})
router.get('/cancel', (req, res) => {
    res.send({ data: 'Payment cancelled' })
})

router.post('/payment', async (req, res) => {
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
         await stripe.paymentIntents.cancel(
            'pi_3KCjuvKsrv8lDCbw0TMi4xbZ',
        )
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
})

module.exports = router
