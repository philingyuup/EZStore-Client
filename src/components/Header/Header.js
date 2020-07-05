import React, { Fragment } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

const authenticatedOptions = (
  <Fragment>
    <NavDropdown className='navigation-bar' alignRight title="Settings" id="collapsible-nav-dropdown">
      <NavDropdown.Item className='navigation-bar' href="#change-password">Change Password</NavDropdown.Item>
      <NavDropdown.Item className='navigation-bar' href="#sign-out">Sign Out</NavDropdown.Item>
    </NavDropdown>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <NavDropdown className='navigation-bar' alignRight title="Login" id="collapsible-nav-dropdown">
      <NavDropdown.Item className='navigation-bar' href="#sign-up">Sign Up</NavDropdown.Item>
      <NavDropdown.Item className='navigation-bar' href="#sign-in">Sign In</NavDropdown.Item>
    </NavDropdown>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link className='navigation-bar' href="#/">Home</Nav.Link>
    <Nav.Link className='navigation-bar' href="#products">Products</Nav.Link>
    <Nav.Link className='navigation-bar' href="#checkout">Checkout</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="secondary" variant="dark" expand="md">
    <Navbar.Brand href="#">
      <img src={require('./EZStore-logo.png')} height='90px' className='align-top'/>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text navigation-bar mr-2">Welcome, {user.email}</span>}
        { user ? (user.is_staff && <Nav.Link className='navigation-bar' href="#Admin">Admin</Nav.Link>) : '' }
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
