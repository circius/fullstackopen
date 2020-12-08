import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { blogsDeleteOne } from '../reducers/blogsReducer'
import { warn } from '../reducers/warnReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const doSelfDelete = async () => {
    dispatch(warn("deleted a blog"))
    dispatch(blogsDeleteOne(blog))
  }

  const DeleteButton = ({ doSelfDelete }) => (
    <button onClick={doSelfDelete}>delete</button>
  )

  const conditionalDeleteButton = (user, blog) => {
    const userOwnsBlogP = (user, blog) => user.id === blog.user.id
    if (userOwnsBlogP) return <DeleteButton doSelfDelete={doSelfDelete} />
  }


  return (
    < div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
      {conditionalDeleteButton(user, blog)}
    </div >
  )
}

export default Blog
