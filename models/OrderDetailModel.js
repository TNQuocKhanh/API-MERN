const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  orderId: {
    type: String,
  },
  productId: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  total: {
    type: Number,
  },
});

module.exports = mongoose.model('OrderDetail', dataSchema);
