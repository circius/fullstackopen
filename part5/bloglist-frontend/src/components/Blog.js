import React, { useState } from 'react'
import ToggleButton from './ToggleButton'

const Blog = ({ blog }) => {
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

  const BlogInfo = ({ blog }) =>
    (<ul>
      <li id="likes">likes: {blog.likes} <button onClick={() => null}>like</button></li>
      <li id="url">{blog.url}</li>
      <li id="user">{blog.user.username}</li>
    </ul>)

  return (
    < div style={blogStyle}>
      { blog.title} - { blog.author}
      <ToggleButton label={showDetails ? 'hide' : 'view'} toggleFunction={toggleVisibility} />
      <div style={showWhenVisible}>
        whatever
        <BlogInfo blog={blog} />
      </div>
    </div >
  )
}

export default Blog
