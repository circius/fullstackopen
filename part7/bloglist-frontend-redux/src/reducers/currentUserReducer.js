import blogService from '../services/blogs'

const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': return action.data
    case 'LOGOUT': return null
    default: return state
  }
}

export const login = user => async dispatch => {
  blogService.setUser(user)
  dispatch({
    type: 'LOGIN',
    data: user
  })
}

export const logout = () => ({
  type: 'LOGOUT'
})

export default reducer