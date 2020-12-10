const { gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

const Author = require('./models/Author')
const Book = require('./models/Book')
// const { authors, books } = require('../testdata')

const resolvers = {
  Query: {
    bookCount: () => Book.find({}).then(books => books.length),
    authorCount: () => Author.find({}).then(authors => authors.length),
    // allBooks: (_, args) => books
    //   .filter(book => !args.author ? true : book.author === args.author)
    //   .filter(book => !args.genre ? true : book.genres.includes(args.genre)),
    // allAuthors: () => authors
  },
  // Author: {
  //   bookCount: root => {books.filter(book => book.author === root.name).length}
  // },
  // Mutation: {
  //   addBook: (_, args) => {
  //     const book = { ...args, id: uuid(), genres: args.genres ? args.genres : [] }
  //     books = books.concat(book)
  //     if (!authors.includes(book.author)) {
  //       const author = { name: book.author, id: uuid() }
  //       authors = authors.concat(author)
  //     }
  //     return book
  //   },
  //   editAuthor: (_, args) => {
  //     const author = authors.find(author => author.name === args.name)
  //     if (!author) return null
  //     const updated = { ...author, born: args.setBornTo }
  //     authors = authors.map(
  //       author => author.name === updated.name ? updated : author)
  //     return updated
  //   },

  // }
}
// allBooks(author: String, genre:String): [Book]!
// allAuthors: [Author]!

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!

  }
  type Book {
    title: String!
    published: Int
    author: String!
    genres: [String]!
    id: ID!
  }
  type Author {
    name: String!
    born: Int,
    bookCount: Int!,
    id: ID!
  }

`

// type Mutation {
//   addBook(
//     title: String!
//     author: String!
//     published: Int,
//     genres: [String]
//   ): Book,
//   editAuthor(
//     name: String!,
//     setBornTo: Int!
//   ): Author
// }

module.exports = { resolvers, typeDefs }