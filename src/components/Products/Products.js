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

    const productsJsx = products.map(product => (
      <Col md={4} s={6} key={product.id}>
        <ProductCard
          name={product.name}
          short_description={product.short_description}
          id={product.id}
        />
      </Col>
    ))

    return (
      <div>
        <h4>Products</h4>
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
