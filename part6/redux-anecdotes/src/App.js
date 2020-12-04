import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { upvoteID } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotesSortByVote = (a, b) => b.votes - a.votes

  const anecdotes = useSelector(state => state.sort(anecdotesSortByVote))
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(upvoteID(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
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
      <AnecdoteForm dispatch={dispatch} />
    </div>
  )
}

export default App