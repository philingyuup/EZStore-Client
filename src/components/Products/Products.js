import React, { Component } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import { Container, Row, Col } from 'react-bootstrap'

import apiUrl from '../../apiConfig'

class Products extends Component {
  constructor (props) {
    super(props)
    this.state = {
      products: []
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/products/`)
      .then(res => {
        this.setState({ products: res.data })
      })
      .catch(console.error)
  }

  render () {
    const { products } = this.state
    const { msgAlert } = this.props

    const productsJsx = products.map(product => (
      <Col md={4} s={6} key={product.id}>
        <ProductCard
          msgAlert={msgAlert}
          img={product.img}
          name={product.name}
          price={product.price}
          short_description={product.short_description}
          id={product.id}
        />
      </Col>
    ))

    return (
      <div>
        <h2>Products</h2>
        <br/>
        <Container fluid={true}>
          <Row>
            {productsJsx}
          </Row>
        </Container>
      </div>
    )
  }
}

export default Products
