import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Home from '../Home/Home'
import Products from '../Products/Products'
import ProductDetail from '../Products/ProductDetail'
import Checkout from '../Cart/Checkout'
import CloudinaryUpload from '../Admin/CloudinaryUpload'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      cart: [],
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })
  checkout = ({ name, price, id }) => {
    this.setState({ cart: [...this.state.cart, { name, price, id }] })
  }
  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route exact path='/' render={() => (
            <Home />
          )} />
          <Route exact path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route exact path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route exact path='/products' render={() => (
            <Products msgAlert={this.msgAlert} checkout={this.checkout} />
          )} />
          <Route exact path='/products/:id' render={(props) => (
            <ProductDetail {...props} checkout={this.checkout} cart={this.state.cart} />
          )} />
          <Route exact path='/checkout' render={() => (
            <Checkout checkout={this.checkout} cart={this.state.cart} />
          )} />
          <Route exact path='/Admin' component ={CloudinaryUpload} />
          <AuthenticatedRoute user={user} exact path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
