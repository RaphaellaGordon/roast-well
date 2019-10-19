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

  deleteProduct = (id) => {
    axios.delete(`/carts/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
    
    this.setState({
      orders: this.state.orders.filter(order => order.id !== id)
    })
  }

  onSubmit = (e) => {
    if(this.state.orders.length > 0) {
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
    } else {
      return null;
    }
  }

  confirmSubmit = () => {
    if (this.state.isSubmit === true) {
      return (
        <div className="confirm-pop">
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
      <div className="right">
        <p className="cart-total">Total: £{Number(total).toFixed(2)}</p>
      </div>
    )
  }

  orderList = () => {
    if (this.state.orders.length < 1) {
      return(
        <tr>
          <td>
            <p>Basket is empty</p>
          </td>
        </tr>
      )
    } else {
      return this.state.orders.map(order => {
        if (order.milkType === 'n/a') {
          return(
            <tr class="border-bottom" key={order.id}>
              <td width="30%">
                <img className="small-img" src={order.imgUrl} alt={order.name} />
              </td>
              <td width="20%">
                <p>{order.name}</p>
                <a href="#" onClick={() => {this.deleteProduct(order.id)}}>remove</a>
              </td>
              <td width="50%">
                <p className="right">£{Number(order.price).toFixed(2)}</p>
              </td>
            </tr>
          )
        } else {
          return(
            <tr class="border-bottom" key={order.id}>
              <td width="30%">
                <img className="small-img" src={order.imgUrl} alt={order.name} />
              </td>
              <td width="20%">
                <p>{order.name}</p>
                <p>{order.milkType} | {order.size}</p>
                <a href="#" onClick={() => {this.deleteProduct(order.id)}}>remove</a>
              </td>
              <td width="50%">
                <p className="right">£{Number(order.price).toFixed(2)}</p>
              </td>
            </tr>
          )
        }
      })
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="heading">Shopping Cart</h1>
        <table className="table">
          <tbody>
            {this.orderList()}
            <tr>
              <td width="30%"></td>
              <td width="20%"></td>
              <td width="60%">{this.total()}</td>
            </tr>
            <tr>
              <td width="30%"></td>
              <td width="20%"></td>
              <td width="60%">
                <form onSubmit={this.onSubmit}>
                  <div className="right">
                    <input className="submit-btn" type="submit" value="Submit your order" />
                  </div>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      
        {this.confirmSubmit()}
      </div>
    )
  }
}

export default ShoppingCart;