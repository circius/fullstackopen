import React from 'react'

const GenreMenu = ({ setDisplayGenre, genres }) => (
  <div>
    {genres.map(
      genre => <button value={genre} onClick={() => setDisplayGenre(genre)}>{genre}</button>)}
  </div>)

export default GenreMenu