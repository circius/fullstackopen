const {user0, user1} = require('./user_td')

const blog1 = {
  title: 'whatever',
  author: user1.id,
  url: 'example.com',
  likes: 0,
}
const blog2 = {
  title: 'another',
  author: user0.id,
  url: 'beispiel.com',
  likes: 3,
}
const blog3 = {
  title: 'last',
  author: user1.id,
  url: 'example.fr',
  likes: 2,
}
const blogs0 = []
const blogs1 = [blog1]
const blogs2 = [blog1, blog2]
const blogs3 = [blog1, blog2, blog3]

module.exports = {
  blog1, blog2, blog3, blogs0, blogs1, blogs2, blogs3
}