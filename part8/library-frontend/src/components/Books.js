import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

import Loading from './Loading'
import GenreMenu from './GenreMenu'
import BookTable from './BookTable'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [displayGenre, setDisplayGenre] = useState('all')
  const [books, setBooks] = useState([])

  useEffect(() => {
    result.loading ? setBooks([]) :
      setBooks(
        result.data.allBooks
          .filter(book =>
            (displayGenre === 'all') || book.genres.includes(displayGenre)))
  }, [displayGenre, result])

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <Loading />
  }

  return (
    <div>
      <h2>books</h2>
      <BookTable books={books} />

      <GenreMenu genres={['all', 'crime']} setDisplayGenre={setDisplayGenre} />
    </div>
  )
}

export default Books