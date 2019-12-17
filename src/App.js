import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './stylesheets/App.css'

import LandingPage from './components/LandingPage'
import UserPage from './components/UserPage'
import SoundRoom from './containers/SoundRoom'
import RequestPage from './components/RequestPage'

export default class App extends Component {

  state = {
    user: null,
    webSocket: null,
    playerReady: false
  }

  componentDidMount() {
    this.initializeWebSocket()

    window.onSpotifyWebPlaybackSDKReady = () => {
      this.setState({ playerReady: true })
    }
  }

  initializeWebSocket = () => {
    // upgrade to 'wss://' protocol once backend is deployed
    const webSocket = new window.WebSocket('wss://soundroom-1.herokuapp.com/')

    webSocket.onopen = () => this.setState({ webSocket })
    webSocket.onclose = () => this.setState({ webSocket: null })
    webSocket.onerror = () => this.setState({ webSocket: null })
  }

  setUser = (user) => this.setState({ user })

  render() {
    const { user, playerReady, webSocket } = this.state

    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={(props) => <LandingPage {...props} />} />
          <Route path="/requests"
            render={(props) => <RequestPage
              {...props}
              webSocket={webSocket}
            />}
          />
          <Route
            path="/users/:spotifyID"
            render={(props) => <UserPage {...props} user={user} setUser={this.setUser} />}
          />
          <Route
            path="/soundroom/:name"
            render={(props) => <SoundRoom
              {...props}
              user={user}
              playerReady={playerReady}
              webSocket={webSocket}
            />}
          />
        </div>
      </Router>
    )
  }
}