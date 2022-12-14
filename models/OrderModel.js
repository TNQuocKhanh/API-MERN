const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } =mongoose.Schema;

const CartItemSchema = new mongoose.Schema(
  {
    product: { type: ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    count: Number,  
  },
  { timestamps: true },
)

const CartItem = mongoose.model("CartItem", CartItemSchema)

const OrderSchema = new mongoose.Schema({
  products: [CartItemSchema],
  transaction_id: {},
  amount: { type: Number  },
  address: String,
  status: {
    type: String,
    default: 'PROCESSING',
    enum: [
      'PROCESSING',
      'CONFIRMED',
      'DELIVERING',
      'DONE',
      'CANCEL',
    ],
  },
  total: { type: Number },
  updated: Date,
  method: {
    type: String,
    default: 'COD',
    enum: [
      'COD',
      'PAYPAL'
    ],
  },
  user: { type: ObjectId, ref: 'User'  }
}, {
timestamps: true
});

const Order = mongoose.model("Order", OrderSchema)

module.exports = { Order, CartItem }
