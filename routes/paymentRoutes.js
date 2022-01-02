const express = require('express')
const router = express.Router()
const paymentsController = require('../controllers/paymentsController')
// router.get('/', (req, res) =>
//     Gig.findAll()
//         .then((gigs) => {
//             console.log(gigs)
//             res.sendStatus(200)
//         })
//         .catch((e) => console.log(e)),
// )
router.post('/payments', paymentsController.pay) // make payments
router.get('/payments/:id', paymentsController.payments) // get one payment
router.get('/payments', paymentsController.payments) // add filter options
router.patch('/payments/:id/charge', paymentsController.chargePayment)
router.patch('/payments/:id/cancel', paymentsController.cancelPayment)
router.patch('/payments/:id/refund', paymentsController.refundPayment)

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


module.exports = router
