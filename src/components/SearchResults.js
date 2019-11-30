import React from 'react'

import Song from './Song'

export default function SearchResults({ songs, addSongToPlaylist }) {

  const $songs = songs.map((song, index) => (
    <Song key={index} song={song} handleClick={addSongToPlaylist} />
  ))

  return (
    <div className="search-results">
      {$songs}
    </div>
  )
}
