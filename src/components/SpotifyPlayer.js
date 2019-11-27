import React, { Component } from 'react'

export default class SpotifyPlayer extends Component {

  state = {
    player: null,
    playerState: null
  }

  componentDidMount() {
    const { playerReady, user } = this.props,
          isPlayerReady = setInterval(() => {
            if (playerReady && user) {
              this.initializePlayer()
              clearInterval(isPlayerReady)
            }
          }, 1000);

    // get and display currently playing track
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
  
    this.setState({ player })
    this.connectPlayer(player)
  }

  connectPlayer = (player) => {
    player.connect()
      .then(success => {
        if (!success) {
          alert("Unable to connect to Spotify Player")
        } else {
          this.getPlayerState(player)
        }
      })
  }

  getPlayerState = (player) => {
    player.getCurrentState()
      .then(state => {
        console.log("spotify player state:", state)
        if (state) {
          this.setState({ playerState: state })
        }
      })
  }

  // artistsString = () => {
  //   return makeListFromArray( artists.map(artist => artist.name) )
  // }

  render() {
    const {}

    return (
      <div className="spotify-player">
        <p>Spotify Player Here</p>
        {/* <img src={album.images[0].url} alt="album art" /> */}
        {/* <h4>{name}</h4> */}
        {/* <p>{artistsString}</p> */}
      </div>
    )
  }
}

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