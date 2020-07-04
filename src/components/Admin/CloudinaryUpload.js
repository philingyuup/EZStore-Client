import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'

const CloudinaryUpload = ({ setImageLink }) => {
  const [image, setImage] = useState('')
  const [deleteToken, setDeleteToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState('')

  const uploadImage = (e) => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'ezstore')
    setLoading(true)
    axios.post('https://api.cloudinary.com/v1_1/dbfulv8ap/image/upload', data)
      .then((res) => {
        setImage(res.data.secure_url)
        if (res.data.delete_token) {
          setDeleteToken(res.data.delete_token)
        }
        setLoading(false)
        return res.data.secure_url
      })
      .then((secureUrl) => setImageLink(secureUrl))
      .catch((err) => console.log(err))
  }

  const deleteImage = () => {
    setDeleting('deleting...')
    axios.post(
      'https://api.cloudinary.com/v1_1/dbfulv8ap/delete_by_token',
      { 'token': deleteToken }
    )
      .then(res => console.log(res))
      .then(() => setImage(''))
      .then(() => setDeleting(''))
      .catch(console.error)
  }

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Image Preview</Form.Label>
          <br />
          {loading ? (
            <Form.Label>Loading...</Form.Label>
          ) : (
            <img src={image} style={{ width: '50vw' }} />
          )}
          <Form.Control
            type='file'
            name='file'
            label='Upload your image'
            onChange={uploadImage}
          />
          {image !== '' && <Button type='button' onClick={deleteImage}>Delete</Button>}
          <h3>{deleting}</h3>
        </Form.Group>
      </Form>
    </div>
  )
}

export default CloudinaryUpload
