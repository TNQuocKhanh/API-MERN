require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const paypal = require('paypal-rest-sdk')
const ejs = require('ejs')

const mongoString = process.env.DATABASE_URL;
const PORT = 5000;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

paypal.configure({
  'mode': 'sandbox',
  'client_id': process.env.CLIENT_ID,
  'client_secret': process.env.CLIENT_SECRET,
})

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('index'))

const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const orderRoutes = require('./routes/order.routes');
const authRoutes = require('./routes/auth.routes');
const paymentRoutes = require('./routes/payment.routes');

app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', orderRoutes);
app.use('/api', authRoutes);
app.use('/api', paymentRoutes)

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
