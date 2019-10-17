const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./routes/blogs');
const categoriesRouter = require('./routes/categories');
const ordersRouter = require('./routes/orders');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "cleint", "build", 'index.html'))
  })
}
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://dummy:code@cluster0-9bgff.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
.then(() => console.log(`Connected to MongoDB`))
.catch(err => console.log(err));

app.use('/blogs', blogsRouter);
app.use('/categories', categoriesRouter);
app.use('/orders', ordersRouter);
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});