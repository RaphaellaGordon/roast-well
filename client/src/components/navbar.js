import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav>
        <div className="nav-container">
          <ul>
            <li>
              <Link id="homepage-link" className="nav-link" to="/">Roast Well</Link>
            </li>
            <li>
              <Link className="nav-link" to="/drinks">Drinks</Link>
            </li>
            <li>
              <Link className="nav-link" to="/food">Food</Link>
            </li>
            <li>
              <Link className="nav-link" to="/blog">Blog</Link>
            </li>
          </ul>
          <div className="icon-container">
            <Link to="/shoppingcart">
              <img src="https://i.postimg.cc/MXk3LKzC/pinpng-com-cart-icon-png-2211713.png" alt="shopping-cart" />
            </Link>
          </div>
        </div>
      </nav>
    )
  }
}