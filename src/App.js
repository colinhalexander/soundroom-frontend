import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './stylesheets/App.css'

import LandingPage from './containers/LandingPage'
import UserPage from './containers/UserPage'

export default class App extends Component {

  state = {
    user: null
  }

  setUser = (user) => {
    this.setState({ user })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={(props) => <LandingPage {...props} />} />
          <Route path="/users/:spotifyID" render={(props) => <UserPage {...props} user={this.state.user} setUser={this.setUser} />} />
        </div>
      </Router>
    )
  }
}

