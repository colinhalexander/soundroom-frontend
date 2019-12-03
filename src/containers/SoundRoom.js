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
    const { user } = this.props,
          { playlist } = this.state 

    fetch(`http://localhost:3000/spotify/${user.id}/${playlist.id}/songs`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        uris: [song.uri]
      })
    })
      .then(response => response.json())
      .then(response => {
        if (!response.error) {
          this.addSongToPlaylistState(song)
        }
      })
  }

  addSongToPlaylistState = (song) => {
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

  removeSongFromPlaylist = (song) => {
    const { user } = this.props,
          { playlist } = this.state 

    fetch(`http://localhost:3000/spotify/${user.id}/${playlist.id}/songs`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tracks: [{ uri: song.uri }]
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        if (!response.error) {
          this.removeSongFromPlaylistState(song)
        }
      })
  }
  
  removeSongFromPlaylistState = (song) => {
    this.setState(prevState => {
      const { playlist } = prevState
      return {
        playlist: {
          ...playlist,
          tracks: {
            ...playlist.tracks,
            items: playlist.tracks.items.filter(playlistSong => playlistSong.track !== song)
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
          removeSongFromPlaylist={this.removeSongFromPlaylist}
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
