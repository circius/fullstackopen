import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  const anecdoteUpvote = anecdote => {
    return {
      ...anecdote,
      votes: anecdote.votes + 1
    }
  }
  const stateDoUpdate = id => {
    return state.map(
      anecdote => anecdote.id === id ?
        anecdoteUpvote(anecdote) : anecdote)
  }
  const stateCreate = anecdote => {
    return [...state, anecdote]
  }
  const stateInit = anecdotes => {
    return anecdotes
  }

  switch (action.type) {
    case 'VOTE':
      return stateDoUpdate(action.data.id)
    case 'CREATE':
      return stateCreate(action.data)
    case 'INITIATE':
      return stateInit(action.data)
    default:
      return state
  }
}

export const upvoteID = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = anecdote => {
  return {
    type: 'CREATE',
    data: anecdote
  }
}

export const initAnecdotes = anecdotes => {
  return async dispatch => {
    const anecdotes = await anecdoteService
      .getAll()

    dispatch({
      type: 'INITIATE',
      data: anecdotes
    })
  }
}

export default reducer