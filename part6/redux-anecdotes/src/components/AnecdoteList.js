import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { upvote } from '../reducers/anecdoteReducer'
import { notificationSet } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const dispatch = useDispatch()

  const filter = useSelector(state => state.filter)

  const anecdotesDoFilter = anecdotes => filter ? anecdotes.filter(
    anecdote => anecdote.content.includes(filter)) : anecdotes
  const anecdotesDoSort = anecdotes => anecdotes.sort((a, b) => b.votes - a.votes)
  const anecdotes = useSelector(
    state => anecdotesDoSort(anecdotesDoFilter(state.anecdotes)))

  const vote = anecdote => {
    const votedMessage = "Thank you for voting!"
    dispatch(upvote(anecdote))
    dispatch(notificationSet(votedMessage, 5000))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList