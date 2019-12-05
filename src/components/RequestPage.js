import React, { Component } from 'react'
import encryptor from '../utilities/encryptor'

import SearchBar from './SearchBar'
import SearchResults from './SearchResults'

export default class RequestPage extends Component {

  state = {
    query: "",
    resultSongs: [],
    searchSpotify: true,
    referral: null
  }

  componentDidMount() {
    this.getReferralObject()
  }

  getReferralObject = () => {
    const urlParams = new URLSearchParams(window.location.search),
          code = urlParams.get('code'),
          referral = JSON.parse(encryptor.decrypt(code))

    this.setState({ referral })
  }

  requestSong = (song) => {
    const { webSocket } = this.props
    if (webSocket) webSocket.send(JSON.stringify({
      song,
      type: "songRequest",
      targetID: this.state.referral.targetID
    }))
  }

  updateQuery = (event) => {
    this.setState({ query: event.target.value })
  }

  submitSearch = (event) => {
    event.preventDefault()

    const { query, referral } = this.state
    fetch(`http://localhost:3000/spotify/${referral.targetID}/search`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    })
      .then(response => response.json())
      .then(response => {
        if (!response.error) this.setState({ resultSongs: response.tracks.items })
      })
  }

  render() {
    const { query, resultSongs, searchSpotify } = this.state

    return (
      <div className="request-page">
        <h3>Request Page</h3>
        <div className="search-container">
          <SearchBar
            query={query}
            updateQuery={this.updateQuery}
            searchSpotify={searchSpotify}
            submitSearch={this.submitSearch}
            fromRequestPage={true}
          />
          <SearchResults
            resultSongs={resultSongs}
            addSongToPlaylist={this.requestSong}
            searchSpotify={searchSpotify}
          />
        </div>
      </div>
    )
  }
}
