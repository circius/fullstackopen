import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = ({ updateBlog, deleteBlog, user }) => {
  const blogs = useSelector(state => state.blogs)
  const sortByLike = blogs => blogs.sort((a, b) => b.likes - a.likes)
  const blogsSorted = sortByLike(blogs)
  return (
    <div id="blogList">
      {blogsSorted.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
      )}
    </div>
  )
}

export default BlogList