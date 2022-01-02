const User = require('../models/User')
const asyncHandler = require('../utils/asyncHandler')

exports.signUp = asyncHandler(async (req, res, next) => {
    const { name, email } = req.body
    const user = await User.create({ name, email })
    res.status(200).json({
        data: user,
    })
    next()
})
