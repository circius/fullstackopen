import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import LogoutButton from './components/LogoutButton'
import NewBlogForm from './components/NewBlogForm'
import { WarnFlash, TellFlash } from './components/Flash'
import Togglable from './components/Togglable'

import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [warnFlashMessage, setWarnFlashMessage] = useState(null)
  const [tellFlashMessage, setTellFlashMessage] = useState(null)

  const userTokenKey = 'loggedBlogUser'
  const flashTimeout = 3000

  useEffect(() => {
    if (user) {
      blogService.getAll(user).then(blogs => {
        setBlogs(blogs)
      })
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = getUserCookie()
    if (loggedUserJSON) {
      setUserFromCookie(loggedUserJSON)
    }
  }, [])

  const loggedInP = () => user !== null

  const getUserCookie = () => window.localStorage.getItem(userTokenKey)
  const setUserCookie = userJSON => window.localStorage.setItem(userTokenKey, userJSON)
  const unsetUserCookie = () => window.localStorage.removeItem(userTokenKey)

  const setUserFromCookie = cookie => {
    const userInfo = JSON.parse(cookie)
    setUser(userInfo)
    blogService.setUser(userInfo)
    return user
  }

  const doLogin = incomingUser => {
    setUser(incomingUser)
    setUserCookie(JSON.stringify(incomingUser))
    blogService.setUser(incomingUser)
    tell("logged in!")
    return user
  }

  const doLogout = () => {
    unsetUserCookie()
    setUser(null)
    tell("logged out")
    return user
  }

  const tell = message => {
    setTellFlashMessage(message)
    setTimeout(() => setTellFlashMessage(null), 3000)
  }

  const warn = message => {
    setWarnFlashMessage(message)
    setTimeout(() => setWarnFlashMessage(null), flashTimeout)
  }

  const updateBlogs = newBlog => {
    setBlogs(blogs.concat(newBlog))
    tell(`added blog ${newBlog.title}`)
  }

  const updateBlog = (id, update) => {
    console.log('updating blog')
    setBlogs(blogs.map(
      blog => blog.id === id ? update : blog
    ))
  }

  return (
    <div>
      <WarnFlash message={warnFlashMessage} />
      <TellFlash message={tellFlashMessage} />
      {loggedInP() ? (
        <div>

          <h2>blogs</h2>
      Hello {user.username}
          <LogoutButton doLogout={doLogout} />

          <Togglable>
            <NewBlogForm user={user} updateBlogs={updateBlogs} />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
          )}
        </div>
      ) :
        <Login doLogin={doLogin} warn={warn} />}
    </div>
  )
}

export default App