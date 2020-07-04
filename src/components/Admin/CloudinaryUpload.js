import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
// import apiUrl from '../../apiConfig.js'

const CloudinaryUpload = (props) => {
  const { setImageLink, imageLink } = props
  const [deleteToken, setDeleteToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [deleting, setDeleting] = useState('')

  const uploadImage = (e) => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'ezstore')
    setLoading(true)
    axios.post('https://api.cloudinary.com/v1_1/dbfulv8ap/image/upload', data)
      .then((res) => {
        setImageLink(res.data.secure_url)
        if (res.data.delete_token) {
          setDeleteToken(res.data.delete_token)
        }
      })
      .then(() => setLoading(false))
      .then(() => setUploaded(true))
      .catch((err) => console.log(err))
  }

  const deleteImage = () => {
    setDeleting('deleting...')
    axios.post(
      'https://api.cloudinary.com/v1_1/dbfulv8ap/delete_by_token',
      { 'token': deleteToken }
    )
      .then(() => setImageLink(''))
      .then(() => setDeleting(''))
      .then(() => setUploaded(false))
      .catch(console.error)
  }

  return (
    <Form.Group>
      <Form.Label>Image Preview</Form.Label>
      <br />
      {loading && (
        <Form.Label>Loading...</Form.Label>
      )}
      <img src={imageLink} style={{ width: '50vw' }} />
      <Form.Control
        type='file'
        name='file'
        label='Upload your image'
        onChange={uploadImage}
      />
      {uploaded && <Button type='button' onClick={deleteImage}>Delete</Button>}
      <h3>{deleting}</h3>
    </Form.Group>
  )
}

export default CloudinaryUpload
