import React, { Component } from 'react'

import '../stylesheets/LandingPage.css'
import speakerLogo from '../media/stereo-512-white.png'

import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <div className="landing-page">
      <hgroup className="logo">
        <h1>SoundR<img src={speakerLogo} alt=""/><img src={speakerLogo} alt=""/>m</h1>
      </hgroup>
      <p>SoundRoom is a collaborative playlist-maker, blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah</p>
      <a id="sign-in-btn" href="http://localhost:3000/auth">Sign in with Spotify</a>
      <Footer />
    </div>
  )
}
