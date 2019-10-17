const Product = require('../models/product');

const getProducts = (req, res) => {
  Product.find()
    .then(products => res.status(200).send({products}))
    .catch(err => res.status(400).json('Error: ' + err));
}

const postProduct = (req, res) => {
  const {name, category, imgUrl, description, price} = req.body;
  const newProduct = new Product({
    name,
    category,
    imgUrl,
    description,
    price
  })
  newProduct.save()
    .then(product => res.status(201).send({product}))
    .catch(err => res.status(400).json('Error: ' + err));
}

const getProductByName = (req, res) => {
  Product.findOne({name: req.params.name})
    .then(product => res.status(200).send({product}))
    .catch(err => res.status(400).json('Error: ' + err));
}

const getProductById = (req, res) => {
  Product.findById({_id: req.params.id})
    .then(product => res.status(201).send({product}))
    .catch(err => res.status(400).json('Error: ' + err));
}

const patchProductById = (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      product.name = req.body.name,
      product.category = req.body.category,
      product.imgUrl = req.body.imgUrl,
      product.description = req.body.description,
      product.price = req.body.price

      product.save()
      .then(() => res.send('product updated'))
      .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
}

const deleteProductById = (req, res) => {
  Product.findByIdAndDelete(req.params.id)
  .then(() => res.send('product deleted'))
  .catch(err => res.status(400).json('Error: ' + err));
}

module.exports = {
  getProducts, 
  postProduct, 
  getProductByName,
  getProductById,
  patchProductById,
  deleteProductById
}