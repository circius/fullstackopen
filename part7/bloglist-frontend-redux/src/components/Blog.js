import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import { blogsDeleteOne } from '../reducers/blogsReducer'
import { warn } from '../reducers/warnReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const doSelfDelete = async () => {
    dispatch(warn("deleted a blog"))
    dispatch(blogsDeleteOne(blog))
  }

  const DeleteButton = ({ doSelfDelete }) => (
    <Button variant="link" onClick={doSelfDelete}>❌</Button>
  )

  const conditionalDeleteButton = (user, blog) => {
    const userOwnsBlogP = (user, blog) => user.id === blog.user.id
    if (userOwnsBlogP) return <DeleteButton doSelfDelete={doSelfDelete} />
  }


  return (
    < div >
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> - {blog.author}
      {conditionalDeleteButton(user, blog)}
    </div >
  )
}

export default Blog
