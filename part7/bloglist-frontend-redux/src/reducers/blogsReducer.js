import blogService from '../services/blogs'

const initialState = []

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case 'BLOGS_INIT': return action.data
    case 'BLOGS_ADD_ONE': return [...state, action.data]
    default: return state
  }
}

export const blogsInit = () => async dispatch => {
  const blogs = await blogService.getAll()
  dispatch({
    type: 'BLOGS_INIT',
    data: blogs
  })
}

export const blogsAddOne = blog => ({
  type: 'BLOGS_ADD_ONE',
  data: blog
})

export default reducer