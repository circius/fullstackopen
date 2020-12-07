import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { tell, untell } from './reducers/tellReducer'
import { blogsInit, blogsAddOne } from './reducers/blogsReducer'
import { login, logout } from './reducers/currentUserReducer'

import Login from './components/Login'
import LogoutButton from './components/LogoutButton'
import NewBlogForm from './components/NewBlogForm'
import { WarnFlash, TellFlash } from './components/Flash'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

import blogService from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.currentUser)
  const [blogs, setBlogs] = useState([])
  const [warnFlashMessage, setWarnFlashMessage] = useState(null)

  const userTokenKey = 'loggedBlogUser'
  const flashTimeout = 3000

  useEffect(() => {
    if (user) {
      dispatch(blogsInit())
    }
  }, [user])


  useEffect(() => {
    const loggedUserJSON = getUserCookie()
    const setUserFromCookie = cookie => {
      const userInfo = JSON.parse(cookie)
      dispatch(login(userInfo))
      return user
    }

    if (loggedUserJSON) {
      setUserFromCookie(loggedUserJSON)
    }
  }, [])

  const loggedInP = () => user !== null

  const getUserCookie = () => window.localStorage.getItem(userTokenKey)
  const setUserCookie = userJSON => window.localStorage.setItem(userTokenKey, userJSON)
  const unsetUserCookie = () => window.localStorage.removeItem(userTokenKey)



  const doLogin = incomingUser => {
    dispatch(login(incomingUser))

    setUserCookie(JSON.stringify(incomingUser))

    doTell("logged in!")
    return user
  }

  const doLogout = () => {
    unsetUserCookie()
    dispatch(logout())

    doTell("logged out")
    return user
  }

  const doTell = message => {
    dispatch(tell(message))
    setTimeout(() => dispatch(untell()), 3000)
  }

  const warn = message => {
    setWarnFlashMessage(message)
    setTimeout(() => setWarnFlashMessage(null), flashTimeout)
  }

  const updateBlogs = newBlog => {
    dispatch(blogsAddOne(newBlog))
    setBlogs(blogs.concat(newBlog))
    doTell(`added blog ${newBlog.title}`)
  }

  const updateBlog = (id, update) => {
    console.log('updating blog')
    setBlogs(blogs.map(
      blog => blog.id === id ? update : blog
    ))
  }

  const deleteBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  return (
    <div>
      <WarnFlash message={warnFlashMessage} />
      <TellFlash />
      {loggedInP() ? (
        <div>

          <h2>blogs</h2>
      Hello {user.username}
          <LogoutButton doLogout={doLogout} />

          <Togglable buttonId='formButton'>
            <NewBlogForm user={user} updateBlogs={updateBlogs} />
          </Togglable>
          <BlogList blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
        </div>
      ) :
        <Login doLogin={doLogin} warn={warn} />}
    </div>
  )
}

export default App