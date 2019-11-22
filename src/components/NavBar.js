import React from 'react'
import { Link } from 'react-router-dom'

import '../stylesheets/NavBar.css'

export default function NavBar() {

  return (
    <header className="nav-bar">
      <Link className="link" to="/">
        <hgroup className="logo">
          <h1>SoundR<img src={potentialSpeakerIcons[2]} alt="" /><img src={potentialSpeakerIcons[2]} alt="" />m</h1>
        </hgroup>
      </Link>
    </header>
  )
}

const potentialSpeakerIcons = [
  "https://image.flaticon.com/icons/png/512/92/92221.png",
  "https://cdn4.iconfinder.com/data/icons/audio-sound/32/audio-sound-multimedia-speaker-cabinet-512.png",
  "https://cdn3.iconfinder.com/data/icons/pyconic-icons-2-1/512/stereo-512.png"
]