import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCard from '../Products/ProductCard'
import { Link, Redirect } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'

import apiUrl from '../../apiConfig'

const ProductAdmin = ({ user }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios(`${apiUrl}/products/`)
      .then(res => {
        setProducts(res.data)
      })
      .catch(console.error)

    return () => {
      setProducts([])
    }
  }, [])

  const deleteProduct = (name) => {
    setProducts(products.filter(product => product.name !== name))
  }

  if (!user) {
    return <Redirect to={'/'} />
  } else if (!user.is_staff) {
    return <Redirect to={'/'} />
  }

  const productsJsx = products.map(product => (
    <Col md={4} s={6} key={product.id}>
      <ProductCard
        user={user}
        name={product.name}
        deleteProduct = {deleteProduct}
        short_description={product.short_description}
        editable={true}
        id={product.id}
      />
    </Col>
  ))

  return (
    <div>
      <h3>Admin Page</h3>
      <Container fluid={true}>
        <Row>
          <Link to='/Admin/Create'>
            <Button type='button'>Create New Item</Button>
          </Link>
        </Row>
        <Row>
          {productsJsx}
        </Row>
      </Container>
    </div>
  )
}

export default ProductAdmin