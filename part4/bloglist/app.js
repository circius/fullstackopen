const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const config = require('./config/config');

const app = express();

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
});
app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);

module.exports = app;
