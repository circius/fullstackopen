import { gql } from '@apollo/client'
import { BookDetails, AuthorDetails } from './fragments'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    ...AuthorDetails
  }
}
${AuthorDetails}
`

export const ALL_BOOKS = gql`
query allBooks ($recommendation:Boolean, $genre:String, $author:String) {
  allBooks(recommendation: $recommendation, genre:$genre, author:$author) {
    ...BookDetails
  }
}
${BookDetails}

`