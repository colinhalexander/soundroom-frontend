import React, { Component } from 'react'
import SpotifyPlayer from '../components/SpotifyPlayer';

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
    const { soundroom } = this.props.location.state
    if (soundroom) {
      this.setState({ soundroom })
    }

    // create new playlist for user, named after soundroom
  }

  render() {
    const { soundroom } = this.state
    const { user, playerReady } = this.props

    return (
      <section className="soundroom">
        <p>{soundroom.name}</p>
        <SpotifyPlayer user={user} playerReady={playerReady} />
      </section>
    )
  }
}
