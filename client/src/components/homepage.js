import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="container home-cont">
      <div className="banner">
        <h1>Break up the daily grind</h1>
      </div>
      <div className="box-section">
        <div className="section-text">
          <h1>Milk it for all it's worth</h1>
          <h4>10% off your favourite coffee</h4>
          <Link to={'/drinks/coffee/Latte'}>
            <button type="button">Order now!</button>
          </Link>
        </div>
        <div className="section-image">
          <img className="large-img" src="https://i.postimg.cc/6qZ7f1kz/latte.png" alt="latte" />
        </div>
      </div>
      <div className="box-section">
        <div className="section-image">
          <img className="large-img" src="https://i.postimg.cc/cLS3X043/espresso.png" alt="espresso" />
        </div>
        <div className="section-text">
          <h1>Mug Shot</h1>
          <h4>Get your daily kick here</h4>
          <Link to={'/drinks/coffee/Espresso'}>
            <button type="button">Order now!</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Homepage;