import React from 'react'
import { useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'

const BlogInfo = ({ blog }) => (
  <li key={blog.id}>{blog.title}</li>
)

const UserBlogs = ({ user }) => (
  <div>
    <h3>added blogs</h3>
    <ul>
      {user.blogs.map(blog => <BlogInfo blog={blog} />)}
    </ul>
  </div>
)

const UserDetail = () => {
  const userId = useParams().id
  const user = useSelector(state => state.users.find(
    user => user.id === userId))

  return !user ? null : (<div>
    <h2>{user.name}</h2>
    <UserBlogs user={user} />
  </div>)
}
export default UserDetail