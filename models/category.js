const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  parent: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  }
});

const Category = mongoose.model('Category',categorySchema);

module.exports = Category;