import React from 'react'
import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from '../queries'
import AuthorInfo from './AuthorInfo'
import AuthorBirthyear from './AuthorBirthyear'
import Loading from './Loading'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <Loading />
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <AuthorInfo authors={authors} />
      <AuthorBirthyear />
    </div>
  )
}

export default Authors
