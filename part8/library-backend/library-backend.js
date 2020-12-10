const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const { resolvers, typeDefs } = require('./src/gql')

const config = require('./src/config/config')

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})