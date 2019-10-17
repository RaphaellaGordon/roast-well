const Blog = require('../models/blog');

const getBlogs = (req, res) => {
  Blog.find()
  .then(blogs => res.status(200).json(blogs))
  .catch(err => res.status(400).json('Error: ' + err));
}

const postBlog = (req, res) => {
  const {title, author, content, imgUrl} = req.body;
  const newBlog = new Blog({
    title,
    author,
    content,
    imgUrl
  })
  newBlog.save()
    .then(blog => res.status(201).send({blog}))
    .catch(err => res.status(400).json('Error: ' + err));
}

module.exports = { 
  getBlogs, 
  postBlog
}