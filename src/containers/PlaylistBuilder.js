import React, { Component } from 'react'
import { makeListFromArray } from '../utilities/string-methods'

import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'

export default class PlaylistBuilder extends Component {

  state = {
    query: "",
    songs: [],
    searchSpotify: false
  }

  componentDidMount() {
    fetch(`http://localhost:3000/spotify/${this.props.user.id}/top/songs`)
      .then(response => response.json())
      .then(response => {
        this.updateSongs(response.items)
      })
  }

  updateSongs = (songs) => this.setState({ songs })
  updateQuery = (query) => this.setState({ query })

  filteredSongs = () => {
    const { query, songs } = this.state

    return songs.filter(song => {
      const artists = makeListFromArray( song.artists.map(artist => artist.name) )
      return [song.name, artists, song.album.name].reduce((memo, string) => {
        return memo || string.toLowerCase().includes(query.toLowerCase())
      }, false)
    })
}

  render() {
    const { query } = this.state
    return (
      <div className="playlist-builder">
        <SearchBar query={query} updateQuery={this.updateQuery} />
        <SearchResults songs={this.filteredSongs()} />
      </div>
    )
  }
}