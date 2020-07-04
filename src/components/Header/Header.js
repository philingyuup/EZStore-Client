import React, { Fragment } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

const authenticatedOptions = (
  <Fragment>
    <NavDropdown alignRight title="Settings" id="collapsible-nav-dropdown">
      <NavDropdown.Item href="#change-password">Change Password</NavDropdown.Item>
      <NavDropdown.Item href="#sign-out">Sign Out</NavDropdown.Item>
    </NavDropdown>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <NavDropdown alignRight title="Login" id="collapsible-nav-dropdown">
      <NavDropdown.Item href="#sign-up">Sign Up</NavDropdown.Item>
      <NavDropdown.Item href="#sign-in">Sign In</NavDropdown.Item>
    </NavDropdown>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#/">Home</Nav.Link>
    <Nav.Link href="#products">Products</Nav.Link>
    <Nav.Link href="#checkout">Checkout</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="secondary" variant="dark" expand="md">
    <Navbar.Brand href="#">
      EZStore
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { user ? (user.is_staff && <Nav.Link href="#Admin">Admin</Nav.Link>) : '' }
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
