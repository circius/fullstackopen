import React from 'react'
import { useDispatch } from 'react-redux'

import { unsetUserCookie } from '../helpers/cookies'
import { logout } from '../reducers/currentUserReducer'
import { tell } from '../reducers/tellReducer'

const Logout = () => {
  const dispatch = useDispatch()

  const doLogout = () => {
    unsetUserCookie()
    dispatch(logout())
    dispatch(tell("logged out"))
  }
  return (
    <button onClick={doLogout}>logout</button>
  )
}

export default Logout