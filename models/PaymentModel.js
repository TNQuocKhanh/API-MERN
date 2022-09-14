const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  paymentType: {
    type: String,
  },
  paymentStatus: {
    type: Number,
  },
  paymentDate: {
    type: Date,
  },
});

module.exports = mongoose.model('Payment', dataSchema);
