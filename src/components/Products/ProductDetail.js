import React, { Component } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import apiUrl from '../../apiConfig'

class ProductDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      product: {}
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/products/${this.props.match.params.id}/`)
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
    this.props.history.push('/Products/')
    this.props.msgAlert({
      heading: 'Success!',
      message: 'Added To Cart',
      variant: 'success'
    })
  }

  render () {
    const { product } = this.state

    return (
      <div className='detailContainer'>
        <h2>{product.name}</h2>
        { product.img
          ? <img className='detailImage' src={product.img} />
          : <div className='noDetailImage'> No Image </div>
        }
        <br/>
        <div className='detailDescription'>
          Description: {product.long_description}
        </div>
        <div className='detailPrice'> $ {product.price} </div>
        <Button onClick={this.handleCart}> Add to cart </Button>
      </div>
    )
  }
}

export default ProductDetail
