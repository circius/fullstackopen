import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { upvoteID } from '../reducers/anecdoteReducer'
import { notificationRemove, notificationSet } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const dispatch = useDispatch()
  const anecdotesSortByVote = (a, b) => b.votes - a.votes
  const anecdotes = useSelector(
    state => state.anecdotes.sort(anecdotesSortByVote))

  const vote = (id) => {
    const votedMessage = "Thank you for voting!"
    dispatch(upvoteID(id))
    dispatch(notificationSet(votedMessage))
    setTimeout(() => dispatch(notificationRemove()), 5000)

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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList