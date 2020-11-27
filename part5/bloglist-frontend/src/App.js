import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import LogoutButton from './components/LogoutButton'
import NewBlogForm from './components/NewBlogForm'
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

  const loggedInP = () => user !== null

  const getUserCookie = () => window.localStorage.getItem(userTokenKey)
  const setUserCookie = userJSON => window.localStorage.setItem(userTokenKey, userJSON)
  const unsetUserCookie = () => window.localStorage.removeItem(userTokenKey)

  const doLogout = () => {
    unsetUserCookie()
    setUser(null)
    return user
  }

  const updateBlogs = newBlog => {
    setBlogs(blogs.concat(newBlog))
  }

  return loggedInP() ? (
    <div>
      <h2>blogs</h2>
      Hello {user.username}
      <LogoutButton doLogout={doLogout} />
      <NewBlogForm user={user} updateBlogs={updateBlogs} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  ) :
    <Login setUser={setUser} setUserCookie={setUserCookie} />

}

export default App