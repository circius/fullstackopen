import axios from 'axios'

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = () => axios
  .get(baseUrl)
  .then(response => response.data)

const create = anecdote => axios
  .post(baseUrl, { content: anecdote, votes: 0 })
  .then(response => response.data)

const upvote = anecdote => axios
  .put(`${baseUrl}/${anecdote.id}`, { ...anecdote, votes: anecdote.votes + 1 })
  .then(response => response.data)

export default { getAll, create, upvote }