import React, { Component } from 'react'

import '../stylesheets/UserPage.css'
import NewSoundRoomForm from '../components/NewSoundRoomForm'

export default class UserPage extends Component {

  state = {
    showForm: false,
    name: ""
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
    const { showForm } = this.state
    const { history } = this.props
    const user = this.props.user || {}
    const needsPremium = user.product !== "premium" && user.product

    return (
      <section className="user-page">
        { needsPremium ? this.displayBanner() : "" }
        { showForm 
            ? <NewSoundRoomForm
                id={user.id}
                toggleForm={this.toggleForm}
                history={history}
              /> 
            : <>
                <div className="user-identity">
                  <img src={user.images ? user.images[0].url : ""} alt="avatar" />
                  <h3>{user.display_name}</h3>
                </div>
                <button onClick={this.toggleForm}>Create a SoundRoom</button>
                <button>See Invites</button>
              </>
        }
      </section>
    )
  }
}
