import React, { useState } from 'react'

import play from '../media/play.png'
import pause from '../media/pause.png'
import previous from '../media/previous.png'
import next from '../media/next.png'

export default function PlayerControls({ player, isPlaying, triggerUpdate }) {
  
  const [ playingNow, setPlayingNow ] = useState(isPlaying)

  const pauseThenUpdate = () => { setTimeout(triggerUpdate, 500) }

  const togglePlay = () => {
    setPlayingNow(!playingNow)
    player.togglePlay().then(pauseThenUpdate)
  }

  const nextTrack = () => {
    setPlayingNow(true)
    player.nextTrack().then(pauseThenUpdate)
  }

  const previousTrack = () => {
    setPlayingNow(true)
    player.previousTrack().then(pauseThenUpdate)
  }

  return (
    <div className="player-controls">
      <img
        className="previous btn"
        src={previous}
        alt="previous track"
        onClick={previousTrack}
      />
      { !playingNow
          ? <img
              className="play btn"
              src={play}
              alt="play"
              onClick={togglePlay}
            />
          : <img
              className="pause btn"
              src={pause}
              alt="pause"
              onClick={togglePlay}
            />
      }
      <img
        className="next btn"
        src={next}
        alt="next track"
        onClick={nextTrack}
      />
    </div>
  )
}
