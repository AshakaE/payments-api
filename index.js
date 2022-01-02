const express = require('express')
const helmet = require('helmet')
const path = require('path')
const db = require('./config/database')
const app = express()
const cors = require('cors')
// const db = require('./queries')
const port = 3000
app.use(express.json())


;(async () => {
    try {
        await db.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
})()
app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors())

app.get('/', (request, response) => {
    // response.json({ info: 'Node.js, Express, and Postgres API' })
    response.send({ info: 'Node.js, Express, and Postgres API' })
    // response.render
})

app.use('/api/v1/payments', require('./routes/paymentRoutes'))
app.use('/api/v1/users', require('./routes/userRoutes'))
// app.get('/users', db.getUsers)
// app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
