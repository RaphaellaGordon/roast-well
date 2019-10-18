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
        <Link to={`/${this.props.parent}/${cat.name}`} key={cat.id}>
          <div>
          <p>{cat.name}</p>
          <img src={cat.imgUrl} alt={cat.name} />
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
        <h3>{this.capitaliseTitle()}</h3>
        {console.log(this.state.categories)}
        <div>
        {this.catList()}
        </div>

      </div>
    )
  }
}

export default Category;