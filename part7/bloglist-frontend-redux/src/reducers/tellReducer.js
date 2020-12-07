const initialState = null

const timeout = 5000

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TELL': return action.data
    case 'UNTELL': return null
    default: return state
  }
}

export const tell = message => ({
  type: 'TELL',
  data: message
})

export const untell = () => ({
  type: 'UNTELL'
})

export default reducer