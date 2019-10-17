const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 2000 // approx 300 words
  },
  imgUrl: {
    type: String,
    required: true,
    trim: true
  },
});

const Blog = mongoose.model('Blog',blogSchema);

module.exports = Blog;