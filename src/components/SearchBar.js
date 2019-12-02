import React from 'react'

export default function SearchBar({ query, updateQuery }) {
  return (
    <div className="search-bar">
      <input
        autoFocus
        value={query}
        onChange={updateQuery}
        placeholder="Search"
      />
    </div>
  )
}