import React, { useState, useEffect } from 'react'
import CloudinaryUpload from './CloudinaryUpload'
import { Form, Button } from 'react-bootstrap'
import apiUrl from '../../apiConfig.js'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'

const ProductForm = (props) => {
  const [product, setProduct] = useState({ name: '', img: '', short_description: '', long_description: '', price: 0 })
  const [submitted, setSubmitted] = useState(false)
  const { id } = props.match.params
  const { user, msgAlert } = props

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
      .then(() => msgAlert({
        heading: 'Create Product Success',
        message: messages.createProductSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Create Product Failed with error: ' + error.message,
          message: messages.createProductFailure,
          variant: 'danger'
        })
      })
  }

  const handlePatch = e => {
    e.preventDefault()
    const data = parser(product)
    axios.patch(`${apiUrl}/products/${id}/`, data, { headers: { 'Authorization': `Token ${user.token}` } })
      .then(() => setSubmitted(true))
      .then(() => msgAlert({
        heading: 'Update Product Success',
        message: messages.updateProductSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Update Product Failed with error: ' + error.message,
          message: messages.updateProductFailure,
          variant: 'danger'
        })
      })
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
      <h2> { id ? 'Edit Item' : 'Create Item'} </h2>
      <CloudinaryUpload setImageLink={setImageLink} imageLink={product.img} msgAlert={msgAlert} />
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
