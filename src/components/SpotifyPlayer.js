import React from 'react'

export default function SpotifyPlayer({ album, artists, name, uri }) {

  const artistsString = () => {
    return makeListFromArray( artists.map(artist => artist.name) )
  }

  return (
    <div className="spotify-player">
      <img src={album.images[0].url} alt="album art" />
      <h4>{name}</h4>
      <p>{artistsString}</p>
    </div>
  )
}

function makeListFromArray(strings) {
  if (strings.length === 1) return strings[0]
  if (strings.length === 2) return strings.join(' and ')
  
  return strings.reduce((list, string, index) => {
    if (index === strings.length - 1) {
      list += ', and ' + string
    } else if (index > 0) {
      list += ", " + string
    } else if (index === 0) {
      list += string
    }

    return list
  }, "")
}