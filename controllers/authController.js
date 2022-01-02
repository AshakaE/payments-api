const User = require('../models/User')
const asyncHandler = require('../utils/asyncHandler')

exports.signUp = asyncHandler(async (req, res, next) => {
    const { name, email, password, passwordConfirm } = req.body
    try {
        const user = await User.create({
            name,
            email,
            password,
            passwordConfirm,
        })
        res.status(200).json({
            data: user,
        })
    } catch (e) {
        res.send(e.errors[0].message)
    }
    next()
})

// exports.login = asyncHandler(async (req, res, next) => {
//     const { email, password } = req.body

//     if (!email || !password) {
//         return next(new AppError('Please provide email and password', 400))
//     }

//     const user = await User.findOne({ email }).select('+password')

//     if (!user || !(await user.validatePassword(password, user.password))) {
//         return next(new AppError('Incorrect email or password', 401))
//     }
// })
