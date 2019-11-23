import React from 'react'

import speakerLogo from '../media/stereo-512-white.png'
import spotifyLogo from '../media/Spotify_Logo_RGB_White.png'

// import Footer from '../components/Footer'

export default function LandingPage() {

  const signInWithSpotify = () => window.location.href = "http://localhost:3000/auth"

  return (
    <div className="landing-page">
      <hgroup className="logo">
        <h1>SoundR<img src={speakerLogo} alt=""/><img src={speakerLogo} alt=""/>m</h1>
      </hgroup>
      <p>Make playlists. Invite your friends.</p>
      <div id="sign-in-btn" onClick={signInWithSpotify}>
        <p>Sign in with</p><img src={spotifyLogo} alt="spotify logo" />
      </div>
      {/* <Footer /> */}
    </div>
  )
}
