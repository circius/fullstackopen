const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const User = require('../models/user')
const {user0, user1} = require('./user_td')

const api = supertest(app)



describe('starting from a state where we have no users,', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })
  test('getting all users results in an empty list', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(0)
  })
  test('we can create a new user', async () => {
    const response = await api
      .post('/api/users')
      .send(user0)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const allUsers = await api.get('/api/users')
    expect(allUsers.body).toHaveLength(1)

  })

})

describe('when there is inititally one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await new User(user0).save()
  })
  test('we can create a new user', async () => {
    await api
      .post('/api/users')
      .send(user1)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const allUsers = await api.get('/api/users')
    expect(allUsers.body).toHaveLength(2)
  })

  test('attempting to create a user with the same username fails', async () => {
    await api
      .post('/api/users')
      .send(user0)
      .expect(400)
  })

  test('attempting to create a user without a username fails', async () => {
    await api
      .post('/api/users')
      .send({password: 'blah', name:'blah'})
      .expect(400)
  })
  test('attempting to create a user without a password fails', async() => {
    await api
      .post('/api/users')
      .send({username:'blah', name:'blah'})
      .expect(400)
  })

})