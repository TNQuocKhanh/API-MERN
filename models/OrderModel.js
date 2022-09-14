const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  customerId: {
    type: String,
  },
  paymentId: {
    type: String,
  },
  orderDate: {
    type: Date,
  },
  info: {
    type: String,
  },
});

module.exports = mongoose.model('Order', dataSchema);
