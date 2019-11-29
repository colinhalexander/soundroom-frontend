import React from 'react'

export default function SearchBar({ query, updateQuery }) {
  return (
    <div className="search-bar">
      <input value={query} onChange={(event) => updateQuery(event.target.value)} />
    </div>
  )
}