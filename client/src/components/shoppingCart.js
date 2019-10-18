import React, { Component } from 'react';
import axios from 'axios';

class ShoppingCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      isSubmit: false
    }
  }

  componentDidMount() {
    axios.get('/carts/')
      .then(res => {
        this.setState({
          orders: res.data.carts.map(cart => {
            return {
              id: cart._id,
              name: cart.name,
              imgUrl: cart.imgUrl,
              milkType: cart.milkType,
              size: cart.size,
              price: cart.price
            }
          })
        })
      })
      .catch(err => console.log(err))
  }


  orderList = () => {
    if (this.state.orders.length < 1) {
      return(
        <div>
          <p>Basket is empty</p>
        </div>
      )
    } else {
      return this.state.orders.map(order => {
        if (order.milkType === 'n/a') {
          return(
            <div key={order.id}>
              <p>{order.name}</p>
              <p>£{Number(order.price).toFixed(2)}</p>
              <img src={order.imgUrl} alt={order.name} />
              <a href="#" onClick={() => {this.deleteProduct(order.id)}}>delete</a>
            </div>
          )
        } else {
          return(
            <div key={order.id}>
              <p>{order.name}, {order.milkType}, {order.size}</p>
              <p>£{Number(order.price).toFixed(2)}</p>
              <img src={order.imgUrl} alt={order.name} />
              <a href="#" onClick={() => {this.deleteProduct(order.id)}}>delete</a>
            </div>
          )
        }
      })
    }
  }

  deleteProduct = (id) => {
    axios.delete(`/carts/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
    
    this.setState({
      orders: this.state.orders.filter(order => order.id !== id)
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const submitOrder = {
      order: this.state.orders
    };

    
    axios.post('/orders', submitOrder)
      .then(res => console.log(res.data))
      .catch(err => console.log("Error: " + err));

    axios.delete('/carts')
      .then(res => console.log(res.data))
      .catch(err => console.log("Error: " + err));
    
    this.setState({
      orders: [],
      isSubmit: true
    })
  }

  confirmSubmit = () => {
    if (this.state.isSubmit === true) {
      return (
        <div>
          <p>Your order has been sent</p>
        </div>
      )
    }
  }

  total = () => {
    let total = 0

    this.state.orders.map(order => {
      total = total + order.price
    });

    return (
      <div>
        <p>Total: £{Number(total).toFixed(2)}</p>
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        Shopping Cart
        {this.orderList()}
        {this.total()}
        <form onSubmit={this.onSubmit}>
          <input type="submit" value="Submit your order" />
        </form>
        {this.confirmSubmit()}
      </div>
    )
  }
}

export default ShoppingCart;