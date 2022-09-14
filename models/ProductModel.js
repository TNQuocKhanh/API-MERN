const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  categoryId: {
    type: String,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  review: {
    type: Number,
  },
});

module.exports = mongoose.model('Product', dataSchema);
