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

export default { getAll }
