const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const { blogs3 } = require('./blog_td')
const { users2 } = require('./user_td')
const th = require('./test_helpers')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  for (const blog of blogs3) {
    let model = new Blog(blog)
    await model.save()
  }
  await User.deleteMany({})
  for (const user of users2) {
    let user0Model = new User(user)
    await user0Model.save()
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
    const someBlog = await th.getSomeBlog(api)
    expect(someBlog.id).toBeDefined()
    expect(someBlog._id).toBeUndefined()
  })
})

describe('can POST new blogs', () => {
  test('POST $blog to /api/blogs adds $blog to db', async () => {
    const newBlog = {
      title: 'tartarus theme',
      url: 'last.gr',
      likes: 0,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogs = await th.getAllBlogs(api)

    expect(blogs).toHaveLength(4)
    expect(blogs.find(
      (blog) => blog.title === newBlog.title)).toBeDefined
  })
  test('the field `likes` is automatically generated if absent', async () => {
    const newBlog = {
      title: 'tartarus theme',
      url: 'https://whatever.se',
    }
    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
    expect(postResponse.body.likes).toBeDefined()
  })
  test('POSTing a blog without a `url` results in status 400', async () => {
    const newBlogNoUrl = {
      title: 'marvellous',
    }
    await api
      .post('/api/blogs')
      .send(newBlogNoUrl)
      .expect(400)
  })
  test('POSTing a blog without a `title` results in status 400', async () => {
    const newBlogNoTitle = {
      url: 'https://whatever.hr',
      author: 'forgotten'
    }
    await api
      .post('/api/blogs')
      .send(newBlogNoTitle)
      .expect(400)
  })
})

describe('can interact with individual blogs; for instance: ', () => {
  test('can GET an individual blog', async () => {
    const someBlogID = await th.getSomeBlogID(api)
    const response = await api
      .get(`/api/blogs/${someBlogID}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(blogs3.filter(title => title === response.body.title).toBeDefined)
  })
  test('can DELETE an individual blog by id', async () => {
    const someBlogID = await th.getSomeBlogID(api)

    await api
      .delete(`/api/blogs/${someBlogID}`)
      .expect(204)
    const blogsResponse = await api
      .get('/api/blogs')
    expect(blogsResponse.body).toHaveLength(2)
  })
  test('can PUT new details for an existing blog', async () => {
    const someBlogID = await th.getSomeBlogID(api)
    await api
      .put(`/api/blogs/${someBlogID}`)
      .send({ title: 'something new' })
      .expect(204)
    const response = await api
      .get(`/api/blogs/${someBlogID}`)
      .expect(200)
    const blog = response.body
    expect(blog.title).toBe('something new')
  })
})

afterAll(() => {
  mongoose.connection.close()
})