import React from 'react'

import Song from './Song'

export default function Playlist({ tracks }) {

  const $songs = tracks.items.map((song, index) => <Song key={index} {...song} />)

  return (
    <div className="playlist">
      {$songs}
    </div>
  )
}
