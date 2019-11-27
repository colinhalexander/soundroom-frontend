import React, { Component } from 'react'
import encryptor from '../utilities/encryptor'

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

    // get and display currently playing track

    // create new playlist for user, named after soundroom
  }

  initializePlayer = () => {
    const { Spotify } = window,
          player = new Spotify.Player({
            name: "Soundroom",
            getOAuthToken: async (callback) => {
              const accessToken = await fetch(`http://localhost:3000/user/${this.props.user.id}/token`)
                .then(response => response.json())

              callback(encryptor.decrypt(accessToken))
            }
          })
  
    this.setState({ playerID: player._options.id })

    player.connect().then((success) => {
      if (!success) {
        alert("Unable to connect to Spotify Player")
      }
    })
  }

  render() {
    const { soundroom } = this.state

    return (
      <section className="soundroom">
        <p>{soundroom.name}</p>
      </section>
    )
  }
}
