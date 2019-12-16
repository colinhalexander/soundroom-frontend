import React, { useState } from 'react'

import Song from './Song'

export default function SoundRoomRequests({
  requests,
  isCurrentPage,
  addSongToPlaylist,
  removeSongFromRequests,
  referralCode
}) {

  const [showPage, setShowPage] = useState("invitelink")

  const addSongToPlaylistAndRemoveFromRequests = (song) => {
    addSongToPlaylist(song)
    removeSongFromRequests(song)
  }

  const qrCodeAddress = `http://api.qrserver.com/v1/create-qr-code/?data=${referralCode}&size=200x200`

  const $requests = requests.map((song, index) => {
    return <Song
      key={index}
      song={song}
      handleClick={addSongToPlaylistAndRemoveFromRequests}
    />
  })

  return (
    <div className={"soundroom-requests" + (isCurrentPage ? "" : " hide-page")}>
      <div className="soundroom-request-nav">
        <p
          onClick={() => setShowPage("invitelink")}
          className={(showPage === "invitelink" ? "active" : "")}
        >Invite Link</p>
        <p
          onClick={() => setShowPage("requests")}
          className={(showPage === "requests" ? "active" : "")}
        >Requests</p>
      </div>
      <div className={`soundroom-request-page ${showPage}`}>
        { showPage === "requests"
            ? <div className="request-songs">
                {$requests}
              </div>
            : <div className="request-link">
              <img src={qrCodeAddress} alt="QR Code" />
                <a href={`http://localhost:3001/requests?code=${referralCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >{`http://localhost:3001/requests?code=${referralCode}`}</a>
              </div>
        }
      </div>
    </div>
  )
}
