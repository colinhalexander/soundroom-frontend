import React from 'react'

import Song from './Song'

export default function SearchResults({ songs }) {

  const $songs = songs.map((song, index) => <Song key={index} {...song} />)

  return (
    <div className="search-results">
      {$songs}
    </div>
  )
}
