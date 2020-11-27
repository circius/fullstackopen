import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const userTokenKey = 'loggedBlogUser'

  useEffect(() => {
    blogService.getAll(user).then(blogs => {
      setBlogs(blogs)
    })
  }, [user])

  useEffect(() => {
    const loggedUserJSON = getUserCookie()
    if (loggedUserJSON) {
      const cookieUser = JSON.parse(loggedUserJSON)
      setUser(cookieUser)
    }
  }, [])

  const loggedInP = () => getUserCookie() !== null || user !== null

  const getUserCookie = () => window.localStorage.getItem(userTokenKey)
  const setUserCookie = userJSON => window.localStorage.setItem(userTokenKey, userJSON)
  const unsetUserCookie = () => window.localStorage.removeItem(userTokenKey)

  const doLogout = () => {
    unsetUserCookie()
    setUser(null)
    return user
  }
  const Logout = ({ doLogout }) => (
    <button onClick={doLogout}>logout</button>
  )


  return loggedInP() ? (
    <div>
      <h2>blogs</h2>
      <Logout doLogout={doLogout} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  ) :
    <Login setUser={setUser} setUserCookie={setUserCookie} />
}

export default App