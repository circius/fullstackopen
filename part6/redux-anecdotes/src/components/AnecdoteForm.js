import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationRemove, notificationSet } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const createClickHandler = async event => {
    const createFlash = "created a note"
    event.preventDefault()
    const content = event.target.anecdote.value
    const anecdote = await anecdoteService.create(content)
    dispatch(createAnecdote(anecdote))
    dispatch(notificationSet(createFlash))
    setTimeout(() => dispatch(notificationRemove()), 5000)
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

export default AnecdoteForm