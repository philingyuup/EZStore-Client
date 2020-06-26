import React, { Component } from 'react'
import axios from 'axios'

import apiUrl from '../../apiConfig'

class ProductDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      product: {}
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/products/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ product: res.data })
      })
      .catch(console.error)
  }

  handleCart = () => {
    this.props.checkout({
      name: this.state.product.name,
      price: this.state.product.price,
      id: this.state.product.id
    })
  }

  componentDidUpdate () {
    console.log(this.props.cart)
  }

  render () {
    const { product } = this.state

    return (
      <div>
        <img src={product.img} />
        <h3>{product.name}</h3>
        <div> {product.short_description} </div>
        <br/>
        <div>
          Description: {product.long_description}
        </div>
        <button onClick={this.handleCart}> Add to cart </button>
      </div>
    )
  }
}

export default ProductDetail
