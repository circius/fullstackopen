import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationSet } from '../reducers/notificationReducer'


const AnecdoteForm = props => {

  const createClickHandler = async event => {
    const createFlash = "created a note"
    event.preventDefault()
    const content = event.target.anecdote.value
    props.createAnecdote(content)
    props.notificationSet(createFlash, 5000)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createClickHandler}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default connect(null, { createAnecdote, notificationSet })(AnecdoteForm)