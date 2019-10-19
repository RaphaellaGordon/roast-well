import React, { Component } from 'react';
import axios from 'axios';

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      category: '',
      imgUrl: '',
      description: '',
      price: 0,
      milkType: 'No Milk',
      size: 'Small',
      isSubmit: false
    }
  }

  componentDidMount() {
    axios.get(`/products/${this.props.match.params.product}`)
      .then(res => {
        this.setState({
          name: res.data.product.name,
          category: res.data.product.category,
          imgUrl: res.data.product.imgUrl,
          description: res.data.product.description,
          price: Number(res.data.product.price).toFixed(2),
        })
      })
      .catch(err => console.log(err))
    
    if (this.props.isdrink === true) {
      this.setState({
        milkType: 'No Milk',
        size: 'Small'
      })
    } else {
      this.setState({
        milkType: 'n/a',
        size: 'n/a'
      })
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const order = {
      name: this.state.name,
      imgUrl: this.state.imgUrl,
      milkType: this.state.milkType,
      size: this.state.size,
      price: this.state.price
    }
    
    axios.post('/carts', order)
      .then(res => console.log(res.data))
      .catch(err => console.log("Error: " + err));

    this.setState({
      isSubmit: true
    })
  }

  onChangeMilk = (e) => {
    this.setState({
      milkType: e.target.value
    })
  }

  onChangeSize = (e) => {
    this.setState({
      size: e.target.value
    })
  }

  drinkOptions = () => {
    if (this.props.isdrink === true) {
      return (
        <div className="options-container under-img">
          <select
          value={this.state.milkType}
          onChange={this.onChangeMilk}
          className="select"
          >
            <option>No Milk</option>
            <option>Whole Milk</option>
            <option>Semi Skimmed Milk</option>
            <option>Skimmed Milk</option>
            <option>Soy Milk</option>
          </select>
          <select
          value={this.state.size}
          onChange={this.onChangeSize}
          className="select margin1"
          >
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>
      )
    } else {
      return null;
    }
  }

  confirmSubmit = () => {
    if (this.state.isSubmit === true) {
      return (
        <div className="confirm-pop">
          <p>Added to basket</p>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="container">
        <h1 className="heading">{this.state.name}</h1>
        <div className="centre">
          <img className="centre" src={this.state.imgUrl} alt={this.state.name} />
        </div>
        <p className="centre">{this.state.description}</p>
        <p className="centre">£{this.state.price}</p>
        <form onSubmit={this.onSubmit}>
          <div>
            {this.drinkOptions()}
          </div>
          <div className="submit-cont">
            <input className="submit-btn" type="submit" value="Add to order" />
          </div>
        </form>
        {this.confirmSubmit()}
      </div>
    )
  }
}

export default Product;