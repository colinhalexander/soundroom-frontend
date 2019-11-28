import React, { Component } from 'react'

import SpotifyPlayer from '../components/SpotifyPlayer'
import Playlist from '../components/Playlist'

export default class SoundRoom extends Component {

  state = {
    soundroom: {},
    playlist: null,
    showPlayer: true
  }

  componentDidMount() {
    const { soundroom, playlist } = this.props.location.state
    if (soundroom && playlist) {
      this.setState({ soundroom, playlist })
    }
  }

  toggleShowPlayer = () => {
    this.setState({ showPlayer: !this.state.showPlayer })
  }

  render() {
    const { soundroom, showPlayer, playlist } = this.state
    const { user, playerReady } = this.props

    return (
      <section className="soundroom">
        <h2>{soundroom.name}</h2>
        {playlist ? <Playlist {...playlist} /> : ""}
        { showPlayer
            ? <SpotifyPlayer
                user={user}
                playerReady={playerReady}
                toggleShowPlayer={this.toggleShowPlayer}
              />
            : ""
        }
      </section>
    )
  }
}
