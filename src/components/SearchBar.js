import React from 'react'

export default function SearchBar({ query, updateQuery }) {
  return (
    <div className="search-bar">
      <input
        autofocus
        value={query}
        onChange={(event) => updateQuery(event.target.value)}
      />
    </div>
  )
}