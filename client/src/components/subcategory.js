import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Subcategory extends Component {
  constructor(props) {
    super(props);

    this.state = {products: []}
  }

  componentDidMount() {
    axios.get(`/categories/${this.props.match.params.category}/products`)
      .then(res => {
        console.log("params ", this.props.match.params.category)
        console.log(res.data)
        this.setState({
          products: res.data.products.map(product => {
            return {
              id: product._id,
              name: product.name,
              imgUrl: product.imgUrl
            }
          })
        })
      })
      .catch(err => console.log(err))
  }


  subCatList = () => {
    return this.state.products.map(product => {
      return (
        <Link className="list-item" to={`/${this.props.parent}/${this.props.match.params.category}/${product.name}`} key={product.id}>
          <div>
            <div className="hover-div">
              <img src={product.imgUrl} alt={product.name} />
            </div>
            <h3 className="item-name">{product.name}</h3>
          </div>
        </Link>
        
      )
    })
  }

  capitaliseTitle = () => {
    let lower = this.props.match.params.category;
    let capitalise = lower.charAt(0).toUpperCase() + lower.substring(1);
    return capitalise;
  }

  render() {
    return (
      <div className="container">
        <h1 className="heading">{this.capitaliseTitle()}</h1>
        <div className="list-container">
        {this.subCatList()}
        </div>
      </div>
    )
  }
}

export default Subcategory;