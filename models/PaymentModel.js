const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  paymentType: {
    type: String,
  },
  paymentStatus: {
    type: Number,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Payment', paymentSchema);
