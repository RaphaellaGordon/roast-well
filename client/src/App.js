import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Navbar from "./components/navbar";
import Homepage from "./components/homepage";
import Category from "./components/category";
import Subcategory from "./components/subcategory";
import Product from "./components/product";
import ShoppingCart from "./components/shoppingCart";
import Orders from "./components/orders";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="root-container">
          <Navbar />
          <br />
          <Route 
            path="/" 
            exact 
            component={Homepage} />
          <Route 
            path="/drinks"
            exact 
            render={(props) => <Category {...props} parent={"drinks"} />}
          />
          <Route 
            path="/drinks/:category" 
            exact 
            render={(props) => <Subcategory {...props} parent={"drinks"} />}
          />
          <Route 
            path="/drinks/:category/:product"
            render={(props) => <Product {...props} isdrink={true} />}
          />
          <Route 
            path="/food"
            exact 
            render={(props) => <Category {...props} parent={"food"} />}
          />
          <Route 
            path="/food/:category" 
            exact 
            render={(props) => <Subcategory {...props} parent={"food"} />} 
          />
          <Route 
            path="/food/:category/:product"
            render={(props) => <Product {...props} isdrink={false} />}
          />
          <Route
            path="/shoppingcart"
            component={ShoppingCart}
          />
          <Route
            path="/orders"
            component={Orders}
          />
        </div>
      </Router>
    );
  }
}

export default App;
