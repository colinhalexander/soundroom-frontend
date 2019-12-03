import React from 'react'

export default function SearchBar({
  query,
  updateQuery,
  updateSearchType,
  searchSpotify,
  submitSearch
}) {
  return (
    <form className="search-bar" onSubmit={submitSearch}>
      <input
        autoFocus
        value={query}
        onChange={updateQuery}
        placeholder="Search"
      />
      <select id="search-type" onChange={updateSearchType}>
        <option value="Top Songs">Top Songs</option>
        <option value="Spotify">Spotify</option>
      </select>
      { searchSpotify
          ? <input type="submit" />
          : ""
      }
    </form>
  )
}