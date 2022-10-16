const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errors')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(cookieParser())

const products = require('./routes/product')
const category = require('./routes/category')
const auth = require('./routes/auth')
const order = require('./routes/order')
const payment = require('./routes/payment')

app.use('/api', products)
app.use('/api', category)
app.use('/api', auth) 
app.use('/api', order)
app.use('/api', payment)

app.use(errorMiddleware)

module.exports = app
