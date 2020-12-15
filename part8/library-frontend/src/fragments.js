import { gql } from '@apollo/client'

export const BookDetails = gql`
fragment BookDetails on Book {
  title
  author {
    name
  }
  published
  genres
  id
}
`

export const AuthorDetails = gql`
fragment AuthorDetails on Author {
  name
  born
  bookCount
  id
}

`