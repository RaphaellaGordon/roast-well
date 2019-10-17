const Cart = require('../models/cart');

const getCarts = (req, res) => {
  Cart.find()
    .then(carts => res.status(200).send({carts}))
    .catch(err => res.status(400).json('Error: ' + err));
}

const postCart = (req, res) => {
  const {name, imgUrl, milkType, size, price} = req.body;
  const newCart = new Cart({
    name,
    imgUrl,
    milkType,
    size,
    price
  })
  newCart.save()
    .then(cart => res.status(201).send({cart}))
    .catch(err => res.status(400).json('Error: ' + err));
}


const deleteCartById = (req, res) => {
  Cart.findByIdAndDelete(req.params.id)
  .then(() => res.send('cart item deleted'))
  .catch(err => res.status(400).json('Error: ' + err));
}

const deletAllCartItems = (req, res) => {
  Cart.deleteMany({})
  .then(() => res.send('all cart items deleted'))
  .catch(err => res.status(400).json('Error: ' + err));
}

module.exports = {
  getCarts, 
  postCart,
  deletAllCartItems, 
  deleteCartById
}