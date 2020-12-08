import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'


import { useField } from '../hooks/useField'
import blogService from '../services/blogs'

const NewBlogForm = ({ user, updateBlogs }) => {
  const title = useField()
  const author = useField()
  const url = useField()


  const resetForm = () => {
    title.reset()
    author.reset()
    url.reset()
  }

  const clickHandler = async event => {
    event.preventDefault()
    resetForm()
    updateBlogs({ title: title.value, author: author.value, url: url.value })
  }

  return (
    <Form id="newBlogForm" onSubmit={clickHandler}>
      <Form.Group>
        <Form.Control
          {...title} placeholder="title"
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          {...author} placeholder="author"
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          {...url} placeholder="url"
        />
      </Form.Group>
      <Button variant="outline-primary" type="submit">submit</Button>
    </Form>
  )
}

export default NewBlogForm