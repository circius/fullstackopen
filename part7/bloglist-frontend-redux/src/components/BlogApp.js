import React from 'react'
import { useSelector, useDispatch } from 'react-redux'


import { tell } from '../reducers/tellReducer'
import { blogsAddOne } from '../reducers/blogsReducer'

import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'
import BlogList from './BlogList'

const BlogApp = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.currentUser)
  const blogs = useSelector(state => state.blogs)

  const updateBlogs = newBlog => {
    dispatch(blogsAddOne(newBlog))
    dispatch(tell(`added blog ${newBlog.title}`))
  }

  return (<div>
    <Togglable buttonId='formButton'>
      <NewBlogForm user={user} updateBlogs={updateBlogs} />
    </Togglable>
    <BlogList blogs={blogs} user={user} />
  </div>)
}

export default BlogApp