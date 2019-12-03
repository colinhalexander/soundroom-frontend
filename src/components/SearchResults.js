import React from 'react'

import Song from './Song'

export default function SearchResults({
  topSongs,
  addSongToPlaylist,
  resultSongs,
  searchSpotify
}) {

  const $topSongs = topSongs.map((song, index) => (
    <Song key={index} song={song} handleClick={addSongToPlaylist} />
  ))

  const $songs = resultSongs.map((song, index) => (
    <Song key={index} song={song} handleClick={addSongToPlaylist} />
  ))

  return (
    <div className="search-results">
      {searchSpotify ? $songs : $topSongs}
    </div>
  )
}
