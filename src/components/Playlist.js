import React from 'react'

import Song from './Song'

export default function Playlist({ tracks, isCurrentPage, removeSongFromPlaylist }) {

  const $songs = tracks
    ? tracks.items.map((song, index) => {
        return <Song key={index} song={song.track} handleClick={removeSongFromPlaylist} />
      })
    : null

  return (
    <div className={"playlist" + (isCurrentPage ? "" : " hide-page")}>
      { $songs && $songs.length > 0
          ? $songs
          : <p className="empty-msg">Use the Playlist Builder to add songs.</p>
      }
    </div>
  )
}