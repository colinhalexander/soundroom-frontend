import React, { Component } from 'react'
import SearchBar from '../components/SearchBar'

export default class PlaylistBuilder extends Component {

  state = {
    query: "",
    songs: [],
    searchSpotify: false
  }

  updateSongs = (songs) => this.setState({ songs })
  updateQuery = (query) => this.setState({ query })

  render() {
    const { query, songs } = this.state
    return (
      <div className="playlist-builder">
        <SearchBar query={query} updateQuery={this.updateQuery} />
      </div>
    )
  }
}