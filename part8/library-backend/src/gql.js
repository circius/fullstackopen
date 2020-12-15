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
    allBooks: async (_, args, { currentUser }) => {
      let query = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        author && (query.author = author._id)
      }
      if (args.genre) query.genres = { $in: args.genre }
      if (args.recommendation) query.genres = { $in: currentUser.favoriteGenre }


      const books = await Book.find(query).populate('author')
      return books
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
    me: async (_, __, { currentUser }) => {
      return currentUser
    },
    allUsers: () => User.find({}).then(users => users)
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
      console.log(`currentUser: ${currentUser}`)
      if (!currentUser) return null

      const author = await getAuthor(args.author)

      const book = Book({
        title: args.title,
        author: author,
        published: args.published,
        genres: args.genres ? args.genres : []
      }
      )
      try {
        result = await book.save()
      } catch (error) {
        errorHandler(error)
        return null
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
    allBooks(author: String, genre:String, recommendation: Boolean): [Book]!
    allAuthors: [Author]!
    me: User,
    allUsers:[User]!
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
    author: Author!
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