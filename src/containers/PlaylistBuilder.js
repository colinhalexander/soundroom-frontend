import React, { Component } from 'react'
import { makeListFromArray, containsQuery } from '../utilities/string-methods'

import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'

export default class PlaylistBuilder extends Component {

  state = {
    query: "",
    topSongs: [],
    resultSongs: [],
    searchSpotify: false
  }

  componentDidMount() {
    fetch(`http://localhost:3000/spotify/${this.props.user.id}/top/songs`)
      .then(response => response.json())
      .then(response => {
        this.updateTopSongs(response.items)
      })
  }

  updateTopSongs = (songs) => this.setState({ topSongs: songs })

  updateQuery = (event) => {
    this.setState({ query: event.target.value })
  }

  updateSearchType = (event) => {
    this.setState({
      searchSpotify: (event.target.value === "Spotify"),
      query: ""
    })
  }

  submitSearch = (event) => {
    event.preventDefault()
    const { query, searchSpotify } = this.state
    if (!searchSpotify) return

    fetch(`http://localhost:3000/spotify/${this.props.user.id}/search`, {
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

  filteredSongs = () => {
    const { query, topSongs } = this.state

    return topSongs.filter(song => {
      const artists = makeListFromArray(song.artists.map(artist => artist.name))
      return containsQuery(query, song.name, artists, song.album.name)
    })
  }

  render() {
    const { query, searchSpotify, resultSongs } = this.state
    const { addSongToPlaylist, isCurrentPage } = this.props
    
    return (
      <div className={"playlist-builder"  + (isCurrentPage ? "" : " hide-page")}>
        <SearchBar
          query={query}
          updateQuery={this.updateQuery}
          updateSearchType={this.updateSearchType}
          searchSpotify={searchSpotify}
          submitSearch={this.submitSearch}
        />
        <SearchResults
          topSongs={this.filteredSongs()}
          resultSongs={resultSongs}
          addSongToPlaylist={addSongToPlaylist}
          searchSpotify={searchSpotify}
        />
      </div>
    )
  }
}