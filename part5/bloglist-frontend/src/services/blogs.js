import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async (user) => {

  if (!user) return []

  const request = await axios.get(baseUrl, {
    headers: {
      'Authorization': `bearer ${user.token}`
    }
  })
  return request.data
}

const postBlog = async (user, blog) => {

  if (!user) return

  const request = await axios.post(
    baseUrl,
    blog,
    {
      headers: {
        'Authorization': `bearer ${user.token}`
      }
    }
  )
  console.log('request:', request)

  return request.data
}

export default { getAll, postBlog }
