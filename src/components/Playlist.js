import React, { Component } from 'react'
import Song from './Song'

export default class Playlist extends Component {

  state = {
    songs: []
  }

  componentDidMount() {
    // create playlist
    
  }

  displaySongs = () => (
    this.state.songs.map(song => (
      <Song {...song} />
    ))
  )

  render() {
    return (
      <div className="playlist">
        {this.displaySongs()}
      </div>
    )
  }
}
