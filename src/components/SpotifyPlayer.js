import React, { Component } from 'react'
import encryptor from '../utilities/encryptor'
import PlayerControls from './PlayerControls';

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
          }, 1000);
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
          this.getCurrentTrack()
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
        .catch(error => console.log(error)) // for dev
    })
  }

  render() {
    const { player, isPlaying, currentTrack } = this.state
    const { album, artists, name } = currentTrack || {}

    return (
      <div className="spotify-player">
        {
          !this.state.currentTrack
            ? <p>Loading Current Track...</p>
            : <>
                <img src={album.images[0].url} alt="album art" />
                <h4>{name}</h4>
                <p>{makeListFromArray( artists.map(artist => artist.name) )}</p>
                <PlayerControls player={player} isPlaying={isPlaying} triggerUpdate={this.getCurrentTrack} />
              </>
        }
      </div>
    )
  }
}

///////////////////////////////////////////////////////////////////////////////
function makeListFromArray(strings) {
  if (strings.length === 1) return strings[0]
  if (strings.length === 2) return strings.join(' and ')
  
  return strings.reduce((list, string, index) => {
    if (index === strings.length - 1) {
      list += ', and ' + string
    } else if (index > 0) {
      list += ", " + string
    } else if (index === 0) {
      list += string
    }

    return list
  }, "")
}