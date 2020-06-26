import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const ProductCard = props => {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.img} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            {props.short_description}
          </Card.Text>
          <Button variant="primary" href={`#products/${props.id}`}>View More</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default withRouter(ProductCard)
