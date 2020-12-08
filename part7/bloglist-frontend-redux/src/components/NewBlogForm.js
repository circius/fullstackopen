import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

import blogService from '../services/blogs'

const NewBlogForm = ({ user, updateBlogs }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [URL, setURL] = useState("")

  const resetForm = () => {
    setTitle("")
    setAuthor("")
    setURL("")
  }

  const clickHandler = async event => {
    event.preventDefault()
    resetForm()
    updateBlogs({ title, author, url: URL })
  }

  return (
    <form id="newBlogForm" onSubmit={clickHandler}>
      <div>
        title:
  <input
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
<input
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
    <input
          id="url"
          type="text"
          value={URL}
          name="URL"
          onChange={({ target }) => setURL(target.value)}
        />
      </div>
      <Button variant="outline-primary" type="submit">submit</Button>
    </form>
  )
}

export default NewBlogForm