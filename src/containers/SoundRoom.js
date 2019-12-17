import React, { Component } from 'react'

import SpotifyPlayer from '../components/SpotifyPlayer'
import Playlist from '../components/Playlist'
import PlaylistBuilder from './PlaylistBuilder'
import NavBar from '../components/NavBar'
import SoundRoomRequests from '../components/SoundRoomRequests'

export default class SoundRoom extends Component {

  state = {
    soundroom: null,
    playlist: null,
    currentPage: "Playlist Builder",
    showPlayer: true,
    requests: [],
    referralCode: null
  }

  componentDidMount() {
    const { soundroom, playlist } = this.props.location.state
    const { webSocket, user } = this.props

    if (!user) this.props.history.goBack()

    if (soundroom && playlist) {
      this.setState({ soundroom, playlist }, () => {
        this.setReferralCode()
      })
    }

    if (webSocket) this.initializeRequestSocket()
  }

  initializeRequestSocket = () => {
    const { webSocket, user } = this.props

    webSocket.send(JSON.stringify({ userID: user.id, type: "initial" }))
    webSocket.onmessage = (message) => {
      const data = JSON.parse(message.data)
      this.setState(prevState => {
        return { requests: [...prevState.requests, data.song] }
      })
    }
  }

  setReferralCode = () => {
    const { soundroom } = this.state
    const { user, encryptor } = this.props

    this.setState({
      referralCode: encryptor.encrypt({
        targetID: user.id,
        soundroom: soundroom.name
      })
    })
  }

  removeSongFromRequests = (song) => {
    this.setState(prevState => {
      return { requests: prevState.requests.filter(request => request !== song) }
    })
  }

  toggleShowPlayer = () => {
    this.setState({ showPlayer: !this.state.showPlayer })
  }

  addSongToPlaylist = (song) => {
    const { user } = this.props,
          { playlist } = this.state 

    // return if playlist already contains song
    if ((playlist.tracks.items.map(item => item.track)).includes(song)) return

    fetch(`https://soundroom-1.herokuapp.com/spotify/${user.id}/${playlist.id}/songs`, {
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

    fetch(`https://soundroom-1.herokuapp.com/spotify/${user.id}/${playlist.id}/songs`, {
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
            items: playlist.tracks.items.filter(item => item.track !== song)
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
    const { soundroom, showPlayer, 
            playlist, currentPage, 
            requests, referralCode } = this.state
    const { user, playerReady, encryptor } = this.props

    return (
      <section className="soundroom">
        <h2>{soundroom ? soundroom.name : ""}</h2>
        <NavBar
          currentPage={currentPage}
          changeCurrentPage={this.changeCurrentPage}
        />
        <Playlist
          {...playlist}
          isCurrentPage={"Playlist" === currentPage}
          removeSongFromPlaylist={this.removeSongFromPlaylist}
        />
        <PlaylistBuilder
          user={user}
          playlist={playlist}
          addSongToPlaylist={this.addSongToPlaylist}
          isCurrentPage={"Playlist Builder" === currentPage}
        />
        { showPlayer
            ? <SpotifyPlayer
                user={user}
                playerReady={playerReady}
                toggleShowPlayer={this.toggleShowPlayer}
                encryptor={encryptor}
              />
            : ""
        }
        <SoundRoomRequests
          isCurrentPage={"Requests" === currentPage}
          requests={requests}
          addSongToPlaylist={this.addSongToPlaylist}
          soundroom={soundroom}
          removeSongFromRequests={this.removeSongFromRequests}
          referralCode={referralCode}
        />
      </section>
    )
  }
}
