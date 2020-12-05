import React from 'react'
import { connect } from 'react-redux'
import { upvote } from '../reducers/anecdoteReducer'
import { notificationSet } from '../reducers/notificationReducer'

const mapStateToProps = state => {
  const anecdotesDoSort = anecdotes => anecdotes.sort((a, b) => b.votes - a.votes)
  const anecdotesDoFilter = anecdotes => state.filter ? anecdotes.filter(
    anecdote => anecdote.content.includes(state.filter)) : anecdotes
  return { anecdotes: anecdotesDoSort(anecdotesDoFilter(state.anecdotes)) }
}
const AnecdoteList = props => {
  const vote = anecdote => {
    const votedMessage = "Thank you for voting!"
    props.upvote(anecdote)
    props.notificationSet(votedMessage, 5000)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
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

export default connect(mapStateToProps, { upvote, notificationSet })(AnecdoteList)