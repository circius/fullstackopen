import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, updateBlog }) => {
  const sortByLike = blogs => blogs.sort((a, b) => b.likes - a.likes)
  const blogsSorted = sortByLike(blogs)
  return (
    blogsSorted.map(blog =>
      <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
    )
  )
}

export default BlogList