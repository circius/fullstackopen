import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'

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
    <Button variant="link" onClick={doLogout}>logout</Button>
  )
}

export default Logout