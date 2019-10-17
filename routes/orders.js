const ordersRouter = require('express').Router();
const { 
  getOrders, 
  postOrder, 
  deleteOrderById
} = require('../controllers/orders')

ordersRouter.route('/')
  .get(getOrders)
  .post(postOrder)

ordersRouter.route('/:id')
  .delete(deleteOrderById)

module.exports = ordersRouter;