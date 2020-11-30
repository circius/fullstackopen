const Blog = require('../models/blog')
const User = require('../models/user')

const testingRouter = require('express').Router()

testingRouter.post('/reset', async (_, response) => {
  console.log('POST')
  await Blog.deleteMany({})
  await User.deleteMany({})
  return response.status(204).end()
})

module.exports = testingRouter