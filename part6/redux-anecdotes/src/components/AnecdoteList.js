import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { upvoteID } from '../reducers/anecdoteReducer'

const AnecdoteList = props => {
  const state = useSelector(s => s)
  console.log(state)
  const dispatch = useDispatch()
  const anecdotesSortByVote = (a, b) => b.votes - a.votes
  const anecdotes = useSelector(
    state => state.anecdotes.sort(anecdotesSortByVote))

  const vote = (id) => {
    console.log('vote', id)
    dispatch(upvoteID(id))
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