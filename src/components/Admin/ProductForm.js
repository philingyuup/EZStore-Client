import React, { useState } from 'react'
import CloudinaryUpload from './CloudinaryUpload'
import { Form, Button } from 'react-bootstrap'
import apiUrl from '../../apiConfig.js'
import axios from 'axios'

const ProductForm = ({ user }) => {
  const [product, setProduct] = useState({ name: '', img: '', short_description: '', long_description: '', price: 0 })

  const setImageLink = (secureUrl) => {
    setProduct({ ...product, img: secureUrl })
  }

  const handleChange = e => {
    e.persist()
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const data = parser(product)
    axios.post(`${apiUrl}/products/`, data, { headers: { 'Authorization': 'Token 671e97b01d8daf0d49e607c1475518d56f1625b7' } })
      .then(res => console.log(res))
      .catch(console.error)
  }

  const parser = unparsedProduct => {
    const parsedProduct = { product: { } }
    for (const key in unparsedProduct) {
      if (unparsedProduct[key]) {
        parsedProduct.product[key] = unparsedProduct[key]
      }
    }
    return parsedProduct
  }

  return (
    <Form onSubmit={handleSubmit}>
      <CloudinaryUpload setImageLink={setImageLink} />
      <Form.Group controlId='formName'>
        <Form.Label>Product Name</Form.Label>
        <Form.Control type='text' name='name' value={product.name} placeholder='name' onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId='short_description'>
        <Form.Label>Short Description</Form.Label>
        <Form.Control type='text' name='short_description' placeholder='Used for product cards' value={product.short_description} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId='long_description'>
        <Form.Label>Long Description</Form.Label>
        <Form.Control type='text' name='long_description' placeholder='Use for product details' value={product.long_description} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId='price'>
        <Form.Label>Price (ex: 39.95)</Form.Label>
        <Form.Control type='number' name='price' value={product.price} placeholder='$0,000.00' onChange={handleChange} />
      </Form.Group>
      <Button type='submit'>Submit Item</Button>
    </Form>
  )
}

export default ProductForm
