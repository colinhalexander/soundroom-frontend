import React from 'react'
import { makeListFromArray } from '../utilities/string-methods'

export default function Song({ id, name, artists, handleClick }) {
  return (
    <div className="song">
      <h4>{name}</h4>
      <p>{makeListFromArray( artists.map(artist => artist.name) )}</p>
      <button onClick={handleClick}>Add To Playlist</button>
    </div>
  )
}