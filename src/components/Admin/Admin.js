import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCard from '../Products/ProductCard'
import { Link, Redirect } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'

import apiUrl from '../../apiConfig'

const ProductAdmin = ({ user, msgAlert }) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios(`${apiUrl}/products/`)
      .then(res => {
        setProducts(res.data)
      })
      .then(() => msgAlert({
        heading: 'Get Product Success',
        message: 'The client was able to fetch the products from the server',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Get Product Failed with error: ' + error.message,
          message: 'The client failed to fetch the products from the server',
          variant: 'danger'
        })
      })

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
        msgAlert={msgAlert}
        img={product.img}
        name={product.name}
        price={product.price}
        deleteProduct = {deleteProduct}
        short_description={product.short_description}
        editable={true}
        id={product.id}
      />
    </Col>
  ))

  return (
    <div>
      <h2>Admin Page</h2>
      <br/>
      <Container fluid={true}>
        <h3> Create New Item </h3>
        <Row>
          <Link to='/Admin/Create'>
            <Button className='createItemButton' type='button'>Create New Item</Button>
          </Link>
        </Row>
        <br/>
        <h3> Products </h3>
        <Row>
          {productsJsx}
        </Row>
      </Container>
    </div>
  )
}

export default ProductAdmin
