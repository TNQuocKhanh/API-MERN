const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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
    default: ["CUSTOMER"],
  },
});

module.exports = mongoose.model("User", userSchema);
