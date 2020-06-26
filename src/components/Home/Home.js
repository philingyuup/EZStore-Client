import React from 'react'
import { Carousel } from 'react-bootstrap'

const Home = () => {
  return (
    <div>
      <h2> EZStore </h2>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require('./bathroom.jpg')}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require('./shower_hook.jpg')}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require('./handlebar.jpg')}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <br/>
      <h2> About </h2>
      <div>
        Here at EZStore, we make it convenient for you to find all your bathroom needs.
        <img
          src={require('./bathroom2.jpg')}
          alt="bathroom image"
        />
      </div>
    </div>
  )
}

export default Home
