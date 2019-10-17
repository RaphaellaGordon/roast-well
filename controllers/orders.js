const Order = require('../models/order');

const getOrders = (req, res) => {
  Order.find()
    .then(orders => res.status(200).send({orders}))
    .catch(err => res.status(400).json('Error: ' + err));
}

const postOrder = (req, res) => {
  const order = req.body.order;
  const newOrder = new Order({
    order
  })
  newOrder.save()
    .then(order => res.status(201).send({order}))
    .catch(err => res.status(400).json('Error: ' + err));
}


const deleteOrderById = (req, res) => {
  Order.findByIdAndDelete(req.params.id)
  .then(() => res.send('order deleted'))
  .catch(err => res.status(400).json('Error: ' + err));
}

module.exports = {
  getOrders, 
  postOrder, 
  deleteOrderById
}