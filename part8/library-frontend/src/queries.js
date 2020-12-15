import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query allBooks ($recommendation:Boolean, $genre:String, $author:String) {
  allBooks(recommendation: $recommendation, genre:$genre, author:$author) {
    title
    author {
      name
    }
    published
    genres
  }
}
`