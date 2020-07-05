import React from 'react'
import { Carousel, Col, Row } from 'react-bootstrap'

const Home = () => {
  return (
    <div>
      <br/>
      <br/>
      <Carousel id='carouselContainer'>
        <Carousel.Item>
          <img
            className="carouselImages"
            src={require('./bathroom.jpg')}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carouselImages"
            src={require('./shower_hook.jpg')}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carouselImages"
            id="carouselImage3"
            src={require('./handlebar.jpg')}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <br/>
      <h2> About </h2>
      <br/>
      <Row s={6} id='aboutRow'>
        <Col>
          <div className='aboutContent'> Here at EZStore, we make it convenient for you to find all your bathroom needs. Here you will find the finest selection of bathroom products and accessories. Products are made from a range of material including brass, stainless steel, and ceramic. All our products have undergone intensive internal testing to ensure the highest quality possible.</div>
        </Col>
        <Col>
          <img
            src={require('./bathroom2.jpg')}
            alt="bathroom image"
            id="aboutImage"
            className='aboutContent'
          />
        </Col>
      </Row>
      <br/>
      <h2> Mission </h2>
      <br/>
      <Row s={6} id='aboutRow'>
        <Col>
          <img
            src={require('./shower_nub.jpg')}
            alt="shower nub image"
            id="missionImage"
            className='aboutContent'
          />
        </Col>
        <Col>
          <div className='aboutContent'> Our mission is to ensure our customers have the best experience as well as having the highest quality products. Our return policy is a statement on our commitment to providing the best products possible. </div>
        </Col>
      </Row>
    </div>
  )
}

export default Home
