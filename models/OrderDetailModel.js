const mongoose = require("mongoose");

const orderDetailSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
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

module.exports = mongoose.model("OrderDetail", orderDetailSchema);
