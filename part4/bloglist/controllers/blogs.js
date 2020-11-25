const jwt = require('jsonwebtoken')

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({}).populate('author')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)

  if (!token) {
    return response.status(401).json({ error : 'token missing' })
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)


  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const author = await User.findById(decodedToken.id)
  const blog = Blog({
    title: body.title,
    author: author.id,
    url: body.url,
    likes: body.likes
  })

  const savedBlog = await blog.save()
  author.blogs = author.blogs.concat(savedBlog.id)
  await author.save()

  response.status(201).json(savedBlog)

})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)

  response.status(200).json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const update = request.body
  await Blog.findByIdAndUpdate(id, update, { new:true, runValidators: true })
  response.status(204).end()
})

module.exports = blogsRouter
