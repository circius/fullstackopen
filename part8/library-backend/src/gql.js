const { gql } = require('apollo-server')
const { argsToArgsConfig } = require('graphql/type/definition')


const Author = require('./models/Author')
const Book = require('./models/Book')
// const { authors, books } = require('../testdata')

const resolvers = {
  Query: {
    bookCount: () => Book.find({}).then(books => books.length),
    authorCount: () => Author.find({}).then(authors => authors.length),
    allBooks: async (_, args) => {
      const books = await Book.find({})
      return books
        .filter(book => !args.author ? true : book.author === args.author)
        .filter(book => !args.genre ? true : book.genres.includes(args.genre))
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    }
  },
  Author: {
    bookCount: root => Book.find({ author: root._id }).then(books => books.length)
  },
  Mutation: {
    addBook: async (_, args) => {
      const getAuthor = async name => {
        const author = await Author.findOne({ name })
        if (!author) {
          const newAuthor = await Author({ name }).save()
          return newAuthor
        } else {
          return author
        }
      }
      const author = await getAuthor(args.author)

      const book = Book({
        title: args.title,
        author: author._id,
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


const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre:String): [Book]!
    allAuthors: [Author]!
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