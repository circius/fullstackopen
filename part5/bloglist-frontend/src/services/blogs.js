import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  const blogs = request.data

  console.log('blogs:', blogs)
  
  return blogs
}

export default { getAll }