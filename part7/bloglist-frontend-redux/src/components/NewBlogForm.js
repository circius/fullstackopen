import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

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
    <form id="newBlogForm" onSubmit={clickHandler}>
      <div>
        title:
  <input
          {...title}
        />
      </div>
      <div>
        author:
<input
          {...author}
        />
      </div>
      <div>
        url:
    <input
          {...url}
        />
      </div>
      <Button variant="outline-primary" type="submit">submit</Button>
    </form>
  )
}

export default NewBlogForm