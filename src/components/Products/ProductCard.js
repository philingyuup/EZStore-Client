import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import apiUrl from '../../apiConfig'
import axios from 'axios'

const ProductCard = props => {
  const deleteItem = () => {
    axios.delete(`${apiUrl}/products/${props.id}`, { headers: { 'Authorization': `Token ${props.user.token}` } })
      .then(() => props.deleteProduct(props.name))
      .catch(console.error)
  }
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.img} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            {props.short_description}
          </Card.Text>
          {props.editable
            ? (<div> <Button variant="primary" href={`#Admin/Edit/${props.id}`}>Edit</Button>
              <Button variant="danger" onClick={deleteItem}>Delete</Button>
            </div>)
            : <Button variant="primary" href={`#products/${props.id}`}>View More</Button>
          }
        </Card.Body>
      </Card>
    </div>
  )
}

export default withRouter(ProductCard)
