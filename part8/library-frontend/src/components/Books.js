import React, { useEffect, useState } from 'react'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { BOOK_ADDED } from '../subscriptions'

import Loading from './Loading'
import GenreMenu from './GenreMenu'
import BookTable from './BookTable'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [displayGenre, setDisplayGenre] = useState('all')
  const [books, setBooks] = useState([])

  const client = useApolloClient()

  useEffect(() => {
    result.loading ? setBooks([]) :
      setBooks(
        result.data.allBooks
          .filter(book =>
            (displayGenre === 'all') || book.genres.includes(displayGenre)))
  }, [displayGenre, result])

  const updateCacheWith = addedBook => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    console.log(dataInStore)

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData.data)
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
    }
  })

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