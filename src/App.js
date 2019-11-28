import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './stylesheets/App.css'

import LandingPage from './components/LandingPage'
import UserPage from './components/UserPage'
import SoundRoom from './containers/SoundRoom'

export default class App extends Component {

  state = {
    user: null,
    playerReady: false
  }

  componentDidMount() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.setState({ playerReady: true })
    }
  }

  setUser = (user) => {
    this.setState({ user })
  }

  render() {
    const { user, playerReady } = this.state

    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={(props) => <LandingPage {...props} />} />
          <Route
            path="/users/:spotifyID"
            render={(props) => <UserPage {...props} user={user} setUser={this.setUser} />}
          />
          <Route
            path="/soundroom/:name"
            render={(props) => <SoundRoom {...props} user={user} playerReady={playerReady} />}
          />
        </div>
      </Router>
    )
  }
}

