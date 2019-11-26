import React, { Component } from 'react'

import '../stylesheets/UserPage.css'
import NewSoundRoomForm from '../components/NewSoundRoomForm'

export default class UserPage extends Component {

  state = {
    showForm: false
  }

  componentDidMount() {
    const { spotifyID } = this.props.match.params

    if (!this.props.user) {
      fetch(`http://localhost:3000/users/${spotifyID}`)
        .then(response => response.json())
        .then(profile => {
          profile.error
            ? this.props.history.push("/")
            : this.props.setUser(profile)
        })
    }
  }

  createNewSoundroom = (name) => {
    const { user } = this.props
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name,
        owner_id: user.spotify_id
      })
    }
  }

  toggleForm = () => {
    this.setState(prevState => {
      return {showForm: !prevState.showForm}
    })
  }

  displayBanner = () => {
    return (
      <p id="need-premium">
        Oops! You need Spotify Premium to use this site. <a 
          href="https://www.spotify.com/us/premium/"
          target="_blank"
          rel="noopener noreferrer"
        >Get Premium</a>
      </p>
    )
  }

  render() {
    const user = this.props.user || {}
    const needsPremium = user.product !== "premium" && user.product
    const { showForm } = this.state

    return (
      <div className="user-page">
        { needsPremium ? this.displayBanner() : "" }
        {
          showForm
            ? ""
            : <div className="user-identity">
                <img src={user.images ? user.images[0].url : ""} alt="avatar" />
                <h3>{user.display_name}</h3>
              </div>
        }
        { showForm ? <NewSoundRoomForm /> : "" }
        {
          showForm
            ? <button>Create SoundRoom</button>
            : <button onClick={this.toggleForm}>Create a SoundRoom</button>
        }
        {
          showForm
            ? <button onClick={this.toggleForm}>Back</button>
            : <button>See Invites</button>
        }
      </div>
    )
  }
}
