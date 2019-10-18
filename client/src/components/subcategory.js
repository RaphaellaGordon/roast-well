import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Subcategory extends Component {
  constructor(props) {
    super(props);

    this.state = {products: []}
  }

  componentDidMount() {
    axios.get(`/${this.props.match.params.category}/products`)
      .then(res => {
        console.log(res.data.products)
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
        <Link to={`/${this.props.parent}/${this.props.match.params.category}/${product.name}`} key={product.id}>
          <div>
          <img src={product.imgUrl} alt={product.name} />
          <p>{product.name}</p>
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
        <h3>{this.capitaliseTitle()}</h3>
        <div>
        {this.subCatList()}
        </div>
      </div>
    )
  }
}

export default Subcategory;