const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  role: {
    type: Array,
  },
});

module.exports = mongoose.model('User', dataSchema);
