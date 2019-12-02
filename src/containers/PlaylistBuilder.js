import React, { Component } from 'react'
import { makeListFromArray, containsQuery } from '../utilities/string-methods'

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

  updateQuery = (event) => {
    this.setState({ query: event.target.value })
  }

  filteredSongs = () => {
    const { query, songs } = this.state

    return songs.filter(song => {
      const artists = makeListFromArray(song.artists.map(artist => artist.name))
      return containsQuery(query, song.name, artists, song.album.name)
    })
  }

  render() {
    const { query } = this.state
    const{ addSongToPlaylist, isCurrentPage } = this.props
    
    return (
      <div className={"playlist-builder"  + (isCurrentPage ? "" : " hide-page")}>
        <SearchBar query={query} updateQuery={this.updateQuery} />
        <SearchResults songs={this.filteredSongs()} addSongToPlaylist={addSongToPlaylist} />
      </div>
    )
  }
}