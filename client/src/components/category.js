import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {categories: []}
  }

  componentDidMount() {
    axios.get(`/categories/${this.props.parent}/cats`)
      .then(res => {
        this.setState({
          categories: res.data.categories.map(cat => {
            return {
              id: cat._id,
              name: cat.name,
              imgUrl: cat.imgUrl
            }
          })
        })
      })
      .catch(err => console.log(err))
  }

  catList = () => {
    return this.state.categories.map(cat => {
      return (
        <Link className="list-item" to={`/${this.props.parent}/${cat.name}`} key={cat.id}>
          <div>
            <div className="hover-div">
              <img src={cat.imgUrl} alt={cat.name} />
            </div>
            <h3 className="item-name">{cat.name}</h3>
          </div>
        </Link>
        
      )
    })
  }

  capitaliseTitle = () => {
    let lower = this.props.parent;
    let capitalise = lower.charAt(0).toUpperCase() + lower.substring(1);
    return capitalise;
  }

  render() {
    return (
      <div className="container">
        <h1 className="heading">{this.capitaliseTitle()}</h1>
        <div className="list-container">
        {this.catList()}
        </div>

      </div>
    )
  }
}

export default Category;