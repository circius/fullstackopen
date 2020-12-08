const initialState = null

const duration = 3000

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'WARN': return action.data
    case 'UNWARN': return null
    default: return state
  }
}

export const warn = message => dispatch => {
  setTimeout(() => dispatch(unwarn()), duration)
  dispatch({
    type: 'WARN',
    data: message
  })
}

export const unwarn = () => ({
  type: 'UNWARN'
})

export default reducer