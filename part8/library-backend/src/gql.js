const jwt = require('jsonwebtoken')
const { gql, UserInputError } = require('apollo-server')

const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const errorHandler = error => {
  throw new UserInputError(error.message, {
    invalidArgs: args,
  })
}

const resolvers = {
  Query: {
    bookCount: () => Book.find({}).then(books => books.length),
    authorCount: () => Author.find({}).then(authors => authors.length),
    allBooks: async (_, args) => {
      let query = {}
      if (args.author) {
        const author = Author.findOne({ name: args.author })
        author && (query.author = author._id)
      }
      if (args.genre) query.genres = { $in: args.genre }

      const books = await Book.find(query)
      return books
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
    me: async (_, __, { currentUser }) => {
      return currentUser
    }
  },
  Author: {
    bookCount: root => Book
      .find({ author: root._id }).then(books => books.length)
  },
  Mutation: {
    addBook: async (_, args, { currentUser }) => {
      const getAuthor = async name => {
        const author = await Author.findOne({ name })
        try {
          if (!author) {
            const newAuthor = await Author({ name }).save()
            return newAuthor
          } else {
            return author
          }
        } catch (error) {
          errorHandler(error)
        }
      }
      if (!currentUser) return null

      const author = await getAuthor(args.author)

      const book = Book({
        title: args.title,
        author: author._id,
        published: args.published,
        genres: args.genres ? args.genres : []
      }
      )
      try {
        await book.save()
      } catch (error) {
        errorHandler(error)
      }

      return result
    },
    editAuthor: async (_, args, { currentUser }) => {
      if (!currentUser) return null
      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true })
      return author
    },
    createUser: (_, args) => {
      const user = User(
        { username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(errorHandler)
    },
    login: async (_, args) => {
      const PASSWORD = "terces"
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== PASSWORD) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, process.env.SECRET) }
    }

  }
}


const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre:String): [Book]!
    allAuthors: [Author]!
    me: User
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

`



module.exports = { resolvers, typeDefs }