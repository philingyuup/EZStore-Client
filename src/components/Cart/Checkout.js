import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Table } from 'react-bootstrap'

class Checkout extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    console.log(this.props.cart)
    const cartJsx = this.props.cart.map(product => (
      <tr key={product.id}>
        <td>{product.id} </td>
        <td>{product.name} </td>
        <td>{product.price} </td>
      </tr>
    ))

    return (
      <div>
        <h2>Checkout Cart</h2>
        <Table className='checkoutTable' size='md' striped bordered hover>
          <thead>
            <tr>
              <th> ID </th>
              <th> NAME </th>
              <th> PRICE </th>
            </tr>
          </thead>
          <tbody>
            {cartJsx}
          </tbody>
        </Table>
        <div className='noDetailImage'>Shipping Stuff (USPS Webtools) </div>
        <div className='noDetailImage'>Payment Stuff (Stripe API) </div>
      </div>
    )
  }
}

export default withRouter(Checkout)
