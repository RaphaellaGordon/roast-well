const productsRouter = require('express').Router();
const { 
  getProducts, 
  postProduct, 
  getProductByName,
  getProductById,
  patchProductById,
  deleteProductById
} = require('../controllers/products')

productsRouter.route('/')
  .get(getProducts)
  .post(postProduct)

productsRouter.route('/:name')
  .get(getProductByName)

productsRouter.route('/:id')
  .get(getProductById)
  .patch(patchProductById)
  .delete(deleteProductById)

module.exports = productsRouter;