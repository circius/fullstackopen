import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { unsetUserCookie } from '../helpers/cookies'
import { logout } from '../reducers/currentUserReducer'
import { tell } from '../reducers/tellReducer'
import { blogsAddOne } from '../reducers/blogsReducer'

import LogoutButton from './LogoutButton'
import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'
import BlogList from './BlogList'

const BlogApp = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.currentUser)
  const blogs = useSelector(state => state.blogs)

  const doLogout = () => {
    unsetUserCookie()
    dispatch(logout())
    dispatch(tell("logged out"))
    return user
  }

  const updateBlogs = newBlog => {
    dispatch(blogsAddOne(newBlog))
    dispatch(tell(`added blog ${newBlog.title}`))
  }

  return (<div>
    <h2>blogs</h2>
Hello {user.username}
    <LogoutButton doLogout={doLogout} />

    <Togglable buttonId='formButton'>
      <NewBlogForm user={user} updateBlogs={updateBlogs} />
    </Togglable>
    <BlogList blogs={blogs} user={user} />
  </div>)
}

export default BlogApp