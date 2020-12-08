import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

import { blogsInit } from './reducers/blogsReducer'
import { login } from './reducers/currentUserReducer'
import { tell } from './reducers/tellReducer'
import { getUserCookie, setUserCookie } from './helpers/cookies'

import Login from './components/Login'
import { WarnFlash, TellFlash } from './components/Flash'
import Users from './components/Users'
import UserDetail from './components/UserDetail'
import BlogApp from './components/BlogApp'
import Menu from './components/Menu'
import BlogInfo from './components/BlogInfo'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.currentUser)
  const userTokenKey = 'loggedBlogUser'

  useEffect(() => {
    if (user) {
      dispatch(blogsInit())
    }
  }, [user, dispatch])


  useEffect(() => {
    const loggedUserJSON = getUserCookie(userTokenKey)
    const setUserFromCookie = cookie => {
      const userInfo = JSON.parse(cookie)
      dispatch(login(userInfo))
      return user
    }

    if (loggedUserJSON) {
      setUserFromCookie(loggedUserJSON)
    }
  }, [dispatch])


  const doLogin = incomingUser => {
    dispatch(login(incomingUser))
    setUserCookie(userTokenKey, JSON.stringify(incomingUser))
    dispatch(tell("logged in!"))
    return user
  }

  return (
    <Router>

      <div>
        <Menu user={user} />
        <WarnFlash />
        <TellFlash />
        <h2>blogs</h2>
        <Switch>
          <Route path="/users/:id">
            <UserDetail />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/blogs/:id">
            <BlogInfo />
          </Route>
          <Route path="/">
            {user ? (
              <BlogApp />

            ) :
              <Login doLogin={doLogin} />}
          </Route>

        </Switch>
      </div>
    </Router>
  )
}

export default App