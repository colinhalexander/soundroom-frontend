import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import simpleEncryptor from 'simple-encryptor'

import './stylesheets/App.css'

import LandingPage from './components/LandingPage'
import UserPage from './components/UserPage'
import SoundRoom from './containers/SoundRoom'
import RequestPage from './components/RequestPage'

export default class App extends Component {

  state = {
    user: null,
    webSocket: null,
    playerReady: false,
    encryptor: {}
  }

  componentDidMount() {
    this.initializeWebSocket()

    window.onSpotifyWebPlaybackSDKReady = () => {
      this.setState({ playerReady: true })
    }

    fetch("https://soundroom-1.herokuapp.com/encryption")
        .then(response => response.json())
        .then(response => {
          this.setState({
            encryptor: simpleEncryptor({
              key: response.key,
              hmac: false,
            })
          })
        })
  }

  initializeWebSocket = () => {
    const webSocket = new window.WebSocket('wss://soundroom-1.herokuapp.com/')

    webSocket.onopen = () => this.setState({ webSocket })
    webSocket.onerror = () => this.setState({ webSocket: null })
    webSocket.onclose = () => {
      const webSocket = new window.WebSocket('wss://soundroom-1.herokuapp.com/')
      this.setState({ webSocket })
    }
  }

  setUser = (user) => this.setState({ user })

  render() {
    const { user, playerReady, webSocket, encryptor } = this.state

    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={(props) => <LandingPage {...props} />} />
          <Route path="/requests"
            render={(props) => <RequestPage
              {...props}
              webSocket={webSocket}
              encryptor={encryptor}
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
              encryptor={encryptor}
            />}
          />
        </div>
      </Router>
    )
  }
}