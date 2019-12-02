import React from 'react'
import { makeListFromArray } from '../utilities/string-methods'

export default function Song({ song, handleClick, displayClass }) {
  const { name, artists } = song

  return (
    <div className="song">
      <div className="song-title-artist">
        <h4>{name}</h4>
        <p>{makeListFromArray(artists.map(artist => artist.name))}</p>
      </div>
      <button onClick={() => handleClick(song)}>Add</button>
    </div>
  )
}