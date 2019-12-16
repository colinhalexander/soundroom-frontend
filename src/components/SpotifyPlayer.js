import React, { Component } from 'react'
import encryptor from '../utilities/encryptor'
import { makeListFromArray } from '../utilities/string-methods'

import PlayerControls from './PlayerControls'

export default class SpotifyPlayer extends Component {

  state = {
    player: null,
    isPlaying: false,
    currentTrack: null
  }

  componentDidMount() {
    const { playerReady, user } = this.props,
          isPlayerReady = setInterval(() => {
            if (playerReady && user) {
              this.initializePlayer()
              clearInterval(isPlayerReady)
            }
          }, 1000)
  }

  componentWillUnmount() {
    clearInterval(window.updateCurrentTrack)
  }

  initializePlayer = () => {
    const { Spotify } = window,
          player = new Spotify.Player({
            name: "Soundroom",
            getOAuthToken: async (callback) => {
              const accessToken = await fetch(`http://localhost:3000/users/${this.props.user.id}/token`)
                .then(response => response.json())
              callback(encryptor.decrypt(accessToken))
            }
          })
  
    this.setState({ player }, () => {
      this.connectPlayer()
    })
  }

  connectPlayer = () => {
    const { player } = this.state
    player.connect()
      .then(success => {
        if (!success) {
          alert("Unable to connect to Spotify Player")
        } else {
          window.updateCurrentTrack = setInterval(this.getCurrentTrack, 5000)
        }
      })
  }

  getCurrentTrack = () => {
    this.state.player._options.getOAuthToken(accessToken => {
      const request = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken
        }
      }

      fetch("https://api.spotify.com/v1/me/player", request)
        .then(response => response.json())
        .then(response => {
          const { item, is_playing } = response
          this.setState({
            currentTrack: item,
            isPlaying: is_playing
          })
        })
        .catch(() => {
          clearInterval(window.updateCurrentTrack)
          this.props.toggleShowPlayer()
        })
    })
  }

  render() {
    const { player, isPlaying, currentTrack } = this.state
    const { album, artists, name } = currentTrack || {}

    return (
      <div className="spotify-player">
        {
          !this.state.currentTrack
            ? <p>Connecting to Spotify...</p>
            : <>
                <div className="song-info">
                  <img src={album.images[0].url} alt="album art" />
                  <div className="song-title-artist">
                    <h4>{name}</h4>
                    <p>{makeListFromArray( artists.map(artist => artist.name) )}</p>
                  </div>
                </div>
                <PlayerControls
                  player={player}
                  isPlaying={isPlaying}
                  triggerUpdate={this.getCurrentTrack}
                />
              </>
        }
      </div>
    )
  }
}