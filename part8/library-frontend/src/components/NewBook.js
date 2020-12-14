import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { useField } from '../hooks/useField'
import { CREATE_BOOK } from '../mutations'
import { ALL_AUTHORS, ALL_BOOKS } from '../queries'

const NewBook = (props) => {
  const title = useField('text')
  const author = useField('text')
  const published = useField('number')
  const genre = useField('text')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    try {
      createBook({
        variables: {
          title: title.value,
          published: Number(published.value),
          author: author.value,
          genres: genres.value || []
        }
      })
    } catch {
      console.log('something went wrong');
    }

    title.reset()
    published.reset()
    author.reset()
    genre.reset()
    setGenres([])
  }

  const addGenre = () => {
    setGenres(genres.concat(genre.value))
    genre.reset()
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            {...title}
          />
        </div>
        <div>
          author
          <input
            {...author}
          />
        </div>
        <div>
          published
          <input
            {...published}
          />
        </div>
        <div>
          <input
            {...genre}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook