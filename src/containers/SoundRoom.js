import React, { Component } from 'react'

import SpotifyPlayer from '../components/SpotifyPlayer'
import Playlist from '../components/Playlist'
import PlaylistBuilder from './PlaylistBuilder'
import NavBar from '../components/NavBar'

export default class SoundRoom extends Component {

  state = {
    soundroom: null,
    playlist: null,
    currentPage: "Playlist Builder",
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
    this.setState(prevState => { 
      return {
        playlist: {
          ...prevState.playlist,
          tracks: {
            ...prevState.playlist.tracks,
            items: [...prevState.playlist.tracks.items, { track: song }]
          }
        }
      }
    })
  }

  changeCurrentPage = (event) => {
    if (event.target.innerText) {
      this.setState({ currentPage: event.target.innerText })
    }
  }

  render() {
    const { soundroom, showPlayer, playlist, currentPage } = this.state
    const { user, playerReady } = this.props

    return (
      <section className="soundroom">
        <h2>{soundroom ? soundroom.name : ""}</h2>
        <NavBar
          currentPage={currentPage}
          changeCurrentPage={this.changeCurrentPage}
        />
        <Playlist
          {...playlist}
          isCurrentPage={"Playlist" === this.state.currentPage}
        />
        <PlaylistBuilder
          user={user}
          playlist={playlist}
          addSongToPlaylist={this.addSongToPlaylist}
          isCurrentPage={"Playlist Builder" === this.state.currentPage}
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
