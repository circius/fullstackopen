const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const { resolvers, typeDefs } = require('./src/gql')

const config = require('./src/config/config')
const User = require('./src/models/User')

const context = async ({ req }) => {
  const auth = req ? req.headers.authorization : null
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    const decodedToken = jwt.verify(
      auth.substring(7), process.env.SECRET
    )
    const currentUser = await User.findById(decodedToken.id)
    return { currentUser }
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
})


mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})