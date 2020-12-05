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

export const upvote = anecdote => {
  return async dispatch => {
    const record = await anecdoteService.upvote(anecdote)
    dispatch(
      {
        type: 'VOTE',
        data: record
      })
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const record = await anecdoteService.create(anecdote)
    dispatch({
      type: 'CREATE',
      data: record
    })
  }
}

export const initAnecdotes = () => {
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