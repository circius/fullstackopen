import React, { useState } from 'react'
import ToggleButton from './ToggleButton'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const showWhenVisible = {
    display: showDetails ? '' : 'none',
  }

  const toggleVisibility = () => setShowDetails(!showDetails)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const doLike = async () => {
    const newBlog = await blogService.bumpLike(blog)
    updateBlog(blog.id, newBlog)
  }

  const BlogInfo = ({ blog, doLike }) =>
    (<ul>
      <li id={`${blog.id}-likes`}>likes: {blog.likes} <button onClick={doLike}>like</button></li>
      <li id={`${blog.id}-url`}>{blog.url}</li>
      <li id={`${blog.id}-url`}>{blog.user.username}</li>
    </ul>)

  return (
    < div style={blogStyle}>
      { blog.title} - { blog.author}
      <ToggleButton label={showDetails ? 'hide' : 'view'} toggleFunction={toggleVisibility} />
      <div style={showWhenVisible}>
        <BlogInfo blog={blog} doLike={doLike} />
      </div>
    </div >
  )
}

export default Blog
