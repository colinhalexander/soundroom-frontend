import React, { Component } from 'react'

import '../stylesheets/UserPage.css'

export default class UserPage extends Component {

  componentDidMount() {
    const { spotifyID } = this.props.match.params

    if (!this.props.user) {
      fetch(`http://localhost:3000/users/${spotifyID}`)
        .then(response => response.json())
        .then(profile => {
          console.log(profile)
          profile.error
            ? this.props.history.push("/")
            : this.props.setUser(profile)
        })
    }
  }

  render() {
    const user = this.props.user || {}

    return (
      <div className="user-page">
        {
          user.product !== "premium" && user.product
            ? <p id="need-premium">
                Oops! You need Spotify Premium to use this site. <a 
                  href="https://www.spotify.com/us/premium/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Premium
                </a>
              </p>
            : ""
        }
        <div className="user-identity">
          <img src={user.images ? user.images[0].url : ""} alt="avatar" />
          <h3>{user.display_name}</h3>
        </div>
        <button>Create a SoundRoom</button>
        <button>See Invites</button>
      </div>
    )
  }
}
