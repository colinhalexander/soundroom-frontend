import React from 'react'

import Song from './Song'

export default function Playlist({ tracks }) {

  const $songs = tracks.items.map(song => <Song {...song} />)

  return (
    <div className="playlist">
      {$songs}
    </div>
  )
}
