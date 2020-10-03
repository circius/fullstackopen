const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { blog1, blogs3 } = require('./blog_td')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of blogs3) {
    let model = new Blog(blog)
    await model.save()
  }
})

describe('can get list of blogs', () => {
  test('blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')
    expect(response.status).toBe(200)
    expect(response.type).toBe('application/json')
  })
  test('returns right number of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)
  })
})

describe('blogs are correctly formatted', () => {
  test('blogs have `id` not `_id`', async () => {
    const response = await api.get('/api/blogs')
    const someBlog = response.body[0]
    console.log('someBlog:', someBlog)
    expect(someBlog.id).toBeDefined()
    expect(someBlog._id).toBeUndefined()
  })
})

describe('can POST new blogs', () => {
  test('POST $blog to /api/blogs adds $blog to db', async () => {
    const newBlog = new Blog({
      title: 'tartarus theme',
      author: 'oedipe',
      url: 'last.gr',
      likes: 0,
    })
    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const getBlogs = await api.get('/api/blogs')
    expect(getBlogs.body).toHaveLength(4)
    expect(getBlogs.body.find(
      (blog) => blog.author === 'oedipe')).toBeDefined
  })

})

afterAll(() => {
  mongoose.connection.close()
})