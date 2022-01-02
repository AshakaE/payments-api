const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')


router.post('/signUp', authController.signUp)

module.exports = router
