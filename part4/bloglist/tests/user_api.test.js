const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

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
    const user = {
      'name': 'Jack Sprat',
      'username': 'jsprat',
      'password': 'blahblah'
    }
    const response = await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const allUsers = await api.get('/api/users')
    expect(allUsers.body).toHaveLength(1)

  })

})

describe('when there is inititally one user in db', () => {
  beforeEach(async () => {
    U  
  })  
})