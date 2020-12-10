const { gql } = require('apollo-server')
const { argsToArgsConfig } = require('graphql/type/definition')


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
  Mutation: {
    addBook: async (_, args) => {
      const author = await Author.findOne({ name: args.author })
      if (!author) {
        const newAuthor = Author({ name: args.author })
        const newAuthorId = await newAuthor.save()._id
      }
      const book = Book({
        title: args.title,
        author: author ? author._id : newAuthorId,
        published: args.published,
        genres: args.genres ? args.genres : []
      }
      )
      const result = await book.save()
      return result
    },
    editAuthor: async (_, args) => {
      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true })
      return author
    },

  }
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
type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int,
      genres: [String]
    ): Book,
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author

  }

`



module.exports = { resolvers, typeDefs }