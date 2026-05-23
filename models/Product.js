const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  name: String,

  brand: String,

  price: Number,

  oldPrice: Number,

  rating: Number,

  reviews: Number,

  stock: Number,

  description: String,

  images: [String],

  offer: String,

  active: Boolean,

},
{
  timestamps: true,
});

module.exports = mongoose.model("Product", productSchema);