import React, { useState } from 'react'
import CloudinaryUpload from './CloudinaryUpload'

const ProductForm = ({ user }) => {
  const [product, setProduct] = useState({ name: '', img: '', short_description: '', long_description: '', price: 0 })

  const setImageLink = (secureUrl) => {
    setProduct({ ...product, img: secureUrl })
  }

  console.log(product)

  return (
    <div>
      <CloudinaryUpload setImageLink={setImageLink} />
    </div>
  )
}

export default ProductForm
