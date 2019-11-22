import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className="nav-bar">
      <Link to="/">
        <hgroup className="logo">
          <h1>SoundR<img src="https://image.flaticon.com/icons/png/512/92/92221.png" alt="" />m</h1>
        </hgroup>
      </Link>
    </div>
  )
}
