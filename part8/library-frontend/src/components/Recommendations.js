import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import Loading from './Loading'
import BookTable from './BookTable'

import { ALL_BOOKS } from '../queries'

const Recommendations = ({ show }) => {
  const [books, setBooks] = useState([])

  const booksResult = useQuery(ALL_BOOKS,
    { variables: { recommendation: true } })

  useEffect(() => {
    if (booksResult.data) {
      setBooks(booksResult.data.allBooks)
    }
  }, [booksResult])

  if (!show) {
    return null
  }

  if (booksResult.loading) {
    return <Loading />
  }

  return (
    <div>
      <h2>recommendations</h2>
      <BookTable books={books} />
    </div>
  )

}

export default Recommendations