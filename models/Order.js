const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  user: String,

  items: [
    {
      id: String,
      name: String,
      price: Number,
      image: String,
      quantity: Number,
      itemTotal: Number,
    }
  ],

  total: Number,

  status: String,

  date: String,

  address: {
    name: String,
    phone: String,
    city: String,
    pincode: String,
    addressLine: String,
    address: String,
  }

},
{
  timestamps: true,
});

module.exports = mongoose.model("Order", orderSchema);