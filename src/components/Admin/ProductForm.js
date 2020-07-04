import React, { useState, useEffect } from 'react'
import CloudinaryUpload from './CloudinaryUpload'
import { Form, Button } from 'react-bootstrap'
import apiUrl from '../../apiConfig.js'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const ProductForm = (props) => {
  const [product, setProduct] = useState({ name: '', img: '', short_description: '', long_description: '', price: 0 })
  const [submitted, setSubmitted] = useState(false)
  const { id } = props.match.params
  const { user } = props

  useEffect(() => {
    if (id) {
      axios(`${apiUrl}/products/${id}`)
        .then(res => setProduct(res.data))
        .catch(console.error)
    }

    return () => {
      setProduct({})
    }
  }, [])

  const setImageLink = (secureUrl) => {
    setProduct({ ...product, img: secureUrl })
  }

  const handleChange = e => {
    e.persist()
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handlePost = e => {
    e.preventDefault()
    const data = parser(product)
    axios.post(`${apiUrl}/products/`, data, { headers: { 'Authorization': `Token ${user.token}` } })
      .then(() => setSubmitted(true))
      .catch(console.error)
  }

  const handlePatch = e => {
    e.preventDefault()
    const data = parser(product)
    axios.patch(`${apiUrl}/products/${id}/`, data, { headers: { 'Authorization': `Token ${user.token}` } })
      .then(() => setSubmitted(true))
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

  if (!user) {
    return <Redirect to={'/'} />
  } else if (!user.is_staff) {
    return <Redirect to={'/'} />
  }

  if (submitted) {
    return <Redirect to={'/Admin'} />
  }

  return (
    <Form onSubmit={ id ? handlePatch : handlePost}>
      <h3> { id ? 'Edit Item' : 'Create Item'} </h3>
      <CloudinaryUpload setImageLink={setImageLink} imageLink={product.img} />
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
      <Button type='submit'>{ id ? 'Edit Item' : 'Submit Item' }</Button>
    </Form>
  )
}

export default ProductForm
