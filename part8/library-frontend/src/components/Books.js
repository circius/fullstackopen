import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

import Loading from './Loading'
import GenreMenu from './GenreMenu'

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

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <GenreMenu genres={['all', 'crime']} setDisplayGenre={setDisplayGenre} />
    </div>
  )
}

export default Books