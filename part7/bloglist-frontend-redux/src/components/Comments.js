import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'

import { useField } from '../hooks/useField'
import { blogAddComment } from '../reducers/blogsReducer'

const AddCommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const comment = useField()
  const doAddComment = e => {
    e.preventDefault()
    dispatch(blogAddComment(blog, comment.value))
  }
  return (
    <form onSubmit={doAddComment}>
      <input {...comment} />
      <Button variant="outline-primary">add comment</Button>
    </form>
  )
}

const Comments = ({ blog }) => {

  return !blog.comments ? null : (
    <div>
      <AddCommentForm blog={blog} />
      <ul>
        {blog.comments.map(comment => <li>{comment}</li>)}
      </ul>
    </div>
  )
}

export default Comments