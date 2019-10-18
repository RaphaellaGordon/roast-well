const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./routes/blogs');
const categoriesRouter = require('./routes/categories');
const ordersRouter = require('./routes/orders');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const path = require('path');
require('dotenv').config({ path: '.ENV' });

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('My MONGODB_URI is ' + process.env.MONGODB_URI))
.catch(err => console.log(err));

app.use('/blogs', blogsRouter);
app.use('/categories', categoriesRouter);
app.use('/orders', ordersRouter);
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});