import React, {Component} from 'react';
import axios from 'axios';


class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    }
  }


  componentDidMount() {
    axios.get('http://localhost:5000/orders/')
      .then(res => {
        let newList = res.data.orders.map(cart => {
          return {
            id: cart._id,
            cart: cart.order.map(productObj => {
              return {
                name: productObj.name
              }
            })
          }
        })
        console.log("newList: ", newList)
        this.setState({
          list: res.data.orders.map(cart => {
            return {
              id: cart._id,
              cart: cart.order.map(productObj => {
                return {
                  name: productObj.name,
                  milkType: productObj.milkType,
                  size: productObj.size
                }
              })
            }
          })
        })
      })
      .catch(err => console.log(err))
  }

  orderList = () => {
    if (this.state.list.length < 1) {
      return(
        <div>
          <p>No orders</p>
        </div>
      )
    } else {
      return this.state.list.map(cartObj => {
        return (
        <div>
          <div key={cartObj.id}>
            {cartObj.cart.map(productObj => {
              return (
                <div>
                  <p>{productObj.name}, {productObj.milkType}, {productObj.size}</p>
                </div>
              )
            })}
             <a href="#" onClick={() => {this.deleteProduct(cartObj.id)}}>delete</a>
          </div>
          <br />
        </div>
        )
      })
    }
  }

  deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/orders/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
    
    this.setState({
      list: this.state.list.filter(cart => cart.id !== id)
    })
  }

  render() {
    return (
      <div className="container">
        Orders Page
        {this.orderList()}
        {console.log('state.list: ', this.state.list)}
      </div>
    )
  }
}

export default Orders;