import React from 'react'

export default function NavBar({ currentPage, changeCurrentPage }) {

  const pages = ["Playlist", "Playlist Builder", "Requests"]

  const getSlice = () => {
    const index = pages.findIndex(page => page === currentPage)
    if (index === 0) {
      return ["", pages[index], pages[index + 1]]
    } else if (index === pages.length - 1) {
      return [pages[index - 1], pages[index], ""]
    } else {
      return pages.slice(index - 1, index + 2)
    } 
  }

  const pagesSlice = getSlice()

  return (
    <div className="nav-bar">
      <button className="left" onClick={changeCurrentPage}>{pagesSlice[0]}</button>
      <button className="current-page" onClick={changeCurrentPage}>{pagesSlice[1]}</button>
      <button className="right" onClick={changeCurrentPage}>{pagesSlice[2]}</button>
    </div>
  )
}
