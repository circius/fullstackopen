const {blog1, blog2, blog3 } = require('./blog_td.js')

const user0 = {
  'name': 'Jack Sprat',
  'username': 'jsprat',
  'password': 'blahblah',
}

const user1 = {
  'name': 'Jerome Frump',
  'username': 'lonely_flaubert',
  'password': 'an excellent password that should be accepted even though it is natural language',
}

const user2 = {
  'name': 'Hanna Mckenna',
  'username': 'mckenna',
  'password': 'EHanx0d-=-2',
}

const users0 = []
const users1 = [user0]
const users2 = [user0, user1, user2]

module.exports = {
  user0, user1, user2, users0, users1, users2
}