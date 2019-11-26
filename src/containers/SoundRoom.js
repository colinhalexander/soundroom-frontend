import React, { Component } from 'react'

export default class SoundRoom extends Component {

  state = {
    playerID: null,
    soundroom: {
      id: 4,
      name: "Christmas Party 2019",
      owner_id: "1225479589"
    }
  }

  componentDidMount() {
    const isPlayerReady = setInterval(() => {
      if (this.props.playerReady) {
        this.initializePlayer()
        clearInterval(isPlayerReady)
      }
    }, 1000);

    const { soundroom } = this.props.location.state
    if (soundroom) {
      this.setState({ soundroom })
    }

    // create new playlist for user, named after soundroom
  }

  initializePlayer = () => {
    const { Spotify } = window,
          player = new Spotify.Player({
            name: "Soundroom",
            getOAuthToken: (callback) => {
              const token = null // get token? or do on backend?
              callback(token)
            }
          })
  
    this.setState({ playerID: player._options.id })
    // player
  }

  render() {
    const { soundroom, playerID } = this.state
    console.log(playerID)

    return (
      <section className="soundroom">
        <p>{soundroom.name}</p>
      </section>
    )
  }
}
