import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'

const BlogList = ({ user }) => {
  const blogs = useSelector(state => state.blogs)
  const sortByLike = blogs => blogs.sort((a, b) => b.likes - a.likes)
  const blogsSorted = sortByLike(blogs)
  return (
    <ListGroup id="blogList">
      {blogsSorted.map(blog =>
        <ListGroup.Item><Blog key={blog.id} blog={blog} user={user} /></ListGroup.Item>
      )}
    </ListGroup>
  )
}

export default BlogList