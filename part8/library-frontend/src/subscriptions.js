import { gql } from '@apollo/client'
import { BookDetails } from './fragments'

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BookDetails}
`