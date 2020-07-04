import React, { useState } from 'react'
import axios from 'axios'

const CloudinaryUpload = props => {
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)

  const uploadImage = e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'ezstore')
    setLoading(true)
    axios.post('https://api.cloudinary.com/v1_1/dbfulv8ap/image/upload', data)
      .then((res) => {
        console.log(res)
        setImage(res.data.secure_url)
        setLoading(false)
      })
      .catch((err) => console.log(err))
  }

  const deleteImage = e {
    
  }


  return (
    <div>
      <h1>Upload Image </h1>
      <input
        type = 'file'
        name = 'file'
        placeholder = 'Upload an image'
        onChange = {uploadImage}
      />
      <button type="button" onClick={deleteImage}>Delete</button>
      <div> Preview </div>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <img src={image} style={{ width: '300px' }} />
      )}
    </div>
  )
}

export default CloudinaryUpload
