const initialState = null

const duration = 3000

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TELL': return action.data
    case 'UNTELL': return null
    default: return state
  }
}

export const tell = message => dispatch => {
  setTimeout(() => dispatch(untell()), duration)
  dispatch({
    type: 'TELL',
    data: message
  })
}

export const untell = () => ({
  type: 'UNTELL'
})

export default reducer