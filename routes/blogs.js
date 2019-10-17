const blogsRouter = require('express').Router();
const { 
  getBlogs, 
  postBlog
} = require('../controllers/blogs')

blogsRouter.route('/')
  .get(getBlogs)
  .post(postBlog)

module.exports = blogsRouter;