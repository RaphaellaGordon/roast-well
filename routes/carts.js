const cartsRouter = require('express').Router();
const { 
  getCarts, 
  postCart,
  deletAllCartItems, 
  deleteCartById
} = require('../controllers/carts')

cartsRouter.route('/')
  .get(getCarts)
  .post(postCart)
  .delete(deletAllCartItems)

cartsRouter.route('/:id')
  .delete(deleteCartById)

module.exports = cartsRouter;