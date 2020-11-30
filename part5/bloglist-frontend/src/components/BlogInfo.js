import React from 'react'

const BlogInfo = ({ blog, doLike }) =>
  (<ul>
    <li id={`${blog.id}-likes`}>likes: {blog.likes} <button onClick={doLike}>like</button></li>
    <li id={`${blog.id}-url`}>{blog.url}</li>
    <li id={`${blog.id}-url`}>{blog.user.username}</li>
  </ul>)

export default BlogInfo