const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  order: {
    type: Array
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;