import React from 'react'
import { makeListFromArray } from '../utilities/string-methods'

import plus from '../media/plus.png'

export default function Song({ song, handleClick, displayClass }) {
  const { name, artists } = song

  return (
    <div className="song">
      <div className="song-title-artist">
        <h4>{name}</h4>
        <p>{makeListFromArray(artists.map(artist => artist.name))}</p>
      </div>
      <button onClick={() => handleClick(song)}><img src={plus} alt="add song" /></button>
    </div>
  )
}