const categoriesRouter = require('express').Router();
const { 
  getCategories, 
  postCategory,
  getCategoryById,
  getProductsByCategory,
  getCategoriesByParent
} = require('../controllers/categories')

categoriesRouter.route('/')
  .get(getCategories)
  .post(postCategory)

categoriesRouter.route('/:id')
  .get(getCategoryById)

categoriesRouter.route('/:category/products')
  .get(getProductsByCategory)

categoriesRouter.route('/:parent/cats')
  .get(getCategoriesByParent)

module.exports = categoriesRouter;