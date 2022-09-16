const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  info: {
    type: String,
  },
});

module.exports = mongoose.model("Order", orderSchema);
