import React, { Component } from 'react'

import SpotifyPlayer from '../components/SpotifyPlayer'
import Playlist from '../components/Playlist'
import PlaylistBuilder from './PlaylistBuilder'

export default class SoundRoom extends Component {

  state = {
    soundroom: null,
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

  addSongToPlaylist = (song) => {
    this.setState(prevState => { return {
      playlist: {
        ...prevState.playlist,
        tracks: {
          ...prevState.playlist.tracks,
          items: prevState.playlist.tracks.items.push({ track: song })
        }
      }
    } })
  }

  render() {
    const { soundroom, showPlayer, playlist } = this.state
    const { user, playerReady } = this.props

    return (
      <section className="soundroom">
        <h2>{soundroom ? soundroom.name : ""}</h2>
        {/* {playlist ? <Playlist {...playlist} /> : ""} */}
        <PlaylistBuilder
          user={user}
          playlist={playlist}
          addSongToPlaylist={this.addSongToPlaylist}
        />
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
