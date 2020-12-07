import blogService from '../services/blogs'

const initialState = []

const reducer = (state = initialState, action) => {
  const doLike = blog => ({ ...blog, likes: blog.likes + 1 })
  switch (action.type) {
    case 'BLOGS_INIT': return action.data
    case 'BLOGS_ADD_ONE': return [...state, action.data]
    case 'BLOGS_LIKE_ONE': return state.map(
      blog => blog.id === action.data ? doLike(blog) : blog)
    case 'BLOGS_DELETE_ONE': return state.filter(blog => blog.id !== action.data)
    default: return state
  }
}

export const blogsDeleteOne = blog => async dispatch => {
  blogService.deleteOne(blog)
  dispatch({
    type: 'BLOGS_DELETE_ONE',
    data: blog.id
  })
}

export const blogsLikeOne = blog => async dispatch => {
  blogService.bumpLike(blog)
  dispatch({
    type: 'BLOGS_LIKE_ONE',
    data: blog.id
  })
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