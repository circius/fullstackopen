import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Form } from 'react-bootstrap'

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
    <Form onSubmit={doAddComment}>
      <Form.Control {...comment} placeholder="new comment" />
      <Button variant="outline-primary">add comment</Button>
    </Form>
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