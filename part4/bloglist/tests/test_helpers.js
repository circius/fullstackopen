const getEndpointBody = async (endpoint, api) => {
  const response = await api
    .get(endpoint)
  return response.body
}

const getAllBlogs = async api => {
  const blogs = await getEndpointBody('/api/blogs', api)
  return blogs
}

const getAllUsers = async api => {
  const users = await getEndpointBody('/api/users', api)
  return users
}

const getSomeBlog = async api => {
  const blogs = await getAllBlogs(api)
  return blogs.pop()
}

const getSomeBlogID = async api => {
  const blog = await getSomeBlog(api)
  return blog.id
}

module.exports = { getEndpointBody, getAllBlogs, getSomeBlog, getSomeBlogID, getAllUsers}