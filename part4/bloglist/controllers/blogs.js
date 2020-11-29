const jwt = require('jsonwebtoken')

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const token = getTokenFrom(request)

  if (!token) {
    return response.status(401).json({ error: 'token missing' })
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const allBlogs = await Blog.find({}).populate('user')
    const userBlogs = allBlogs.filter(blog => blog.user.username === decodedToken.username)

    return response.json(userBlogs)
  } catch (exception) {
    console.log(`${exception}: ${token} is invalid JWT`)
    return response.status(400).json({ error: 'malformed token' })
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  if (!token) {
    return response.status(401).json({ error: 'token missing' })
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    const blog = Blog({
      title: body.title,
      user: user.id,
      author: body.author,
      url: body.url,
      likes: body.likes
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (exception) {
    console.log(`${exception}: ${token} is invalid JWT`)
    return response.status(400).json({ error: 'malformed token' })
  }


})

blogsRouter.delete('/', async (_, response) => {
  await Blog.deleteMany({})
  response.status(204).end()
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
  await Blog.findByIdAndUpdate(id, update, { new: true, runValidators: true })
  response.status(204).end()
})

module.exports = blogsRouter
