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
    axios.get('/orders/')
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

  deleteProduct = (id) => {
    axios.delete(`/orders/${id}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
    
    this.setState({
      list: this.state.list.filter(cart => cart.id !== id)
    })
  }

  orderList = () => {
    if (this.state.list.length < 1) {
      return(
        <div className="centre">
          <p>No orders</p>
        </div>
      )
    } else {
      return this.state.list.map(cartObj => {
        return (
       
          <tbody key={cartObj.id}>
            {cartObj.cart.map(productObj => {
              return (
                <tr>
                  <td className="centre" width="30%">{productObj.name}</td>
                  <td className="centre" width="30%">{productObj.milkType}</td>
                  <td className="centre" width="30%">{productObj.size}</td>
                </tr>
              )
            })}
            <tr>
              <td with="30%"></td>
              <td className="centre" with="30%">
                <div className="del-padding">
                <a className="del-btn" href="#" onClick={() => {this.deleteProduct(cartObj.id)}}>delete</a>
                </div>
              </td>
              <td with="30%"></td>
            </tr>
          </tbody>
  

        // <div>
        //   <div key={cartObj.id}>
        //     {cartObj.cart.map(productObj => {
        //       return (
        //         <div>
        //           <p>{productObj.name}, {productObj.milkType}, {productObj.size}</p>
        //         </div>
        //       )
        //     })}
        //      <a href="#" onClick={() => {this.deleteProduct(cartObj.id)}}>delete</a>
        //   </div>
        //   <br />
        // </div>
        )
      })
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="heading">Orders Page</h1>
        <table className="table">
          <thead className="thead">
            <tr>
              <th>Product</th>
              <th>Milk Type</th>
              <th>Size</th>
            </tr>
          </thead>
          {this.orderList()}
        </table>
        </div>
    )
  }
}

export default Orders;