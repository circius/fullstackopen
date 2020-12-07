const initialState = null

const timeout = 5000

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TELL': return action.data
    default: return state
  }
}

export const tell = message => ({
  type: 'TELL',
  data: message
})

export const untell = message => ({
  type: 'UNTELL',
  data: message
})

export default reducer