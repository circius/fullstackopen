const notesRouter = require('express').Router()
const Blog = require('../models/blog')

notesRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

notesRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  blog.save()
  response.status(201).json(blog)
})

module.exports = notesRouter
