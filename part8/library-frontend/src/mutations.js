import { gql } from '@apollo/client'
import { BookDetails, AuthorDetails } from './fragments'

export const CREATE_BOOK = gql`
mutation newBook ($title:String!, $author: String!, $published: Int, $genres:[String]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres,
  ) {
    ...BookDetails
  }
}
${BookDetails}
`

export const AUTHOR_CHANGE_BIRTHYEAR = gql`
mutation editAuthor ($name:String!, $setBornTo:Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    ...AuthorDetails
  }
}
${AuthorDetails}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`