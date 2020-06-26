import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Checkout extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    console.log(this.props.cart)
    const cartJsx = this.props.cart.map(product => (
      <li key={product.id}>
        <div>Name: {product.name} </div>
        <div>Price: {product.price} </div>
      </li>
    ))

    return (
      <div>
        <h4>Checkout Cart</h4>
        <ul>
          {cartJsx}
        </ul>
      </div>
    )
  }
}

export default withRouter(Checkout)
