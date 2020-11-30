import axios from 'axios'
const baseUrl = '/api/blogs'

let user = {}

const setUser = newUser => user = newUser

const userAuthHeader = user => {
  return {
    headers: {
      'Authorization': `bearer ${user.token}`
    }
  }
}

const getAll = async () => {
  const request = await axios.get(baseUrl, userAuthHeader(user))
  return request.data
}

const postBlog = async (blog) => {

  const request = await axios.post(
    baseUrl,
    blog,
    userAuthHeader(user)
  )
  return request.data
}

const deleteOne = async blog => {
  const blogUrl = `${baseUrl}/${blog.id}`
  const request = await axios.delete(blogUrl, userAuthHeader(user))
  return request.data
}

const bumpLike = async (blog) => {

  const blogUrl = `${baseUrl}/${blog.id}`
  const update = {
    id: blog.id,
    likes: blog.likes + 1
  }
  const request = await axios.put(
    blogUrl,
    update,
    userAuthHeader(user)
  )
  return request.data
}

export default { getAll, postBlog, bumpLike, setUser, deleteOne }
