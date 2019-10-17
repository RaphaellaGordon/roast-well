const Category = require('../models/category');
const Product = require('../models/product');

const getCategories = (req, res) => {
  Category.find()
  .then(categories => res.status(200).json(categories))
  .catch(err => res.status(400).json('Error: ' + err));
}

const postCategory = (req, res) => {
  const {name, parent, imgUrl} = req.body;
  const newCategory = new Category({
    name,
    parent,
    imgUrl
  })
  newCategory.save()
    .then(category => res.status(201).send({category}))
    .catch(err => res.status(400).json('Error: ' + err));
}

const getCategoryById = (req, res) => {
  Category.findById({_id: req.params.id})
    .then(category => res.status(201).send({category}))
    .catch(err => res.status(400).json('Error: ' + err));
}

const getProductsByCategory = (req, res) => {
  Product.find({category: req.params.category})
    .then(products => res.status(200).send({products}))
    .catch(err => res.status(400).json('Error: ' + err));
}

const getCategoriesByParent = (req, res) => {
  Category.find({parent: req.params.parent})
    .then(categories => res.status(200).send({categories}))
    .catch(err => res.status(400).json('Error: ' + err));
}

module.exports = { 
  getCategories, 
  postCategory,
  getCategoryById,
  getProductsByCategory,
  getCategoriesByParent
}