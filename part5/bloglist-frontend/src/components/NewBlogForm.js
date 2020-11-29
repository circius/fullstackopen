import React, { useState } from 'react'

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
    const newBlog = {
      title: title,
      author: author,
      url: URL
    }

    try {
      const response = await blogService.postBlog(user, newBlog)
      resetForm()
      console.log('response', response)
      updateBlogs(response)
    }
    catch (exception) {
      console.log(exception)
    }
  }

  return (
    <form onSubmit={clickHandler}>
      <div>
        title:
  <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
<input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
    <input
          type="text"
          value={URL}
          name="URL"
          onChange={({ target }) => setURL(target.value)}
        />
      </div>
      <button type="submit">submit</button>
    </form>
  )
}

export default NewBlogForm