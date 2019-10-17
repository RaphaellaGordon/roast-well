const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number
  }
});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;