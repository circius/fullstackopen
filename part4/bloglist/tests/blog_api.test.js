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
    const blog1ID = blog1._id
    const blog0FromDb = await api.get(`/api/blogs/${blog1ID}`)
    expect(blog0FromDb.id).toBeDefined()
    expect(blog0FromDb._id).not().toBeDefined()

  })
})

afterAll(() => {
  mongoose.connection.close()
})