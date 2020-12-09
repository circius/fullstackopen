import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
mutation newBook ($title:String!, $author: String!, $published: Int, $genres:[String]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres,
  ) {
    title,
    author
  }
}
`