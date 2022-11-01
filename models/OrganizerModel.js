const mongoose = require("mongoose")

const organizerSchema = new  mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
  },
  quantityImport: {
    type: Number,
  },
  price: {
    type: Number,
  }
})

module.exports = mongoose.model("Organizer", organizerSchema)

