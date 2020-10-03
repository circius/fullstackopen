const dotenv = require('dotenv').config()

const { MONGODB_URI, TEST_MONGODB_URI, PORT } = process.env

module.exports = {
  MONGODB_URI,
  TEST_MONGODB_URI,
  PORT,
}
